import React, { Component } from 'react'
import editIcon from './editIcon.svg'
import axios from 'axios'
import Settings from '../../../../settings'
import { connect } from 'react-redux'

class ProfileEditable extends Component {

  state = {
    edit: false
  }

  edit = () => {
    console.log('edit')
    this.setState({
      edit: true
    })
  }

  updateUser = (e) => {
    e.preventDefault()
    let slogan = this.sloganInput.value
    let data = {
      username: this.props.user.username,
      slogan
    }
    console.log(data)
    axios.put(`${Settings.host}/user`, data).then( res => {
      console.log('user, from server...', res.data)
      this.props.dispatch({ type: 'UPDATE_USER', user: res.data.user, userId: this.props.userId  })
      this.setState({
        edit: false
      })
    })

  }

  render(){
    const { user } = this.props
    const  { avatar, username, slogan } = user
    const hisAvatar = avatar ? avatar : 'http://media.haoduoshipin.com/yummy/default-avatar.png'
    const hisUsername = username ? username : 'no name'
    const hisSlogan =  slogan ? slogan : '此人很个性，还没有填写个性签名'

    let editForm = (
      <form className="profile-form"
        onSubmit={this.updateUser}>
        <input className="profile-slogan-input"
          ref={value => this.sloganInput = value}
          type="text" placeholder={hisSlogan} />
        <button type="submit">保存</button>
      </form>
    )

    return(
      <div className="profile-editable">
        <img className="profile-avatar"
          src={hisAvatar} alt="avatar" />
        <div className="profile-username-slogan">
          <div className="profile-username">
            {hisUsername}
          </div>
          <div className="profile-slogan">
            { this.state.edit ? editForm : hisSlogan }
          </div>
        </div>
        <div onClick={this.edit}
          className="profile-edit-btn">
          <img src={editIcon} alt="edit" />
        </div>
      </div>
    )
  }
}

export default connect(null)(ProfileEditable)

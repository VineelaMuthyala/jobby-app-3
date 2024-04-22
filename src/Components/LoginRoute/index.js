import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', errorMsgStatus: false, errorMessage: ''}

  onChangeUsername = event => {
    console.log(event.target.value)
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    console.log(event.target.value)
    this.setState({password: event.target.value})
  }

  onSubmissonSuccessful = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmissionFailure = error => {
    this.setState({errorMsgStatus: true, errorMessage: error})
    console.log(error)
  }

  fromSubmitted = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmissonSuccessful(data.jwt_token)
    } else {
      console.log(data.error_msg)
      this.onSubmissionFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsgStatus, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-login-container">
        <p className="text">UserName : rahul</p>
        <p className="text">Password : rahul@2021</p>
        <form
          className="login-form"
          type="submit"
          onSubmit={this.fromSubmitted}
        >
          <img
            className="logo-image"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="input-container">
            <div className="input-details-container">
              <label className="input-lable" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                className="input-text"
                id="username"
                onChange={this.onChangeUsername}
                value={username}
                placeholder="Username"
              />
            </div>

            <div className="input-details-container">
              <label className="input-lable" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="text"
                className="input-text"
                id="password"
                onChange={this.onChangePassword}
                value={password}
                placeholder="Password"
              />
            </div>
          </div>
          <div className="button-container">
            <button
              className="login-btn"
              type="submit"
              onClick={this.fromSubmitted}
            >
              Login
            </button>
            {errorMsgStatus && <p className="error-msg">{errorMessage}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default LoginRoute

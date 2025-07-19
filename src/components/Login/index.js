import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'
class Login extends Component {
  state = {
    userInput: '',
    passwordInput: '',
    errorMsg: '',
    showerror: false,
  }
  onchangeUser = event => {
    this.setState({userInput: event.target.value})
  }
  onchangepassword = event => {
    this.setState({passwordInput: event.target.value})
  }
  success = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }
  failure = errorMsg => {
    this.setState({errorMsg, showerror: true})
  }

  onsubmitForm = async event => {
    event.preventDefault()
    const {userInput, passwordInput} = this.state
    const userDetails = {username: userInput, password: passwordInput}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.success(data.jwt_token)
    } else {
      this.failure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {errorMsg, showerror, userInput, passwordInput} = this.state
    return (
      <div className="bg">
        <form onSubmit={this.onsubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt=" website logo"
            className="log"
          />
          <input
            type="text"
            placeholder="username"
            onChange={this.onchangeUser}
            value={userInput}
            id="username"
          />
          <label htmlFor="username" className="para">
            USERNAME
          </label>
          <input
            type="password"
            onChange={this.onchangepassword}
            value={passwordInput}
            placeholder="password"
            id="password"
          />
          <label htmlFor="password" className="para">
            PASSWORD
          </label>
          <button type="submit">Login</button>
          {showerror && <p className="para">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login

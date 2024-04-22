import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const HeaderRoute = props => {
  const onLogout = () => {
    const {history} = props
    console.log(history)
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/" className="link">
        <img
          className="header-logo-image"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <div className="options-container-one">
        <ul className="options-container">
          <Link to="/" className="link">
            <li className="header-text">Home</li>
          </Link>
          <Link to="/jobs" className="link">
            <li className="header-text">Jobs</li>
          </Link>
        </ul>
      </div>
      <div className="options-container-two">
        <button className="logout-btn" type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(HeaderRoute)

import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import {Component} from 'react'
import HeaderRoute from '../HeaderRoute'

import './index.css'

class HomeRoute extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="home-container">
        <HeaderRoute />
        <div className="home-page">
          <div className="home-page-text">
            <h1 className="home-heading">Find The Job That Fits Your Life</h1>
            <p className="home-text">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential.
            </p>
            <Link to="/jobs">
              <button className="find-jobs-btn" type="button">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeRoute

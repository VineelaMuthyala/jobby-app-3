import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const profileStatusValue = {
  profileFailure: 'FAILURE',
  profileSuccess: 'SUCCESS',
  profileInitial: 'INITIAL',
  profileLoading: 'LOADING',
}

class ProfileRoute extends Component {
  state = {profileStatus: profileStatusValue.profileInitial}

  componentDidMount() {
    this.getprofileDetails()
  }

  getprofileDetails = async () => {
    this.setState({profileStatus: profileStatusValue.profileLoading})
    try {
      const profileUrl = 'https://apis.ccbp.in/profile'
      const jwtToken = Cookies.get('jwt_token')
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(profileUrl, options)
      const profileData = await response.json()
      const data = profileData.profile_details
      const upDatedProfile = {
        name: data.name,
        profileImageUrl: data.profile_image_url,
        shortBio: data.short_bio,
      }
      this.setState({
        profileDetails: upDatedProfile,
        profileStatus: profileStatusValue.profileSuccess,
      })
    } catch (e) {
      console.log(e)
      this.setState({profileStatus: profileStatusValue.profileFailure})
    }
  }

  renderProfileSuccess = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img className="profile-image" alt="profile" src={profileImageUrl} />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-description">{shortBio}</p>
      </div>
    )
  }

  onClickRetry = () => {
    this.renderProfileSuccess()
  }

  renderProfileFailure = () => (
    <div className="profile-failuer-container">
      <button className="retry-btn" type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfilePage = () => {
    const {profileStatus} = this.state
    console.log(profileStatus)
    switch (profileStatus) {
      case profileStatusValue.profileSuccess:
        return this.renderProfileSuccess()
      case profileStatusValue.profileFailure:
        return this.renderProfileFailure()
      case profileStatusValue.profileLoading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderProfilePage()}</div>
  }
}

export default ProfileRoute

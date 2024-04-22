import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'

import SimilarJobItem from '../SimilarJobItem'
import SkillsCard from '../SkillsCard'
import Header from '../HeaderRoute'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobCardRoute extends Component {
  state = {
    jobItemList: {},
    similarJobItemList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItem()
  }

  getFormattedSkillData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    rating: data.rating,
    location: data.location,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getJobItem = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    try {
      const {match} = this.props
      const {params} = match
      const {id} = params

      const jwtToken = Cookies.get('jwt_token')
      const url = `https://apis.ccbp.in/jobs/${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(url, options)

      const data = await response.json()
      console.log(data)
      const updatedData = this.getFormattedData(data.job_details)
      const updatedSkillData = data.similar_jobs.map(eachSimilarJob =>
        this.getFormattedSkillData(eachSimilarJob),
      )
      console.log(updatedData)
      console.log(updatedSkillData)
      this.setState({
        jobItemList: updatedData,
        similarJobItemList: updatedSkillData,
        apiStatus: apiStatusConstants.success,
      })
    } catch (e) {
      console.log('catch')
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobItemDetails = () => {
    const {jobItemList, similarJobItemList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      title,
      rating,
      packagePerAnnum,
      lifeAtCompany,
      skills,
    } = jobItemList
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="full-job-item-container">
        <div className="job-items-container">
          <div className="logo-image-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo-justify"
            />
            <div className="title-container">
              <h1 className="company-title-head">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-rating" />
                <p className="rating-text">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-salary-container">
            <div className="location-container">
              <div className="responsive">
                <GoLocation className="location-logo" />
                <p className="location-desc">{location}</p>
              </div>
              <div className="responsive">
                <BsBriefcaseFill className="location-logo-brief" />
                <p className="location-desc">{employmentType}</p>
              </div>
            </div>
            <p className="package-desc">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="description-container">
            <h1 className="heading-text">Description</h1>
            <a className="visit-link" href={companyWebsiteUrl}>
              Visit
              <BiLinkExternal className="bi-link" />
            </a>
          </div>
          <p className="job-story-desc">{jobDescription}</p>
          <h1 className="skill-heading">Skills</h1>
          <ul className="skill-container">
            {skills.map(eachSkill => (
              <SkillsCard key={eachSkill.id} skillDetails={eachSkill} />
            ))}
          </ul>
          <h1 className="life-company-heading">Life at company</h1>
          <div className="life-at-company-container">
            <p className="life-company-desc">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="company-logo"
            />
          </div>
        </div>
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <ul className="similar-cards">
          {similarJobItemList.map(eachItem => (
            <SimilarJobItem key={eachItem.id} jobDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="render-loading-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong </h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-button" onClick={this.getJobItem}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="profile-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="get-products-details-container">
          {this.renderJobViews()}
        </div>
      </>
    )
  }
}

export default JobCardRoute

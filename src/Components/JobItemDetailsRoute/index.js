import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

class JobItemDetailsRoute extends Component {
  onClickJobItemDetails = event => {
    console.log(event.target.value)
  }

  render() {
    const {jobitemDetails} = this.props
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      id,
    } = jobitemDetails

    return (
      <Link to={`/jobs/${id}`} className="link">
        <li className="job-details-container">
          <div className="logo-title-rating-container">
            <img
              className="logo"
              alt="job details company logo"
              src={companyLogoUrl}
            />
            <div className="title-rating-container">
              <h1 className="title-heading">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-rating" />
                <p className="rating-text">{rating}</p>
              </div>
            </div>
          </div>

          <div className="location-internship-salary-container">
            <div className="location-internship-container">
              <div className="employment-location-container">
                <GoLocation className="location-icon" />
                <p className="employment-location-text">{location}</p>
              </div>
              <div className="employment-type-container">
                <BsFillBriefcaseFill />
                <p className="employment-location-text">{employmentType}</p>
              </div>
            </div>
            <p className="package-text">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <h1 className="description-heading">Description</h1>
          <p className="description-para">{jobDescription}</p>
        </li>
      </Link>
    )
  }
}

export default JobItemDetailsRoute

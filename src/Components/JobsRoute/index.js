import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'
import HeaderRoute from '../HeaderRoute'
import JobItemDetailsRoute from '../JobItemDetailsRoute'
import FilterEmploymentType from '../FilterEmploymentType'
import FilterSalaryRange from '../FilterSalaryRange'
import ProfileRoute from '../ProfileRoute'
import './index.css'

const apiStatusValues = {
  jobsListFailure: 'FAILURE',
  jobsListInitial: 'INITIAL',
  jobsListSuccess: 'SUCCESS',
  jobsListInProgress: 'IN_PROGRESS',
}

class JobsRoute extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusValues.jobsListInitial,

    searchValue: '',
    empType: [],
    salaryRange: '0',
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getUpDatedJobsData = data => {
    const updatedJobsData = {
      companyLogoUrl: data.company_logo_url,
      employmentType: data.employment_type,
      id: data.id,
      jobDescription: data.job_description,
      location: data.location,
      packagePerAnnum: data.package_per_annum,
      rating: data.rating,
      title: data.title,
    }
    return updatedJobsData
  }

  onClickRetry = () => {
    this.getJobItemDetails()
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusValues.jobsListInProgress})
    try {
      const {empType, salaryRange, searchValue} = this.state
      const jobItemsUrl = `https://apis.ccbp.in/jobs?employment_type=${empType.join()}&minimum_package=${salaryRange}&search=${searchValue}`
      const jwtToken = Cookies.get('jwt_token')
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(jobItemsUrl, options)
      const fetchedJobsData = await response.json()
      const updatedJobsList = fetchedJobsData.jobs.map(eachJob =>
        this.getUpDatedJobsData(eachJob),
      )
      this.setState({
        jobsList: updatedJobsList,
        apiStatus: apiStatusValues.jobsListSuccess,
      })
    } catch (e) {
      console.log('Error', e)
      this.setState({apiStatus: apiStatusValues.jobsListFailure})
    }
  }

  onChangeSearchValue = event => {
    this.setState({searchValue: event.target.value})
  }

  onKeyDownSearchValue = event => {
    if (event.key === 'Enter') {
      this.getJobItemDetails()
    }
  }

  salarayRangeSelected = salaryId => {
    this.setState({salaryRange: salaryId}, this.getJobItemDetails)
  }

  employmentSelected = empId => {
    const {empType} = this.state
    const isEmpIdThere = empType.includes(empId)
    console.log(isEmpIdThere)
    if (isEmpIdThere) {
      const filteredEmyTypeList = empType.filter(eachItem => eachItem !== empId)
      this.setState({empType: filteredEmyTypeList}, this.getJobItemDetails)
    } else {
      this.setState(
        prevState => ({empType: [...prevState.empType, empId]}),
        this.getJobItemDetails,
      )
    }
  }

  renderJobsListFailureView = () => (
    <div className="no-jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops something went wrong!</h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for
      </p>
      <button className="retry-btn" type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderJobsListFetched = () => {
    const {jobsList} = this.state
    if (jobsList.length > 0) {
      return (
        <ul>
          {jobsList.map(eachItem => (
            <JobItemDetailsRoute key={eachItem.id} jobitemDetails={eachItem} />
          ))}
        </ul>
      )
    }
    return (
      <div className="no-jobs-container">
        <img
          className="no-jobs-image"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-text">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderJobsDetailsPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusValues.jobsListSuccess:
        return this.renderJobsListFetched()
      case apiStatusValues.jobsListFailure:
        return this.renderJobsListFailureView()
      case apiStatusValues.jobsListInProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    const {searchValue, empType, salaryRange} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="jobs-list-container">
        <HeaderRoute />
        <div className="jobs-page">
          <div className="jobs-page-left">
            <ProfileRoute />
            <hr />
            <div className="emp-type-container">
              <h1 className="text-heading">Type of Employment</h1>
              <ul>
                <FilterEmploymentType
                  employmentSelected={this.employmentSelected}
                  empType={empType}
                />
              </ul>
              <hr />
              <h1 className="text-heading">Salary Range</h1>
              <ul>
                <FilterSalaryRange
                  salarayRangeSelected={this.salarayRangeSelected}
                  salaryRange={salaryRange}
                />
              </ul>
            </div>
          </div>
          <div className="jobs-page-right">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-text"
                onChange={this.onChangeSearchValue}
                onKeyDown={this.onKeyDownSearchValue}
                value={searchValue}
              />
              <button
                className="search-button"
                type="button"
                aria-label="Search"
                onClick={this.getJobItemDetails}
                data-testid="searchButton"
              >
                <AiOutlineSearch className="search-icon" />
              </button>
            </div>
            <ul>{this.renderJobsDetailsPage()}</ul>
          </div>
        </div>
        )
      </div>
    )
  }
}

export default JobsRoute

import {Component} from 'react'
import Cookies from 'js-cookie'

import ProfileDetails from '../ProfileDetails'
import FilterGroups from '../FilterGroups'
import JobCard from '../JobCard'
import Header from '../Header'
import Loader from 'react-loader-spinner'
const apiStatusCode = {
  initial: 'initial',
  success: 'success',
  failure: 'failure',
  progress: 'progress',
}
class Jobs extends Component {
  state = {
    profileSApiStatus: apiStatusCode.initial,
    profileDetails: {},
    activeSalaryRangeId: '',
    jobApiStatus: apiStatusCode.initial,
    searchInput: '',
    employmentTypeCheck: [],
    jobSlist: [],
  }
  componentDidMount() {
    this.getProductDetails, this.getJobs()
  }
  updatemploymentTypeCheck = typeId => {
    const {employmentTypeCheck} = this.state
    let updateList = employmentTypeCheck
    if (employmentTypeCheck.includes(typeId)) {
      updateList = employmentTypeCheck.filter(each => each !== typeId)
    } else {
      updateList = [...updateList, typeId]
    }
    this.setState({employmentTypeCheck: updateList}, this.getJobs)
  }
  updateSalaryRangeId = activeSalaryRangeId =>
    this.setState({activeSalaryRangeId}, this.getJobs)

  getJobs = async () => {
    this.setState({jobApiStatus: apiStatusCode.progress})
    const {activeSalaryRangeId, employmentTypeCheck, searchInput} = this.state
    //const employType = employmentTypeCheck.json()
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeCheck}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok == true) {
      const {jobs} = data
      const updatedData = jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobSlist: updatedData,
        jobApiStatus: apiStatusCode.success,
      })
    } else {
      this.setState({jobApiStatus: apiStatusCode.failure})
    }
  }

  getProductDetails = async () => {
    this.setState({profileSApiStatus: apiStatusCode.progress})
    const jwtToken = Cookies.get('jwt_token')
    const apiurl = 'https://apis.ccbp.in/profile'
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiurl, option)
    const data = await response.json()
    if (response.ok === true) {
      const profile = data.profile_details
      const update = {
        name: profile.name,
        profileImageUrl: profile.profile_image_url,
        shortBio: profile.short_bio,
      }
      this.setState({
        profileSApiStatus: apiStatusCode.success,
        profileDetails: update,
      })
    } else {
      this.setState({profileSApiStatus: apiStatusCode.failure})
    }
  }

  renderSearchBar = () => {
    const {searchInput} = this.state
    return (
      <div>
        <input
          value={searchInput}
          onChange={event => this.setState({searchInput: event.target.value})}
          type="search"
          placeholder="search"
        />
        <button data-testid="searchButton" onClick={() => this.getJobs()}> search</button>
      </div>
    )
  }
  renderSideBar = () => {
    const {
      profileDetails,
      profileSApiStatus,
      activeSalaryRangeId,
      employmentTypeCheck,
    } = this.state
    return (
      <div className="bar">
        {this.renderSearchBar('smallSearchBar')}
        <div className="bar1">
          <ProfileDetails
            profileDetails={profileDetails}
            profileSApiStatus={profileSApiStatus}
            getProductDetails={this.getProductDetails}
          />
          <hr className="seperator" />
          <FilterGroups
            updateSalaryRangeId={this.updateSalaryRangeId}
            activeSalaryRangeId={activeSalaryRangeId}
            updatemploymentTypeCheck={this.updatemploymentTypeCheck}
            employmentTypeCheck={employmentTypeCheck}
          />
        </div>
      </div>
    )
  }

  renderNoJobView = () => (
    <div className="no">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        alt="no jobs"
        className="nojob"
      />
      <h1 className="h1">No Jobs Found</h1>
      <p className="paraf">We could not find any jobs. Try other filters</p>
    </div>
  )
  renderJobList = () => {
    const {jobSlist} = this.state
    return (
      <>
        {jobSlist.length > 0 ? (
          <ul>
            {jobSlist.map(each => (
              <JobCard key={each.id} jobDetails={each} />
            ))}
          </ul>
        ) : (
          this.renderNoJobView()
        )}
      </>
    )
  }

  renderJobprogress = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" height={50} width={50} color="blue" />
    </div>
  )
  renderFailure = () => (
    <div className="f1">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="imgf"
      />
      <h1 className="paraf">Oops! something went wrong</h1>
      <p className="paraf">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="searchButton" onClick={() => this.getJobs()}>
        Retry
      </button>
    </div>
  )
  renderall = () => {
    const {jobApiStatus} = this.state
    switch (jobApiStatus) {
      case apiStatusCode.success:
        return this.renderJobList()

      case apiStatusCode.failure:
        return this.renderFailure()
      case apiStatusCode.progree:
        return this.renderProgress()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderSideBar()}
        <div className="m">
          {this.renderSearchBar('largeSearchBar')}
          {this.renderall()}
        </div>
      </div>
    )
  }
}
export default Jobs

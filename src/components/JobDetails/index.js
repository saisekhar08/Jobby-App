import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'

const apiStatusCode = {
  initial: 'initaila',
  success: 'success',
  failure: 'failure',
  progree: 'progress',
}
class JobDetails extends Component {
  state = {
    apistatus: apiStatusCode.initial,
    jobInformatin: {},
    similarjob: [],
  }
  componentDidMount() {
    this.getProducts()
  }
  convertCamel = data => {
    const camel1 = data.job_details
    const update = {
      companyLogoUrl: camel1.company_logo_url,
      companyWebsiteUrl: camel1.company_website_url,
      employmentType: camel1.employment_type,
      jobDescription: camel1.job_description,
      packagePerAnnum: camel1.package_per_annum,
      location: camel1.location,
      rating: camel1.rating,
      title: camel1.title,
      id: camel1.id,
      skills: camel1.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      })),
      lifeAtCompany: {
        description: camel1.life_at_company.description,
        imageUrl: camel1.life_at_company.image_url,
      },
    }

    const similarCame = data.similar_jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      jobDescription: each.job_description,
      id: each.id,
      location: each.location,
      rating: each.rating,
      title: each.title,
    }))
    return {update, similarCame}
  }

  getProducts = async () => {
    this.setState({apistatus: apiStatusCode.progree})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const option = {
      method: 'GET',

      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok === true) {
      const {update, similarCame} = this.convertCamel(data)
      this.setState({
        apistatus: apiStatusCode.success,
        jobInformatin: update,
        similarjob: similarCame,
      })
    } else {
      this.setState({apistatus: apiStatusCode.failure})
    }
  }
  renderProgress = () => (
    <div data-testid="loader" className="progress">
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
      <h1 className="paraf">Oops! Something Went Wrong</h1>
      <p className="paraf">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" onClick={() => this.getProducts()}>
        Retry
      </button>
    </div>
  )
  renderSucces = () => {
    const {jobInformatin, similarjob} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      rating,
      location,
      title,
      skills,
      companyWebsiteUrl,
      lifeAtCompany,
      packagePerAnnum,
    } = jobInformatin
    return (
      <div className="bgs">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
          className="imgs"
        />
        <div className="bgs2">
          <h1 className="h1">{title}</h1>
          <AiFillStar />
          <p className="paraf">{rating}</p>
        </div>
        <div className="bgs3">
          <IoLocationSharp />
          <p className="paraf">{location}</p>
          <BsFillBriefcaseFill />
          <p className="paraf">{employmentType}</p>
          <p className="paraf">{packagePerAnnum}</p>
        </div>
        <hr className="seperator" />
        <h1 className="h1">Description</h1>
        <p className="paraf">{jobDescription}</p>
        <a href={companyWebsiteUrl}>
          visit
          <FiExternalLink />
        </a>

        <ul>
          <h1 className="h1">Skills</h1>
          {skills.map(each => {
            const {imageUrl, name} = each
            return (
              <li key={name}>
                <img src={imageUrl} alt={name} className="imgs" />
                <p className="paraf">{name}</p>
              </li>
            )
          })}
        </ul>
        <h1 className="h1">Life at Company</h1>
        <p className="paraf">{lifeAtCompany.description}</p>
        <img src={lifeAtCompany.imageUrl} alt="life at acompany" />
        <div className="similar">
          <h1 className="h1">Similar Jobs</h1>
          <ul className="ul">
            {similarjob.map(each => (
              <SimilarJobCard jobDetails={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderall = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case apiStatusCode.success:
        return this.renderSucces()

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
      <div className="job">
        <Header />
        {this.renderall()}
      </div>
    )
  }
}
export default JobDetails

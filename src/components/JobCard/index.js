import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    packagePerAnnum,

    employmentType,
    jobDescription,
    location,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <li className="card">
      <Link to={`/jobs/${id}`}>
        <div className="card1">
          <img src={companyLogoUrl} alt="company logo" className="img1" />
          <h1 className="para1">{title}</h1>

          <AiFillStar />
          <p>{rating}</p>
        </div>
        <div className="card2">
          <IoLocationSharp />
          <p className="para1">{location}</p>
          <BsFillBriefcaseFill />
          <p className="para1">{employmentType}</p>
          <p className="para1">{packagePerAnnum}</p>
        </div>
        <hr className="seperator" />
        <div className="card2">
          <p className="para1">Description</p>
          <p className="para1">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default JobCard

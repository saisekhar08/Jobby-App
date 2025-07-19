import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,

    location,
    rating,
    title,
  } = jobDetails
  return (
    <li>
      <div>
        <img src={companyLogoUrl} alt="similar job company logo" />
        <div>
          <h1>{title}</h1>
          <AiFillStar />
          <p>{rating}</p>
        </div>
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>
      <IoLocationSharp />
      <p>{location}</p>
      <BsFillBriefcaseFill />
      <p>{employmentType}</p>
    </li>
  )
}
export default SimilarJobCard

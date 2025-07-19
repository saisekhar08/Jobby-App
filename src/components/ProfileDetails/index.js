import Loader from 'react-loader-spinner'
import './index.css'
const apiStatusCode = {
  initial: 'initial',
  success: 'success',
  failure: 'failure',
  progress: 'progress',
}
const ProfileDetails = props => {
  const renderProfile = () => {
    const {profileDetails} = props
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div>
        <img src={profileImageUrl} alt="profile" className="p" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }
  const renderFailure = () => {
    const {getProductDetails} = props
    return (
      <div>
        <button type="button" onClick={getProductDetails}>
          Retry
        </button>
      </div>
    )
  }
  const renderProgress = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" height={50} width={50} color="blue" />
    </div>
  )

  const {profileSApiStatus} = props
  switch (profileSApiStatus) {
    case apiStatusCode.success:
      return renderProfile()

    case apiStatusCode.failure:
      return renderFailure()
    case apiStatusCode.progree:
      return renderProgress()
    default:
      return null
  }
}
export default ProfileDetails

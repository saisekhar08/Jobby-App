import Header from '../Header'
import {Redirect, Link} from 'react-router-dom'
import './index.css'
import Coookies from 'js-cookie'

const Home = () => {
  const jwtToken = Coookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="homebg">
      <Header />
      <div className="page">
        <h1 className="h1">Find The Job That Fits Your Life</h1>
        <p className="para">
          Millions of people are searching for jobs,salary information,company
          review.Find the job that fits your ability and potential
        </p>
        <Link to="/jobs">
          <button className="button" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Home

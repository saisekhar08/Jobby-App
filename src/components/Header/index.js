import './index.css'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const click = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="header">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
          className="img"
        />
      </Link>
      <ul>
        <li>
          <Link to="/">
            <p className="para">Home</p>
          </Link>
          <Link to="/">
            <AiFillHome />
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <p className="para">Jobs</p>
          </Link>
          <Link to="/jobs">
            <BsFillBriefcaseFill />
          </Link>
        </li>
        <li>
          <button onClick={click} className="button">
            <FiLogOut />
          </button>
        </li>
        <li>
          <button onClick={click} className="button">
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}
export default withRouter(Header)

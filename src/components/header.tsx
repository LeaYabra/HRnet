import logo from "../designs/images/logo.png"
import { Link } from "react-router-dom"

function Header() {
  return (
    <nav className="header">
      <Link to={"/"}>
        <img src={logo} alt="logo" />
      </Link>
    </nav>
  )
}

export default Header

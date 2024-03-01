import logo from "../designs/images/logo.avif"
import { Link } from "react-router-dom"

function Header() {
  return (
    <nav className="header">
      <Link to={"/"}>
        <img rel="preload" src={logo} alt="logo" />
      </Link>
    </nav>
  )
}

export default Header

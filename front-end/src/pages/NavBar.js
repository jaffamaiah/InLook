import "./NavBar.css"

const NavBar = () => {
  return <nav className="navbar">
    <div className="navbar-left">
      <a href="/" className="logo">
        InLook
      </a>
    </div>
    <div className="navbar-center">
      <ul className="nav-links">
        <li>
          <a href="/people">People</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/journal">Journal</a>
        </li>
      </ul>
    </div>
    <div className="navbar-right"></div>
  </nav>
}

export default NavBar

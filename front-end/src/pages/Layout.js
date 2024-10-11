import { Outlet, Link } from "react-router-dom"

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/people">People</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout
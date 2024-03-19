import NavBar from "../Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';

export const Layout = ({ children }) => {
  return <div className="base">
    <NavBar/>
    {children}
  </div>
}
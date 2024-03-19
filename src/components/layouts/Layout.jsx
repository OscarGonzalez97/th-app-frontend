import NavBar from "../Navbar"

export const Layout = ({ children }) => {
  return <div className="base">
    <NavBar/>
    {children}
  </div>
}
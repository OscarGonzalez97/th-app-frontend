import NavBar from "../Navbar"

export const Layout = ({ children }) => {
  return <>
    <NavBar/>
    {children}
  </>
}
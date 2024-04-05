import NavBar from "../Navbar"
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const Layout = ({ children }) => {
  const token = useSelector(state => state.token);
  const navigate = useNavigate();
  useEffect(() => {
    if(!token) {
      navigate("/login")
    }
  }, [])
  return <div className="base">
    <NavBar/>
    {children}
  </div>
}
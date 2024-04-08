import NavBar from "../Navbar"
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

export const Layout = ({ children }) => {
  const token = useSelector(state => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return <div className="base">
    <style>{`
        .p-column-title{
            font-size:20px;
        }
    `}</style>
    <NavBar/>
    {children}
  </div>
}

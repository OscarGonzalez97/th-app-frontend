import NavBar from "../Navbar"
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

export const Layout = ({ children }) => {
  const token = useSelector(state => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch({ type: 'SET_TOKEN', payload: storedToken });
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);
  

  return <div className="base">
    <NavBar />
    {children}
  </div>
}

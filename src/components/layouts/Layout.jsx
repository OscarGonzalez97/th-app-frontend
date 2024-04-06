import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavBar from "../Navbar";

export const Layout = ({ children }) => {
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

  return (

  <div className="base">
  <NavBar/>
  {children}
  </div>
  )
};


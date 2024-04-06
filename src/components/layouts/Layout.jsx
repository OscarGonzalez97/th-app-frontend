import NavBar from "../Navbar"
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

export const Layout = ({ children }) => {
  const token = useSelector(state => state.storedToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  },
    [token, navigate]);

  // useEffect(() => {

  //   const storedToken = localStorage.getItem('token');
  //   if (storedToken) {
  //     dispatch({ type: 'SET_TOKEN', payload: storedToken });
  //     const token = useSelector(state => state.token);
  //     console.log("mytoken", token);
  //   } else {
  //     const token = useSelector(state => state.token);
  //     console.log("mytoken", token);
  //     navigate("/login");
  //   }
  // }, [dispatch, navigate]);

  return <div className="base">
    <NavBar />
    {children}
  </div>
}

import NavBar from "../Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';

export const Layout = ({ children }) => {
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
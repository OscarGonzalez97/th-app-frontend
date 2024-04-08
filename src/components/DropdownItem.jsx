import { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HoverNavDropdown = ({ title, children, id }) => {
  const [show, setShow] = useState(false);
  const isSmallDevice = window.innerWidth <= 768; // Assuming 768px is the breakpoint for small devices

  const handleMouseEnter = () => {
    if (!isSmallDevice) {
      setShow(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isSmallDevice) {
      setShow(false);
    }
  };

  const handleClick = () => {
    if (isSmallDevice) {
      setShow(!show);
    }
  };

  return (
    <NavDropdown
      title={title}
      id={id}
      show={show}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className='mt-0'
     
    >
   
        {children}
 
    </NavDropdown>
  );
};

export default HoverNavDropdown;

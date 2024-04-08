import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

function Tooltip({nombre_referencia,telefono_referencia}) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <span type="button" ref={target} onMouseEnter={() => setShow(!show)}
      onMouseLeave={() => setShow(!show)}>
      <div className='d-flex gap-1 items-center'>

    <FontAwesomeIcon icon={faPhone} style={{ fontSize: '15px', color: "black" }} />
 Referencias
      </div>
      </span>
      <Overlay target={target.current} show={show} placement="top">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            style={{
              position: 'absolute',
              backgroundColor: 'grey',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
          >
            <p style={{fontSize:"0.6rem", margin:"0"}}>Nombre: {nombre_referencia}</p>
            <p style={{fontSize:"0.6rem", margin:"0"}}>Telefono: {telefono_referencia}</p>
          </div>
        )}
      </Overlay>
    </>
  );
}

export default Tooltip;
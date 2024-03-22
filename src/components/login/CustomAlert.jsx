import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import './customAlert.css';

function CustomAlert({ message }) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div className="custom-alert">
        <Alert variant="warning" onClose={() => setShow(false)} dismissible style={{ backgroundColor: '#d0e5f7', border: 'none' }}>
          <Alert.Heading className="alert-heading-custom">{message}</Alert.Heading>
        </Alert>
      </div>
    );
  }
}

export default CustomAlert;

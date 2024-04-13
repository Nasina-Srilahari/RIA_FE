import React from 'react';
import './AlertMessage.css'; // Define your CSS for styling the alert message

const AlertMessage = ({ message, type }) => {
  return (
    <div className={`alert-message ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default AlertMessage;

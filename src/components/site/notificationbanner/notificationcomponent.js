import React from 'react';
import styles from './notification.module.css';

const NotificationComponent = ({index, text, href }) => {
  return (
      <p key={index}>
          <a href={href} className={styles.notificationLink} role="alert">
          {text}
          </a>
      </p>     
    
  );
};

export default NotificationComponent;
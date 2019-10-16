import React from 'react'
import './notification.css'
const Notification = ({text, isError}) => {
 if (!text) return <></>;
  const classNames = [
    'notification',
    isError ? 'notification-error' : 'notification-info'
  ].join(" ")
  return <div className={classNames}>NOOTTI: {text}</div>
}

export default Notification

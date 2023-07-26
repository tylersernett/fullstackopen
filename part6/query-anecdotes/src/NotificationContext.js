import { createContext, useReducer, useEffect } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ERR':
    case 'SUC':
      return action.payload
    case 'RESET':
      return '';
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  // reset the notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        notificationDispatch({ type: 'RESET' });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
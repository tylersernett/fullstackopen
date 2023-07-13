const baseStyle = {
  backgroundColor: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  borderWidth: '3px',
  padding: '10px',
  marginBottom: '10px',
}

const success = {
  ...baseStyle,
  color: 'green',
}

const error = {
  ...baseStyle,
  color: 'red',
}

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const style = notification.type === 'success' ? success : error

  return (
    <div style={style}>
      {notification.text}
    </div>
  )
}

export default Notification
const success = {
  color: 'green',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
};

const error = {
  color: 'red',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
};

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const style = notification.type === 'success' ? success : error;

  return (
    <div style={style}>
      {notification.text}
    </div>
  )
}

export default Notification
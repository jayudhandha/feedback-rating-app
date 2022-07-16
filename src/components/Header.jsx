function Header({ text, bgColor, textColor }) {
  const headerStyle = {
    backgroundColor: bgColor,
    color: textColor,
  }

  return (
    <header style={headerStyle}>
      <div className='container'>
        <h1>{text}</h1>
      </div>
    </header>
  )
}

// If props text is not passed then we will take default
// We can also use PropTypes by restricting to data type
Header.defaultProps = {
  text: "Feedback UI",
  bgColor: "rgba(0, 0, 0, 0.4)",
  textColor: "#ff6a95",
}

export default Header

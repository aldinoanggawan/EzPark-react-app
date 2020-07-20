import React from 'react'
import BigLogo from '../BigLogo.png'
import '../App.css'

const container = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

const logo = {
  maxWidth: '120%',
}

const circle = {
  height: '100px',
  width: '100px',
  borderRadius: '50%',
  background: 'rgb(93, 49, 148)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

const Loading = () => {
  return (
    <div className='App' style={container}>
      <div style={circle}>
        <img src={BigLogo} className='App-logo' style={logo} alt='logo spinner' />
      </div>
    </div>
  )
}

export default Loading

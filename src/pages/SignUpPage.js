import Axios from 'axios'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import styled, { css } from 'styled-components'

import { IconButton, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import customToast from './toast'

//styled components css
const Container = styled.div`
  max-width: 414px;
  margin: 0 auto;

  ${({ nav }) =>
    nav &&
    css`
      display: flex;
    `}
`

const word = {
  display: 'block',
  textAlign: 'left',
  marginLeft: '14%',
  marginTop: '6%',
  fontSize: '11px',
  color: 'purple',
}

const Form = styled.form`
  text-align: center;
  justify-content: center;
`
//end styled components

//css
const btn1 = {
  marginTop: '20px',
}
//end css

//material-ui css
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 300,
    },
  },
  margin: {
    margin: theme.spacing(0),
  },
}))

//end material-ui

function SignupPage() {
  const classes = useStyles()
  const history = useHistory()

  const [userInfo, setUserInfo] = useState({
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    hp_number: '',
    cpassword: '',
  })
  const { username, first_name, last_name, email, password, hp_number, cpassword } = userInfo

  const handleInput = e => {
    const { name, value } = e.target

    setUserInfo({
      ...userInfo,
      [name]: value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (cpassword !== password) {
      customToast.error('Password and Confirm Password must be same...', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } else {
      Axios.post(`https://ezpark-next.herokuapp.com/api/v1/users/signup`, {
        username,
        first_name,
        last_name,
        password,
        email,
        hp_number,
      })
        .then(result => {
          const { status, message, user } = result.data
          console.log(result)
          console.log(status)
          console.log(message)
          console.log(user)
          history.push('/login')
          customToast.success(message, {
            position: 'top-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        })
        .catch(err => {
          err.response.data.message.forEach(msg =>
            customToast.error(msg, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            })
          )
        })
    }
  }

  return (
    <>
      <ToastContainer closeButton={false} autoClose={5000} style={{ marginTop: '55px' }} />
      <div>
        <div style={{ background: '#5d3194' }}>
          <Container nav>
            <Link to='/'>
              <IconButton
                className={classes.margin}
                size='big'
                style={{ color: 'white', fontSize: 30 }}
              >
                <ArrowBackIcon fontSize='inherit' />
              </IconButton>
            </Link>
            <h3 style={{ display: 'block', color: 'white', margin: 'auto 25%' }}>Register</h3>
          </Container>
        </div>
      </div>
      <Container>
        <Form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete='off'>
          <TextField
            name='first_name'
            required
            id='standard-required'
            label='First Name'
            variant='standard'
            value={first_name}
            onChange={handleInput}
          />
          <TextField
            name='last_name'
            required
            id='standard-required'
            label='Last Name'
            variant='standard'
            value={last_name}
            onChange={handleInput}
          />
          <TextField
            name='hp_number'
            required
            id='standard-required'
            label='Mobile Number (e.g. 60123456789)'
            variant='standard'
            value={hp_number}
            onChange={handleInput}
          />
          <TextField
            name='username'
            required
            id='standard-required'
            label='Username'
            variant='standard'
            value={username}
            onChange={handleInput}
          />
          <TextField
            name='email'
            required
            id='standard-required'
            label='Email'
            variant='standard'
            value={email}
            onChange={handleInput}
          />
          <TextField
            name='password'
            required
            id='standard-password-input'
            label='Password'
            type='password'
            autoComplete='current-password'
            value={password}
            onChange={handleInput}
          />
          <p style={word}>
            *Make sure your password have at least a capital letter, number and special character!
          </p>
          <TextField
            name='cpassword'
            required
            id='standard-password-input'
            label='Confirm Password'
            type='password'
            autoComplete='current-password'
            value={cpassword}
            onChange={handleInput}
          />
          <button className='ui purple basic button' style={btn1}>
            Create an account
          </button>
        </Form>
      </Container>
    </>
  )
}

export default SignupPage

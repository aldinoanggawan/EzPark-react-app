import Axios from 'axios'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import styled, { css } from 'styled-components'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import customToast from './toast'
import BigLogo from '../BigLogo.png'

//style
const Container = styled.div`
  max-width: 414px;
  margin: 0 auto;

  ${({ button }) =>
    button &&
    css`
      width: 200px;
      margin: 0 auto;
      padding-top: 5rem;
    `}

  ${({ nav }) =>
    nav &&
    css`
      display: flex;
    `}

  ${({ page }) =>
    page &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 92vh;
    `}
`

const Form = styled.form`
  text-align: center;
`

const Img = styled.img`
  width: 75%;
  filter: invert(100%);
`

const Section = styled.section`
  background: white;
  min-height: 100vh;
`

const btn2 = {
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '200px',
  backgroundColor: 'white',
  color: 'purple',
  borderRadius: '20px',
  border: ' solid 1px purple',
  margin: '4px',
}
//endstyle

//Don't touch
const LoginPage = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
      textAlign: 'center',
    },
  },
  margin: {
    margin: theme.spacing(0),
  },
}))

export default function BasicTextFields() {
  const classes = LoginPage()

  const history = useHistory()
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')

  const handleUsername = e => {
    setUsernameInput(e.target.value)
  }

  const handlePassword = e2 => {
    setPasswordInput(e2.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    Axios.post(`http://ezpark-next.herokuapp.com/api/v1/users/login`, {
      username: `${usernameInput}`,
      password: `${passwordInput}`,
    })
      .then(result => {
        const { message, token } = result.data
        localStorage.setItem('jwt', token)
        history.push(`/home`)
        customToast.success(message, {
          boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3)',
        })
      })
      .catch(err => {
        console.log(err.response.data.message)
        customToast.error(err.response.data.message, {
          boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3)',
        })
      })
  }

  return (
    <Section>
      <ToastContainer closeButton={false} autoClose={5000} style={{ marginTop: '55px' }} />
      <div style={{ background: '#5d3194' }}>
        <Container nav>
          <Link to='/'>
            <IconButton
              className={classes.margin}
              size='medium'
              style={{ color: 'white', fontSize: 30 }}
            >
              <ArrowBackIcon fontSize='inherit' />
            </IconButton>
          </Link>
          <h3 style={{ display: 'block', color: 'white', margin: 'auto 30%' }}>Login</h3>
        </Container>
      </div>
      <Container page>
        <Img src={BigLogo} alt='logo' />
        <Form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete='off'>
          <TextField
            label='Username'
            name='username'
            onChange={handleUsername}
            value={usernameInput}
          />
          <TextField
            label='Password'
            type='password'
            name='password'
            onChange={handlePassword}
            value={passwordInput}
          />
          <button className='ui button' style={btn2}>
            Login
          </button>
        </Form>
      </Container>
    </Section>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

import BigLogo from '../BigLogo.png'

// styling
const Container = styled.div`
  ${({ button }) =>
    button &&
    css`
      width: 200px;
      padding-top: 5rem;
    `}

  ${({ page }) =>
    page &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      max-width: 414px;
      height: 100vh;
      margin: 0 auto;
    `}
`

const Img = styled.img`
  width: 75%;
`

const Section = styled.section`
  background-image: linear-gradient(purple, blue, black);
  min-height: 100vh;
`

const StyledLink = styled(Link)`
  display: block;
`

const btn1 = {
  width: '100%',
  backgroundColor: 'transparent',
  color: 'white',
  border: '1px solid white',
  borderRadius: '20px',
  marginBottom: '1em',
}

const btn2 = {
  width: '100%',
  backgroundColor: 'white',
  color: 'blue',
  borderRadius: '20px',
}
//endstyling

const FirstPageButton = () => {
  return (
    <Section>
      <Container page>
        <Img src={BigLogo} alt='logo' />
        <Container button>
          <StyledLink to='/login'>
            <button className='ui button' style={btn1}>
              Login
            </button>
          </StyledLink>
          <StyledLink to='/signup'>
            <button className='ui button' style={btn2}>
              Sign Up
            </button>
          </StyledLink>
        </Container>
      </Container>
    </Section>
  )
}

export default FirstPageButton

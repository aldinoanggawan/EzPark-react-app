import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { IconButton, Paper, Tab, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import FirstfloorLayout from '../components/CarPark1'
import SecondfloorLayout from '../components/CarPark2'
import Loading from '../components/Loading'
import '../App.css'

const Container = styled.div`
  ${({ nav }) =>
    nav &&
    css`
      max-width: 414px;
      margin: 0 auto;
      display: flex;
    `}
`

const useStyles2 = makeStyles({
  root: {
    flexGrow: 1,
  },
})

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

const ParkingLayout = () => {
  const params = useParams()
  const classes = useStyles()
  const classes2 = useStyles2()
  const [isLoading, setIsLoading] = useState(true)
  const [mall, setMall] = useState({})
  const [value, setValue] = React.useState(0)
  let timer
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    timer = setInterval(() => get_item(), 2500)
  }, [])

  // let API_KEY = process.env.REACT_APP_API
  const jwt = localStorage.getItem('jwt')
  const get_item = () => {
    Axios({
      method: 'post',
      url: `https://ezpark-next.herokuapp.com/api/v1/features/layout/id`,
      data: {
        mall_id: `${params.id}`,
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then(result => {
        setMall(result.data)
        // console.log(result.data)
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
        console.log(err.response)
      })
  }

  if (isLoading) {
    return <Loading />
  }
  return (
    <div>
      <div style={{ background: '#5d3194' }}>
        <Container nav>
          <Link to='/home'>
            <IconButton
              className={classes.margin}
              size='big'
              style={{ color: 'white', fontSize: 30 }}
            >
              <ArrowBackIcon fontSize='inherit' />
            </IconButton>
          </Link>
          <h3 style={{ display: 'block', color: 'white', margin: 'auto 27%' }}>{mall.mall}</h3>
        </Container>
      </div>
      <div>
        <Paper className={classes2.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            {mall.floor.map((floor, index) => (
              <Tab label={floor + mall.amount[index]} />
            ))}
          </Tabs>
        </Paper>
        {mall.mall == 'EzMall' ? (
          <div>
            <div>
              {value == 0 ? (
                <FirstfloorLayout parking_details={mall} />
              ) : (
                <SecondfloorLayout parking_details={mall} />
              )}
            </div>
            <div
              style={{
                bottom: 40,
                position: 'absolute',
                fontFamily: "'Nunito', sans-serif",
                width: '100%',
                textAlign: 'center',
              }}
            >
              <b style={{ color: 'green' }}>⚠ Click the green parking bay to show you the route!</b>
              <br />
              <b style={{ color: 'red' }}>⚠ Click the red parking bay to save your parking info!</b>
            </div>
          </div>
        ) : (
          <div>
            <h1>Coming Soon...</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default ParkingLayout

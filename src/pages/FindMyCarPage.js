import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import {
  AccessTime as AccessTimeIcon,
  FilterNone as FilterNoneIcon,
  LocalParking as LocalParkingIcon,
  Store as StoreIcon,
  Today as TodayIcon,
} from '@material-ui/icons'
import Loading from '../components/Loading'

const Page = styled.div`
  height: 100%;
  max-width: 400px;
  margin: 0 auto;
`

const useStyles = makeStyles({
  root: {
    minWidth: 350,
    color: 'theme.palette.text.primary',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

const FindMyCarPage = () => {
  // let API_KEY = process.env.REACT_APP_API

  const classes = useStyles()
  const [findCar, setFindCar] = useState([])

  const jwt = localStorage.getItem('jwt')
  useEffect(() => {
    Axios({
      method: 'get',
      url: `http://ezpark-next.herokuapp.com/api/v1/features/find_my_car`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then(result => {
        setFindCar(result.data)
        console.log(result.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err.response)
      })
  }, [])

  const [isLoading, setIsLoading] = useState(true)
  if (isLoading) {
    return <Loading />
  }

  return (
    <Page>
      <ToastContainer closeButton={false} autoClose={5000} style={{ marginTop: '55px' }} />
      <Card className={classes.root} style={{ margin: '5px' }} variant='outlined'>
        <CardContent>
          <Typography variant='h5' component='h2' style={{ textAlign: 'center' }}>
            Info
          </Typography>
          <table style={{ margin: '0 auto' }}>
            <tr>
              <th></th>
              <th></th>
            </tr>

            <Typography className={classes.pos} color='textSecondary' />
            <Typography variant='body2' component='p'>
              <tr>
                <Grid container className={classes.root}>
                  <Grid item xs={1}>
                    <StoreIcon />
                  </Grid>
                  <td style={{ width: '39%' }}>
                    <Typography>
                      <b>Mall :</b>
                    </Typography>
                  </td>
                  <td style={{ width: '52%', textAlign: 'right' }}>
                    <Typography>{findCar.mall}</Typography>
                  </td>
                </Grid>
              </tr>
              <br />
              <tr>
                <Grid container className={classes.root}>
                  <Grid item xs={1}>
                    <FilterNoneIcon fontSize='small' />
                  </Grid>
                  <td style={{ width: '39%' }}>
                    <Typography>
                      <b>Floor :</b>
                    </Typography>
                  </td>

                  <td style={{ width: '52%', textAlign: 'right' }}>
                    <Typography>{findCar.floor}</Typography>
                  </td>
                </Grid>
              </tr>
              <br />
              <tr>
                <Grid container className={classes.root}>
                  <Grid item xs={1}>
                    <LocalParkingIcon />
                  </Grid>
                  <td style={{ width: '39%' }}>
                    <Typography>
                      <b>Parking Bay : </b>
                    </Typography>
                  </td>
                  <td style={{ width: '52%', textAlign: 'right' }}>
                    <Typography>{findCar.parking}</Typography>
                  </td>
                </Grid>
              </tr>
              <br />
              <tr>
                <Grid container className={classes.root}>
                  <Grid item xs={1}>
                    <TodayIcon />
                  </Grid>
                  <td style={{ width: '39%' }}>
                    <Typography>
                      <b>Date :</b>
                    </Typography>
                  </td>

                  <td style={{ width: '52%', textAlign: 'right' }}>
                    <Typography>{findCar.date}</Typography>
                  </td>
                </Grid>
              </tr>
              <br />
              <tr>
                <Grid container className={classes.root}>
                  <Grid item xs={1}>
                    <AccessTimeIcon />
                  </Grid>
                  <td style={{ width: '39%' }}>
                    <Typography>
                      <b>Time :</b>
                    </Typography>
                  </td>
                  <td style={{ width: '52%', textAlign: 'right' }}>
                    <Typography>{findCar.time}</Typography>
                  </td>
                </Grid>
              </tr>
            </Typography>
          </table>
        </CardContent>
      </Card>
    </Page>
  )
}

export default FindMyCarPage

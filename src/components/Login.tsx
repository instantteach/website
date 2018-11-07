import * as React from 'react'
import {Redirect,} from 'react-router'

import AuthenticationService from '../services/AuthenticationService'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import TextField from '@material-ui/core/TextField'
import CloseIcon from '@material-ui/icons/Close'

interface IState {
  auth: boolean
  email: string
  error: boolean
  password: string
}

const gridStyles = {
  minHeight: '90%'
}

const inputStyles = {
  marginBottom: '1rem',
  width: '100%'
}

class Login extends React.PureComponent<{}, IState> {
  public state = {
    auth: false,
    email: "",
    error: false,
    password: ""
  }

  public componentWillMount() {
    // Verify if exists an user session
    AuthenticationService.listener()
  }

  public handleChange = name => event => {
    this.setState({
      ...this.state,
      error: false,
      [name]: event.target.value
    })
  }

  public async login() {
    const {email, password} = this.state
    const auth = await AuthenticationService.login(email, password)

    this.setState({
      auth,
      error: !auth
    })
  }

  public submit = e => {
    e.preventDefault()
    this.login()
  }

  public handleClose = () => {
    this.setState({
      error: false
    })
  }

  public render() {
    const {auth, email, error, password} = this.state
    const {session} = AuthenticationService
    return (
      (session || auth)
      ? <Redirect to="/upload" />
      : (
        <>
        <Grid container={true} spacing={16} style={gridStyles} direction="row" justify="center" alignItems="center">
          <Grid item={true} xs={4}>
            <form onSubmit={this.submit}>
              <Grid item={true} xs={12}>
                <TextField
                  label="E-mail"
                  defaultValue={email}
                  name="email"
                  type="email"
                  onChange={this.handleChange('email')}
                  variant="outlined"
                  style={inputStyles} />
              </Grid>
              <Grid item={true} xs={12}>
                <TextField
                  label="Password"
                  defaultValue={password}
                  name="password"
                  type="password"
                  onChange={this.handleChange('password')}
                  variant="outlined"
                  style={inputStyles} />
                </Grid>
                <Grid item={true} container={true} xs={12} justify="flex-end">
                  <Button size="medium" variant="contained" color="primary" type="submit">Log In</Button>
                </Grid>
            </form>
          </Grid>
          <Snackbar
            open={error}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Authentication failed!</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleClose}
              ><CloseIcon /></IconButton>
            ]}/>
          </Grid>
        </>
      )
    )
  }
}

export default Login
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap'

export default class extends React.Component {

  componentDidMount () {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3001/auth/validate_token',
      dataType: 'JSON',
      headers: JSON.parse(sessionStorage.getItem('user'))
    })
    .fail((data) => {
      this.props.history.push('/login')
    })
  }

  handleSignout = (e) => {
    e.preventDefault()
    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:3001/auth/sign_out',
      data: JSON.parse(sessionStorage.getItem('user'))
    })
    .done( () => {
      sessionStorage.removeItem('user')
      this.props.history.push('/login')
    })
  }

  render () {
    if(sessionStorage.getItem('user')) {
      return (
        <div>
          <p>
            {JSON.parse(sessionStorage.getItem('user')).uid}
            <a href="#" onClick={this.handleSignout}>Sign out</a>
          </p>
          <Link to='/'>
            <h1>CalReact</h1>
          </Link>
        </div>
      )
    } else {
      return (
        <Redirect to='/login' />
      )
    }
  }
}

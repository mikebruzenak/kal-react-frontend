import React, { PropTypes } from 'react'
import AppointmentForm from './AppointmentForm'
import { AppointmentsList } from './AppointmentsList'
import update from 'immutability-helper'
import $ from 'jquery'
import './appointments.css'

export default class Appointments extends React.Component{
    static propTypes = {
        appointments: PropTypes.array.isRequired
    }

    static defaultProps = {
        appointments: []
    }

    constructor(props, _railsContext) {
        super(props)
        this.state = {
            appointments: this.props.appointments,
        }
        console.log(props)
    }

    componentDidMount() {
      console.log(sessionStorage.user)
        if (this.props.match && sessionStorage.user) {
            $.ajax({
                type: 'GET',
                url: `http://localhost:3001/appointments`,
                dataType: 'JSON',
                headers: JSON.parse(sessionStorage.user)
            }).done((data) => {
                this.setState({appointments: data})
            })
        }
    }

    addNewAppointment = (appointment) => {
        const appointments = update(this.state.appointments, { $push: [appointment]});
        this.setState({
            appointments: appointments.sort(function(a,b){
                return new Date(a.appt_time) - new Date(b.appt_time);
            })
        })
    }

    render() {
        return (
            <div>
                <AppointmentForm  handleNewAppointment={this.addNewAppointment} />
                <AppointmentsList appointments={this.state.appointments} />
            </div>
        )
    }
}

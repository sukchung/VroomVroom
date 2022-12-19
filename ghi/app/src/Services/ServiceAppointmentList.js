import React from "react";

class AppointmentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { appointments: [] }
        this.deleteAppointment = this.deleteAppointment.bind(this);
        this.updateAppointment = this.updateAppointment.bind(this);
    }

    async deleteAppointment(appointment) {
        const deleteUrl = `http://localhost:8080/api/appointments/${appointment.id}`;
        let fetchConfig = {
            method: "delete",
        }
        await fetch(deleteUrl, fetchConfig);

        const idx = this.state.appointments.indexOf(appointment);
        const updated_appointments = [...this.state.appointments];
        updated_appointments.splice(idx, 1);
        this.setState({ appointments: updated_appointments });
    }

    async updateAppointment(appointment) {
        const updateUrl = `http://localhost:8080/api/appointments/${appointment.id}/`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify({ "completed": "True" }),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        await fetch(updateUrl, fetchConfig);

        const idx = this.state.appointments.indexOf(appointment);
        const updated_appointments = [...this.state.appointments];
        updated_appointments.splice(idx, 1);
        this.setState({ appointments: updated_appointments });
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok) {
            const data = await response.json();
            this.setState({
                appointments: data.appointments.filter(function (appointment) {
                    return appointment.completed === false;
                })
            });
        }
    }

    render() {
        return (
            <>
                <br />
                <h1 className="white-text">Service Appointments</h1>
                <table className="table table-hover white-text">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Customer name</th>
                            <th>Date & Time</th>
                            <th>VIP</th>
                            <th>Technician</th>
                            <th>Reason</th>
                            <th>Cancel</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.appointments.map(appointment => {
                            // let date = appointment.date_time.slice(0, 10)
                            // let time = appointment.date_time.slice(11,16)
                            return (
                                <tr key={appointment.id}>
                                    <td>{appointment.vin}</td>
                                    <td>{appointment.customer_name}</td>
                                    <td>{appointment.date_time}</td>
                                    <td>{appointment.vip_status ? "Yes" : "No"}</td>
                                    <td>{appointment.technician.name}</td>
                                    <td>{appointment.reason}</td>
                                    <td><button className="btn btn-primary btn-light" onClick={() => this.deleteAppointment(appointment)}>Cancel</button></td>
                                    <td><button className="btn btn-primary btn-light" onClick={() => this.updateAppointment(appointment)}>Completed</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </>
        );
    }
}

export default AppointmentList;

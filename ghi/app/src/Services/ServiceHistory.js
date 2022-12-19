import React from "react";

class ServiceHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            vin: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVinChange = this.handleVinChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const vinUrl = `http://localhost:8080/api/history/${this.state.vin}`;
        const fetchConfig = {
            method: "GET",
        }
        const response = await fetch(vinUrl, fetchConfig);
        if (response.ok) {
            const data = await response.json();
            this.setState({
                appointments: data.appointments
            });

            const cleared = {
                vin: '',
            }
            this.setState(cleared);
        }
    }

    handleVinChange(event) {
        const value = event.target.value;
        this.setState({ vin: value });
    }


    render() {
        return (
            <>
                <br />
                <h1 className="white-text">Service History</h1>
                <form className="input-group" onSubmit={this.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleVinChange} value={this.state.vin} placeholder="vin" type="text" id="vin" name="vin" className="form-control" />
                        <label htmlFor="vinsearch">Enter Vin Here</label>
                        <button type="submit" className="btn btn-primary btn-dark" onClick={(event) => this.handleSubmit(event)}>Search</button>
                    </div>
                </form>
                <table className="table table-hover white-text">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Customer name</th>
                            <th>Date & Time</th>
                            <th>VIP</th>
                            <th>Technician</th>
                            <th>Reason</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.appointments.map(appointment => {
                            return (
                                <tr key={appointment.id}>
                                    <td>{appointment.vin}</td>
                                    <td>{appointment.customer_name}</td>
                                    <td>{appointment.date_time}</td>
                                    <td>{appointment.vip_status ? "Yes" : "No"}</td>
                                    <td>{appointment.technician.name}</td>
                                    <td>{appointment.reason}</td>
                                    <td>{appointment.completed ? "Yes" : "No"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </>
        );
    }
}

export default ServiceHistory;

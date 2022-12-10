import React from "react";

class AppointmentForm extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            vin: '',
            customer_name: '',
            date_time: '',
            reason: '',
            vip_status: '',
            technician: '',
            technicians: [],
        }
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleCustomerNameChange = this.handleCustomerNameChange.bind(this);
        this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.handleVipChange = this.handleVipChange.bind(this);
        this.handleTechnicianChange = this.handleTechnicianChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    async componentDidMount() {
        const url = 'http://localhost:8080/api/technicians/'
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ technicians: data.technicians });
        }
    }

    handleVinChange(event) {
        const value = event.target.value;
        this.setState({ vin: value });
    }

    handleCustomerNameChange(event) {
        const value = event.target.value;
        this.setState({ customer_name: value });
    }

    handleDateTimeChange(event) {
        const value = event.target.value;
        this.setState({ date_time: value });
    }

    handleReasonChange(event) {
        const value = event.target.value;
        this.setState({ reason: value });
    }

    handleVipChange(event) {
        const value = event.target.value;
        this.setState({ vip_status: value });
    }

    handleTechnicianChange(event) {
        const value = event.target.value;
        this.setState({ technician: value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state }
        delete data.technicians

        const servicesUrl = "http://localhost:8080/api/appointments/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        }
        const response = await fetch(servicesUrl, fetchConfig);
        if (response.ok) {
            const newAppointment = await response.json();
            console.log(newAppointment);

            const cleared = {
                vin: '',
                customer_name: '',
                date_time: '',
                reason: '',
                vip_status: '',
                technician: '',

            }
            this.setState(cleared);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a Service Appointment</h1>
                        <form onSubmit={this.handleSubmit} id="create-model-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleVinChange} placeholder="VIN" required
                                    type="text" name="vin" id="vin" value={this.state.vin}
                                    className="form-control" />
                                <label htmlFor="name">VIN</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleDateTimeChange} placeholder="Date & Time" required
                                    type="datetime-local" name="date_time" id="date_time" value={this.state.date_time}
                                    className="form-control" />
                                <label htmlFor="date_time">Date & Time</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleCustomerNameChange} placeholder="Customer Name" required
                                    type="text" name="customer_name" id="customer_name" value={this.state.customer_name}
                                    className="form-control" />
                                <label htmlFor="customer_name">Customer Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleReasonChange} placeholder="Reason" required
                                    type="text" name="reason" id="reason" value={this.state.reason}
                                    className="form-control" />
                                <label htmlFor="reason">Reason</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleTechnicianChange} required name="technician"
                                    id="technician" value={this.state.technician}
                                    className="form-select">
                                    <option value="">Choose a technician</option>
                                    {this.state.technicians.map(technician => {
                                        console.log(technician);
                                        return (
                                            <option key={technician.id} value={technician.id}>
                                                {technician.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

export default AppointmentForm;

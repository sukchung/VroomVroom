import React from "react";

class TechnicianForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            employee_number: '',
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value });
    }

    handleEmployeeNumberChange(event) {
        const value = event.target.value;
        this.setState({ employee_number: value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state }

        const technicianUrl = "http://localhost:8080/api/technicians/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }
        const response = await fetch(technicianUrl, fetchConfig);
        if (response.ok) {
            const newTechnician = await response.json();

            const cleared = {
                name: '',
                employee_number: '',
            }
            this.setState(cleared);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow-lg p-3 mb-5 bg-body rounded">
                        <h1>Enter a technician</h1>
                        <form onSubmit={this.handleSubmit} id="create-technician-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} placeholder="Name" required
                                    type="text" name="name" id="name" value={this.state.name}
                                    className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleEmployeeNumberChange} placeholder="Employee Number" required
                                    type="number" name="employee_number" id="employee_number" value={this.state.employee_number}
                                    className="form-control" />
                                <label htmlFor="name">Employee number</label>
                            </div>
                            <button className="btn btn-dark">Create Technician</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default TechnicianForm;

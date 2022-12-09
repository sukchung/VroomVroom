import React from "react";

class PotentialCustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            address: "",
            phone_number: ""
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value });
    }

    handleAddressChange(event) {
        const value = event.target.value;
        this.setState({ address: value });
    }

    handlePhoneChange(event) {
        const value = event.target.value;
        this.setState({ phone_number: value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state }

        const customerUrl = "http://localhost:8090/api/customers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }
        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();

            const cleared = {
                name: "",
                address: "",
                phone_number: "",
            }
            this.setState(cleared);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a customer</h1>
                        <form onSubmit={this.handleSubmit} id="create-customer-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} placeholder="Name" required
                                    type="text" name="name" id="name" value={this.state.name}
                                    className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleAddressChange} placeholder="Address" required
                                    type="text" name="address" id="address" value={this.state.address}
                                    className="form-control" />
                                <label htmlFor="address">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handlePhoneChange} placeholder="Phone Number" required
                                    type="number" name="phone_number" id="phone_number" value={this.state.phone_number}
                                    className="form-control" />
                                <label htmlFor="phone_number">Phone Number</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default PotentialCustomerForm;

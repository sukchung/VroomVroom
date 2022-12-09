import React from "react";

class SalesRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            automobile: "",
            salesperson: "",
            customer: "",
            sale_price: "",
            autos: [],
            salespersons: [],
            customers: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const automobileUrl = "http://localhost:8100/api/automobiles/";
        const salesPersonUrl = "http://localhost:8090/api/salespersons/";
        const customerUrl = "http://localhost:8090/api/customers/";
        const soldAutoUrl = "http://localhost:8090/api/saleshistory";
        
        const automobileResponse = await fetch(automobileUrl);
        const salesPersonResponse = await fetch(salesPersonUrl);
        const customerResponse = await fetch(customerUrl);
        const soldAutoResponse = await fetch(soldAutoUrl);

        if (automobileResponse.ok && salesPersonResponse.ok && customerResponse.ok && soldAutoResponse.ok) {
            const automobileData = await automobileResponse.json();
            const salesPersonData = await salesPersonResponse.json();
            const customerData = await customerResponse.json();
            const soldAutoData = await soldAutoResponse.json();

            const soldAutos = soldAutoData.sales_history;
            const soldAutoVins = soldAutos.reduce((total, soldAuto) => {
                total[soldAuto.automobile.vin] = true;
                return total;
            }, {});

            const availableAutos = automobileData.autos;
            const filterAutos = availableAutos.filter(available => !soldAutoVins[available.vin]);

            this.setState({
                autos: filterAutos,
                salespersons: salesPersonData.salespersons,
                customers: customerData.customers,
            });
        }
    }

    handleChange(event) {
        const newValue = {}
        newValue[event.target.id] = event.target.value;
        this.setState(newValue);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state }
        delete data.autos;
        delete data.salespersons;
        delete data.customers;

        const salesRecordsUrl = "http://localhost:8090/api/saleshistory/";
        const salesFetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }
        const salesRecordsResponse = await fetch(salesRecordsUrl, salesFetchConfig);

        if (salesRecordsResponse.ok) {
            const cleared = {
                automobile: "",
                salesperson: "",
                customer: "",
                sale_price: "",
                autos: [],
                salespersons: [],
                customers: [],
            }
            this.setState(cleared);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Record a new sale</h1>
                        <form onSubmit={this.handleSubmit} id="create-sales-history-form">
                            <div className="mb-3">
                                <select onChange={this.handleChange} required name="automobile"
                                    id="automobile" value={this.state.automobile}
                                    className="form-select">
                                    <option value="">Choose an automobile</option>
                                    {this.state.autos.map(automobile => {
                                        return (
                                            <option key={automobile.vin} value={automobile.vin}>
                                                {automobile.color.charAt(0).toUpperCase() + automobile.color.slice(1)} {automobile.model.name.charAt(0).toUpperCase() + automobile.model.name.slice(1)} {automobile.vin}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleChange} required name="salesperson"
                                    id="salesperson" value={this.state.salesperson}
                                    className="form-select">
                                    <option value="">Choose a salesperson</option>
                                    {this.state.salespersons.map(salesperson => {
                                        return (
                                            <option key={salesperson.id} value={salesperson.id}>
                                                {salesperson.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleChange} required name="customer"
                                    id="customer" value={this.state.customer}
                                    className="form-select">
                                    <option value="">Choose a customer</option>
                                    {this.state.customers.map(customer => {
                                        return (
                                            <option key={customer.id} value={customer.id}>
                                                {customer.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleChange} placeholder="Sale Price" required
                                    type="number" name="sale_price" id="sale_price" value={this.state.sale_price}
                                    className="form-control" />
                                <label htmlFor="sale_price">Sale Price</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SalesRecordForm;

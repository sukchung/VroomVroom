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
        this.handleAutomobilesChange = this.handleAutomobilesChange.bind(this);
        this.handleSalesPersonsChange = this.handleSalesPersonsChange.bind(this);
        this.handleCustomersChange = this.handleCustomersChange.bind(this);
        this.handleSalePriceChange = this.handleSalePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const automobileUrl = "http://localhost:8100/api/automobiles/";
        const autoResponse = await fetch(automobileUrl);

        if (autoResponse.ok) {
            const data = await autoResponse.json();
            const filterAutos = data.autos.filter(automobile => automobile.sold === false);
            this.setState({ autos: filterAutos })
        }

        const salesPersonUrl = "http://localhost:8090/api/salespersons/";
        const salesResponse = await fetch(salesPersonUrl);

        if (salesResponse.ok) {
            const data = await salesResponse.json();
            this.setState({ salespersons: data.salespersons });
        }

        const customerUrl = "http://localhost:8090/api/customers/";
        const customerResponse = await fetch(customerUrl);

        if (customerResponse.ok) {
            const data = await customerResponse.json();
            this.setState({ customers: data.customers });
        }
    }

    handleAutomobilesChange(event) {
        const value = event.target.value;
        this.setState({ automobile: value });
    }

    handleSalesPersonsChange(event) {
        const value = event.target.value;
        this.setState({ salesperson: value });
    }

    handleCustomersChange(event) {
        const value = event.target.value;
        this.setState({ customer: value });
    }

    handleSalePriceChange(event) {
        const value = event.target.value;
        this.setState({ sale_price: value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state }
        delete data.autos;
        delete data.salespersons;
        delete data.customers;

        console.log("deleted data arrays")
        console.log("new data:", data)

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

            console.log("post to sales history is ok")

            // const updateAutoUrl = `http://localhost:8100/api/automobiles/${data.automobile}/`
            // const autoFetchConfig = {
            //     method: "put",
            //     body: JSON.stringify({ "sold": true }),
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            // }
            // const updateAutoResponse = await fetch(updateAutoUrl, autoFetchConfig);

            // if (updateAutoResponse.ok) {
            console.log("Congrats on the sale!");

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

            const data = await updateAutoResponse.json();
            this.setState({ autos: data.autos })

            // } else {
            //     console.error("Something went wrong");
            // }
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
                                <select onChange={this.handleAutomobilesChange} required name="automobile"
                                    id="automobile" value={this.state.automobile}
                                    className="form-select">
                                    <option value="">Choose an automobile</option>
                                    {this.state.autos.map(automobile => {
                                        return (
                                            <option key={automobile.vin} value={automobile.vin}>
                                                {automobile.color.charAt(0).toUpperCase() + automobile.color.slice(1)} {automobile.model.name.charAt(0).toUpperCase() + automobile.model.name.slice(1)} {automobile.year}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleSalesPersonsChange} required name="salesperson"
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
                                <select onChange={this.handleCustomersChange} required name="customer"
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
                                <input onChange={this.handleSalePriceChange} placeholder="Sale Price" required
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

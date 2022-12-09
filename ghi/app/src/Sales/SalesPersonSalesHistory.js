import React from "react";

class SalesPersonSalesHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            salespersons: [],
            sales_history: [],
        }
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
    }

    async componentDidMount() {
        const salesPersonsUrl = "http://localhost:8090/api/salespersons/";
        const salesPersonsResponse = await fetch(salesPersonsUrl);

        if (salesPersonsResponse.ok) {
            const data = await salesPersonsResponse.json();
            this.setState({ salespersons: data.salespersons });
        }

        const salesHistoryUrl = "http://localhost:8090/api/saleshistory/";
        const salesHistoryResponse = await fetch(salesHistoryUrl);

        if (salesHistoryResponse.ok) {
            const data = await salesHistoryResponse.json();
            this.setState({ sales_history: data.sales_history });
        }
    }

    handleSalesPersonChange(event) {
        const value = event.target.value;
        this.setState({ salesperson: value });
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Salesperson History</h1>
                        <div className="mb-3">
                            <select onChange={this.handleSalesPersonChange} required name="salesperson"
                                id="salesperson" value={this.state.salesperson}
                                className="form-select">
                                <option value="">Choose a salesperson</option>
                                {this.state.salespersons.map(salesperson => {
                                    return (
                                        <option key={salesperson.id} value={salesperson.id}>
                                            {salesperson.name.charAt(0).toUpperCase() + salesperson.name.slice(1)}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Salesperson</th>
                                        <th>Employee ID</th>
                                        <th>Customer</th>
                                        <th>VIN</th>
                                        <th>Sale Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.sales_history.map(sale => {
                                        return (
                                            <tr key={ sale.id }>
                                                <td>{ sale.salesperson.name }</td>
                                                <td>{ sale.salesperson.employee_number }</td>
                                                <td>{ sale.customer.name }</td>
                                                <td>{ sale.automobile.vin }</td>
                                                <td>${ sale.sale_price.toLocaleString() }</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default SalesPersonSalesHistory;

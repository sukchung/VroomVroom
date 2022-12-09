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
        const salesHistoryUrl = "http://localhost:8090/api/saleshistory/";

        const salesPersonsResponse = await fetch(salesPersonsUrl);
        const salesHistoryResponse = await fetch(salesHistoryUrl);

        if (salesPersonsResponse.ok && salesHistoryResponse.ok) {
            const salesPersonsData = await salesPersonsResponse.json();
            const salesHistoryData = await salesHistoryResponse.json();

            this.setState({
                salespersons: salesPersonsData.salespersons,
                sales_history: salesHistoryData.sales_history,
            });
        }
    }

    handleSalesPersonChange(event) {
        const value = event.target.value;
        this.setState({ salesperson: value });
    }

    async getSalesPersons() {
        const salesPersonsUrl = "http://localhost:8090/api/salespersons/";
        const salesPersonsResponse = await fetch(salesPersonsUrl);

        if (salesPersonsResponse.ok) {
            const salesPersonsData = await salesPersonsResponse.json();
            this.setState({ salespersons: salesPersonsData.salesperson });
        }
    }

    async getSalesHistory() {
        const salesHistoryUrl = "http://localhost:8090/api/saleshistory/";
        const salesHistoryResponse = await fetch(salesHistoryUrl);

        if (salesHistoryResponse.ok) {
            const salesHistoryData = await salesHistoryResponse.json();
            this.setState({ sales_history: salesHistoryData.sales_history });
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Salesperson History</h1>
                        <div className="mb-3">
                            <select onChange={this.handleSalesPersonChange} required name="salesperson"
                                id="salesperson" value={this.state.salesPerson}
                                className="form-select">
                                <option value="">Choose a salesperson</option>
                                {this.state.salespersons.map(salesperson => {
                                    return (
                                        <option key={salesperson.id} value={salesperson.id}>
                                            {salesperson.name.charAt(0).toUpperCase() + salesperson.name.slice(1)} ({salesperson.employee_number})
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
                                    {this.state.sales_history.filter(saleRecord => saleRecord.salesperson.id.toString() === this.state.salesperson).map(saleRecord => {
                                        return (
                                            <tr key={saleRecord.id}>
                                                <td>{saleRecord.salesperson.name}</td>
                                                <td>{saleRecord.salesperson.employee_number}</td>
                                                <td>{saleRecord.customer.name}</td>
                                                <td>{saleRecord.automobile.vin}</td>
                                                <td>${saleRecord.sale_price.toLocaleString()}</td>
                                            </tr>
                                        );
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

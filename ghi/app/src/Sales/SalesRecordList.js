import React, { useState, useEffect } from "react";

export default function SalesRecordList(props) {
    const [salesHistory, setSalesRecord] = useState([]);
    const getSales = async () => {
        const salesUrl = "http://localhost:8090/api/saleshistory/";
        const response = await fetch(salesUrl);

        if (response.ok) {
            const listSales = await response.json();
            setSalesRecord(listSales.sales_history);
        }
    }
    useEffect(() => { getSales() }, []);

    return (
        <>
            <br />
            <div className="white-text">
                <h1>Sales Records</h1>
            </div>
            <table className="table table-hover white-text">
                <thead>
                    <tr>
                        <th>Salesperson</th>
                        <th>Salesperson ID</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Sale Price</th>
                    </tr>
                </thead>
                <tbody>
                    {salesHistory.map(sales => {
                        return (
                            <tr key={sales.id}>
                                <td>{sales.salesperson.name}</td>
                                <td>{sales.salesperson.employee_number}</td>
                                <td>{sales.customer.name}</td>
                                <td>{sales.automobile.vin}</td>
                                <td>${sales.sale_price.toLocaleString()}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

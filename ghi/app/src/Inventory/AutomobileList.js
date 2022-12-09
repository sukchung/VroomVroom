import React, { useState, useEffect } from "react";

export default function AutomobileList(props) {
    const [autos, setAutos] = useState([]);
    const getAutos = async () => {
        const autosUrl = "http://localhost:8100/api/automobiles/";
        const response = await fetch(autosUrl);

        if (response.ok) {
            const listAutos = await response.json();
            setAutos(listAutos.autos);
        }
    }
    useEffect(() => { getAutos() }, []);

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        {/* <th>Delete Automobile</th> */}
                    </tr>
                </thead>
                <tbody>
                    {autos.map(automobile => {
                        return (
                            <tr key={automobile.vin}>
                                <td>{automobile.vin}</td>
                                <td>{automobile.color}</td>
                                <td>{automobile.year}</td>
                                <td>{automobile.model.name}</td>
                                <td>{automobile.model.manufacturer.name}</td>
                                {/* <td><button className="btn btn-primary" onClick={deleteAutomobile(automobile.vin)}>Delete</button></td> */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

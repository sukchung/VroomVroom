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
            <br />
            <div className="white-text">
                <h1>Automobiles</h1>
            </div>
            <table className="table table-hover white-text">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
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
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

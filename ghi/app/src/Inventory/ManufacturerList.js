import React, { useState, useEffect } from "react";

export default function ManufacturerList(props) {
    const [manufacturers, setManufacturers] = useState([]);
    const getManufacturers = async () => {
        const manufacturersUrl = "http://localhost:8100/api/manufacturers/";
        const response = await fetch(manufacturersUrl);

        if (response.ok) {
            const listManufacturers = await response.json();
            setManufacturers(listManufacturers.manufacturers);
        }
    }
    useEffect(() => { getManufacturers() }, []);

    return (
        <>
            <br />
            <div>
                <h1>Manufacturers</h1>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map((manufacturer) => {
                        return (
                            <tr key={manufacturer.id}>
                                <td>{manufacturer.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

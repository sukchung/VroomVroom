import React, { useState, useEffect } from "react";

export default function ManufacturerList(props) {
    const [manufacturers, setManufacturers] = useState([]);
    const getManufacturers = async () => {
        const manufacturersUrl = "http://localhost:8100/api/manufacturers/";
        const response = await fetch(manufacturersUrl);

        if (response.ok) {
            const listManufacturers = await response.json();
            console.log(listManufacturers)
            setManufacturers(listManufacturers.manufacturers);
        }
    }
    useEffect(() => { getManufacturers() }, []);

    // const deleteManufacturer = (id) => async () => {
    //     try {
    //         const url = `http://localhost:8100/api/manufacturers/${id}/`;
    //         const deleteResponse = await fetch(url, { method: "delete" });

    //         if (deleteResponse.ok) {
    //             const reloadResponse = await fetch("http://localhost:8100/api/manufacturers/");
    //             const newManufacturers = await reloadResponse.json();
    //             setManufacturers(newManufacturers.manufacturers);
    //         }
    //     }
    //     catch (e) { }
    // }

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        {/* <th>Delete Manufacturer</th> */}
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map((manufacturer) => {
                        return (
                            <tr key={manufacturer.id}>
                                <td>{manufacturer.name}</td>
                                {/* <td><button className="btn btn-primary" onClick={deleteManufacturer(manufacturer.id)}>Delete</button></td> */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

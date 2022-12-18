import React, { useState, useEffect } from "react";

export default function ModelsList(props) {
    const [models, setModels] = useState([]);
    const getModels = async () => {
        const modelsUrl = "http://localhost:8100/api/models/";
        const response = await fetch(modelsUrl);

        if (response.ok) {
            const listModels = await response.json();
            console.log("VEHICLEMODELS", listModels)
            setModels(listModels.models);
        }
    }
    useEffect(() => { getModels() }, []);

    const deleteModel = (id) => async () => {
        try {
            const url = `http://localhost:8100/api/models/${id}/`;
            const deleteResponse = await fetch(url, { method: "delete" });

            if (deleteResponse.ok) {
                const reloadResponse = await fetch("http://localhost:8100/api/models/");
                const newModels = await reloadResponse.json();
                setModels(newModels.models)
            }
        }
        catch (e) { }
    }
    console.log("MODELS", models)
    return (
        <>
            <br />
            <div>
                <h1>Vehicle Models</h1>
            </div>
            <table className="table table-striped" >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map((model) => {
                        return (
                            <tr key={model.id}>
                                <td>{model.name}</td>
                                <td>{model.manufacturer.name}</td>
                                <td><img src={model.picture_url} width="300px" /></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

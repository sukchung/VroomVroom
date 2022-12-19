import React from "react";

class VehicleModelForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            manufacturers: [],
            manufacturer_id: '',
            picture_url: '',
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
        this.handlePictureChange = this.handlePictureChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ manufacturers: data.manufacturers });
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value });
    }

    handleManufacturerChange(event) {
        const value = event.target.value;
        this.setState({ manufacturer_id: value });
    }

    handlePictureChange(event) {
        const value = event.target.value;
        this.setState({ picture_url: value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state }
        delete data.manufacturers;

        const modelsUrl = "http://localhost:8100/api/models/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }
        const response = await fetch(modelsUrl, fetchConfig);
        if (response.ok) {
            const newModel = await response.json();

            const cleared = {
                name: '',
                manufacturer_id: '',
                manufacturers: [],
                picture_url: '',
            }
            this.setState(cleared);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow-lg p-3 mb-5 bg-body rounded">
                        <h1>Create a Vehicle Model</h1>
                        <form onSubmit={this.handleSubmit} id="create-model-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} placeholder="Name" required
                                    type="text" name="name" id="name" value={this.state.name}
                                    className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handlePictureChange} placeholder="Picture URL" required
                                    type="text" name="picture_url" id="picture_url" value={this.state.picture_url}
                                    className="form-control" />
                                <label htmlFor="picture_url">Picture URL</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleManufacturerChange} required name="manufacturer"
                                    id="manufacturer" value={this.state.manufacturer}
                                    className="form-select">
                                    <option value="">Choose a manufacturer</option>
                                    {this.state.manufacturers.map(manufacturer => {
                                        return (
                                            <option key={manufacturer.id} value={manufacturer.id}>
                                                {manufacturer.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-dark">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default VehicleModelForm;

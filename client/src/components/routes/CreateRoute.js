import React from 'react';
import LocationSearchInput from '../search/LocationSearchInput';
import MapContainer from './MapContainer';
import DateInput from '../search/DateInput';

export class CreateRoute extends React.Component {
    constructor() {
        super();
        this.state = {
            arrival: {},
            departure: {},
            // date: {},
            // waypoints: []
            carrierForm: false
        };
    };

    handleSelect = (latLng, departure, address) => {
        departure ? this.setState({ departure: { ...latLng, address } }) : this.setState({ arrival: { ...latLng, address } });
    }

    resetClick = (departure) => {
        departure ? this.setState({ departure: {} }) : this.setState({ arrival: {} })
    }

    forwardClick = () => {
        this.setState({ carrierForm: true })
    }

    backwardClick = () => {
        this.setState({ carrierForm: false })
    }

    render() {
        // let waypointsForm;
        // if( !_.isEqual(this.props.arrival, {}) && !_.isEqual(this.props.departure, {})) waypointsForm = <WaypointsForm></WaypointsForm>
        if (this.state.carrierForm) {
            return (
                <div className="d-flex justify-content-center aling-items-center create-container">
                    <div className="my-4 d-flex flex-row justify-content-between align-items-center row container border">
                        <div className="d-flex flex-column justify-content-center align-items-center border col-md-6 px-5 pb-5">
                            <div className="d-flex flex-column justify-content-start align-items-center container my-5">
                                <span className="my-2 location-info">Departure date &amp; time</span>
                                <DateInput></DateInput>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center container-fluid my-5">
                                <span className="my-2 location-info">Available space</span>
                                <div className="d-flex flex-row justify-content-center align-items-center space-wrapper">
                                    <input type="text" placeholder="meters" id="space" />
                                    <input type="text" id="spacetwo" value="m²" disabled />
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-between">
                                <div className="col-1 d-flex flex-column justify-content-between align-items-center mt-5">
                                    <button className="btn btn-light" onClick={this.backwardClick}>Back</button>
                                </div>
                                <div className="col-1 d-flex flex-column justify-content-between align-items-center mt-5">
                                    <button className="btn btn-dark" type="submit">Submit</button>
                                </div>
                            </div>
                        </div>
                        <MapContainer {...this.state}></MapContainer>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="d-flex justify-content-center aling-items-center create-container">
                    <div className="my-4 d-flex flex-row justify-content-between align-items-center row container border">
                        <div className="d-flex flex-column justify-content-center align-items-center border col-md-6 px-5 pb-5">
                            <div className="d-flex flex-column justify-content-center align-items-center container my-5" style={{ zIndex: 3 }}>
                                <span className="my-2 location-info">Departure</span>
                                <LocationSearchInput handleSelect={this.handleSelect} departure={true} resetClick={this.resetClick}></LocationSearchInput>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center container" style={{ zIndex: 2 }}>
                                <span className="my-2 location-info">Arrival</span>
                                <LocationSearchInput handleSelect={this.handleSelect} departure={false} resetClick={this.resetClick}></LocationSearchInput>
                            </div>
                            {/* {waypointsForm} */}
                            <div className="container-fluid d-flex justify-content-end">
                                <div className="col-1 d-flex flex-column justify-content-between align-items-center mt-5">
                                    <button className="btn btn-dark" onClick={this.forwardClick}>Continue</button>
                                </div>
                            </div>
                        </div>
                        <MapContainer {...this.state}></MapContainer>
                    </div>
                </div>
            );
        }
    };
};
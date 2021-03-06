import React from 'react';
import LocationSearchInput from '../search/LocationSearchInput';
import MapContainer from './MapContainer';
import DateInput from '../search/DateInput';
import RouteService from './RouteService';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';



export class CreateRoute extends React.Component {
    constructor() {
        super();
        this.state = {
            arrival: {},
            departure: {},
            date: {},
            carrierForm: false,
            space: 0,
            redirect: false,
            price: 0
        };
        this.service = new RouteService();
    };

    handleSelect = (latLng, departure, address) => {
        departure ? this.setState({ departure: { ...latLng, address } }) : this.setState({ arrival: { ...latLng, address } });
    };

    resetClick = (departure) => {
        departure ? this.setState({ departure: {} }) : this.setState({ arrival: {} })
    };

    forwardClick = () => {
        this.setState({ carrierForm: true })
    };

    backwardClick = () => {
        this.setState({ carrierForm: false })
    };

    handleDate = (date) => {
        this.setState({ date: date._d })
    };

    handleSpace(space) {
        this.setState({ space })
    };

    handlePrice(price) {
        this.setState({ price })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { arrival, departure, date, space, price } = this.state;
        this.service.create(arrival, departure, date, space, price)
            .then(e => this.setState({ redirect: true }))
    };

    render() {
        if (this.state.redirect)
            return <Redirect to="/"></Redirect>
        if (this.state.carrierForm) {
            return (
                <div className="create-route d-flex justify-content-center align-items-center">
                    <Grid style={{ marginLeft: "18vw", marginRight: "18vw", width: "50vw", marginBottom: "8vh", backgroundColor: "#ffffffbf" }}>
                        <Card style={{ backgroundColor: "transparent" }}>
                            <Grid container spacing={16} direction="row" alignItems="stretch" justify="space-around" style={{ marginTop: "2vh", marginBottom: "2vh", backgroundColor: "transparent" }}>
                                <Grid item lg={5} container alignItems="center" justify="space-around" direction="column" style={{ backgroundColor: "transparent" }}>
                                    <Grid style={{ width: "80%" }}>
                                        <InputLabel className="my-2 create-label" style={{ width: "100%" }}>Departure date &amp; time</InputLabel>
                                        <DateInput handleDate={this.handleDate} ></DateInput>
                                    </Grid>
                                    <Grid style={{ width: "80%" }}>
                                        <InputLabel className="my-2 create-label" style={{ width: "100%" }}>Price/m²</InputLabel>
                                        <input className="search-input" onChange={e => this.handlePrice(e.currentTarget.value)} placeholder="Set a price" ></input>
                                    </Grid>
                                    <Grid style={{ width: "80%" }}>
                                        <InputLabel className="my-2 create-label">Available space</InputLabel>
                                        <Grid className="d-flex flex-row justify-content-center align-items-center space-wrapper" style={{ width: "100%" }}>
                                            <input type="text" placeholder="Available space in meters" id="space" onChange={e => this.handleSpace(e.currentTarget.value)} />
                                            <input type="text" id="spacetwo" value="m²" disabled />
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center" justify="space-around" >
                                        <Button variant="contained" onClick={this.backwardClick}>Back</Button>
                                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
                                    </Grid>
                                </Grid>
                                <Grid item lg={7}>
                                    <MapContainer {...this.state}></MapContainer>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </div>
            )
        } else {
            return (
                <div className="create-route d-flex justify-content-center align-items-center">
                    <Grid style={{ marginLeft: "18vw", marginRight: "18vw", width: "50vw", marginBottom: "8vh", backgroundColor: "#ffffffbf" }}>
                        <Card style={{ backgroundColor: "transparent" }}>
                            <Grid container spacing={16} direction="row" alignItems="stretch" justify="space-around" style={{ marginTop: "2vh", marginBottom: "2vh", backgroundColor: "transparent" }}>
                                <Grid item lg={5} container alignItems="center" justify="space-around" direction="column" style={{ backgroundColor: "transparent" }}>
                                    <Grid style={{ zIndex: 3, width: "80%" }}>
                                        <InputLabel style={{ marginBottom: "2vh" }} className="my-2 create-label">Departure</InputLabel>
                                        <LocationSearchInput style={{ marginBottom: "2vh" }} handleSelect={this.handleSelect} departure={true} resetClick={this.resetClick} place={this.state.departure}></LocationSearchInput>
                                    </Grid>
                                    <Grid style={{ zIndex: 2, width: "80%" }}>
                                        <InputLabel style={{ marginBottom: "2vh" }} className="my-2 create-label">Arrival</InputLabel>
                                        <LocationSearchInput style={{ marginBottom: "2vh" }} handleSelect={this.handleSelect} departure={false} resetClick={this.resetClick} place={this.state.arrival}></LocationSearchInput>
                                    </Grid>
                                    <Grid container justify="flex-end" style={{ paddingRight: "3vw" }}>
                                        <Button style={{ marginBottom: "2vh" }} variant="contained" onClick={this.forwardClick}>Continue</Button>
                                    </Grid>
                                </Grid>
                                <Grid item lg={7}>
                                    <MapContainer {...this.state}></MapContainer>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </div>
            );
        }
    };
};
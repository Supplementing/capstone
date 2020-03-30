import React, { Component, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Popup from "reactjs-popup";
const mapStyles = {
	width: "100%",
	height: "50%"
};

export class MapContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			//we will access the array of json object returned from zomato here and adds the points to the map as markers below.These are for testing
			locationsOfResturaunts: props.resCoords,
			showModal: true,
			resLat: 12,
			resLong: 12,
			resName: "Harrys"
		};
	}

	displayMarkers = () => {
		return this.state.locationsOfResturaunts.map((resturaunt, index) => {
			return (
				<Marker
					key={index}
					id={index}
					position={{
						lat: resturaunt.latitude,
						lng: resturaunt.longitude
					}}
					title={resturaunt.name}
					onClick={() => {
						this.modalClicked(resturaunt);
					}}
				/>
			);
		});
	};

	render() {
		return (
			<div>
				<div>
					<table>
						<th>Resturaunt List</th>

						{this.state.locationsOfResturaunts.map((res, index) => {
							return (
								<tr>
									<td>
										Resturaunt Name: {res.name}
										<br></br>
										Location: {res.city}
										<br></br>
									</td>
								</tr>
							);
						})}
					</table>

					<Map
						google={this.props.google}
						zoom={14}
						style={mapStyles}
						initialCenter={this.props.initCoords}
					>
						{this.displayMarkers()}
					</Map>
				</div>
			</div>
		);
	}

	modalClicked(resturaunt) {
		var name = resturaunt.name;
		var city = resturaunt.city;
		var phone = resturaunt.phone;
		alert(name + "\n" + city + "\n" + phone);

		//this return doesnt work AT ALL
		return (
			<div>
				<Popup position="right center">
					<div>Popup content here !!</div>
				</Popup>
			</div>
		);
	}
}
export default GoogleApiWrapper({
	apiKey: "keyHerePlz"
})(MapContainer);

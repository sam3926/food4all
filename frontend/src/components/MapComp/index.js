import React, { Component } from "react";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./styles.css";
import { geolocated } from 'react-geolocated';
import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "leaflet/dist/leaflet.js";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js";
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';

const DEFAULT_LATITUDE = 28.6139;
const DEFUALT_LONGITUDE = 77.2090;

// import marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
});

class MapComp extends Component {
  constructor() {
    super();
    this.state = {
      initialised: false,
      markers: []
    };
  }

  addMarker = (e) => {
    const { markers } = this.state;
    markers.pop();
    markers.push(e.latlng);
    this.props.saveLatLng(markers[0]);

    this.setState({ markers });
  };

  componentDidMount() {
    const map = this.leafletMap.leafletElement;
    const searchControl = new ELG.Geosearch().addTo(map);
    const results = new L.LayerGroup().addTo(map);

    searchControl.on("results", function (data) {
      results.clearLayers();
    });
  }


  render() {
    const longitude = this.props.coords ? this.props.coords.longitude : DEFUALT_LONGITUDE;
    const latitude = this.props.coords ? this.props.coords.latitude : DEFAULT_LATITUDE;

    if (!this.state.initialised && this.props.coords) {
      this.setState({ initialised: true })
      this.addMarker({
        latlng: {
          lat: latitude,
          lng: longitude
        }
      })
    }

    const center = [28.6139, 77.209];
    return (
      <>
        <div className="MAP">
          <Map
            style={{ height: "80vh" }}
            center={[latitude, longitude]}
            zoom="10"
            ref={(m) => {
              this.leafletMap = m;
            }}
            onClick={this.addMarker}
          >
            <TileLayer
              attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
              url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
            />
            <div className="pointer" />


            {/* {
              !this.props.coords
                ? <div className="loading">Loading</div>
                :
                <Marker
                  position={[latitude, longitude]}
                >
                  <Popup>
                    you are here!
            </Popup>
                </Marker>
            } */}

            {this.state.markers.map((position, idx) => (
              <Marker draggable={true} key={`marker-${idx}`} position={position}>
                <Popup>
                  <span>Marked Location</span>
                </Popup>
              </Marker>
            ))}
          </Map>
          {/* <div class="container">
            <div class="vertical-center">
              <button class="button">Done</button>
            </div>
          </div> */}
        </div>
      </>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 1000
})(MapComp);


//export default MapComp;

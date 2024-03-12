import React from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/map.scss';

const Map = () => {
    return (
        <MapContainer center={[47.67, -122.12]} zoom={10} zoomControl={false} className='map'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position='topright'/>
        </MapContainer>
    );
};

export default Map;

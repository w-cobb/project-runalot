import React, { useEffect, useState } from 'react';
import { MapContainer, Polyline, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/map.scss';
import { GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { LatLngExpression } from 'leaflet';

const Map = ({s3Client}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [listData, setListData] = useState();
    const [positions, setPositions] = useState<[number, number][][]>([]);

    const bucket = "running-tracks";
    // let positions: [number, number][][] = [];

    useEffect(() => {
        // Retrieve the keys for all GPX files in the S3 bucket
        listObjects();
    }, []);

    useEffect(() => {
        getObjects();
    }, [listData]);

    useEffect(() => {
        setIsLoading(false);
        console.log(positions);
    }, [positions]);

    const listObjects = async () => {
        try {
            console.log("Retrieving objects from S3");

            setIsLoading(true);
            // List objects
            const listParams = {
                "Bucket": bucket,
                "Prefix": "output/"
            };
            const response = await s3Client.send(new ListObjectsV2Command(listParams));
            setListData(response.Contents);
            console.log(listData);
            console.log("Successfully listed objects");

        } catch (error) {
            console.log("Error listing objects:", error);
        }
    };

    const getObjects = async() => {
        try {
            // Iterate through the objects returned and call GetObjectCommand
            let newPositions: [number, number][][] = [];
            for (const object of listData) {
                if(object.Key && object.Key.includes(".json")) {
                    console.log("key: ", object.Key);
                    const getParams = {
                        "Bucket": bucket,
                        "Key": object.Key
                    };
                    const obj = await s3Client.send(new GetObjectCommand(getParams));
                    
                    let str = await obj.Body.transformToString();
                    let gpx = JSON.parse(str);
                    let points = gpx?.tracks[0].segments[0].points.map(p => [p.latitude, p.longitude]);
                    newPositions.push(points);
                }
            }
            console.log("Finished getting objects");
            
            setPositions(newPositions);
            setIsLoading(false);
            console.log("Loading?", isLoading);
        } catch (error) {
            console.log("Error retrieving objects:", error);
        }
    };

    return (
        <MapContainer center={[47.67, -122.12]} zoom={12} zoomControl={false} className='map'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position='topright'/>
            {(!isLoading) && <Polyline pathOptions={ {color: 'red'} } positions={positions} />}
        </MapContainer>
    );
};

export default Map;

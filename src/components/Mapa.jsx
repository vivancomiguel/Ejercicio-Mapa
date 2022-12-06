import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import LeLe from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Mapa.css';
import Icon from 'leaflet/dist/images/marker-icon.png';
import IconShadow from 'leaflet/dist/images/marker-icon.png';
import axios from 'axios';
import { useState } from 'react';

const ubicacionIcon = new LeLe.icon({
  iconUrl: Icon,
  IconShadow: IconShadow,
  iconSize: [20, 35],
  iconAnchor: [16, 44],
  shadowAnchor: [16, 44],
  popupAnchor: [-6, -36]
})

const coleccion = [], dircoleccion = [];

const Mapa = () => {
  const [puntos, setPuntos] = useState([]);
  const [lista, setLista] = useState([]);
  
  const fetchData = function(url) {
    return axios.get(url)
      .then(res=>{
        const conversion = [];
        const ubicaciones = res.data;
        ubicaciones.forEach(ub => {
          const {Name, Address, Coordinates } = ub;
          conversion.push(
            <Marker position={[Coordinates.lat, Coordinates.lng]} icon={ubicacionIcon} key={Address} 
              eventHandlers={{
                click: (e) => {
                },
                popupopen: (e) => {
                },
              }}>
              <Popup eventHandlers={{
                add: () => {
                  if (dircoleccion.indexOf(Address)===-1) {
                    dircoleccion.push(Address);
                    coleccion.push(ub);
                    setLista(()=>[].concat(coleccion))
                  }
                },
              }}>
                {Name} <br /> {Address}.
              </Popup>
            </Marker>
          )
          setPuntos(conversion);
        });
      })
  }
  return (
    <>
      <ul>
		    <li>As a student, I want to see a map of Mexico City</li>
		    <li>As a student, I want to see a map that has all the stores represented as markers/pins on the map.</li>
		    <li>As a student, I want to be able to click on a store and add it to a list of 'My Favorite Stores'</li>
		  </ul>
      <div>
        <MapContainer center={[19.432647316322633, -99.13322099639464]} zoom={13} scrollWheelZoom={false} className="mapa">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {puntos}
        </MapContainer>
      </div>
      <button onClick={()=>fetchData("data/data.json")}>Show stores</button>
      <h2>My Favorite Stores</h2>
      <ul>
        {
          lista.map(cv => {
            return <li key={cv.Address}> {cv.Name} </li>;
          })
        }
      </ul>
    </>
  )
}

export default Mapa
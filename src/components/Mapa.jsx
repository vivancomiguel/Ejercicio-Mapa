import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import LeLe from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Mapa.css';
import Icon from 'leaflet/dist/images/marker-icon.png';
import IconShadow from 'leaflet/dist/images/marker-icon.png';
import axios from 'axios';
import { useState } from 'react';
import { faArrowUpRightFromSquare, faLocationDot, faMapLocation, faCodeCompare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                mouseout: (e) => {
                  setTimeout(() => {
                    e.target.closePopup();
                  }, 1000);
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
    <main className="container">
      <h1 className='text-center my-4'><FontAwesomeIcon icon={faLocationDot} /> Generation Take Home <FontAwesomeIcon icon={faLocationDot} /></h1>
      <ul className="list-group text-center mb-4">
		    <li className="list-group-item list-group-item-success">As a student, I want to see a map of Mexico City</li>
		    <li className="list-group-item list-group-item-success">As a student, I want to see a map that has all the stores represented as markers/pins on the map.</li>
		    <li className="list-group-item list-group-item-success">As a student, I want to be able to click on a store and add it to a list of 'My Favorite Stores'</li>
		  </ul>
      <div className="row mb-4">
        <MapContainer center={[19.432647316322633, -99.13322099639464]} zoom={13} scrollWheelZoom={false} className="mapa">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {puntos}
        </MapContainer>
        <button 
          className="btn btn-primary mb-3 rounded-0 rounded-bottom" 
          onClick={()=>fetchData("data/data.json")}>
            Show stores <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </button>
      </div>
      <h2 className="text-center"><FontAwesomeIcon icon={faMapLocation} /> My Favorite Stores <FontAwesomeIcon icon={faMapLocation} /></h2>
      <ul className="list-group mb-5">
        {
          lista.map(cv => {
            return (<li 
                key={cv.Address}
                className="list-group-item list-group-item-primary">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{cv.Name}</h5>
                <small className="text-muted">{cv.Address}</small>
              </div>
                <h6 className="mt-3 text-center">Coordinates</h6>
                <small className="d-block text-muted text-center"><strong>Latitude:</strong> {cv.Coordinates.lat}, <strong>Longitude:</strong> {cv.Coordinates.lng}</small>
            </li>)
          })
        }
      </ul>
    </main>
    <footer>
      <nav className="navbar navbar-dark justify-content-center bg-primary">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a class="nav-link active" aria-current="page" target="_blank" href="https://github.com/vivancomiguel/Ejercicio-Mapa">Go to repository <FontAwesomeIcon icon={faCodeCompare} /></a>
          </li>
        </ul>
      </nav>
    </footer>
    </>
  )
}

export default Mapa
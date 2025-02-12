import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import mapData from './mapData.json'

function Map() {
  return (
    <MapContainer
      center={[mapData.locations[0].latitude, mapData.locations[0].longitude]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mapData.locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
        >
          <Popup>
            <h3>{location.name}</h3>
            <p>{location.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default Map 
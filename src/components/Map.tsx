import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import mapData from './mapData.json'
import { useState } from 'react'

function Map() {
    const [selectedLocation, setSelectedLocation] = useState(null)
    return (
      <div>
            <h1>Map</h1>
            <div className='map-container'>
                <div className='map-sidebar'>
                    <h2>Locations</h2>
                    <p>Click on a location to view more information</p>
                    <p> {selectedLocation?.name}</p>
                </div>
                <div className='map-map'>

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
                  <button onClick={() => setSelectedLocation(location)}>Læs mere</button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
      </div>
      </div>
      </div>
  )
}

export default Map 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import mapData from './mapData.json'
import { useState } from 'react'
import { DivIcon } from 'leaflet'

function Map() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  return (
    <div className="map-container">
      <div className="map-sidebar">
        <h2>Locations</h2>
        <p>Click on a location to view more information</p>
        <p> {selectedLocation?.name}</p>
      </div>
      <div className="map-map">
        <MapContainer
          center={[
            mapData.locations[0].latitude,
            mapData.locations[0].longitude,
          ]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mapData.locations.map(location => {
            const customIcon = new DivIcon({
              html: `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                       <circle cx="16" cy="16" r="16" fill="#c8102e" />
                     </svg>`,
              className: `custom-icon ${
                selectedLocation?.id === location.id ? ' active' : ''
              }`,
              iconSize: [32, 32],
            })

            return (
              <Marker
                icon={customIcon}
                key={location.id}
                position={[location.latitude, location.longitude]}
              >
                <Popup>
                  <h3>{location.name}</h3>
                  <p>{location.description}</p>
                  <button onClick={() => setSelectedLocation(location)}>
                    Læs mere
                  </button>
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>
      </div>
    </div>
  )
}

export default Map

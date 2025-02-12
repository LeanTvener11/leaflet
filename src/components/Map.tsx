import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import mapData from './mapData.json'
import { useState } from 'react'
import { DivIcon } from 'leaflet'

type Location = {
  id: number
  name: string
  latitude: number
  longitude: number
  description: string
}

const mobileBreakpoint = 768
function Map() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  )

  const handleSelectedLocation = (location: Location) => {
    console.log(location)
    setSelectedLocation(location)
  }

  return (
    <div className="map-container">
      <div className={`map-sidebar ${selectedLocation ? 'open' : ''}`}>
        <div className="sidebare-close">
          <button
            className="sidebare-close-button"
            onClick={() => setSelectedLocation(null)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <h2>
          {selectedLocation?.name ? selectedLocation.name : 'Udforsk Grønland'}
        </h2>
        <div className="seperator--green"></div>
        <p>{selectedLocation && selectedLocation.description}</p>
      </div>
      <div className="map-map">
        <MapContainer
          center={
            window.innerWidth <= mobileBreakpoint
              ? [
                  mapData.StartfocusLocation.mobile.latitude,
                  mapData.StartfocusLocation.mobile.longitude,
                ] // More zoomed in center for mobile
              : [
                  mapData.StartfocusLocation.desktop.latitude,
                  mapData.StartfocusLocation.desktop.longitude,
                ]
          }
          zoom={window.innerWidth <= mobileBreakpoint ? 3 : 4}
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
                eventHandlers={{
                  click: () => handleSelectedLocation(location),
                }}
              >
                <Popup>
                  <h3>{location.name}</h3>
                  <p>
                    Latitude: {location.latitude}°, Longitude:
                    {location.longitude}°
                  </p>
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

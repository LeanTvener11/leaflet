import { TileLayer, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import mapData from './mapData.json'
import { useState } from 'react'
import { DivIcon } from 'leaflet'
import Accordian from './Accordian/Accordian'

export type Location = {
  id: number
  name: string
  latitude: number
  longitude: number
  description: string
  imageUrl?: string
  videoUrl?: string
  altText?: string
}

function Map() {
  const [selectedLocation, setSelectedLocation] = useState<Location>(
    mapData.locations[0]
  )
  const map = useMap()

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location)
    map.setView([location.latitude, location.longitude], 9, {
      animate: true,
      duration: 1,
    })
  }

  return (
    <div
      className={`map-container ${
        selectedLocation ? 'has-selected-location' : ''
      }`}
    >
      <div className={`map-sidebar`}>
        <h2 className="map-sidebar-title">{'Udforsk Grønland'}</h2>

        <div className="seperator--green"></div>
        <Accordian
          selected={selectedLocation}
          setSelected={handleLocationClick}
          locations={mapData.locations}
        />
      </div>
      <div
        className={`map-map ${selectedLocation ? 'has-selected-location' : ''}`}
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
                click: () => handleLocationClick(location),
              }}
            ></Marker>
          )
        })}
      </div>
    </div>
  )
}

export default Map

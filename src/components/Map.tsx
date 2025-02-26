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
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  )
  const [isOpen, setIsOpen] = useState(false)
  const map = useMap()

  const toggleContent = () => {
    setIsOpen(prev => {
      if (prev) {
        setSelectedLocation(null)
        handleLocationClick(null)
      }
      return !prev
    })
  }

  const handleLocationClick = (location: Location | null) => {
    if (location == null) {
      const isMobile = window.innerWidth < 768
      const zoomLevel = isMobile ? 4 : 4

      map.setView(
        [
          isMobile
            ? mapData.StartfocusLocation.mobile.latitude
            : mapData.StartfocusLocation.desktop.latitude,
          isMobile
            ? mapData.StartfocusLocation.mobile.longitude
            : mapData.StartfocusLocation.desktop.longitude,
        ],
        zoomLevel,
        {
          animate: true,
          duration: 3,
        }
      )
      setSelectedLocation(null)
      return
    }

    const isMobile = window.innerWidth < 768
    const zoomLevel = isMobile ? 7 : 7

    // Calculate offset based on zoom level
    // Higher zoom levels need smaller coordinate adjustments
    const latOffset = 0.3 // Adjust base value as needed
    const lngOffset = -6 // Adjust base value as needed

    let adjustedLat = location.latitude
    let adjustedLng = location.longitude

    if (isMobile) {
      adjustedLat = location.latitude - latOffset
    } else {
      adjustedLng = location.longitude - lngOffset
    }

    map.setView([adjustedLat, adjustedLng], zoomLevel, {
      animate: true,
      duration: 3,
    })
    setSelectedLocation(location)
    setIsOpen(true)
  }

  return (
    <div
      className={`map-container ${
        selectedLocation ? 'has-selected-location' : ''
      }`}
    >
      <div className={`map-sidebar ${isOpen ? '' : 'inactive'}`}>
        <button
          className={`map-sidebar-toggle ${isOpen ? 'isOpen' : ''}`}
          onClick={toggleContent}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <h2 className="map-sidebar-title">{'Udforsk Grønland'}</h2>

        <div className="seperator--green"></div>
        <div className={`map-sidebar-content ${isOpen ? 'show' : ''}`}>
          <Accordian
            selected={selectedLocation}
            setSelected={handleLocationClick}
            locations={mapData.locations}
          />
        </div>
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
                     <circle cx="16" cy="16" r="16" fill="currentColor" />
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

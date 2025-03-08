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

const pinIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0"><path fill="#c8102e" d="m75.469 21.719c-5.3125-9.1875-14.844-14.688-25.469-14.688-16.25 0-29.469 13.219-29.469 29.469 0 5.1562 1.3438 10.094 3.9688 14.688l23.469 40.625c0.40625 0.71875 1.1875 1.1875 2.0312 1.1875s1.625-0.4375 2.0312-1.1875l23.469-40.625c5.3125-9.2188 5.2812-20.219-0.03125-29.438zm-4.0312 27.094-21.438 37.094-21.438-37.094c-2.2188-3.875-3.3438-8.0312-3.3438-12.344 0-13.656 11.125-24.781 24.781-24.781 8.9375 0 16.938 4.625 21.406 12.344 4.4688 7.75 4.5 17 0 24.75zm-21.438-28.219c-8.375 0-15.156 6.8125-15.156 15.219s6.8125 15.156 15.156 15.156 15.156-6.8125 15.156-15.156-6.8125-15.219-15.156-15.219zm0 25.688c-5.7812 0-10.469-4.6875-10.469-10.469s4.6875-10.531 10.469-10.531 10.469 4.7188 10.469 10.531-4.6875 10.469-10.469 10.469z"/></svg>'

const pinSelectedIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" version="1.1" style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;" viewBox="0 0 254 470" x="0px" y="0px" fill-rule="evenodd"  clip-rule="evenodd"><g><path fill="#c8102e" d="M127 0c70,0 127,57 127,127 0,62 -32,96 -66,151l-61 98 -61 -98c-34,-55 -66,-89 -66,-151 0,-70 57,-127 127,-127zm0 52c39,0 70,32 70,70 0,39 -31,70 -70,70 -39,0 -70,-31 -70,-70 0,-38 31,-70 70,-70z"/></g>   </svg>'

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
      const zoomLevel = isMobile ? mapData.mobileZoom : mapData.desktopZoom

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
    const zoomLevel = isMobile
      ? mapData.mobileLocationZoom
      : mapData.desktopLocationZoom

    // Calculate offset based on zoom level
    // Higher zoom levels need smaller coordinate adjustments
    const latOffset = 1 // Adjust base value as needed
    const lngOffset = -3 // Adjust base value as needed

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

        <div className="seperator-grey"></div>
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
            html: `<div class="custom-icon-container">
                ${
                  selectedLocation?.id === location.id
                    ? pinSelectedIcon
                    : pinIcon
                }
                    <div class="pin-text">
                      <p>${location.name}</p>
                      <p>(${location.latitude.toFixed(
                        2
                      )},  ${location.longitude.toFixed(2)})</p>
                    </div>
                  </div>`,
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

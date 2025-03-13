import { MapContainer } from 'react-leaflet'
import './App.css'
import Map from './components/Map'
import mapData from './components/mapData.json'
import { LatLngBounds } from 'leaflet'

const mobileBreakpoint = 768

// Define the bounds for the draggable area
// These coordinates represent a bounding box around Greenland
const bounds = new LatLngBounds(
  // Southwest corner (bottom-left)
  [60, -80],
  // Northeast corner (top-right)
  [85, 60]
)
const isMobile = window.innerWidth < 768

function App() {
  return (
    <div
      style={{
        height: '700px',
        width: '100%',
        display: 'relative',
      }}
    >
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
        zoom={
          window.innerWidth <= mobileBreakpoint
            ? mapData.mobileZoom
            : mapData.desktopZoom
        }
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        dragging={!isMobile} // Enable dragging
        minZoom={2}
        maxZoom={7}
        doubleClickZoom={false}
        keyboard={false}
        touchZoom={true}
        boxZoom={false}
        closePopupOnClick={false}
        maxBounds={bounds} // Set the maximum bounds
        maxBoundsViscosity={1.0} // Makes the bounds "solid" - 1.0 means the map cannot be dragged outside bounds at all
      >
        <Map />
      </MapContainer>
    </div>
  )
}

export default App

import { MapContainer } from 'react-leaflet'
import './App.css'
import Map from './components/Map'
import mapData from './components/mapData.json'

const mobileBreakpoint = 768

function App() {
  return (
    <div
      style={{
        height: '100vh',
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
        dragging={false}
        minZoom={2}
        maxZoom={7}
        doubleClickZoom={false}
        keyboard={false}
        touchZoom={true}
        boxZoom={false}
        closePopupOnClick={false}
      >
        <Map />
      </MapContainer>
    </div>
  )
}

export default App

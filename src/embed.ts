;(function () {
  const script = document.createElement('script')
  script.src = 'https://your-vercel-url.vercel.app/main.js'
  document.head.appendChild(script)

  const style = document.createElement('link')
  style.rel = 'stylesheet'
  style.href = 'https://your-vercel-url.vercel.app/style.css'
  document.head.appendChild(style)

  // Leaflet CSS
  const leafletStyle = document.createElement('link')
  leafletStyle.rel = 'stylesheet'
  leafletStyle.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
  document.head.appendChild(leafletStyle)
})()

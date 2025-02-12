;(function () {
  const script = document.createElement('script')
  script.src = 'https://your-vercel-url.vercel.app/main.js'
  document.head.appendChild(script)

  // Add both potential CSS files to ensure styles are loaded
  const mainStyle = document.createElement('link')
  mainStyle.rel = 'stylesheet'
  mainStyle.href = 'https://your-vercel-url.vercel.app/main.css'
  document.head.appendChild(mainStyle)

  const indexStyle = document.createElement('link')
  indexStyle.rel = 'stylesheet'
  indexStyle.href = 'https://your-vercel-url.vercel.app/index.css'
  document.head.appendChild(indexStyle)

  // Leaflet CSS
  const leafletStyle = document.createElement('link')
  leafletStyle.rel = 'stylesheet'
  leafletStyle.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
  document.head.appendChild(leafletStyle)
})()

import { Location } from '../Map'
import { useEffect, useRef } from 'react'

const Accordian = ({
  selected,
  setSelected,
  locations,
}: {
  selected: Location | null
  setSelected: (selected: Location | null) => void
  locations: Location[]
}) => {
  const accordianRef = useRef<HTMLDivElement>(null)

  const handleAccordianClick = (location: Location) => {
    setSelected(location)
  }

  useEffect(() => {
    if (selected && accordianRef.current) {
      const selectedElement = accordianRef.current.querySelector(
        `[location-id="${selected.id}"]`
      )
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [selected])

  return (
    <div aria-label="Accordian" className="accordian" ref={accordianRef}>
      <ul>
        {locations.map(location => (
          <li
            className="accordian-item"
            key={location.id}
            location-id={location.id}
          >
            <div
              className={`accordian-item-container ${
                selected?.id === location.id ? 'active' : ''
              }`}
              aria-hidden={selected?.id !== location.id}
            >
              <button
                className="accordian-item-button"
                onClick={() => handleAccordianClick(location)}
              >
                <>
                  <span className="accordian-headline" role="heading">
                    {location.name}
                  </span>
                  <span className="icon-arrow"></span>
                </>
              </button>
              <div
                className={`content-container ${
                  selected?.id === location.id ? 'active' : ''
                }`}
                aria-hidden={selected?.id !== location.id}
              >
                <div className="content-container-inner">
                  <p>{location.description}</p>
                  <div className="image-container">
                    {location.videoUrl ? (
                      <div
                        style={{
                          paddingTop: '56.25%',
                          position: 'relative',
                        }}
                      >
                        <iframe
                          src={`https://player.vimeo.com/video/${location.videoUrl}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;controls=1`}
                          allow="autoplay; fullscreen; clipboard-write; encrypted-media"
                          allowFullScreen
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                          }}
                        ></iframe>
                      </div>
                    ) : (
                      <img src={location.imageUrl} alt={location.name} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Accordian

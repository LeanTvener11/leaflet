import { Location } from '../Map'

const Accordian = ({
  selected,
  setSelected,
  locations,
}: {
  selected: Location
  setSelected: (selected: Location) => void
  locations: Location[]
}) => {
  const handleAccordianClick = (location: Location) => {
    setSelected(location)
  }

  return (
    <div aria-label="Accordian">
      <ul className="">
        {locations.map(location => (
          <li className="accordian-item" key={location.id}>
            <div
              className={`accordian-item-container ${
                selected.id === location.id ? 'active' : ''
              }`}
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
                  selected.id === location.id ? 'active' : ''
                }`}
                aria-hidden={selected.id !== location.id}
              >
                <div className="content-container-inner">
                  <p>
                    {location.latitude}° {location.longitude}°
                  </p>
                  <p>{location.description}</p>
                  <div className="image-container">
                    {location.videoUrl ? (
                      <video
                        controls
                        className="image-container-video"
                        src={location.videoUrl}
                        muted
                        playsInline
                      >
                        <source src={location.videoUrl} type="video/mp4" />
                      </video>
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

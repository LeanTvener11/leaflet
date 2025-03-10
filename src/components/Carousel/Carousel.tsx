import { useState, useEffect } from 'react'
import { MediaItem } from '../Map'

interface CarouselProps {
  media: MediaItem[]
  title: string
}

// Separate component for media display logic
const MediaDisplay = ({
  item,
  title,
  index,
  total,
}: {
  item: MediaItem
  title: string
  index?: number
  total?: number
}) => {
  if (item.type === 'video') {
    return (
      <div
        style={{
          paddingTop: '56.25%',
          position: 'relative',
        }}
      >
        <iframe
          src={`https://player.vimeo.com/video/${item.url}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;controls=1`}
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
    )
  }

  return (
    <div
      style={{
        paddingTop: '56.25%',
        position: 'relative',
      }}
    >
      <img
        className="carousel-image"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        src={item.url}
        alt={index !== undefined ? `${title} - ${index + 1}/${total}` : title}
      />
    </div>
  )
}

const Carousel = ({ media, title }: CarouselProps) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handlePrevMedia = () => {
    setIsAnimating(true)
    setCurrentMediaIndex(prev => (prev === 0 ? media.length - 1 : prev - 1))
  }

  const handleNextMedia = () => {
    setIsAnimating(true)
    setCurrentMediaIndex(prev => (prev === media.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    setCurrentMediaIndex(0)
  }, [media])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [currentMediaIndex])

  return (
    <div className="carousel">
      <div className="carousel-track">
        {media.map((item, index) => (
          <div
            key={index}
            className={`carousel-slide ${
              index === currentMediaIndex ? 'active' : ''
            } ${isAnimating ? 'animating' : ''}`}
            style={{
              transform: `translateX(${(index - currentMediaIndex) * 100}%)`,
            }}
          >
            <MediaDisplay
              item={item}
              title={title}
              index={index}
              total={media.length}
            />
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <button
          onClick={handlePrevMedia}
          className="carousel-button prev"
          aria-label="Previous media"
        >
          ←
        </button>
        <span className="carousel-indicator">
          {currentMediaIndex + 1}/{media.length}
        </span>
        <button
          onClick={handleNextMedia}
          className="carousel-button next"
          aria-label="Next media"
        >
          →
        </button>
      </div>
    </div>
  )
}

export default Carousel

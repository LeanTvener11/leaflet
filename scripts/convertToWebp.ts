import imagemin from 'imagemin'
import webp from 'imagemin-webp'
;(async () => {
  await imagemin(['public/images/*.{jpg,png}'], {
    destination: 'public/images',
    plugins: [
      webp({
        quality: 75,
        method: 6,
      }),
    ],
  })

  console.log('Images optimized and converted to WebP!')
})()

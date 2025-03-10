import imagemin from 'imagemin'
import imageminWebp from 'imagemin-webp'
import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

async function optimizeImages() {
  try {
    // Ensure public/images directory exists
    const outputDir = 'public/images'
    await fs.mkdir(outputDir, { recursive: true })
    console.log('Output directory created/verified:', outputDir)

    // Read from /images directory
    const inputDir = 'images'
    const files = await fs.readdir(inputDir)
    console.log('Found files in input directory:', files)

    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png)$/i)) {
        console.log('Processing file:', file)
        const inputPath = path.join(inputDir, file)
        const outputPath = path.join(
          outputDir,
          file.replace(/\.(jpg|jpeg|png)$/i, '.webp')
        )

        console.log('Converting:', inputPath, '->', outputPath)

        await sharp(inputPath)
          .resize(524, 294)
          .webp({ quality: 80 })
          .toFile(outputPath)

        console.log('Converted:', file)
      }
    }

    console.log('All images processed successfully!')
  } catch (error) {
    console.error('Detailed error:', error)
    process.exit(1)
  }
}

optimizeImages()

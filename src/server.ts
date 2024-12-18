import mongoose from 'mongoose'
import config from './config'
import app from './app'

async function server() {
  try {
    await mongoose.connect(config.database_url as string)

    app.listen(config.port, () => {
      console.log(`Assignment-3 Server is running on port ${config.port} - chill`)
    })
  } catch (error) {
    console.error(error)
  }
}

server()

import express from 'express'
import path from 'path'
import settings from './settings'

const app = express()

// middleware
app.set('views', `${__dirname}/views`)
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '../public')))

const commonParams = {
  env: process.env.NODE_ENV,
  title: settings.title
}

// routing
app.get('/', (req, res) => {
  res.render(
    'posts/index',
    commonParams
  )
})

// error
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  res.status(500)
  res.render(
    'posts/error',
    Object.assign({}, commonParams, {
      err,
    })
  )
})

export default app

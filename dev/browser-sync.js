import browserSync from 'browser-sync'
import settings from '../server/settings'
const port = parseInt(settings.port) || 4000

browserSync({
  port: port + 1,
  ui: {
    port: port + 2
  },
  proxy: `localhost:${port}`,
  files: [
    'public/css/*.css',
    'public/*.html'
  ]
});

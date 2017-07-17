module.exports = ({ file, options, env }) => ({
  plugins: [
    require('autoprefixer')(),
    require('postcss-import')(),
    require('postcss-nested')(),
    require('postcss-mixins')(),
    require('postcss-advanced-variables')(),
    require('postcss-custom-selectors')(),
    require('postcss-custom-media')(),
    require('postcss-custom-properties')(),
    require('postcss-media-minmax')(),
    require('postcss-color-function')(),
    require('postcss-nesting')(),
    require('postcss-nested')(),
    require('postcss-atroot')(),
    require('postcss-property-lookup')(),
    require('postcss-extend')(),
    require('postcss-selector-matches')(),
    require('postcss-selector-not')()
  ]
})

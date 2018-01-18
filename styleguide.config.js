const path = require('path');

module.exports = {
  webpackConfig: require('./config/webpack.config.dev.js'),
  title: "Chramework",
  showCode: true,
  styleguideDir: "styleguide/build",
  ignore: ['**/Control.js'], 
  theme: {
    color: {
      link: '#0066FF',
      linkHover: '#0047B3',
    },
    fontFamily: {
      base: '"Graphik"'
    }
  },
  styleguideComponents: {
    SectionHeadingRenderer: path.join(__dirname, 'styleguide/components/SectionHeadingRenderer/SectionHeadingRenderer.js'),
    ComponentsList: path.join(__dirname, 'styleguide/components/ComponentsListRenderer/ComponentsListRenderer.js'),
    TableOfContentsRenderer: path.join(__dirname, 'styleguide/components/TableOfContents/TableOfContents.js'),
    PlaygroundRenderer: path.join(__dirname, 'styleguide/components/PlaygroundRenderer/PlaygroundRenderer.js'),
    StyleGuideRenderer: path.join(__dirname, 'styleguide/components/StyleGuideRenderer/StyleGuideRenderer.js'),
    Logo: path.join(__dirname, 'styleguide/components/Logo/Logo.js')
  },
  skipComponentsWithoutExample: true
}; 
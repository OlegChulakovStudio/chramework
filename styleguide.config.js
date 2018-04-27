const path = require('path');

module.exports = {
  webpackConfig: require('./config/webpack.config.dev.js'),
  title: "Chramework",
  showCode: true,
  styleguideDir: "styleguide/build",
  ignore: ['**/Control.js'],
  theme: {
    color: {
      link: '#151515',
      linkHover: '#0047B3',
    },
    fontFamily: {
      base: '"Graphik"'
    }
  },
  sections: [
    // {
    //   name: 'Introduction',
    //   content: 'docs/introduction.md'
    // },
    // {
    //   name: 'Documentation',
    //   sections: [
    //     {
    //       name: 'Installation',
    //       content: 'docs/installation.md',
    //       description: 'The description for the installation section'
    //     },
    //     {
    //       name: 'Configuration',
    //       content: 'docs/configuration.md'
    //     }
    //   ]
    // },
    {
      name: 'Заголовки',
      components: 'src/components/typography/*/*.js'
    },
    {
      name: 'Кнопки и ссылки',
      components: 'src/components/Buttons/*/*.js'
    },
    {
      name: 'Поля ввода',
      components: 'src/components/Input/*.js'
    },
    {
      name: 'Контролы',
      components: 'src/components/CheckboxGroup/*.js'
    },
    {
      name: 'Таблицы',
      components: 'src/components/Input/*.js'
    },
    {
      name: 'Карточки',
      components: 'src/components/Card/*.js'
    },
    {
      name: 'Блоки',
      components: 'src/components/Blocks/*/*.js'
    },
  ],
  styleguideComponents: {
    SectionHeadingRenderer: path.join(__dirname, 'styleguide/components/SectionHeadingRenderer/SectionHeadingRenderer.js'),
    TableOfContentsRenderer: path.join(__dirname, 'styleguide/components/TableOfContents/TableOfContents.js'),
    PlaygroundRenderer: path.join(__dirname, 'styleguide/components/PlaygroundRenderer/PlaygroundRenderer.js'),
    StyleGuideRenderer: path.join(__dirname, 'styleguide/components/StyleGuideRenderer/StyleGuideRenderer.js'),
    Logo: path.join(__dirname, 'styleguide/components/Logo/Logo.js')
  },
  skipComponentsWithoutExample: true
};
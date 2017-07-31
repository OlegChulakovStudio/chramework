# [Chramework](http://chramework.chulakov.ru)
A React-based UI toolkit

## Installation
The easiest way to use Chramework is to install it from NPM and include it in your own React build process

    npm install chramework --save

And just import chramework and its styles in your application as follows:

```javascript
import * as ComponentsList from 'chramework';
// or
import { Avatar, SelectField, Spinner } from 'chramework';

// Be sure to include styles at some point, probably during your bootstrapping
import 'chramework/dist/main.css';
```

## Avaliable Components
This package contains a lot of React components: `Avatar`, `Button`, `Control`, `FileInput`, `FormCol`, `FormGroup`, `FormRow`, `Heading`, `Input`, `Logo`, `Media`, `Note`, `Preloader`, `SelectField`, `Spinner`, `Table`, `TableCell`, `TableContent`, `TableHeader`, `TableRow`. Please refer to [demo page](http://chramework.chulakov.ru/) to see how they should be used.

## Customization
You can provide a custom `className` prop to each component.

```javascript
<Spinner className="some-additional-class" />
```


# Development
First of all, clone this repository and install all packages.
To run styleguide server, which allows you to see all your components at one page, type in terminal
```
npm run styleguide
```
This repository has two folders: `styleguide` and `src`. 
`Styleguide` contains restyled components, which used at http://chulakov.chramework.ru. More examples about how to customize styleguide page read [here](https://github.com/styleguidist/react-styleguidist/tree/master/examples/customised)
`Src` contains library components. Each component consist of 3 files: `.js` and `.styl` file for css styles and logic, and `.md` file for examples of component usage.

##Adding new component
To add new component to the package, you have to create folder with the same name as your new component in `src` folder and create `.js`, `.styl` and `.md` files here. Styleguide server will automatically add preview of this component to the styleguide page.

## Publishing to npm
1. Make production build `npm run build`
2. Change current version in `package.json`.
3. If you did some changes in styleguide styles, run `npm styleguide:build`
4. Run `npm publish` to publish the package to npm.

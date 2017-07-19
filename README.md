# [Chramework](http://chramework.chulakov.ru)
A React-based UI toolkit

## Installation
The easiest way to use Chramework is to install it from NPM and include it in your own React build process
    
    `npm install react-select --save`

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
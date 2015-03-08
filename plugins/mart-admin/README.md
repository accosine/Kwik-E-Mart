# Kondensator

A boilerplate for building React apps with ES6 and webpack.

## What you get

* React 0.13
* Compilation of ES6 & JSX to ES5
* webpack bundling with html
* Basic flux architecture with app actions and stores

## Getting started

Clone the project and remove the git repository:

```bash
git clone --depth=1 https://github.com/accosine/Kondensator.git my-project
cd my-project
rm -rf .git && git init
```

## npm scripts

* `npm start` - Build and start the app in dev mode at http://localhost:8000
* `npm run build` - Run a production build

## Examples

### Writing components:

```js
// Filename: Menu.jsx

import React from 'react';
import MenuItem from '../MenuItem/MenuItem';

let { PropTypes } = React;

class Menu extends React.Component {

  constructor(...args) {
    super(...args);
    // Set initial state
    this.state = {
      foo: false
    };
  }

  getMenuItem(item) {
    return (
      <MenuItem item={item} key={'menu-item-' + item.id} />
    );
  }

  render() {
    return (
      <ul className={'menu'}>
        {this.props.items.map(this.getMenuItem, this)}
      </ul>
    );
  }
}

Menu.propTypes = {
  items: PropTypes.array.isRequired
};

export default Menu;
```


## HTML files

All required `.html` files are compiled with lodash.template and synced into the `./build` directory:

```js
// Filename: app.jsx
import './index.html';
```

* You can adjust the lodash template data in the `webpack.config.js` file.

## Conventions

* Use fat arrows for anonymous functions
* Don't use `var`. Use `let` and `const`.


## Releasing

Updating version:

* `npm version patch` - Bump version
* `git push && git push --tags` - Push to remote

Publishing package:

* `npm login` - Login to npm
* `npm publish` - Publish package

## Credits

This project was initially forked from https://github.com/badsyntax/react-seed
which in turn was forked from https://github.com/tcoopman/react-es6-browserify


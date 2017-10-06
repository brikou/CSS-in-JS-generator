# CSS-in-JS-generator

__CSS-in-JS-generator__ is a tool to generate trendy CSS-in-JS files from regular CSS.

## Install

```sh
npm install css-in-js-generator
```

## Usage

Here is a demo to convert [Bootstrap](http://getbootstrap.com/) to CSS-in-JS usable by [emotion](https://emotion.sh/).

```sh
curl https://unpkg.com/bootstrap@4.0.0-beta/dist/css/bootstrap.css | \
    node ./node_modules/css-in-js-generator/index.js > \
    bootstrap.js
```

## Demo

A demo using next.js, emotion and bootstrap is available [here](https://css-in-js-experiences.ga/bootstrap/), source code of demo is [here](https://github.com/brikou/CSS-in-JS-experiences).

## License

MIT

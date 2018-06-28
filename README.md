# Local Outlier Factor (lof) 
Local Outlier Factor 

## Install

`$ npm install lof`

## Usage

```js
const lof = require('lof');
const dataset = [[3, 4], [5, 3], [2, 2], [5, 4]];
console.log(lof(2, dataset, 0));
// 0.9500365780630926
```

## API
* lof(k, dataset, index, normalize = true, toMercator = false)

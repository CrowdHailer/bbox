Bounding Box (BBox)
===================

##### Find bounding box dimensions either within or surrounding arbitrary containers

Installation
============

Available as a node package. To install use

```
$ npm install bbox
```

Methods
=======

The following methods are available

- create
- fit
- surround

Use
===

#### create
`BBox.create(x0, y0, x1, y1)`

*OR*

`BBox.create(width, height)`

Creates a frozen bbox object with both position and dimensions. When using dimensions the box has undefined location but can still be used for its aspect ratio.

```js
var BBox = require('bbox');

var fixed = BBox.create(1, 1, 4, 4);
// => {x0: 1, y0: 1, x1: 4, y1: 4, width: 3, height: 3}

var floating = BBox.create(2, 3);
// => {width: 2, height: 3, x0: undefined, y0: undefined, x1: undefined, y1: undefined}
```

#### fit
`BBox.fit(container, aspect)`

Creates the largest box with the same aspect ratio as `aspect` that will fit within `container`. The box is centered within `container`. **Note** container requires a fixed bbox but aspect may be fixed or floating.

```js
var container = BBox.create(0, 0, 100, 100);
var aspect = BBox.create(250, 500);

BBox.fit(container, aspect);
// => {x0: 25, y0: 0, x1: 75, y1: 100, width: 50, height: 100}
```

#### surround
`BBox.surround(container, aspect)`

Creates the smallest box with the same aspect ratio as `aspect` that will surround `container`. The box is centered around `container`. **Note** container requires a fixed bbox but aspect may be fixed or floating.

```js
var container = BBox.create(0, 0, 100, 100);
var aspect = BBox.create(250, 500);

BBox.surround(container, aspect);
// => {x0: 0, y0: -50, x1: 100, y1: 150, width: 100, height: 200}
```
'use strict';

var Point = require('2d-point');

function BBox(x0, y0, x1, y1) {
    if (x1) {
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
        this.width = x1 - x0;
        this.height = y1 - y0;
    } else {
        this.width = x0;
        this.height = y0;
    }
    Object.freeze(this);
}

exports.create = function (x0, y0, x1, y1) {
    return new BBox(x0, y0, x1, y1);
};

exports.isBBox = function (obj) {
    return (obj.constructor === BBox);
};

exports.fit = function (container, aspect) {
    var containerDiagonal = Point.create(container.width, container.height),
        aspectDiagonal = Point.create(aspect.width, aspect.height),
        containerOrigin = Point.create(container.x0, container.y0),
        offset,
        upper;

    aspectDiagonal = Point.fitWithin(containerDiagonal, aspectDiagonal);

    offset = Point.subtract(containerDiagonal, aspectDiagonal);
    offset = Point.multiply(0.5, offset);
    offset = Point.add(offset, containerOrigin);

    upper = Point.add(offset, aspectDiagonal);
    return new BBox(offset.x, offset.y, upper.x, upper.y);
};

exports.surround = function (container, aspect) {
    var containerDiagonal = Point.create(container.width, container.height),
        aspectDiagonal = Point.create(aspect.width, aspect.height),
        containerOrigin = Point.create(container.x0, container.y0),
        offset,
        upper;

    aspectDiagonal = Point.fitOnce(containerDiagonal, aspectDiagonal);

    offset = Point.subtract(containerDiagonal, aspectDiagonal);
    offset = Point.multiply(0.5, offset);
    offset = Point.add(offset, containerOrigin);

    upper = Point.add(offset, aspectDiagonal);
    return new BBox(offset.x, offset.y, upper.x, upper.y);
};
function BBox(x0, y0, x1, y1) {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.width = x1 - x0;
    this.height = y1 - y0;
    Object.freeze(this);
}

exports.create = function (x0, y0, x1, y1) {
    return new BBox(x0, y0, x1, y1);
};

exports.isBBox = function (obj) {
    return (obj.constructor === BBox)
}
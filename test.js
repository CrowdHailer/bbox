var BBox;

beforeEach(function () {
    BBox = require('./index');
});

describe('Rectangle', function () {
    describe('initialisation', function () {
        it('from minimum and maximum', function () {
            var box = BBox.create(1, 2, 3, 4);
            expect(box.x0).toEqual(1);
            expect(box.y0).toEqual(2);
            expect(box.x1).toEqual(3);
            expect(box.y1).toEqual(4);
        });
    });
});
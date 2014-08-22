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

        it('should create width and height attribute', function () {
            var box = BBox.create(1, 2, 3, 4);
            expect(box.width).toEqual(2);
            expect(box.height).toEqual(2);
        });

        it('should be a BBox object', function () {
            var box = BBox.create(1, 2, 3, 4);
            expect(BBox.isBBox(box)).toBe(true);
        });

        it('should not validate plain objects', function () {
            expect(BBox.isBBox({
                x0: 1,
                y0: 2,
                x1: 3,
                y1: 4,
                width: 2,
                height: 2
            })).toBe(false);
        });

        it('should create a frozen object', function () {
            var box = BBox.create(1, 2, 3, 4);
            expect(Object.isFrozen(box)).toBe(true);
        });
    });
});
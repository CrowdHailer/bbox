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

        it('from width and height', function () {
            var box = BBox.create(2, 3);
            expect(box.width).toEqual(2);
            expect(box.height).toEqual(3);
            expect(box.x0).toEqual();
            expect(box.y0).toEqual();
            expect(box.x1).toEqual();
            expect(box.y1).toEqual();
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

    describe('fitting within a square container', function () {
        var container, aspect, result;

        beforeEach(function () {
            container = BBox.create(0, 0, 100, 100);
        });

        it('should fit for same aspect shape', function () {
            aspect = BBox.create(100, 100);
            result = BBox.fit(container, aspect);
            expect(result).toEqual(BBox.create(0, 0, 100, 100));
        });

        it('should fit for same aspect ratio', function () {
            aspect = BBox.create(200, 200);
            result = BBox.fit(container, aspect);
            expect(result).toEqual(BBox.create(0, 0, 100, 100));
        });

        it('should fit a portrait aspect', function () {
            aspect = BBox.create(250, 500);
            result = BBox.fit(container, aspect);
            expect(result).toEqual(BBox.create(25, 0, 75, 100));
        });

        it('should fit a landscape aspect', function () {
            aspect = BBox.create(10, 5);
            result = BBox.fit(container, aspect);
            expect(result).toEqual(BBox.create(0, 25, 100, 75));
        });
    });

    describe('fitting within an offset container', function () {
        var container, aspect, result;

        beforeEach(function () {
            container = BBox.create(0, 50, 100, 100);
        });

        it('should fit a lanscape aspect', function () {
            aspect = BBox.create(500, 250);
            result = BBox.fit(container, aspect);
            expect(result).toEqual(BBox.create(0, 50, 100, 100));
        });

        it('should fit a portait aspect', function () {
            aspect = BBox.create(500, 500);
            result = BBox.fit(container, aspect);
            expect(result).toEqual(BBox.create(25, 50, 75, 100));
        });
    });

    describe('surrounding a square container', function () {
        var container, aspect, result;

        beforeEach(function () {
            container = BBox.create(0, 0, 100, 100);
        });

        it('should surround for same aspect shape', function () {
            aspect = BBox.create(100, 100);
            result = BBox.surround(container, aspect);
            expect(result).toEqual(BBox.create(0, 0, 100, 100));
        });

        it('should surround for same aspect ratio', function () {
            aspect = BBox.create(200, 200);
            result = BBox.surround(container, aspect);
            expect(result).toEqual(BBox.create(0, 0, 100, 100));
        });

        it('should surround a portrait aspect', function () {
            aspect = BBox.create(250, 500);
            result = BBox.surround(container, aspect);
            expect(result).toEqual(BBox.create(0, -50, 100, 150));
        });

        it('should surround a landscape aspect', function () {
            aspect = BBox.create(10, 5);
            result = BBox.surround(container, aspect);
            expect(result).toEqual(BBox.create(-50, 0, 150, 100));
        });
    });

    describe('surrounding an offset container', function () {
        var container, aspect, result;

        beforeEach(function () {
            container = BBox.create(0, 50, 100, 100);
        });

        it('should surround a lanscape aspect', function () {
            aspect = BBox.create(500, 250);
            result = BBox.surround(container, aspect);
            expect(result).toEqual(BBox.create(0, 50, 100, 100));
        });

        it('should surround a portait aspect', function () {
            aspect = BBox.create(500, 500);
            result = BBox.surround(container, aspect);
            expect(result).toEqual(BBox.create(0, 25, 100, 125));
        });
    });
});
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = void 0;
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue(comparator) {
        if (comparator === void 0) { comparator = function (a, b) { return a > b; }; }
        this._top = 0;
        this._parent = function (i) { return ((i + 1) >>> 1) - 1; };
        this._left = function (i) { return (i << 1) + 1; };
        this._right = function (i) { return (i + 1) << 1; };
        this._heap = [];
        this._comparator = comparator;
    }
    PriorityQueue.prototype._greater = function (i, j) {
        return this._comparator(this._heap[i], this._heap[j]);
    };
    PriorityQueue.prototype._swap = function (i, j) {
        var _a;
        _a = [this._heap[j], this._heap[i]], this._heap[i] = _a[0], this._heap[j] = _a[1];
    };
    PriorityQueue.prototype._siftUp = function () {
        var node = this.size() - 1;
        while (node > this._top && this._greater(node, this._parent(node))) {
            this._swap(node, this._parent(node));
            node = this._parent(node);
        }
    };
    PriorityQueue.prototype._siftDown = function () {
        var node = this._top;
        while ((this._left(node) < this.size() && this._greater(this._left(node), node)) ||
            (this._right(node) < this.size() && this._greater(this._right(node), node))) {
            var maxChild = (this._right(node) < this.size() && this._greater(this._right(node), this._left(node))) ? this._right(node) : this._left(node);
            this._swap(node, maxChild);
            node = maxChild;
        }
    };
    PriorityQueue.prototype.size = function () {
        return this._heap.length;
    };
    PriorityQueue.prototype.isEmpty = function () {
        return this.size() == 0;
    };
    PriorityQueue.prototype.peek = function () {
        return this._heap[this._top];
    };
    PriorityQueue.prototype.push = function () {
        var _this = this;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        values.forEach(function (value) {
            _this._heap.push(value);
            _this._siftUp();
        });
        return this.size();
    };
    PriorityQueue.prototype.pop = function () {
        var poppedValue = this.peek();
        var bottom = this.size() - 1;
        if (bottom > this._top) {
            this._swap(this._top, bottom);
        }
        this._heap.pop();
        this._siftDown();
        return poppedValue;
    };
    PriorityQueue.prototype.replace = function (value) {
        var replacedValue = this.peek();
        this._heap[this._top] = value;
        this._siftDown();
        return replacedValue;
    };
    return PriorityQueue;
}());
exports.PriorityQueue = PriorityQueue;
//# sourceMappingURL=priorityQueue.js.map
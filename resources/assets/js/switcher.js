var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import ol from 'openlayers/dist/ol-debug';
var Switcher = (function (_super) {
    __extends(Switcher, _super);
    function Switcher(options) {
        var _this = _super.call(this) || this;
        _this.options = options || {};
        return _this;
    }
    return Switcher;
}(ol.control.Control));
export { Switcher };
//# sourceMappingURL=switcher.js.map
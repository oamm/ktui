"use strict";
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.KTScrollable = void 0;
var data_1 = require("../../helpers/data");
var dom_1 = require("../../helpers/dom");
var utils_1 = require("../../helpers/utils");
var component_1 = require("../component");
var KTScrollable = /** @class */ (function (_super) {
    __extends(KTScrollable, _super);
    function KTScrollable(element, config) {
        var _this = _super.call(this) || this;
        _this._name = 'scrollable';
        _this._defaultConfig = {
            save: true,
            dependencies: '',
            wrappers: '',
            offset: '',
        };
        _this._config = _this._defaultConfig;
        _this._elementId = null;
        if (data_1.default.has(element, _this._name))
            return _this;
        _this._init(element);
        _this._buildConfig(config);
        if (!_this._element)
            return _this;
        _this._elementId = _this._element.getAttribute('id');
        _this._handlers();
        _this._update();
        return _this;
    }
    KTScrollable.prototype._handlers = function () {
        var _this = this;
        if (!this._element)
            return;
        this._element.addEventListener('scroll', function () {
            if (!_this._element)
                return;
            localStorage.setItem("".concat(_this._elementId, "st"), _this._element.scrollTop.toString());
        });
    };
    KTScrollable.prototype._update = function () {
        this._setupHeight();
        this._setupState();
    };
    KTScrollable.prototype._setupHeight = function () {
        if (!this._element)
            return;
        var heightType = this._getHeightType();
        var height = this._getHeight();
        // Set height
        if (height && height.length > 0) {
            this._element.style.setProperty(heightType, height);
        }
        else {
            this._element.style.setProperty(heightType, '');
        }
    };
    KTScrollable.prototype._setupState = function () {
        if (!this._element)
            return;
        var stateEnabled = this._getOption('state') === true;
        var elementIdExists = Boolean(this._elementId);
        if (stateEnabled && elementIdExists) {
            var storedPosition = localStorage.getItem(this._elementId + 'st');
            if (storedPosition) {
                var pos = parseInt(storedPosition);
                if (pos > 0) {
                    this._element.scroll({
                        top: pos,
                        behavior: 'instant'
                    });
                }
            }
        }
    };
    KTScrollable.prototype._getHeight = function () {
        var height = this._getHeightOption();
        if (height !== null && typeof height === 'string' && height.toLowerCase() === 'auto') {
            return this._getAutoHeight();
        }
        else if (height) {
            return parseInt(height).toString() + 'px';
        }
        else {
            return '0';
        }
    };
    KTScrollable.prototype._getAutoHeight = function () {
        var _this = this;
        if (!this._element)
            return '';
        var height = dom_1.default.getViewPort().height;
        var dependencies = this._getOption('dependencies');
        var wrappers = this._getOption('wrappers');
        var offset = this._getOption('offset');
        height -= this._getElementSpacing(this._element);
        if (dependencies && dependencies.length > 0) {
            var elements = document.querySelectorAll(dependencies);
            elements.forEach(function (element) {
                if (dom_1.default.getCssProp(element, 'display') === 'none') {
                    return;
                }
                height -= _this._getElementHeight(element);
            });
        }
        if (wrappers && wrappers.length > 0) {
            var elements = document.querySelectorAll(wrappers);
            elements.forEach(function (element) {
                if (dom_1.default.getCssProp(element, 'display') === 'none') {
                    return;
                }
                height -= _this._getElementSpacing(element);
            });
        }
        if (offset && offset.length > 0) {
            height -= parseInt(offset);
        }
        return height.toString() + 'px';
    };
    KTScrollable.prototype._getElementHeight = function (element) {
        var height = 0;
        if (!element) {
            return height;
        }
        var computedStyle = window.getComputedStyle(element);
        if (computedStyle.height) {
            height += parseInt(computedStyle.height);
        }
        if (computedStyle.marginTop) {
            height += parseInt(computedStyle.marginTop);
        }
        if (computedStyle.marginBottom) {
            height += parseInt(computedStyle.marginBottom);
        }
        if (computedStyle.borderTopWidth) {
            height += parseInt(computedStyle.borderTopWidth);
        }
        if (computedStyle.borderBottomWidth) {
            height += parseInt(computedStyle.borderBottomWidth);
        }
        return height;
    };
    KTScrollable.prototype._getElementSpacing = function (element) {
        var spacing = 0;
        if (!element) {
            return spacing;
        }
        var computedStyle = window.getComputedStyle(element);
        if (computedStyle.marginTop) {
            spacing += parseInt(computedStyle.marginTop);
        }
        if (computedStyle.marginBottom) {
            spacing += parseInt(computedStyle.marginBottom);
        }
        if (computedStyle.paddingTop) {
            spacing += parseInt(computedStyle.paddingTop);
        }
        if (computedStyle.paddingBottom) {
            spacing += parseInt(computedStyle.paddingBottom);
        }
        if (computedStyle.borderTopWidth) {
            spacing += parseInt(computedStyle.borderTopWidth);
        }
        if (computedStyle.borderBottomWidth) {
            spacing += parseInt(computedStyle.borderBottomWidth);
        }
        return spacing;
    };
    KTScrollable.prototype._getHeightType = function () {
        if (this._getOption('minHeight')) {
            return 'min-height';
        }
        if (this._getOption('maxHeight')) {
            return 'max-height';
        }
        else {
            return 'height';
        }
    };
    KTScrollable.prototype._getHeightOption = function () {
        var heightType = this._getHeightType();
        if (heightType == 'min-height') {
            return this._getOption('minHeight');
        }
        if (heightType == 'max-height') {
            return this._getOption('maxHeight');
        }
        else {
            return this._getOption('height');
        }
    };
    KTScrollable.prototype.update = function () {
        return this._update();
    };
    KTScrollable.prototype.getHeight = function () {
        return this._getHeight();
    };
    KTScrollable.getInstance = function (element) {
        if (!element)
            return null;
        if (data_1.default.has(element, 'scrollable')) {
            return data_1.default.get(element, 'scrollable');
        }
        if (element.getAttribute('data-scrollable') === "true") {
            return new KTScrollable(element);
        }
        return null;
    };
    KTScrollable.getOrCreateInstance = function (element, config) {
        return this.getInstance(element) || new KTScrollable(element, config);
    };
    KTScrollable.createInstances = function () {
        var elements = document.querySelectorAll('[data-scrollable="true"]');
        elements.forEach(function (element) {
            new KTScrollable(element);
        });
    };
    KTScrollable.handleResize = function () {
        window.addEventListener('resize', function () {
            var timer;
            utils_1.default.throttle(timer, function () {
                // Locate and update scrollable instances on window resize
                var elements = document.querySelectorAll('[data-scrollable]');
                elements.forEach(function (element) {
                    var _a;
                    (_a = KTScrollable.getInstance(element)) === null || _a === void 0 ? void 0 : _a.update();
                });
            }, 200);
        });
    };
    KTScrollable.init = function () {
        KTScrollable.createInstances();
        if (window.KT_SCROLL_INITIALIZED !== true) {
            KTScrollable.handleResize();
            window.KT_SCROLL_INITIALIZED = true;
        }
    };
    return KTScrollable;
}(component_1.default));
exports.KTScrollable = KTScrollable;
//# sourceMappingURL=scrollable.js.map
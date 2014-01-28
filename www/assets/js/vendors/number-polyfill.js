(function () {
    (function (e) {
        var t, n;
        return t = document.createElement("input"), t.setAttribute("type", "number"), "text" !== t.type ? (e.fn.inputNumber = function () {
            return e(this)
        }, void 0) : (e.fn.inputNumber = function () {
            return e(this).filter('input[type="number"]').each(function () {
                n.polyfills.push(new n(this))
            }), e(this)
        }, n = function (t) {
            var i, r, o, s, a = this;
            this.elem = e(t), s = this.elem.outerHeight() / 2 + "px", this.upBtn = e("<div/>", {
                "class": "number-spin-btn number-spin-btn-up",
                style: "height: " + s
            }), this.downBtn = e("<div/>", {
                "class": "number-spin-btn number-spin-btn-down",
                style: "height: " + s
            }), this.btnContainer = e("<div/>", {
                "class": "number-spin-btn-container"
            }), i = e("<span/>", {
                style: "white-space: nowrap"
            }), this.upBtn.appendTo(this.btnContainer), this.downBtn.appendTo(this.btnContainer), this.elem.wrap(i), this.btnContainer.insertAfter(this.elem), this.elem.on({
                focus: function () {
                    a.elem.on({
                        DOMMouseScroll: n.domMouseScrollHandler,
                        mousewheel: n.mouseWheelHandler
                    }, {
                        p: a
                    })
                },
                blur: function () {
                    a.elem.off({
                        DOMMouseScroll: n.domMouseScrollHandler,
                        mousewheel: n.mouseWheelHandler
                    })
                }
            }), this.elem.on({
                keypress: n.elemKeypressHandler,
                change: n.elemChangeHandler
            }, {
                p: this
            }), this.upBtn.on("mousedown", {
                p: this,
                func: "increment"
            }, n.elemBtnMousedownHandler), this.downBtn.on("mousedown", {
                p: this,
                func: "decrement"
            }, n.elemBtnMousedownHandler), this.elem.css("textAlign", "right"), this.attrMutationHandler("class"), "undefined" != typeof WebKitMutationObserver && null !== WebKitMutationObserver || r !== void 0 && null !== r ? ("undefined" == typeof WebKitMutationObserver || null === WebKitMutationObserver || void 0 !== r && null !== r || (r = WebKitMutationObserver), o = new r(function (e) {
                var t, n, i;
                for (n = 0, i = e.length; i > n; n++) t = e[n], "attributes" === t.type && a.attrMutationHandler(t.attributeName, t.oldValue, a.elem.attr(t.attributeName))
            }), o.observe(t, {
                attributes: !0,
                attributeOldValue: !0,
                attributeFilter: ["class", "style", "min", "max", "step"]
            })) : "undefined" != typeof MutationEvent && null !== MutationEvent && this.elem.on("DOMAttrModified", function (e) {
                a.attrMutationHandler(e.originalEvent.attrName, e.originalEvent.prevValue, e.originalEvent.newValue)
            })
        }, n.polyfills = [], n.isNumber = function (e) {
            return null != e && "function" == typeof e.toString ? /^-?\d+(?:\.\d+)?$/.test("" + e) : !1
        }, n.isFloat = function (e) {
            return null != e && "function" == typeof e.toString ? /^-?\d+\.\d+$/.test("" + e) : !1
        }, n.isInt = function (e) {
            return null != e && "function" == typeof e.toString ? /^-?\d+$/.test("" + e) : !1
        }, n.isNegative = function (e) {
            return null != e && "function" == typeof e.toString ? /^-\d+(?:\.\d+)?$/.test("" + e) : !1
        }, n.raiseNum = function (e) {
            var t, i, r;
            if ("number" == typeof e || "object" == typeof e && e instanceof Number) return e % 1 ? {
                num: "" + e,
                precision: 0
            } : n.raiseNum("" + e);
            if ("string" == typeof e || "object" == typeof e && e instanceof String) {
                if (n.isFloat(e)) return e = e.replace(/(\.\d)0+$/, "$1"), r = n.getPrecision(e), i = e.slice(0, -(r + 1)) + e.slice(-r), i = i.replace(/^(-?)0+(\d+)/, "$1$2"), t = {
                    num: i,
                    precision: r
                };
                if (n.isInt(e)) return {
                    num: e,
                    precision: 0
                }
            }
        }, n.raiseNumPrecision = function (e, n) {
            var i, r;
            if (n > e.precision) {
                for (t = i = r = e.precision; n >= r ? n > i : i > n; t = n >= r ? ++i : --i) e.num += "0";
                e.precision = n
            }
        }, n.lowerNum = function (e) {
            if (e.precision > 0) {
                for (; e.num.length < e.precision + 1;) e.num = n.isNegative(e.num) ? e.num.slice(0, 1) + "0" + e.num.slice(1) : "0" + e.num;
                return (e.num.slice(0, -e.precision) + "." + e.num.slice(-e.precision)).replace(/\.?0+$/, "").replace(/^(-?)(\.)/, "$10$2")
            }
            return e.num
        }, n.preciseAdd = function (e, t) {
            var i, r, o;
            if (("number" == typeof e || "object" == typeof e && e instanceof Number) && ("number" == typeof t || "object" == typeof t && t instanceof Number)) return 0 === e % 1 && 0 === t % 1 ? "" + (e + t) : n.preciseAdd("" + e, "" + t);
            if (("string" == typeof e || "object" == typeof e && e instanceof String) && ("string" == typeof t || "object" == typeof t && t instanceof String)) {
                if (n.isNumber(e)) {
                    if (n.isNumber(t)) {
                        if (n.isInt(e)) {
                            if (n.isInt(t)) return n.preciseAdd(parseInt(e, 10), parseInt(t, 10));
                            n.isFloat(t) && (e += ".0")
                        } else n.isFloat(e) && n.isInt(t) && (t += ".0"); if (i = n.raiseNum(e), r = n.raiseNum(t), i.precision < r.precision ? n.raiseNumPrecision(i, r.precision) : i.precision > r.precision && n.raiseNumPrecision(r, i.precision), o = "" + (parseInt(i.num, 10) + parseInt(r.num, 10)), i.precision > 0) {
                            if (n.isNegative(o))
                                for (; i.precision > o.length - 1;) o = "-0" + o.slice(1);
                            else
                                for (; i.precision > o.length;) o = "0" + o;
                            o = n.lowerNum({
                                num: o,
                                precision: i.precision
                            })
                        }
                        return o = o.replace(/^(-?)\./, "$10."), n.isFloat(o) && (o = o.replace(/0+$/, "")), o
                    }
                    throw new SyntaxError('Argument "' + t + '" is not a number.')
                }
                throw new SyntaxError('Argument "' + e + '" is not a number.')
            }
            return n.preciseAdd("" + e, "" + t)
        }, n.preciseSubtract = function (e, t) {
            return "number" == typeof t || "object" == typeof t && t instanceof Number ? n.preciseAdd(e, -t) : "string" == typeof t || "object" == typeof t && t instanceof String ? n.isNegative(t) ? n.preciseAdd(e, t.slice(1)) : n.preciseAdd(e, "-" + t) : void 0
        }, n.getPrecision = function (e) {
            var t, i;
            if ("number" == typeof e) {
                for (t = 0, i = e; i !== Math.floor(i);) i = e * Math.pow(10, ++t);
                return t
            }
            return "string" == typeof e && n.isNumber(e) ? n.isFloat(e) ? /^-?\d+(?:\.(\d+))?$/.exec(e)[1].length : 0 : void 0
        }, n.prototype.getParams = function () {
            var e, t, i, r;
            return i = this.elem.attr("step"), t = this.elem.attr("min"), e = this.elem.attr("max"), r = this.elem.val(), n.isNumber(i) || (i = null), n.isNumber(t) || (t = null), n.isNumber(e) || (e = null), n.isNumber(r) || (r = t || 0), {
                min: null != t ? t : null,
                max: null != e ? e : null,
                step: null != i ? i : "1",
                val: null != r ? r : null
            }
        }, n.prototype.clipValues = function (e, t, n) {
            return null != n && parseFloat(e) > parseFloat(n) ? n : null != t && parseFloat(e) < parseFloat(t) ? t : e
        }, n.prototype.stepNormalize = function (e) {
            var t, i, r, o, s;
            return r = this.getParams(), s = r.step, i = r.min, null == s ? e : (s = n.raiseNum(s), t = n.raiseNum(e), t.precision > s.precision ? n.raiseNumPrecision(s, t.precision) : t.precision < s.precision && n.raiseNumPrecision(t, s.precision), null != i && (t = n.raiseNum(n.preciseSubtract(e, i)), n.raiseNumPrecision(t, s.precision)), 0 === parseFloat(t.num) % parseFloat(s.num) ? e : (t = n.lowerNum({
                num: "" + Math.round(parseFloat(t.num) / (o = parseFloat(s.num))) * o,
                precision: t.precision
            }), null != i && (t = n.preciseAdd(t, i)), t))
        }, n.domMouseScrollHandler = function (e) {
            var t;
            t = e.data.p, e.preventDefault(), 0 > e.originalEvent.detail ? t.increment() : t.decrement()
        }, n.mouseWheelHandler = function (e) {
            var t;
            t = e.data.p, e.preventDefault(), e.originalEvent.wheelDelta > 0 ? t.increment() : t.decrement()
        }, n.elemKeypressHandler = function (e) {
            var t, n, i;
            t = e.data.p, 38 === e.keyCode ? t.increment() : 40 === e.keyCode ? t.decrement() : 8 !== (n = e.keyCode) && 9 !== n && 35 !== n && 36 !== n && 37 !== n && 39 !== n && 46 !== n && 45 !== (i = e.which) && 48 !== i && 49 !== i && 50 !== i && 51 !== i && 52 !== i && 53 !== i && 54 !== i && 55 !== i && 56 !== i && 57 !== i && e.preventDefault()
        }, n.elemChangeHandler = function (e) {
            var t, i, r, o;
            r = e.data.p, n.isNumber(r.elem.val()) ? (o = r.getParams(), i = r.clipValues(o.val, o.min, o.max), i = r.stepNormalize(i), "" + i !== r.elem.val() && r.elem.val(i).change()) : (t = r.elem.attr("min"), r.elem.val(null != t && n.isNumber(t) ? t : "0").change())
        }, n.elemBtnMousedownHandler = function (t) {
            var n, i, r, o;
            i = t.data.p, n = t.data.func, i[n](), o = function () {
                i[n](), i.timeoutID = window.setTimeout(o, 10)
            }, r = function () {
                window.clearTimeout(i.timeoutID), e(document).off("mouseup", r), i.upBtn.off("mouseleave", r)
            }, e(document).on("mouseup", r), i.upBtn.on("mouseleave", r), i.timeoutID = window.setTimeout(o, 700)
        }, n.prototype.attrMutationHandler = function (e) {
            var n, i, r, o, s;
            if ("class" === e || "style" === e) {
                for (i = {}, n = null, s = ["opacity", "visibility", "-moz-transition-property", "-moz-transition-duration", "-moz-transition-timing-function", "-moz-transition-delay", "-webkit-transition-property", "-webkit-transition-duration", "-webkit-transition-timing-function", "-webkit-transition-delay", "-o-transition-property", "-o-transition-duration", "-o-transition-timing-function", "-o-transition-delay", "transition-property", "transition-duration", "transition-timing-function", "transition-delay"], r = 0, o = s.length; o > r; r++) t = s[r], (n = this.elem.css(t)) !== this.btnContainer.css(t) && (i[t] = n); /*i.display="none"===this.elem.css("display")?"none":"inline-block",*/
                this.btnContainer.css(i)
            } else("min" === e || "max" === e || "step" === e) && this.elem.change()
        }, n.prototype.increment = function () {
            var e, t;
            this.elem.is(":disabled") || (t = this.getParams(), e = n.preciseAdd(t.val, t.step), null != t.max && parseFloat(e) > parseFloat(t.max) && (e = t.max), e = this.stepNormalize(e), this.elem.val(e).change())
        }, n.prototype.decrement = function () {
            var e, t;
            this.elem.is(":disabled") || (t = this.getParams(), e = n.preciseSubtract(t.val, t.step), null != t.min && parseFloat(e) < parseFloat(t.min) && (e = t.min), e = this.stepNormalize(e), this.elem.val(e).change())
        }, e(function () {
            e('input[type="number"]').inputNumber()
        }), void 0)
    })(jQuery)
}).call(this);
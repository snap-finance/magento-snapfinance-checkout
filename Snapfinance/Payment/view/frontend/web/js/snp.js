! function(e) {
    function r(r) {
        for (var n, f, i = r[0], l = r[1], a = r[2], c = 0, s = []; c < i.length; c++) o[f = i[c]] && s.push(o[f][0]), o[f] = 0;
        for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (e[n] = l[n]);
        for (p && p(r); s.length;) s.shift()();
        return u.push.apply(u, a || []), t()
    }

    function t() {
        for (var e, r = 0; r < u.length; r++) {
            for (var t = u[r], n = !0, i = 1; i < t.length; i++) 0 !== o[t[i]] && (n = !1);
            n && (u.splice(r--, 1), e = f(f.s = t[0]))
        }
        return e
    }
    var n = {},
        o = {
            0: 0
        },
        u = [];

    function f(r) {
        if (n[r]) return n[r].exports;
        var t = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(t.exports, t, t.exports, f), t.l = !0, t.exports
    }
    f.m = e, f.c = n, f.d = function(e, r, t) {
        f.o(e, r) || Object.defineProperty(e, r, {
            enumerable: !0,
            get: t
        })
    }, f.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, f.t = function(e, r) {
        if (1 & r && (e = f(e)), 8 & r) return e;
        if (4 & r && "object" == typeof e && e && e.__esModule) return e;
        var t = Object.create(null);
        if (f.r(t), Object.defineProperty(t, "default", {
                enumerable: !0,
                value: e
            }), 2 & r && "string" != typeof e)
            for (var n in e) f.d(t, n, (function(r) {
                return e[r]
            }).bind(null, n));
        return t
    }, f.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return f.d(r, "a", r), r
    }, f.o = function(e, r) {
        return Object.prototype.hasOwnProperty.call(e, r)
    }, f.p = "";
    var i = window.webpackJsonp = window.webpackJsonp || [],
        l = i.push.bind(i);
    i.push = r, i = i.slice();
    for (var a = 0; a < i.length; a++) r(i[a]);
    var p = l;
    t()
}([]);
(window.webpackJsonp = window.webpackJsonp || []).push([
    [2], {
        1: function(n, o, p) {
            n.exports = p("YUB5")
        },
        YUB5: function(n, o) {}
    },
    [
        [1, 0]
    ]
]);
(window.webpackJsonp = window.webpackJsonp || []).push([
    [1], {
        "/j1x": function(t, e, n) {
            var o = n("wqh0");
            t.exports = function(t) {
                var e = t.replace(/-/g, "+").replace(/_/g, "/");
                switch (e.length % 4) {
                    case 0:
                        break;
                    case 2:
                        e += "==";
                        break;
                    case 3:
                        e += "=";
                        break;
                    default:
                        throw "Illegal base64url string!"
                }
                try {
                    return decodeURIComponent(o(e).replace(/(.)/g, function(t, e) {
                        var n = e.charCodeAt(0).toString(16).toUpperCase();
                        return n.length < 2 && (n = "0" + n), "%" + n
                    }))
                } catch (n) {
                    return o(e)
                }
            }
        },
        0: function(t, e, n) {
            t.exports = n("gmml")
        },
        BZeJ: function(t, e, n) {},
        O5UZ: function(t, e, n) {
            "use strict";
            var o, i, r;
            n.d(e, "h", function() {
                    return o
                }), n.d(e, "g", function() {
                    return i
                }), n.d(e, "d", function() {
                    return r
                }), n.d(e, "e", function() {
                    return a
                }), n.d(e, "b", function() {
                    return s
                }), n.d(e, "a", function() {
                    return c
                }), n.d(e, "f", function() {
                    return u
                }), n.d(e, "c", function() {
                    return l
                }),
                function(t) {
                    t.Initialized = "Initialized", t.Launched = "Launched", t.Clicked = "Clicked", t.Create = "Create", t.Approved = "Approved", t.Denied = "Denied", t.Canceled = "Canceled", t.Closed = "Closed", t.Notification = "Notification", t.Error = "Error"
                }(o || (o = {})),
                function(t) {
                    t.Created = "Created", t.Validated = "Validated", t.Completed = "Completed", t.Initialized = "Initialized"
                }(i || (i = {})),
                function(t) {
                    t.AuthenticationError = "AuthenticationError", t.ValidationError = "ValidationError", t.SystemError = "SystemError"
                }(r || (r = {}));
            var a = function() {
                    this.type = o.Initialized
                },
                s = function(t, e) {
                    this.type = o.Create, this.transaction = t, this.merchantToken = e
                },
                c = function() {
                    this.type = o.Clicked
                },
                u = function(t, e) {
                    this.type = o.Notification, this.message = {
                        type: t,
                        content: e
                    }
                },
                l = function(t, e) {
                    this.type = o.Error, this.message = {
                        type: t,
                        content: e
                    }
                }
        },
        W6Y6: function(t, e) {},
        WKkh: function(t, e, n) {
            "use strict";
            var o, i;
            ! function(t) {
                t[t.OK = 200] = "OK", t[t.BAD_REQUEST = 400] = "BAD_REQUEST", t[t.UNAUTHORIZED = 401] = "UNAUTHORIZED", t[t.NOT_FOUND = 404] = "NOT_FOUND", t[t.SYSTEM_ERROR = 500] = "SYSTEM_ERROR"
            }(o || (o = {})), i || (i = {})
        },
        "X+xd": function(t, e) {},
        gmml: function(t, e, n) {
            "use strict";
            n.r(e);
            var o, i = n("kj8z");

            function r(t, e, n, o) {
                return new(n || (n = Promise))(function(i, r) {
                    function a(t) {
                        try {
                            c(o.next(t))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function s(t) {
                        try {
                            c(o.throw(t))
                        } catch (e) {
                            r(e)
                        }
                    }

                    function c(t) {
                        t.done ? i(t.value) : new n(function(e) {
                            e(t.value)
                        }).then(a, s)
                    }
                    c((o = o.apply(t, e || [])).next())
                })
            }

            function a(t, e) {
                var n, o, i, r, a = {
                    label: 0,
                    sent: function() {
                        if (1 & i[0]) throw i[1];
                        return i[1]
                    },
                    trys: [],
                    ops: []
                };
                return r = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (r[Symbol.iterator] = function() {
                    return this
                }), r;

                function s(r) {
                    return function(s) {
                        return function(r) {
                            if (n) throw new TypeError("Generator is already executing.");
                            for (; a;) try {
                                if (n = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done) return i;
                                switch (o = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;
                                    case 4:
                                        return a.label++, {
                                            value: r[1],
                                            done: !1
                                        };
                                    case 5:
                                        a.label++, o = r[1], r = [0];
                                        continue;
                                    case 7:
                                        r = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            a.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && a.label < i[1]) {
                                            a.label = i[1], i = r;
                                            break
                                        }
                                        if (i && a.label < i[2]) {
                                            a.label = i[2], a.ops.push(r);
                                            break
                                        }
                                        i[2] && a.ops.pop(), a.trys.pop();
                                        continue
                                }
                                r = e.call(t, a)
                            } catch (s) {
                                r = [6, s], o = 0
                            } finally {
                                n = i = 0
                            }
                            if (5 & r[0]) throw r[1];
                            return {
                                value: r[0] ? r[1] : void 0,
                                done: !0
                            }
                        }([r, s])
                    }
                }
            }! function(t) {
                t.SUCCESS = "SUCCESS", t.FAILED = "FAILED"
            }(o || (o = {}));
            var s, c, u = function() {
                    function t(t, e, n) {
                        void 0 === e && (e = 576), void 0 === n && (n = 750), this.content = t, this._width = e, this._height = n
                    }
                    return Object.defineProperty(t.prototype, "content", {
                        get: function() {
                            return this._content
                        },
                        set: function(t) {
                            this._content = t
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t.prototype.open = function() {
                        var t = this,
                            e = window.document;
                        this._backDrop || (this._backDrop = e.createElement("div")), this._backDrop.style.display = "block", this._backDrop.style.position = "fixed", this._backDrop.style.zIndex = "1", this._backDrop.style.left = "0", this._backDrop.style.top = "0", this._backDrop.style.overflow = "auto", this._backDrop.style.backgroundColor = "rgba(0,0,0,0.4)", this._container || (this._container = e.createElement("div")), this._container.style.borderStyle = "solid", this._container.style.borderColor = "#888", this._container.style.backgroundColor = "#fefefe", this._setModalSize(), window.addEventListener("resize", function() {
                            t._setModalSize()
                        }), this._container.append(this.content), this._backDrop.append(this._container), window.document.body.append(this._backDrop)
                    }, t.prototype.close = function() {
                        this._container.removeChild(this.content), this._backDrop.removeChild(this._container), this._backDrop.style.display = "none"
                    }, t.prototype._setModalSize = function() {
                        var t = this._getScreenWidth(),
                            e = this._getScreenHeight();
                        this._backDrop.style.padding = "none", this._backDrop.style.margin = "auto", this._backDrop.style.width = t + "px", this._backDrop.style.height = e + "px";
                        var n = this._height - 20,
                            o = e - 20,
                            i = Math.min(t - 20, this._width - 20),
                            r = Math.min(o, n);
                        this._container.style.padding = "5px", this._container.style.borderWidth = "5px", this._container.style.width = i + "px", this._container.style.height = r + "px", this._container.style.margin = "auto"
                    }, t.prototype._getScreenWidth = function() {
                        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
                    }, t.prototype._getScreenHeight = function() {
                        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
                    }, t
                }(),
                l = function() {
                    function t(t) {
                        this._messageHandlers = [], this._session = t
                    }
                    return t.prototype.addMessageHandler = function(t) {
                        this._messageHandlers.push(t)
                    }, t.prototype.launchCheckout = function(t) {
                        var e = this,
                            n = t.products.reduce(function(t, e) {
                                return t + e.quantity * e.price
                            }, 0) + t.taxAmount,
                            r = this._session.checkoutMinimumAmount;
                        if (n < r) {
                            var a = new u,
                                s = this._getErrorModalContents(a, n, r);
                            return a.content = s, void a.open()
                        }
                        this._validate(t).then(function(n) {
                            if (n.shoppingCart.validationResult === o.SUCCESS) return e._launchApply(e._session.checkoutParamId), void(e._session.checkoutTransaction = t);
                            var r = "Validation Errors: " + n.shoppingCart.validationErrors,
                                a = new i.ErrorMessage(i.ErrorType.ValidationError, r);
                            throw e._handleMessage(a), new Error(r)
                        })
                    }, t.prototype.placeOrder = function(t) {
                        var e = this;
                        return new Promise(function(n, o) {
                            return r(e, void 0, void 0, function() {
                                var e, r, s, c;
                                return a(this, function(a) {
                                    switch (a.label) {
                                        case 0:
                                            e = "An error occured while placing order on snap application id: " + t, a.label = 1;
                                        case 1:
                                            return a.trys.push([1, 4, , 5]), [4, fetch(this._session.endpoints.snap + "/application/complete/" + t, {
                                                method: "POST",
                                                headers: {
                                                    Authorization: "Bearer " + this._session.token,
                                                    "Content-Type": "application/json",
                                                    Accept: "*/*"
                                                }
                                            })];
                                        case 2:
                                            return [4, (r = a.sent()).json()];
                                        case 3:
                                            if (s = a.sent(), r.ok && s.success) return this._handleMessage(new i.NotificationMessage(i.NotificationType.Completed, "Order placed for application " + t + ".")), [2, n()];
                                            switch (c = s, r.status) {
                                                case 401:
                                                    this._handleMessage(new i.ErrorMessage(i.ErrorType.AuthenticationError, e = "Snap Error: " + c.statusMessage + ".  " + c[0].error));
                                                    break;
                                                case 404:
                                                    this._handleMessage(new i.ErrorMessage(i.ErrorType.SystemError, e = "Snap Error: Application with id " + t + " was not found."))
                                            }
                                            return o(e), [2];
                                        case 4:
                                            throw a.sent();
                                        case 5:
                                            return [2]
                                    }
                                })
                            })
                        })
                    }, t.prototype.validateTransaction = function(t) {
                        return r(this, void 0, Promise, function() {
                            var e = this;
                            return a(this, function(n) {
                                return [2, this._validate(t).then(function(t) {
                                    if (t.shoppingCart.validationResult !== o.SUCCESS) {
                                        var n = "Validation Errors: " + JSON.stringify(t.shoppingCart.validationErrors),
                                            r = new i.ErrorMessage(i.ErrorType.ValidationError, n);
                                        throw e._handleMessage(r), new Error(n)
                                    }
                                    e._handleMessage(new i.NotificationMessage(i.NotificationType.Validated, "Snap checkout transaction validation succeeded."))
                                })]
                            })
                        })
                    }, t.prototype._validate = function(t) {
                        return r(this, void 0, Promise, function() {
                            var e, n = this;
                            return a(this, function(o) {
                                return e = "Snap checkout button failed to validate.", [2, new Promise(function(o, i) {
                                    return r(n, void 0, void 0, function() {
                                        var n, r, s, c;
                                        return a(this, function(a) {
                                            switch (a.label) {
                                                case 0:
                                                    return a.trys.push([0, 3, , 4]), [4, fetch(this._session.endpoints.snap + "/shopping-cart", {
                                                        method: "POST",
                                                        headers: {
                                                            Authorization: "Bearer " + this._session.token,
                                                            "Content-Type": "application/json"
                                                        },
                                                        body: JSON.stringify(t)
                                                    })];
                                                case 1:
                                                    return [4, (n = a.sent()).json()];
                                                case 2:
                                                    if (r = a.sent(), n.ok && (s = r).success) return o(s.data), [2];
                                                    switch (c = r, n.status) {
                                                        case 401:
                                                            e = "Snap Error: " + c.statusMessage + ".  " + c[0].error
                                                    }
                                                    return i(e), [2];
                                                case 3:
                                                    throw a.sent(), new Error(e);
                                                case 4:
                                                    return [2]
                                            }
                                        })
                                    })
                                })]
                            })
                        })
                    }, t.prototype._launchApply = function(t) {
                        var e = document.createElement("iframe");
                        e.src = this._session.endpoints.apply + "/steps/welcome?paramId=" + t, e.style.width = "100%", e.style.height = "100%", e.style.margin = "auto", e.style.padding = "0px", e.style.border = "none";
                        var n = new u(e, 576, 750);
                        this._session.checkoutWindow = n, n.open()
                    }, t.prototype._handleMessage = function(t) {
                        var e, n;
                        try {
                            for (var o = function(t) {
                                    var e = "function" == typeof Symbol && t[Symbol.iterator],
                                        n = 0;
                                    return e ? e.call(t) : {
                                        next: function() {
                                            return t && n >= t.length && (t = void 0), {
                                                value: t && t[n++],
                                                done: !t
                                            }
                                        }
                                    }
                                }(this._messageHandlers), i = o.next(); !i.done; i = o.next()) i.value.handleMessage(t)
                        } catch (r) {
                            e = {
                                error: r
                            }
                        } finally {
                            try {
                                i && !i.done && (n = o.return) && n.call(o)
                            } finally {
                                if (e) throw e.error
                            }
                        }
                    }, t.prototype._getErrorModalContents = function(t, e, n) {
                        var o = document.createElement("div");
                        o.style.width = "100%", o.style.height = "100%", o.style.margin = "20px", o.style.padding = "0px", o.style.border = "none", o.style.fontFamily = "Open Sans Regular";
                        var i = document.createElement("img");
                        i.src = "https://snapcmsimages.s3.amazonaws.com/snaplogo.png", i.style.width = "100px";
                        var r = document.createElement("h1");
                        r.textContent = "Transaction Below Minimum", r.style.fontSize = "19px", r.style.color = "#666666", r.style.paddingBottom = "8px";
                        var a = document.createElement("p");
                        a.textContent = "Your transaction total of $" + e + " is below Snap required minimum of $" + n + ".";
                        var s = document.createElement("p");
                        s.textContent = "Please increase the value of your shopping cart.";
                        var c = document.createElement("p");
                        return c.textContent = "Cancel & return to checkout.", c.style.cursor = "pointer", c.style.color = "#184E90", c.style.fontSize = "16px", c.style.color = "#184e90", c.addEventListener("click", function() {
                            t.close()
                        }), o.appendChild(i), o.appendChild(r), o.appendChild(a), o.appendChild(s), o.appendChild(c), o
                    }, t
                }();
            ! function(t) {
                t.light = "light", t.dark = "dark"
            }(s || (s = {})),
            function(t) {
                t.rect = "rect", t.rounded = "rounded", t.pill = "pill"
            }(c || (c = {}));
            var h, p = n("kqAp"),
                d = function() {
                    function t() {}
                    return t.endpointsForAudience = function(e) {
                        switch (e) {
                            case t._endpoints.prod.snap:
                                return t._endpoints.prod;
                            case t._endpoints.sandbox.snap:
                                return console.log("sdk using sandbox endpoints"), t._endpoints.sandbox;
                            case t._endpoints.dev.snap:
                                return console.log("sdk using dev endpoints"), t._endpoints.dev;
                            default:
                                throw new Error("Unsupported token endpoint: " + e)
                        }
                    }, t._endpoints = {
                        dev: {
                            snap: "https://api-qa.snapfinance.com/v2/internal",
                            apply: "https://qa15-apply.snapfinance.com"
                        },
                        sandbox: {
                            snap: "https://api-sandbox.snapfinance.com/v2/internal",
                            apply: "https://apply-sandbox.snapfinance.com"
                        },
                        prod: {
                            snap: "https://api.snapfinance.com/v2/internal",
                            apply: "https://apply.snapfinance.com"
                        }
                    }, t
                }(),
                f = function() {
                    function t(t, e) {
                        this._token = t, this._endpoints = e
                    }
                    return t.init = function(e) {
                        try {
                            if (!t._instance$) {
                                var n = d.endpointsForAudience(p(e).aud);
                                t._instance$ = t._getMerchantSettings(e, n.snap).then(function(o) {
                                    var i = new t(e, n);
                                    return i._checkoutMinimumAmount = o.transactionConstraints.minAmount, i._checkoutParamId = o.paramId, i
                                }).catch(function(t) {
                                    throw t
                                })
                            }
                            return t
                        } catch (i) {
                            throw i
                        }
                    }, t.getInstance = function() {
                        if (!t._instance$) throw new Error("Snap session not initialized.");
                        return t._instance$
                    }, Object.defineProperty(t.prototype, "token", {
                        get: function() {
                            return this._token
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "endpoints", {
                        get: function() {
                            return this._endpoints
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "checkoutParamId", {
                        get: function() {
                            return this._checkoutParamId
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "checkoutMinimumAmount", {
                        get: function() {
                            return this._checkoutMinimumAmount
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "checkoutTransaction", {
                        get: function() {
                            return this._checkoutTransaction
                        },
                        set: function(t) {
                            this._checkoutTransaction = t
                        },
                        enumerable: !0,
                        configurable: !0
                    }), Object.defineProperty(t.prototype, "checkoutWindow", {
                        get: function() {
                            return this._checkoutWindow
                        },
                        set: function(t) {
                            this._checkoutWindow = t
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t._getMerchantSettings = function(t, e) {
                        var n = this,
                            o = "Snap failed to initialize merchant settings.";
                        return new Promise(function(i, s) {
                            return r(n, void 0, void 0, function() {
                                var n, r, c, u;
                                return a(this, function(a) {
                                    switch (a.label) {
                                        case 0:
                                            return a.trys.push([0, 3, , 4]), [4, fetch(e + "/merchants/settings", {
                                                method: "GET",
                                                headers: {
                                                    Authorization: "Bearer " + t
                                                }
                                            })];
                                        case 1:
                                            return [4, (n = a.sent()).json()];
                                        case 2:
                                            if (r = a.sent(), n.ok && (c = r).success) return i(c.data), [2];
                                            switch (u = r, n.status) {
                                                case 401:
                                                    o = "Snap Error: " + u.statusMessage + ".  " + u[0].error
                                            }
                                            return s(o), [2];
                                        case 3:
                                            throw a.sent(), new Error(o);
                                        case 4:
                                            return [2]
                                    }
                                })
                            })
                        })
                    }, t
                }(),
                g = function() {
                    function t(t) {
                        this._config = t;
                        var e = this._createImageElement();
                        this.button = this._createButtonElement(e)
                    }
                    return t.prototype.getButton = function() {
                        return this.button
                    }, t.prototype._createImageElement = function() {
                        var t = document.createElement("img");
                        return t.style.height = "100%", t.src = this._getImageUrlForColor(this._config.style.color), t
                    }, t.prototype._createButtonElement = function(t) {
                        var e = document.createElement("button");
                        e.type = "button", e.style.display = "block", e.style.outline = "none", e.style.border = "none", e.style.padding = "0px", e.style.margin = "0px";
                        var n = 0;
                        switch (e.style.boxShadow = "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)", e.style.borderWidth = "0px", this._config.style.shape) {
                            case c.rect:
                                n = 0;
                                break;
                            case c.rounded:
                                n = this._config.style.height / 4;
                                break;
                            default:
                                n = this._config.style.height
                        }
                        e.style.borderRadius = n + "px";
                        var o = "white";
                        return this._config.style.color === s.dark && (o = "#184e90"), e.style.backgroundColor = o, e.appendChild(t), e
                    }, t.prototype._getImageUrlForColor = function(t) {
                        switch (t) {
                            case s.dark:
                                return "https://snapcmsimages.s3-us-west-2.amazonaws.com/checkout-with-snap-button-white.svg";
                            default:
                                return "https://snapcmsimages.s3-us-west-2.amazonaws.com/checkout-with-snap-button-blue.svg"
                        }
                    }, t
                }(),
                y = function() {
                    function t(t, e, n) {
                        this._session = n, this._checkoutButtonConfig = t, this._actions = e
                    }
                    return t.prototype.handleMessage = function(t) {
                        switch (console.log("Snap checkout message to merchant: ", t), t.type) {
                            case i.SnapDataType.Initialized:
                                this._checkoutButtonConfig.onInit(t, this._actions);
                                break;
                            case i.SnapDataType.Launched:
                                if (!this._session.checkoutWindow || !this._session.checkoutTransaction) {
                                    this.handleMessage(new i.ErrorMessage(i.ErrorType.SystemError, "Error on launch.  Transaction is blank or snap window was closed."));
                                    break
                                }
                                var e = new i.CreateMessage(this._session.checkoutTransaction, this._session.token);
                                this._session.checkoutWindow.content.contentWindow.postMessage(e, this._session.endpoints.apply);
                                break;
                            case i.SnapDataType.Clicked:
                                this._checkoutButtonConfig.onClick(t, this._actions);
                                break;
                            case i.SnapDataType.Approved:
                                this._checkoutButtonConfig.onApproved(t, this._actions);
                                break;
                            case i.SnapDataType.Denied:
                                this._checkoutButtonConfig.onDenied(t, this._actions);
                                break;
                            case i.SnapDataType.Canceled:
                                this._session.checkoutWindow && (this._session.checkoutWindow.close(), this._session.checkoutWindow = null), this._checkoutButtonConfig.onCanceled(t, this._actions);
                                break;
                            case i.SnapDataType.Closed:
                                this._session.checkoutWindow && (this._session.checkoutWindow.close(), this._session.checkoutWindow = null);
                                break;
                            case i.SnapDataType.Notification:
                                this._checkoutButtonConfig.onNotification(t, this._actions);
                                break;
                            case i.SnapDataType.Error:
                                this._checkoutButtonConfig.onError(t, this._actions);
                                break;
                            default:
                                console.log("Unimplemented checkout message sent to merchant: " + JSON.stringify(t))
                        }
                    }, t
                }(),
                m = {
                    color: s.dark,
                    shape: c.rounded,
                    height: 55
                },
                _ = function() {
                    function t(t) {
                        var e = this;
                        this._applyMessageHandler = function(t) {
                            t.origin && t.origin === e._session.endpoints.apply && e._messageHandler.handleMessage(t.data)
                        }, this.config = t, f.init(t.token).getInstance().then(function(t) {
                            e._session = t, window.addEventListener("message", e._applyMessageHandler, !1), e._actions = new l(t), e._messageHandler = new y(e.config, e._actions, t), e._actions.addMessageHandler(e._messageHandler), e._messageHandler.handleMessage(new i.InitializedMessage)
                        })
                    }
                    return t.prototype.render = function(t) {
                        var e = this;
                        void 0 === t && (t = "snap-checkout-button");
                        var n = document.getElementById(t);
                        if (!n) throw new Error("Snap checkout button can't find parent element with id: " + t);
                        var o = new g(this.config);
                        n.appendChild(o.button), o.button.addEventListener("click", function(t) {
                            try {
                                var n = new i.ClickedMessage;
                                e._messageHandler.handleMessage(n)
                            } catch (o) {
                                throw new Error("Snap checkout button was unable to initialize.")
                            }
                        })
                    }, Object.defineProperty(t.prototype, "config", {
                        get: function() {
                            return this._config
                        },
                        set: function(t) {
                            t.style = this._initConfigStyle(t.style), this._validateButtonConfig(t), this._config = t
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t.prototype._initConfigStyle = function(t) {
                        return void 0 === t && (t = m), {
                            color: t.color || m.color,
                            shape: t.shape || m.shape,
                            height: Math.min(Math.max(25, t.height || m.height), 55)
                        }
                    }, t.prototype._validateButtonConfig = function(t) {
                        if (!t.token || "" === t.token) throw new Error("Buttons configuration must supply a token");
                        if (this._validateButtonConfigStyle(t.style), !t.onInit) throw new Error("Buttons configuration must implement the onInit method.");
                        if (!t.onClick) throw new Error("Buttons configuration must implement the onClick method.");
                        if (!t.onApproved) throw new Error("Buttons configuration must implement the onApproved method.");
                        if (!t.onCanceled) throw new Error("Buttons configuration must implement the onCanceled method.");
                        if (!t.onNotification) throw new Error("Buttons configuration must implement the onNotification method.");
                        if (!t.onError) throw new Error("Buttons configuration must implement the onError method.")
                    }, t.prototype._validateButtonConfigStyle = function(t) {
                        if (t.color && Object.values(s).indexOf(t.color) < 0) throw new Error("Buttons configuration style color value of '" + t.color + "' is invalid.  Supported values are " + Object.values(s).toLocaleString());
                        if (t.shape && Object.values(c).indexOf(t.shape) < 0) throw new Error("Buttons configuration style shape value of '" + t.shape + "' is invalid.  Supported values are " + Object.values(c).toLocaleString());
                        if (t.height && "number" != typeof t.height || t.height < 25 || t.height > 55) throw new Error("Buttons configuration style height value must be a number between 25 and 55.")
                    }, t
                }();
            ! function(t) {
                t.light = "light", t.dark = "dark"
            }(h || (h = {}));
            var w = function() {
                    function t(t) {
                        this.config = t
                    }
                    return Object.defineProperty(t.prototype, "config", {
                        get: function() {
                            return this._config
                        },
                        set: function(t) {
                            t.style = this._initConfigStyle(t.style), this._validateConfig(t), this._config = t
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t.prototype.render = function(t) {
                        void 0 === t && (t = "snap-checkout-mark");
                        var e = document.getElementById(t);
                        if (!e) throw new Error("Snap checkout mark can't find parent element with id: " + t);
                        var n = document.createElement("img");
                        n.src = this._getMarkForColor(this.config.style.color), n.style.margin = "0px", n.style.border = "none", n.style.height = this.config.style.height + "px", e.appendChild(n)
                    }, t.prototype._getMarkForColor = function(t) {
                        switch (t) {
                            case h.dark:
                                return "https://snapcmsimages.s3-us-west-2.amazonaws.com/merchant-checkout-snap-option-blue.svg";
                            default:
                                return "https://snapcmsimages.s3-us-west-2.amazonaws.com/merchant-checkout-snap-option-white.svg"
                        }
                    }, t.prototype._initConfigStyle = function(e) {
                        return void 0 === e && (e = t.defaultMarkStyle), {
                            color: e.color || t.defaultMarkStyle.color,
                            height: Math.min(Math.max(t.minMarkHeight, e.height || t.defaultMarkStyle.height), t.maxMarkHeight)
                        }
                    }, t.prototype._validateConfig = function(t) {
                        this._validateConfigStyle(t.style)
                    }, t.prototype._validateConfigStyle = function(e) {
                        if (e.color && Object.values(h).indexOf(e.color) < 0) throw new Error("Marks configuration style color value of '" + e.color + "' is invalid.  Supported values are " + Object.values(h).toLocaleString());
                        if (e.height && "number" != typeof e.height || e.height < t.minMarkHeight || e.height > t.maxMarkHeight) throw new Error("Marks configuration style height value must be a number between " + t.minMarkHeight + " and " + t.maxMarkHeight + ".")
                    }, t.minMarkHeight = 25, t.maxMarkHeight = 55, t.imageHeightToWidthRatio = .425, t.defaultMarkStyle = {
                        color: h.dark,
                        height: t.maxMarkHeight
                    }, t
                }(),
                k = "#184e90",
                b = function() {
                    function t(t) {
                        this._config = t, this.button = this._createButton()
                    }
                    return t.prototype.getButton = function() {
                        return this.button
                    }, t.prototype._createImageElement = function() {
                        var t = document.createElement("img");
                        return t.style.height = "100%", t.src = this._getImageUrlForColor(this._config.style.color), t
                    }, t.prototype._createButtonElement = function(t) {
                        var e = document.createElement("button");
                        e.type = "button", e.style.display = "block", e.style.outline = "none", e.style.border = "none", e.style.padding = "0px", e.style.margin = "0px";
                        var n = 0;
                        switch (e.style.boxShadow = "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)", e.style.borderWidth = "0px", this._config.style.shape) {
                            case c.rect:
                                n = 0;
                                break;
                            case c.rounded:
                                n = this._config.style.height / 4;
                                break;
                            default:
                                n = this._config.style.height
                        }
                        e.style.borderRadius = n + "px";
                        var o = "white";
                        return this._config.style.color === s.dark && (o = k), e.style.backgroundColor = o, e.appendChild(t), e
                    }, t.prototype._createButton = function() {
                        var t = document.createElement("button");
                        t.type = "button", t.style.display = "block", t.style.outline = "none", t.style.border = "none", t.style.padding = "0px", t.style.margin = "auto", t.textContent = "Place Order", t.style.color = "dark" === this._config.style.color ? "white" : k, t.style.fontFamily = "Open Sans Semibold", t.style.fontSize = this._config.style.height / 3.5 + "px", t.style.height = this._config.style.height - 1 + "px", t.style.width = 5 * this._config.style.height + "px";
                        var e = 0;
                        switch (t.style.boxShadow = "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)", t.style.borderWidth = "0px", this._config.style.shape) {
                            case c.rect:
                                e = 0;
                                break;
                            case c.rounded:
                                e = this._config.style.height / 4;
                                break;
                            default:
                                e = this._config.style.height
                        }
                        t.style.borderRadius = e + "px";
                        var n = "white";
                        return this._config.style.color === s.dark && (n = k), t.style.backgroundColor = n, t
                    }, t.prototype._getImageUrlForColor = function(t) {
                        switch (t) {
                            case s.dark:
                            default:
                                return ""
                        }
                    }, t
                }(),
                v = function() {
                    function t(t, e, n) {
                        this._placeOrderButtonConfig = t, this._actions = e, this._session = n
                    }
                    return t.prototype.handleMessage = function(t) {
                        switch (console.log("Snap place order message to merchant: ", t), t.type) {
                            case i.SnapDataType.Initialized:
                                this._placeOrderButtonConfig.onInit(t, this._actions);
                                break;
                            case i.SnapDataType.Clicked:
                                this._placeOrderButtonConfig.onClick(t, this._actions);
                                break;
                            case i.SnapDataType.Notification:
                                this._placeOrderButtonConfig.onNotification(t, this._actions);
                                break;
                            case i.SnapDataType.Error:
                                this._placeOrderButtonConfig.onError(t, this._actions);
                                break;
                            default:
                                console.log("Unimplemented place order message sent to merchant: " + JSON.stringify(t))
                        }
                    }, t
                }(),
                E = {
                    color: s.dark,
                    shape: c.rounded,
                    height: 55
                },
                C = function() {
                    function t(t) {
                        var e = this;
                        this.config = t, f.init(t.token).getInstance().then(function(t) {
                            e._session = t, e._actions = new l(e._session), e._messageHandler = new v(e.config, e._actions, t), e._actions.addMessageHandler(e._messageHandler), e._messageHandler.handleMessage(new i.InitializedMessage)
                        })
                    }
                    return t.prototype.render = function(t) {
                        var e = this;
                        void 0 === t && (t = "snap-place-order-button");
                        var n = document.getElementById(t);
                        if (!n) throw new Error("Snap place order button can't find parent element with id: " + t);
                        var o = new b(this.config);
                        n.appendChild(o.button), o.button.addEventListener("click", function(t) {
                            try {
                                var n = new i.ClickedMessage;
                                e._messageHandler.handleMessage(n)
                            } catch (o) {
                                throw new Error("Snap placeorder button was unable to initialize.")
                            }
                        })
                    }, Object.defineProperty(t.prototype, "config", {
                        get: function() {
                            return this._config
                        },
                        set: function(t) {
                            t.style = this._initConfigStyle(t.style), this._validateButtonConfig(t), this._config = t
                        },
                        enumerable: !0,
                        configurable: !0
                    }), t.prototype._initConfigStyle = function(t) {
                        return void 0 === t && (t = E), {
                            color: t.color || E.color,
                            shape: t.shape || E.shape,
                            height: Math.min(Math.max(25, t.height || E.height), 55)
                        }
                    }, t.prototype._validateButtonConfig = function(t) {
                        if (!t.token || "" === t.token) throw new Error("Button configuration must supply a token");
                        if (this._validateButtonConfigStyle(t.style), !t.onClick) throw new Error("Button configuration must implement the onClick method.");
                        if (!t.onNotification) throw new Error("Button configuration must implement the onNotification method.");
                        if (!t.onError) throw new Error("Button configuration must implement the onError method.")
                    }, t.prototype._validateButtonConfigStyle = function(t) {
                        if (t.color && Object.values(s).indexOf(t.color) < 0) throw new Error("Button configuration style color value of '" + t.color + "' is invalid.  Supported values are " + Object.values(s).toLocaleString());
                        if (t.shape && Object.values(c).indexOf(t.shape) < 0) throw new Error("Button configuration style shape value of '" + t.shape + "' is invalid.  Supported values are " + Object.values(c).toLocaleString());
                        if (t.height && "number" != typeof t.height || t.height < 25 || t.height > 55) throw new Error("Button configuration style height value must be a number between 25 and 55.")
                    }, t
                }(),
                M = function() {
                    function t() {}
                    return t.prototype.checkoutMark = function(t) {
                        return new w(t)
                    }, t.prototype.checkoutButton = function(t) {
                        return new _(t)
                    }, t.prototype.placeOrderButton = function(t) {
                        return new C(t)
                    }, t
                }();
            window.snap = new M
        },
        kj8z: function(t, e, n) {
            "use strict";
            var o = n("W6Y6");
            n.o(o, "ClickedMessage") && n.d(e, "ClickedMessage", function() {
                return o.ClickedMessage
            }), n.o(o, "CreateMessage") && n.d(e, "CreateMessage", function() {
                return o.CreateMessage
            }), n.o(o, "ErrorMessage") && n.d(e, "ErrorMessage", function() {
                return o.ErrorMessage
            }), n.o(o, "ErrorType") && n.d(e, "ErrorType", function() {
                return o.ErrorType
            }), n.o(o, "InitializedMessage") && n.d(e, "InitializedMessage", function() {
                return o.InitializedMessage
            }), n.o(o, "NotificationMessage") && n.d(e, "NotificationMessage", function() {
                return o.NotificationMessage
            }), n.o(o, "NotificationType") && n.d(e, "NotificationType", function() {
                return o.NotificationType
            }), n.o(o, "SnapDataType") && n.d(e, "SnapDataType", function() {
                return o.SnapDataType
            }), n("BZeJ"), n("soIV");
            var i = n("ncvf");
            n.o(i, "ClickedMessage") && n.d(e, "ClickedMessage", function() {
                return i.ClickedMessage
            }), n.o(i, "CreateMessage") && n.d(e, "CreateMessage", function() {
                return i.CreateMessage
            }), n.o(i, "ErrorMessage") && n.d(e, "ErrorMessage", function() {
                return i.ErrorMessage
            }), n.o(i, "ErrorType") && n.d(e, "ErrorType", function() {
                return i.ErrorType
            }), n.o(i, "InitializedMessage") && n.d(e, "InitializedMessage", function() {
                return i.InitializedMessage
            }), n.o(i, "NotificationMessage") && n.d(e, "NotificationMessage", function() {
                return i.NotificationMessage
            }), n.o(i, "NotificationType") && n.d(e, "NotificationType", function() {
                return i.NotificationType
            }), n.o(i, "SnapDataType") && n.d(e, "SnapDataType", function() {
                return i.SnapDataType
            }), n("weua");
            var r = n("X+xd");
            n.o(r, "ClickedMessage") && n.d(e, "ClickedMessage", function() {
                return r.ClickedMessage
            }), n.o(r, "CreateMessage") && n.d(e, "CreateMessage", function() {
                return r.CreateMessage
            }), n.o(r, "ErrorMessage") && n.d(e, "ErrorMessage", function() {
                return r.ErrorMessage
            }), n.o(r, "ErrorType") && n.d(e, "ErrorType", function() {
                return r.ErrorType
            }), n.o(r, "InitializedMessage") && n.d(e, "InitializedMessage", function() {
                return r.InitializedMessage
            }), n.o(r, "NotificationMessage") && n.d(e, "NotificationMessage", function() {
                return r.NotificationMessage
            }), n.o(r, "NotificationType") && n.d(e, "NotificationType", function() {
                return r.NotificationType
            }), n.o(r, "SnapDataType") && n.d(e, "SnapDataType", function() {
                return r.SnapDataType
            }), n("WKkh");
            var a = n("O5UZ");
            n.d(e, "ClickedMessage", function() {
                return a.a
            }), n.d(e, "CreateMessage", function() {
                return a.b
            }), n.d(e, "ErrorMessage", function() {
                return a.c
            }), n.d(e, "ErrorType", function() {
                return a.d
            }), n.d(e, "InitializedMessage", function() {
                return a.e
            }), n.d(e, "NotificationMessage", function() {
                return a.f
            }), n.d(e, "NotificationType", function() {
                return a.g
            }), n.d(e, "SnapDataType", function() {
                return a.h
            })
        },
        kqAp: function(t, e, n) {
            "use strict";
            var o = n("/j1x");

            function i(t) {
                this.message = t
            }(i.prototype = new Error).name = "InvalidTokenError", t.exports = function(t, e) {
                if ("string" != typeof t) throw new i("Invalid token specified");
                var n = !0 === (e = e || {}).header ? 0 : 1;
                try {
                    return JSON.parse(o(t.split(".")[n]))
                } catch (r) {
                    throw new i("Invalid token specified: " + r.message)
                }
            }, t.exports.InvalidTokenError = i
        },
        ncvf: function(t, e) {},
        soIV: function(t, e, n) {},
        weua: function(t, e, n) {
            "use strict";
            var o;
            ! function(t) {
                t.WEEKLY = "WEEKLY", t.BI_WEEKLY = "BI_WEEKLY", t.SEMI_MONTHLY = "SEMI_MONTHLY", t.MONTHLY = "MONTHLY", t.MONTHLY_WEEK = "MONTHLY_WEEK"
            }(o || (o = {}))
        },
        wqh0: function(t, e) {
            function n(t) {
                this.message = t
            }(n.prototype = new Error).name = "InvalidCharacterError", t.exports = "undefined" != typeof window && window.atob && window.atob.bind(window) || function(t) {
                var e = String(t).replace(/=+$/, "");
                if (e.length % 4 == 1) throw new n("'atob' failed: The string to be decoded is not correctly encoded.");
                for (var o, i, r = 0, a = 0, s = ""; i = e.charAt(a++); ~i && (o = r % 4 ? 64 * o + i : i, r++ % 4) ? s += String.fromCharCode(255 & o >> (-2 * r & 6)) : 0) i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(i);
                return s
            }
        }
    },
    [
        [0, 0]
    ]
]);
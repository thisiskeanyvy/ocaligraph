(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [921], {
        8334: function(t) {
            t.exports = function(t, e, r) {
                if ("number" != typeof e || "number" != typeof r) throw TypeError('Must specify "to" and "from" arguments as numbers');
                if (e > r) {
                    var n = e;
                    e = r, r = n
                }
                var o = r - e;
                return 0 === o ? r : t - o * Math.floor((t - e) / o)
            }
        },
        6573: function(t, e, r) {
            var n = r(4941),
                o = r(8334),
                i = Number.EPSILON;

            function u(t, e, r) {
                return e < r ? t < e ? e : t > r ? r : t : t < r ? r : t > e ? e : t
            }

            function a(t, e, r) {
                return t * (1 - r) + e * r
            }

            function f(t, e, r) {
                return Math.abs(t - e) < i ? 0 : (r - t) / (e - t)
            }

            function s(t) {
                if ("number" != typeof t) throw TypeError("Expected dims argument");
                return function(e, r) {
                    r = n(r, 0), null == e ? u = r : "number" == typeof e && isFinite(e) && (u = e);
                    var o, i, u, a, f = [];
                    if (null == u)
                        for (a = 0; a < t; a++) f[a] = (o = e[a], i = n(i = r, 0), "number" == typeof o && isFinite(o) ? o : i);
                    else
                        for (a = 0; a < t; a++) f[a] = u;
                    return f
                }
            }

            function c(t, e, r, n) {
                if (n = n || [], t.length !== e.length) throw TypeError("min and max array are expected to have the same length");
                for (var o = 0; o < t.length; o++) n[o] = a(t[o], e[o], r);
                return n
            }

            function l(t, e) {
                if ("number" != typeof(t = n(t, 0))) throw TypeError("Expected n argument to be a number");
                for (var r = [], o = 0; o < t; o++) r.push(e);
                return r
            }

            function p(t, e) {
                return (t % e + e) % e
            }

            function h(t, e, r, n) {
                return a(t, e, 1 - Math.exp(-r * n))
            }
            t.exports = {
                mod: p,
                fract: function(t) {
                    return t - Math.floor(t)
                },
                sign: function(t) {
                    return t > 0 ? 1 : t < 0 ? -1 : 0
                },
                degToRad: function(t) {
                    return t * Math.PI / 180
                },
                radToDeg: function(t) {
                    return 180 * t / Math.PI
                },
                wrap: o,
                pingPong: function(t, e) {
                    return t = p(t, 2 * e), e - Math.abs(t - e)
                },
                linspace: function(t, e) {
                    if ("number" != typeof(t = n(t, 0))) throw TypeError("Expected n argument to be a number");
                    "boolean" == typeof(e = e || {}) && (e = {
                        endpoint: !0
                    });
                    var r = n(e.offset, 0);
                    return e.endpoint ? l(t).map(function(e, n) {
                        return t <= 1 ? 0 : (n + r) / (t - 1)
                    }) : l(t).map(function(e, n) {
                        return (n + r) / t
                    })
                },
                lerp: a,
                lerpArray: c,
                inverseLerp: f,
                lerpFrames: function(t, e, r) {
                    e = u(e, 0, 1);
                    var n = t.length - 1,
                        o = e * n,
                        i = Math.floor(o),
                        f = o - i,
                        s = Math.min(i + 1, n),
                        l = t[i % t.length],
                        p = t[s % t.length];
                    if ("number" == typeof l && "number" == typeof p) return a(l, p, f);
                    if (Array.isArray(l) && Array.isArray(p)) return c(l, p, f, r);
                    throw TypeError("Mismatch in value type of two array elements: " + i + " and " + s)
                },
                clamp: u,
                clamp01: function(t) {
                    return u(t, 0, 1)
                },
                smoothstep: function(t, e, r) {
                    var n = u(f(t, e, r), 0, 1);
                    return n * n * (3 - 2 * n)
                },
                damp: h,
                dampArray: function(t, e, r, n, o) {
                    o = o || [];
                    for (var i = 0; i < t.length; i++) o[i] = h(t[i], e[i], r, n);
                    return o
                },
                mapRange: function(t, e, r, n, o, u) {
                    if (Math.abs(e - r) < i) return n;
                    var a = (t - e) / (r - e) * (o - n) + n;
                    return u && (o < n ? a < o ? a = o : a > n && (a = n) : a > o ? a = o : a < n && (a = n)), a
                },
                expand2D: s(2),
                expand3D: s(3),
                expand4D: s(4)
            }
        },
        9666: function(t, e, r) {
            var n = r(7075),
                o = r(6848),
                i = r(4941);
            t.exports = function t(e) {
                e = i(e, null);
                var r, u, a, f = Math.random,
                    s = null,
                    c = !1;
                return l(e), {
                    value: p,
                    createRandom: function(e) {
                        return t(e)
                    },
                    setSeed: l,
                    getSeed: function() {
                        return r
                    },
                    getRandomSeed: function() {
                        return String(Math.floor(1e6 * Math.random()))
                    },
                    valueNonZero: function() {
                        for (var t = 0; 0 === t;) t = p();
                        return t
                    },
                    permuteNoise: function() {
                        a = new o(u)
                    },
                    noise1D: function(t, e, r) {
                        if (!isFinite(t)) throw TypeError("x component for noise() must be finite");
                        return e = i(e, 1), (r = i(r, 1)) * a.noise2D(t * e, 0)
                    },
                    noise2D: function(t, e, r, n) {
                        if (!isFinite(t)) throw TypeError("x component for noise() must be finite");
                        if (!isFinite(e)) throw TypeError("y component for noise() must be finite");
                        return r = i(r, 1), (n = i(n, 1)) * a.noise2D(t * r, e * r)
                    },
                    noise3D: function(t, e, r, n, o) {
                        if (!isFinite(t)) throw TypeError("x component for noise() must be finite");
                        if (!isFinite(e)) throw TypeError("y component for noise() must be finite");
                        if (!isFinite(r)) throw TypeError("z component for noise() must be finite");
                        return n = i(n, 1), (o = i(o, 1)) * a.noise3D(t * n, e * n, r * n)
                    },
                    noise4D: function(t, e, r, n, o, u) {
                        if (!isFinite(t)) throw TypeError("x component for noise() must be finite");
                        if (!isFinite(e)) throw TypeError("y component for noise() must be finite");
                        if (!isFinite(r)) throw TypeError("z component for noise() must be finite");
                        if (!isFinite(n)) throw TypeError("w component for noise() must be finite");
                        return o = i(o, 1), (u = i(u, 1)) * a.noise4D(t * o, e * o, r * o, n * o)
                    },
                    sign: function() {
                        return h() ? 1 : -1
                    },
                    boolean: h,
                    chance: function(t) {
                        if ("number" != typeof(t = i(t, .5))) throw TypeError("expected n to be a number");
                        return p() < t
                    },
                    range: d,
                    rangeFloor: m,
                    pick: function(t) {
                        if (0 !== t.length) return t[m(0, t.length)]
                    },
                    shuffle: function(t) {
                        if (!Array.isArray(t)) throw TypeError("Expected Array, got " + typeof t);
                        for (var e, r, n = t.length, o = t.slice(); n;) e = Math.floor(p() * n--), r = o[n], o[n] = o[e], o[e] = r;
                        return o
                    },
                    onCircle: g,
                    insideCircle: function(t, e) {
                        t = i(t, 1), g(1, e = e || []);
                        var r = t * Math.sqrt(p());
                        return e[0] *= r, e[1] *= r, e
                    },
                    onSphere: function(t, e) {
                        t = i(t, 1), e = e || [];
                        var r = p() * Math.PI * 2,
                            n = Math.acos(2 * p() - 1);
                        return e[0] = t * Math.sin(n) * Math.cos(r), e[1] = t * Math.sin(n) * Math.sin(r), e[2] = t * Math.cos(n), e
                    },
                    insideSphere: function(t, e) {
                        t = i(t, 1), e = e || [];
                        var r = p() * Math.PI * 2,
                            n = 2 * p() - 1,
                            o = p(),
                            u = Math.acos(n),
                            a = t * Math.cbrt(o);
                        return e[0] = a * Math.sin(u) * Math.cos(r), e[1] = a * Math.sin(u) * Math.sin(r), e[2] = a * Math.cos(u), e
                    },
                    quaternion: function(t) {
                        t = t || [];
                        var e = p(),
                            r = p(),
                            n = p(),
                            o = Math.sqrt(1 - e),
                            i = Math.sqrt(e),
                            u = 2 * Math.PI * r,
                            a = 2 * Math.PI * n,
                            f = Math.cos(a) * i;
                        return t[0] = Math.sin(u) * o, t[1] = Math.cos(u) * o, t[2] = Math.sin(a) * i, t[3] = f, t
                    },
                    weighted: y,
                    weightedSet: function(t) {
                        return 0 === (t = t || []).length ? null : t[v(t)].value
                    },
                    weightedSetIndex: v,
                    gaussian: function(t, e) {
                        if (t = i(t, 0), e = i(e, 1), c) {
                            c = !1;
                            var r = s;
                            return s = null, t + e * r
                        }
                        var n = 0,
                            o = 0,
                            u = 0;
                        do u = (n = 2 * p() - 1) * n + (o = 2 * p() - 1) * o; while (u >= 1 || 0 === u);
                        var a = Math.sqrt(-2 * Math.log(u) / u);
                        return s = o * a, c = !0, t + n * a * e
                    }
                };

                function l(t, e) {
                    "number" == typeof t || "string" == typeof t ? u = n(r = t, e) : (r = void 0, u = f), a = new o(u), s = null, c = !1
                }

                function p() {
                    return u()
                }

                function h() {
                    return p() > .5
                }

                function d(t, e) {
                    if (void 0 === e && (e = t, t = 0), "number" != typeof t || "number" != typeof e) throw TypeError("Expected all arguments to be numbers");
                    return p() * (e - t) + t
                }

                function m(t, e) {
                    if (void 0 === e && (e = t, t = 0), "number" != typeof t || "number" != typeof e) throw TypeError("Expected all arguments to be numbers");
                    return Math.floor(d(t, e))
                }

                function g(t, e) {
                    t = i(t, 1), e = e || [];
                    var r = 2 * p() * Math.PI;
                    return e[0] = t * Math.cos(r), e[1] = t * Math.sin(r), e
                }

                function v(t) {
                    return 0 === (t = t || []).length ? -1 : y(t.map(function(t) {
                        return t.weight
                    }))
                }

                function y(t) {
                    if (0 === (t = t || []).length) return -1;
                    var e, r = 0;
                    for (e = 0; e < t.length; e++) r += t[e];
                    if (r <= 0) throw Error("Weights must sum to > 0");
                    var n = p() * r;
                    for (e = 0; e < t.length; e++) {
                        if (n < t[e]) return e;
                        n -= t[e]
                    }
                    return 0
                }
            }()
        },
        4941: function(t) {
            "use strict";
            t.exports = function() {
                for (var t = 0; t < arguments.length; t++)
                    if (void 0 !== arguments[t]) return arguments[t]
            }
        },
        7990: function(t) {
            t.exports = function(t) {
                return (t *= 2) < 1 ? t * t * (3.5949095 * t - 2.5949095) * .5 : .5 * ((t -= 2) * t * (3.5949095 * t + 2.5949095) + 2)
            }
        },
        1335: function(t) {
            t.exports = function(t) {
                return t * t * (2.70158 * t - 1.70158)
            }
        },
        1587: function(t) {
            t.exports = function(t) {
                return --t * t * (2.70158 * t + 1.70158) + 1
            }
        },
        1038: function(t, e, r) {
            var n = r(8099);
            t.exports = function(t) {
                return t < .5 ? .5 * (1 - n(1 - 2 * t)) : .5 * n(2 * t - 1) + .5
            }
        },
        433: function(t, e, r) {
            var n = r(8099);
            t.exports = function(t) {
                return 1 - n(1 - t)
            }
        },
        8099: function(t) {
            t.exports = function(t) {
                var e = t * t;
                return t < 4 / 11 ? 7.5625 * e : t < 8 / 11 ? 9.075 * e - 9.9 * t + 3.4 : t < .9 ? 4356 / 361 * e - 35442 / 1805 * t + 16061 / 1805 : 10.8 * t * t - 20.52 * t + 10.72
            }
        },
        344: function(t) {
            t.exports = function(t) {
                return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
            }
        },
        6580: function(t) {
            t.exports = function(t) {
                return 1 - Math.sqrt(1 - t * t)
            }
        },
        1622: function(t) {
            t.exports = function(t) {
                return Math.sqrt(1 - --t * t)
            }
        },
        6277: function(t) {
            t.exports = function(t) {
                return t < .5 ? 4 * t * t * t : .5 * Math.pow(2 * t - 2, 3) + 1
            }
        },
        4658: function(t) {
            t.exports = function(t) {
                return t * t * t
            }
        },
        5892: function(t) {
            t.exports = function(t) {
                var e = t - 1;
                return e * e * e + 1
            }
        },
        3313: function(t) {
            t.exports = function(t) {
                return t < .5 ? .5 * Math.sin(13 * Math.PI / 2 * 2 * t) * Math.pow(2, 10 * (2 * t - 1)) : .5 * Math.sin(-13 * Math.PI / 2 * (2 * t - 1 + 1)) * Math.pow(2, -10 * (2 * t - 1)) + 1
            }
        },
        8323: function(t) {
            t.exports = function(t) {
                return Math.sin(13 * t * Math.PI / 2) * Math.pow(2, 10 * (t - 1))
            }
        },
        9341: function(t) {
            t.exports = function(t) {
                return Math.sin(-13 * (t + 1) * Math.PI / 2) * Math.pow(2, -10 * t) + 1
            }
        },
        7749: function(t) {
            t.exports = function(t) {
                return 0 === t || 1 === t ? t : t < .5 ? .5 * Math.pow(2, 20 * t - 10) : -.5 * Math.pow(2, 10 - 20 * t) + 1
            }
        },
        4490: function(t) {
            t.exports = function(t) {
                return 0 === t ? t : Math.pow(2, 10 * (t - 1))
            }
        },
        1175: function(t) {
            t.exports = function(t) {
                return 1 === t ? t : 1 - Math.pow(2, -10 * t)
            }
        },
        2075: function(t, e, r) {
            t.exports = {
                backInOut: r(7990),
                backIn: r(1335),
                backOut: r(1587),
                bounceInOut: r(1038),
                bounceIn: r(433),
                bounceOut: r(8099),
                circInOut: r(344),
                circIn: r(6580),
                circOut: r(1622),
                cubicInOut: r(6277),
                cubicIn: r(4658),
                cubicOut: r(5892),
                elasticInOut: r(3313),
                elasticIn: r(8323),
                elasticOut: r(9341),
                expoInOut: r(7749),
                expoIn: r(4490),
                expoOut: r(1175),
                linear: r(5839),
                quadInOut: r(388),
                quadIn: r(1088),
                quadOut: r(6186),
                quartInOut: r(4506),
                quartIn: r(9008),
                quartOut: r(6817),
                quintInOut: r(8801),
                quintIn: r(3074),
                quintOut: r(1806),
                sineInOut: r(699),
                sineIn: r(5460),
                sineOut: r(4561)
            }
        },
        5839: function(t) {
            t.exports = function(t) {
                return t
            }
        },
        388: function(t) {
            t.exports = function(t) {
                return (t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
            }
        },
        1088: function(t) {
            t.exports = function(t) {
                return t * t
            }
        },
        6186: function(t) {
            t.exports = function(t) {
                return -t * (t - 2)
            }
        },
        4506: function(t) {
            t.exports = function(t) {
                return t < .5 ? 8 * Math.pow(t, 4) : -8 * Math.pow(t - 1, 4) + 1
            }
        },
        9008: function(t) {
            t.exports = function(t) {
                return Math.pow(t, 4)
            }
        },
        6817: function(t) {
            t.exports = function(t) {
                return Math.pow(t - 1, 3) * (1 - t) + 1
            }
        },
        8801: function(t) {
            t.exports = function(t) {
                return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
            }
        },
        3074: function(t) {
            t.exports = function(t) {
                return t * t * t * t * t
            }
        },
        1806: function(t) {
            t.exports = function(t) {
                return --t * t * t * t * t + 1
            }
        },
        699: function(t) {
            t.exports = function(t) {
                return -.5 * (Math.cos(Math.PI * t) - 1)
            }
        },
        5460: function(t) {
            t.exports = function(t) {
                var e = Math.cos(t * Math.PI * .5);
                return 1e-14 > Math.abs(e) ? 1 : 1 - e
            }
        },
        4561: function(t) {
            t.exports = function(t) {
                return Math.sin(t * Math.PI / 2)
            }
        },
        3162: function(t, e, r) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), Object.defineProperty(e, "Image", {
                enumerable: !0,
                get: function() {
                    return v
                }
            });
            let n = r(1351),
                o = r(5815)._(r(959)),
                i = n._(r(422)),
                u = n._(r(4408)),
                a = r(9505),
                f = r(7795),
                s = r(8532);
            r(8254);
            let c = r(1010),
                l = n._(r(2458)),
                p = {
                    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
                    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
                    path: "/assets/ocr.webp",
                    loader: "default",
                    dangerouslyAllowSVG: !1,
                    unoptimized: !1
                };

            function h(t, e, r, n, o, i) {
                let u = null == t ? void 0 : t.src;
                t && t["data-loaded-src"] !== u && (t["data-loaded-src"] = u, ("decode" in t ? t.decode() : Promise.resolve()).catch(() => {}).then(() => {
                    if (t.parentElement && t.isConnected) {
                        if ("empty" !== e && o(!0), null == r ? void 0 : r.current) {
                            let e = new Event("load");
                            Object.defineProperty(e, "target", {
                                writable: !1,
                                value: t
                            });
                            let n = !1,
                                o = !1;
                            r.current({
                                ...e,
                                nativeEvent: e,
                                currentTarget: t,
                                target: t,
                                isDefaultPrevented: () => n,
                                isPropagationStopped: () => o,
                                persist: () => {},
                                preventDefault: () => {
                                    n = !0, e.preventDefault()
                                },
                                stopPropagation: () => {
                                    o = !0, e.stopPropagation()
                                }
                            })
                        }(null == n ? void 0 : n.current) && n.current(t)
                    }
                }))
            }

            function d(t) {
                let [e, r] = o.version.split(".", 2), n = parseInt(e, 10), i = parseInt(r, 10);
                return n > 18 || 18 === n && i >= 3 ? {
                    fetchPriority: t
                } : {
                    fetchpriority: t
                }
            }
            let m = (0, o.forwardRef)((t, e) => {
                let {
                    src: r,
                    srcSet: n,
                    sizes: i,
                    height: u,
                    width: a,
                    decoding: f,
                    className: s,
                    style: c,
                    fetchPriority: l,
                    placeholder: p,
                    loading: m,
                    unoptimized: g,
                    fill: v,
                    onLoadRef: y,
                    onLoadingCompleteRef: M,
                    setBlurComplete: b,
                    setShowAltText: w,
                    onLoad: x,
                    onError: E,
                    ...I
                } = t;
                return o.default.createElement("img", {
                    ...I,
                    ...d(l),
                    loading: m,
                    width: a,
                    height: u,
                    decoding: f,
                    "data-nimg": v ? "fill" : "1",
                    className: s,
                    style: c,
                    sizes: i,
                    srcSet: n,
                    src: r,
                    ref: (0, o.useCallback)(t => {
                        e && ("function" == typeof e ? e(t) : "object" == typeof e && (e.current = t)), t && (E && (t.src = t.src), t.complete && h(t, p, y, M, b, g))
                    }, [r, p, y, M, b, E, g, e]),
                    onLoad: t => {
                        h(t.currentTarget, p, y, M, b, g)
                    },
                    onError: t => {
                        w(!0), "empty" !== p && b(!0), E && E(t)
                    }
                })
            });

            function g(t) {
                let {
                    isAppRouter: e,
                    imgAttributes: r
                } = t, n = {
                    as: "image",
                    imageSrcSet: r.srcSet,
                    imageSizes: r.sizes,
                    crossOrigin: r.crossOrigin,
                    referrerPolicy: r.referrerPolicy,
                    ...d(r.fetchPriority)
                };
                return e && i.default.preload ? (i.default.preload(r.src, n), null) : o.default.createElement(u.default, null, o.default.createElement("link", {
                    key: "__nimg-" + r.src + r.srcSet + r.sizes,
                    rel: "preload",
                    href: r.srcSet ? void 0 : r.src,
                    ...n
                }))
            }
            let v = (0, o.forwardRef)((t, e) => {
                let r = (0, o.useContext)(c.RouterContext),
                    n = (0, o.useContext)(s.ImageConfigContext),
                    i = (0, o.useMemo)(() => {
                        let t = p || n || f.imageConfigDefault,
                            e = [...t.deviceSizes, ...t.imageSizes].sort((t, e) => t - e),
                            r = t.deviceSizes.sort((t, e) => t - e);
                        return {
                            ...t,
                            allSizes: e,
                            deviceSizes: r
                        }
                    }, [n]),
                    {
                        onLoad: u,
                        onLoadingComplete: h
                    } = t,
                    d = (0, o.useRef)(u);
                (0, o.useEffect)(() => {
                    d.current = u
                }, [u]);
                let v = (0, o.useRef)(h);
                (0, o.useEffect)(() => {
                    v.current = h
                }, [h]);
                let [y, M] = (0, o.useState)(!1), [b, w] = (0, o.useState)(!1), {
                    props: x,
                    meta: E
                } = (0, a.getImgProps)(t, {
                    defaultLoader: l.default,
                    imgConf: i,
                    blurComplete: y,
                    showAltText: b
                });
                return o.default.createElement(o.default.Fragment, null, o.default.createElement(m, {
                    ...x,
                    unoptimized: E.unoptimized,
                    placeholder: E.placeholder,
                    fill: E.fill,
                    onLoadRef: d,
                    onLoadingCompleteRef: v,
                    setBlurComplete: M,
                    setShowAltText: w,
                    ref: e
                }), E.priority ? o.default.createElement(g, {
                    isAppRouter: !r,
                    imgAttributes: x
                }) : null)
            });
            ("function" == typeof e.default || "object" == typeof e.default && null !== e.default) && void 0 === e.default.__esModule && (Object.defineProperty(e.default, "__esModule", {
                value: !0
            }), Object.assign(e.default, e), t.exports = e.default)
        },
        9505: function(t, e, r) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), Object.defineProperty(e, "getImgProps", {
                enumerable: !0,
                get: function() {
                    return a
                }
            }), r(8254);
            let n = r(6146),
                o = r(7795);

            function i(t) {
                return void 0 !== t.default
            }

            function u(t) {
                return void 0 === t ? t : "number" == typeof t ? Number.isFinite(t) ? t : NaN : "string" == typeof t && /^[0-9]+$/.test(t) ? parseInt(t, 10) : NaN
            }

            function a(t, e) {
                var r;
                let a, f, s, {
                        src: c,
                        sizes: l,
                        unoptimized: p = !1,
                        priority: h = !1,
                        loading: d,
                        className: m,
                        quality: g,
                        width: v,
                        height: y,
                        fill: M = !1,
                        style: b,
                        onLoad: w,
                        onLoadingComplete: x,
                        placeholder: E = "empty",
                        blurDataURL: I,
                        fetchPriority: S,
                        layout: P,
                        objectFit: O,
                        objectPosition: _,
                        lazyBoundary: C,
                        lazyRoot: j,
                        ...z
                    } = t,
                    {
                        imgConf: T,
                        showAltText: A,
                        blurComplete: D,
                        defaultLoader: q
                    } = e,
                    F = T || o.imageConfigDefault;
                if ("allSizes" in F) a = F;
                else {
                    let t = [...F.deviceSizes, ...F.imageSizes].sort((t, e) => t - e),
                        e = F.deviceSizes.sort((t, e) => t - e);
                    a = {
                        ...F,
                        allSizes: t,
                        deviceSizes: e
                    }
                }
                let R = z.loader || q;
                delete z.loader, delete z.srcSet;
                let k = "__next_img_default" in R;
                if (k) {
                    if ("custom" === a.loader) throw Error('Image with src "' + c + '" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader')
                } else {
                    let t = R;
                    R = e => {
                        let {
                            config: r,
                            ...n
                        } = e;
                        return t(n)
                    }
                }
                if (P) {
                    "fill" === P && (M = !0);
                    let t = {
                        intrinsic: {
                            maxWidth: "100%",
                            height: "auto"
                        },
                        responsive: {
                            width: "100%",
                            height: "auto"
                        }
                    } [P];
                    t && (b = {
                        ...b,
                        ...t
                    });
                    let e = {
                        responsive: "100vw",
                        fill: "100vw"
                    } [P];
                    e && !l && (l = e)
                }
                let N = "",
                    L = u(v),
                    G = u(y);
                if ("object" == typeof(r = c) && (i(r) || void 0 !== r.src)) {
                    let t = i(c) ? c.default : c;
                    if (!t.src) throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received " + JSON.stringify(t));
                    if (!t.height || !t.width) throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received " + JSON.stringify(t));
                    if (f = t.blurWidth, s = t.blurHeight, I = I || t.blurDataURL, N = t.src, !M) {
                        if (L || G) {
                            if (L && !G) {
                                let e = L / t.width;
                                G = Math.round(t.height * e)
                            } else if (!L && G) {
                                let e = G / t.height;
                                L = Math.round(t.width * e)
                            }
                        } else L = t.width, G = t.height
                    }
                }
                let U = !h && ("lazy" === d || void 0 === d);
                (!(c = "string" == typeof c ? c : N) || c.startsWith("data:") || c.startsWith("blob:")) && (p = !0, U = !1), a.unoptimized && (p = !0), k && c.endsWith(".svg") && !a.dangerouslyAllowSVG && (p = !0), h && (S = "high");
                let B = u(g),
                    W = Object.assign(M ? {
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        objectFit: O,
                        objectPosition: _
                    } : {}, A ? {} : {
                        color: "transparent"
                    }, b),
                    V = D || "empty" === E ? null : "blur" === E ? 'url("data:image/svg+xml;charset=utf-8,' + (0, n.getImageBlurSvg)({
                        widthInt: L,
                        heightInt: G,
                        blurWidth: f,
                        blurHeight: s,
                        blurDataURL: I || "",
                        objectFit: W.objectFit
                    }) + '")' : 'url("' + E + '")',
                    J = V ? {
                        backgroundSize: W.objectFit || "cover",
                        backgroundPosition: W.objectPosition || "50% 50%",
                        backgroundRepeat: "no-repeat",
                        backgroundImage: V
                    } : {},
                    Y = function(t) {
                        let {
                            config: e,
                            src: r,
                            unoptimized: n,
                            width: o,
                            quality: i,
                            sizes: u,
                            loader: a
                        } = t;
                        if (n) return {
                            src: r,
                            srcSet: void 0,
                            sizes: void 0
                        };
                        let {
                            widths: f,
                            kind: s
                        } = function(t, e, r) {
                            let {
                                deviceSizes: n,
                                allSizes: o
                            } = t;
                            if (r) {
                                let t = /(^|\s)(1?\d?\d)vw/g,
                                    e = [];
                                for (let n; n = t.exec(r); n) e.push(parseInt(n[2]));
                                if (e.length) {
                                    let t = .01 * Math.min(...e);
                                    return {
                                        widths: o.filter(e => e >= n[0] * t),
                                        kind: "w"
                                    }
                                }
                                return {
                                    widths: o,
                                    kind: "w"
                                }
                            }
                            return "number" != typeof e ? {
                                widths: n,
                                kind: "w"
                            } : {
                                widths: [...new Set([e, 2 * e].map(t => o.find(e => e >= t) || o[o.length - 1]))],
                                kind: "x"
                            }
                        }(e, o, u), c = f.length - 1;
                        return {
                            sizes: u || "w" !== s ? u : "100vw",
                            srcSet: f.map((t, n) => a({
                                config: e,
                                src: r,
                                quality: i,
                                width: t
                            }) + " " + ("w" === s ? t : n + 1) + s).join(", "),
                            src: a({
                                config: e,
                                src: r,
                                quality: i,
                                width: f[c]
                            })
                        }
                    }({
                        config: a,
                        src: c,
                        unoptimized: p,
                        width: L,
                        quality: B,
                        sizes: l,
                        loader: R
                    });
                return {
                    props: {
                        ...z,
                        loading: U ? "lazy" : d,
                        fetchPriority: S,
                        width: L,
                        height: G,
                        decoding: "async",
                        className: m,
                        style: {
                            ...W,
                            ...J
                        },
                        sizes: Y.sizes,
                        srcSet: Y.srcSet,
                        src: Y.src
                    },
                    meta: {
                        unoptimized: p,
                        priority: h,
                        placeholder: E,
                        fill: M
                    }
                }
            }
        },
        6146: function(t, e) {
            "use strict";

            function r(t) {
                let {
                    widthInt: e,
                    heightInt: r,
                    blurWidth: n,
                    blurHeight: o,
                    blurDataURL: i,
                    objectFit: u
                } = t, a = n ? 40 * n : e, f = o ? 40 * o : r, s = a && f ? "viewBox='0 0 " + a + " " + f + "'" : "";
                return "%3Csvg xmlns='http://www.w3.org/2000/svg' " + s + "%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='" + (s ? "none" : "contain" === u ? "xMidYMid" : "cover" === u ? "xMidYMid slice" : "none") + "' style='filter: url(%23b);' href='" + i + "'/%3E%3C/svg%3E"
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), Object.defineProperty(e, "getImageBlurSvg", {
                enumerable: !0,
                get: function() {
                    return r
                }
            })
        },
        5406: function(t, e, r) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                function(t, e) {
                    for (var r in e) Object.defineProperty(t, r, {
                        enumerable: !0,
                        get: e[r]
                    })
                }(e, {
                    unstable_getImgProps: function() {
                        return f
                    },
                    default: function() {
                        return s
                    }
                });
            let n = r(1351),
                o = r(9505),
                i = r(8254),
                u = r(3162),
                a = n._(r(2458)),
                f = t => {
                    (0, i.warnOnce)("Warning: unstable_getImgProps() is experimental and may change or be removed at any time. Use at your own risk.");
                    let {
                        props: e
                    } = (0, o.getImgProps)(t, {
                        defaultLoader: a.default,
                        imgConf: {
                            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
                            imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
                            path: "/assets/image",
                            loader: "default",
                            dangerouslyAllowSVG: !1,
                            unoptimized: !1
                        }
                    });
                    for (let [t, r] of Object.entries(e)) void 0 === r && delete e[t];
                    return {
                        props: e
                    }
                },
                s = u.Image
        },
        2458: function(t, e) {
            "use strict";

            function r(t) {
                let {
                    config: e,
                    src: r,
                    width: n,
                    quality: o
                } = t;
                return e.path + "?url=" + encodeURIComponent(r) + "&w=" + n + "&q=" + (o || 75)
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), Object.defineProperty(e, "default", {
                enumerable: !0,
                get: function() {
                    return n
                }
            }), r.__next_img_default = !0;
            let n = r
        },
        7311: function(t, e, r) {
            t.exports = r(5406)
        },
        7075: function(t, e, r) {
            "use strict";
            var n = [],
                o = void 0 === r.g ? window : r.g,
                i = Math.random;

            function u(t) {
                var e, r = t.length,
                    n = this,
                    o = 0,
                    i = n.i = n.j = 0,
                    u = n.S = [];
                for (r || (t = [r++]); o < 256;) u[o] = o++;
                for (o = 0; o < 256; o++) u[o] = u[i = 255 & i + t[o % r] + (e = u[o])], u[i] = e;
                (n.g = function(t) {
                    for (var e, r = 0, o = n.i, i = n.j, u = n.S; t--;) e = u[o = 255 & o + 1], r = 256 * r + u[255 & (u[o] = u[i = 255 & i + e]) + (u[i] = e)];
                    return n.i = o, n.j = i, r
                })(256)
            }

            function a(t, e) {
                for (var r, n = t + "", o = 0; o < n.length;) e[255 & o] = 255 & (r ^= 19 * e[255 & o]) + n.charCodeAt(o++);
                return f(e)
            }

            function f(t) {
                return String.fromCharCode.apply(0, t)
            }
            t.exports = function(e, r) {
                if (r && !0 === r.global) return r.global = !1, Math.random = t.exports(e, r), r.global = !0, Math.random;
                var i = r && r.entropy || !1,
                    s = [];
                a(function t(e, r) {
                    var n, o = [],
                        i = (typeof e)[0];
                    if (r && "o" == i)
                        for (n in e) try {
                            o.push(t(e[n], r - 1))
                        } catch (t) {}
                    return o.length ? o : "s" == i ? e : e + "\x00"
                }(i ? [e, f(n)] : 0 in arguments ? e : function(t) {
                    try {
                        return o.crypto.getRandomValues(t = new Uint8Array(256)), f(t)
                    } catch (t) {
                        return [+new Date, o, o.navigator && o.navigator.plugins, o.screen, f(n)]
                    }
                }(), 3), s);
                var c = new u(s);
                return a(f(c.S), n),
                    function() {
                        for (var t = c.g(6), e = 281474976710656, r = 0; t < 4503599627370496;) t = (t + r) * 256, e *= 256, r = c.g(1);
                        for (; t >= 9007199254740992;) t /= 2, e /= 2, r >>>= 1;
                        return (t + r) / e
                    }
            }, t.exports.resetGlobal = function() {
                Math.random = i
            }, a(Math.random(), n)
        },
        6848: function(t, e, r) {
            var n;
            ! function() {
                "use strict";
                var o = .5 * (Math.sqrt(3) - 1),
                    i = (3 - Math.sqrt(3)) / 6,
                    u = 1 / 3,
                    a = 1 / 6,
                    f = (Math.sqrt(5) - 1) / 4,
                    s = (5 - Math.sqrt(5)) / 20;

                function c(t) {
                    var e;
                    e = "function" == typeof t ? t : t ? function() {
                        var t, e = 0,
                            r = 0,
                            n = 0,
                            o = 1,
                            i = (t = 4022871197, function(e) {
                                e = e.toString();
                                for (var r = 0; r < e.length; r++) {
                                    var n = .02519603282416938 * (t += e.charCodeAt(r));
                                    t = n >>> 0, n -= t, n *= t, t = n >>> 0, n -= t, t += 4294967296 * n
                                }
                                return (t >>> 0) * 23283064365386963e-26
                            });
                        e = i(" "), r = i(" "), n = i(" ");
                        for (var u = 0; u < arguments.length; u++) e -= i(arguments[u]), e < 0 && (e += 1), r -= i(arguments[u]), r < 0 && (r += 1), n -= i(arguments[u]), n < 0 && (n += 1);
                        return i = null,
                            function() {
                                var t = 2091639 * e + 23283064365386963e-26 * o;
                                return e = r, r = n, n = t - (o = 0 | t)
                            }
                    }(t) : Math.random, this.p = l(e), this.perm = new Uint8Array(512), this.permMod12 = new Uint8Array(512);
                    for (var r = 0; r < 512; r++) this.perm[r] = this.p[255 & r], this.permMod12[r] = this.perm[r] % 12
                }

                function l(t) {
                    var e, r = new Uint8Array(256);
                    for (e = 0; e < 256; e++) r[e] = e;
                    for (e = 0; e < 255; e++) {
                        var n = e + ~~(t() * (256 - e)),
                            o = r[e];
                        r[e] = r[n], r[n] = o
                    }
                    return r
                }
                c.prototype = {
                    grad3: new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1]),
                    grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1, -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1, 1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1, -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]),
                    noise2D: function(t, e) {
                        var r, n, u = this.permMod12,
                            a = this.perm,
                            f = this.grad3,
                            s = 0,
                            c = 0,
                            l = 0,
                            p = (t + e) * o,
                            h = Math.floor(t + p),
                            d = Math.floor(e + p),
                            m = (h + d) * i,
                            g = t - (h - m),
                            v = e - (d - m);
                        g > v ? (r = 1, n = 0) : (r = 0, n = 1);
                        var y = g - r + i,
                            M = v - n + i,
                            b = g - 1 + 2 * i,
                            w = v - 1 + 2 * i,
                            x = 255 & h,
                            E = 255 & d,
                            I = .5 - g * g - v * v;
                        if (I >= 0) {
                            var S = 3 * u[x + a[E]];
                            I *= I, s = I * I * (f[S] * g + f[S + 1] * v)
                        }
                        var P = .5 - y * y - M * M;
                        if (P >= 0) {
                            var O = 3 * u[x + r + a[E + n]];
                            P *= P, c = P * P * (f[O] * y + f[O + 1] * M)
                        }
                        var _ = .5 - b * b - w * w;
                        if (_ >= 0) {
                            var C = 3 * u[x + 1 + a[E + 1]];
                            _ *= _, l = _ * _ * (f[C] * b + f[C + 1] * w)
                        }
                        return 70 * (s + c + l)
                    },
                    noise3D: function(t, e, r) {
                        var n, o, i, f, s, c, l, p, h, d, m = this.permMod12,
                            g = this.perm,
                            v = this.grad3,
                            y = (t + e + r) * u,
                            M = Math.floor(t + y),
                            b = Math.floor(e + y),
                            w = Math.floor(r + y),
                            x = (M + b + w) * a,
                            E = t - (M - x),
                            I = e - (b - x),
                            S = r - (w - x);
                        E >= I ? I >= S ? (s = 1, c = 0, l = 0, p = 1, h = 1, d = 0) : (E >= S ? (s = 1, c = 0, l = 0) : (s = 0, c = 0, l = 1), p = 1, h = 0, d = 1) : I < S ? (s = 0, c = 0, l = 1, p = 0, h = 1, d = 1) : E < S ? (s = 0, c = 1, l = 0, p = 0, h = 1, d = 1) : (s = 0, c = 1, l = 0, p = 1, h = 1, d = 0);
                        var P = E - s + a,
                            O = I - c + a,
                            _ = S - l + a,
                            C = E - p + 2 * a,
                            j = I - h + 2 * a,
                            z = S - d + 2 * a,
                            T = E - 1 + 3 * a,
                            A = I - 1 + 3 * a,
                            D = S - 1 + 3 * a,
                            q = 255 & M,
                            F = 255 & b,
                            R = 255 & w,
                            k = .6 - E * E - I * I - S * S;
                        if (k < 0) n = 0;
                        else {
                            var N = 3 * m[q + g[F + g[R]]];
                            k *= k, n = k * k * (v[N] * E + v[N + 1] * I + v[N + 2] * S)
                        }
                        var L = .6 - P * P - O * O - _ * _;
                        if (L < 0) o = 0;
                        else {
                            var G = 3 * m[q + s + g[F + c + g[R + l]]];
                            L *= L, o = L * L * (v[G] * P + v[G + 1] * O + v[G + 2] * _)
                        }
                        var U = .6 - C * C - j * j - z * z;
                        if (U < 0) i = 0;
                        else {
                            var B = 3 * m[q + p + g[F + h + g[R + d]]];
                            U *= U, i = U * U * (v[B] * C + v[B + 1] * j + v[B + 2] * z)
                        }
                        var W = .6 - T * T - A * A - D * D;
                        if (W < 0) f = 0;
                        else {
                            var V = 3 * m[q + 1 + g[F + 1 + g[R + 1]]];
                            W *= W, f = W * W * (v[V] * T + v[V + 1] * A + v[V + 2] * D)
                        }
                        return 32 * (n + o + i + f)
                    },
                    noise4D: function(t, e, r, n) {
                        var o, i, u, a, c, l, p, h, d, m, g, v, y, M, b, w, x, E = this.perm,
                            I = this.grad4,
                            S = (t + e + r + n) * f,
                            P = Math.floor(t + S),
                            O = Math.floor(e + S),
                            _ = Math.floor(r + S),
                            C = Math.floor(n + S),
                            j = (P + O + _ + C) * s,
                            z = t - (P - j),
                            T = e - (O - j),
                            A = r - (_ - j),
                            D = n - (C - j),
                            q = 0,
                            F = 0,
                            R = 0,
                            k = 0;
                        z > T ? q++ : F++, z > A ? q++ : R++, z > D ? q++ : k++, T > A ? F++ : R++, T > D ? F++ : k++, A > D ? R++ : k++;
                        var N = z - (l = q >= 3 ? 1 : 0) + s,
                            L = T - (p = F >= 3 ? 1 : 0) + s,
                            G = A - (h = R >= 3 ? 1 : 0) + s,
                            U = D - (d = k >= 3 ? 1 : 0) + s,
                            B = z - (m = q >= 2 ? 1 : 0) + 2 * s,
                            W = T - (g = F >= 2 ? 1 : 0) + 2 * s,
                            V = A - (v = R >= 2 ? 1 : 0) + 2 * s,
                            J = D - (y = k >= 2 ? 1 : 0) + 2 * s,
                            Y = z - (M = q >= 1 ? 1 : 0) + 3 * s,
                            Z = T - (b = F >= 1 ? 1 : 0) + 3 * s,
                            H = A - (w = R >= 1 ? 1 : 0) + 3 * s,
                            $ = D - (x = k >= 1 ? 1 : 0) + 3 * s,
                            K = z - 1 + 4 * s,
                            Q = T - 1 + 4 * s,
                            X = A - 1 + 4 * s,
                            tt = D - 1 + 4 * s,
                            te = 255 & P,
                            tr = 255 & O,
                            tn = 255 & _,
                            to = 255 & C,
                            ti = .6 - z * z - T * T - A * A - D * D;
                        if (ti < 0) o = 0;
                        else {
                            var tu = E[te + E[tr + E[tn + E[to]]]] % 32 * 4;
                            ti *= ti, o = ti * ti * (I[tu] * z + I[tu + 1] * T + I[tu + 2] * A + I[tu + 3] * D)
                        }
                        var ta = .6 - N * N - L * L - G * G - U * U;
                        if (ta < 0) i = 0;
                        else {
                            var tf = E[te + l + E[tr + p + E[tn + h + E[to + d]]]] % 32 * 4;
                            ta *= ta, i = ta * ta * (I[tf] * N + I[tf + 1] * L + I[tf + 2] * G + I[tf + 3] * U)
                        }
                        var ts = .6 - B * B - W * W - V * V - J * J;
                        if (ts < 0) u = 0;
                        else {
                            var tc = E[te + m + E[tr + g + E[tn + v + E[to + y]]]] % 32 * 4;
                            ts *= ts, u = ts * ts * (I[tc] * B + I[tc + 1] * W + I[tc + 2] * V + I[tc + 3] * J)
                        }
                        var tl = .6 - Y * Y - Z * Z - H * H - $ * $;
                        if (tl < 0) a = 0;
                        else {
                            var tp = E[te + M + E[tr + b + E[tn + w + E[to + x]]]] % 32 * 4;
                            tl *= tl, a = tl * tl * (I[tp] * Y + I[tp + 1] * Z + I[tp + 2] * H + I[tp + 3] * $)
                        }
                        var th = .6 - K * K - Q * Q - X * X - tt * tt;
                        if (th < 0) c = 0;
                        else {
                            var td = E[te + 1 + E[tr + 1 + E[tn + 1 + E[to + 1]]]] % 32 * 4;
                            th *= th, c = th * th * (I[td] * K + I[td + 1] * Q + I[td + 2] * X + I[td + 3] * tt)
                        }
                        return 27 * (o + i + u + a + c)
                    }
                }, c._buildPermutationTable = l, void 0 !== (n = (function() {
                    return c
                }).call(e, r, e, t)) && (t.exports = n), e.SimplexNoise = c, t.exports = c
            }()
        },
        517: function(t, e, r) {
            "use strict";
            r.d(e, {
                Z: function() {
                    return n
                }
            });
            var n = function(t, e, r) {
                var n = null,
                    o = null,
                    i = function() {
                        n && (clearTimeout(n), o = null, n = null)
                    },
                    u = function() {
                        if (!e) return t.apply(this, arguments);
                        var u = this,
                            a = arguments,
                            f = r && !n;
                        if (i(), o = function() {
                                t.apply(u, a)
                            }, n = setTimeout(function() {
                                if (n = null, !f) {
                                    var t = o;
                                    return o = null, t()
                                }
                            }, e), f) return o()
                    };
                return u.cancel = i, u.flush = function() {
                    var t = o;
                    i(), t && t()
                }, u
            }
        }
    }
]);
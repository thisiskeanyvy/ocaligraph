(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [405], {
        2899: function(e, t, n) {
            "use strict";
            var a, r, s = n(959);

            function l() {
                return (l = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var a in n)({}).hasOwnProperty.call(n, a) && (e[a] = n[a])
                    }
                    return e
                }).apply(null, arguments)
            }
            t.Z = function(e) {
                return s.createElement("svg", l({
                    viewBox: "0 0 12 12",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    preserveAspectRatio: "xMidYMid meet"
                }, e), a || (a = s.createElement("path", {
                    d: "m1.05 1.05 9.9 9.9M1.05 10.95l9.9-9.9",
                    stroke: "#CDCDCD"
                })), r || (r = s.createElement("path", {
                    d: "m5.293 6.707 1.414-1.414M5.293 5.293l1.414 1.414",
                    stroke: "#0E1A19"
                })))
            }
        },
        8389: function(e, t, n) {
            (window.__NEXT_P = window.__NEXT_P || []).push(["/", function() {
                return n(3358)
            }])
        },
        7208: function(e, t, n) {
            "use strict";
            n.d(t, {
                L: function() {
                    return l
                }
            });
            var a = n(1527),
                r = n(959),
                s = n(2947);
            let l = e => {
                let {
                    text: t
                } = e, n = (0, r.useRef)(null);
                return (0, a.jsx)("div", {
                    className: "link-dashed inline-block type-mono-small text-light-gray uppercase",
                    onMouseEnter: () => {
                        n.current && n.current.hover()
                    },
                    children: (0, a.jsx)(s.F, {
                        ref: n,
                        text: t
                    })
                })
            }
        },
        4601: function(e, t, n) {
            "use strict";
            n.d(t, {
                a: function() {
                    return p
                }
            });
            var a = n(1527),
                r = n(959),
                s = n(7991),
                l = n(2645),
                o = n(7340),
                i = n(5080),
                c = n(8731),
                d = n(4360),
                u = n(1608),
                m = n(1307),
                h = n(3665);

            function p() {
                let e = (0, r.useRef)(0),
                    [t, n, p] = (0, l.S)(e => [e.loaded, e.total, e.item]),
                    g = (0, u.NM)(Math.max(0, t) / n * 100, 0),
                    x = (0, d.qr)(e => e.setAppActive),
                    f = (0, d.qr)(e => e.setLoaderReady),
                    v = (0, r.useRef)(null),
                    j = (0, r.useRef)(null),
                    [w, b] = (0, r.useState)(!1),
                    M = (0, i.useTranslations)("Global")("loadingText");
                return (0, r.useEffect)(() => {
                    e.current = g, w && g && (v.current.innerHTML = "".concat(M).concat(g, "%_")), 100 === g && w && (j.current.classList.remove("is-glitch"), setTimeout(() => {
                        f(!0)
                    }, 500), o.ZP.to(".loader", {
                        duration: .3,
                        autoAlpha: 0,
                        ease: "none",
                        delay: .5
                    }))
                }, [g, w, f, M]), (0, s.V)(async () => {
                    j.current.classList.add("is-glitch"), o.ZP.fromTo([v.current, j.current], {
                        opacity: 0
                    }, {
                        opacity: 1,
                        duration: .3,
                        ease: "none"
                    }), (0, h.T)({
                        text: M,
                        fps: 20,
                        duration: 1.2,
                        animation: "stay",
                        ease: "easeInOut",
                        onComplete: () => {
                            b(!0)
                        },
                        onUpdate: t => {
                            let {
                                output: n,
                                t: a
                            } = t;
                            n += "".concat(e.current || 0, "%_"), n = n.split("");
                            let r = (0, u.uZ)(a, 0, 1),
                                s = Math.floor(r * n.length),
                                l = n.map((e, t) => t < s ? r < .8 ? Math.random() : 1 - Math.random() * (1 - r) : 0).sort(() => Math.random() - .5);
                            n = (n = n.map((e, t) => {
                                let n = l[t];
                                return '<span style="opacity: '.concat(n, '">').concat(e, "</span>")
                            })).join(""), v.current.innerHTML = n
                        }
                    }), await (0, m._)(1200), x(!0)
                }), (0, a.jsx)("div", {
                    className: "loader",
                    children: (0, a.jsxs)("div", {
                        className: "loader-inner",
                        children: [(0, a.jsx)("div", {
                            ref: j
                        }), (0, a.jsx)("div", {
                            ref: v,
                            className: "loader-text text-light-gray type-mono-mid uppercase",
                            children: M
                        })]
                    })
                })
            }
        },
        3956: function(e, t, n) {
            "use strict";
            n.d(t, {
                m: function() {
                    return v
                }
            });
            var a, r, s, l, o = n(1527),
                i = n(2899),
                c = n(8731),
                d = n(959);

            function u() {
                return (u = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var a in n)({}).hasOwnProperty.call(n, a) && (e[a] = n[a])
                    }
                    return e
                }).apply(null, arguments)
            }
            var m = function(e) {
                return d.createElement("svg", u({
                    viewBox: "0 0 342 240",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    preserveAspectRatio: "xMidYMid meet"
                }, e), a || (a = d.createElement("path", {
                    d: "M2 .5h338a1.5 1.5 0 0 1 1.5 1.5v231.172a1.5 1.5 0 0 1-.439 1.06l-4.829 4.829a1.5 1.5 0 0 1-1.06.439H2A1.5 1.5 0 0 1 .5 238V2A1.5 1.5 0 0 1 2 .5Z",
                    fill: "#0E1A19",
                    stroke: "#434343"
                })), r || (r = d.createElement("path", {
                    d: "M314.5 239.5V108.389c0-.398.158-.779.438-1.06l6.412-6.424.004-.004L341.5 81.189v151.983a1.5 1.5 0 0 1-.439 1.06l-4.829 4.829a1.5 1.5 0 0 1-1.06.439H314.5ZM302.5.5H340a1.5 1.5 0 0 1 1.5 1.5v37.5H304a1.5 1.5 0 0 1-1.5-1.5V.5Z",
                    stroke: "#434343"
                })))
            };

            function h() {
                return (h = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var a in n)({}).hasOwnProperty.call(n, a) && (e[a] = n[a])
                    }
                    return e
                }).apply(null, arguments)
            }
            var p = function(e) {
                    return d.createElement("svg", h({
                        viewBox: "0 0 318 240",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        preserveAspectRatio: "xMidYMid meet"
                    }, e), s || (s = d.createElement("path", {
                        d: "M2 .5h314a1.5 1.5 0 0 1 1.5 1.5v231.172a1.5 1.5 0 0 1-.439 1.06l-4.829 4.829a1.5 1.5 0 0 1-1.06.439H2A1.5 1.5 0 0 1 .5 238V2A1.5 1.5 0 0 1 2 .5Z",
                        fill: "#0E1A19",
                        stroke: "#434343"
                    })), l || (l = d.createElement("path", {
                        d: "M278.5.5H316a1.5 1.5 0 0 1 1.5 1.5v37.5H280a1.5 1.5 0 0 1-1.5-1.5V.5ZM290.5 239.5V108.389c0-.398.158-.779.438-1.06l6.412-6.424.004-.004L317.5 81.189v151.983a1.5 1.5 0 0 1-.439 1.06l-4.829 4.829a1.5 1.5 0 0 1-1.06.439H290.5Z",
                        stroke: "#434343"
                    })))
                },
                g = n(9170),
                x = n(2153),
                f = n.n(x);

            function v(e) {
                let {
                    className: t,
                    firstCopy: n,
                    secondCopy: a,
                    cornerLabel: r,
                    onClose: s,
                    size: l
                } = e, d = (0, g.cn)("block relative type-paragraph pt-8 pl-4", f().root, "large" === l ? "w-[21.375rem] lg:w-[24.5rem] h-[15rem] lg:h-[18.5rem]" : "w-[21.375rem] lg:w-[19.875rem] h-[15rem]", t);
                return (0, o.jsxs)("div", {
                    className: d,
                    children: [(0, o.jsx)(p, {
                        className: "absolute hidden lg:block w-full h-full top-0 left-0 z-[-1]"
                    }), (0, o.jsx)(m, {
                        className: "lg:hidden absolute w-full h-full top-0 left-0 z-[-1]"
                    }), (0, o.jsxs)("div", {
                        className: (0, g.cn)("flex flex-col text-light-gray text-left uppercase gap-[1.1em]", "large" === l ? "lg:max-w-[21rem] max-w-[18rem]" : "max-w-[14rem] lg:max-w-[14rem]", "large" === l && "max-h-[11rem] overflow-y-auto lg:max-h-unset lg:overflow-y-visible"),
                        children: [(0, o.jsx)("p", {
                            dangerouslySetInnerHTML: {
                                __html: n
                            },
                            className: "pointer-events-auto"
                        }), (0, o.jsx)("p", {
                            children: a
                        }), "large" !== l && (0, o.jsx)("p", {
                            children: "_"
                        })]
                    }), (0, o.jsx)("div", {
                        className: (0, g.cn)("corner-text absolute h-[10rem]  w-7  right-0 bottom-0 rotate-180 pt-3 pl-2 pr-2.5 flex justify-start items-center", f().cornerText),
                        children: (0, o.jsxs)("span", {
                            className: (0, g.cn)("type-mono-small uppercase text-mid-gray pt-3 relative ", 'before:content-[""] before:w-1 before:h-1 before:bg-orange before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2'),
                            children: ["[", r, "]"]
                        })
                    }), (0, o.jsx)(c.Z, {
                        className: "absolute left-4 bottom-4 w-5 h-5"
                    }), (0, o.jsx)("button", {
                        onClick: s,
                        className: (0, g.cn)(f().close, "pointer-events-auto", "large" === l ? "lg:w-[3rem] lg:h-[3rem] w-10 h-10" : "w-10 h-10", "absolute right-0 top-0 lg:right-0 lg:top-0 flex justify-center items-center  border-r-0 border-t-0"),
                        children: (0, o.jsx)(i.Z, {
                            className: "w-3 h-3"
                        })
                    })]
                })
            }
        },
        3358: function(e, t, n) {
            "use strict";
            n.r(t), n.d(t, {
                __N_SSG: function() {
                    return U
                },
                default: function() {
                    return Y
                }
            });
            var a = n(1527),
                r = n(5080),
                s = n(7793),
                l = n.n(s),
                o = n(959),
                i = n(7991);
            n(4166);
            var c = n(7340),
                d = n(9568),
                u = n.n(d),
                m = n(3065),
                h = n(622),
                p = n(4367),
                g = n(3273),
                x = n(3651),
                f = n(2190),
                v = n(4360),
                j = n(1278),
                w = n(5070),
                b = n(358),
                M = n(4601),
                y = n(9990),
                N = n(3895),
                k = n(2947),
                Z = n(1608);
            let H = e => {
                let t = (0, o.useRef)(null),
                    n = (0, o.useRef)(null),
                    r = (0, o.useRef)(null),
                    s = (0, o.useRef)(0),
                    l = (0, o.useRef)(0),
                    d = (0, o.useRef)(null),
                    u = (0, o.useRef)(null),
                    m = (0, o.useRef)(10),
                    h = (0, o.useRef)(null),
                    p = {
                        duration: 1,
                        ease: "power4.out"
                    },
                    g = {
                        duration: 4,
                        delay: .25,
                        ease: "power4.out"
                    };

                function x(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    if (!e) return;
                    let n = 2 * e.r.baseVal.value * Math.PI,
                        a = (0, Z.NM)(.5 * (1 - t / 100)),
                        r = (0, Z.hZ)(t, 0, 100, a, t / 100 * 0),
                        s = n * (.5 - r);
                    e.style.setProperty("--circle-orange-array", "".concat(s, " ").concat(n * r)), e.style.setProperty("--circle-orange-offset", s)
                }

                function f(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        n = Math.PI * e.r.baseVal.value * 2;
                    e.style.strokeDasharray = n, e.style.strokeDashoffset = n - n * t / 100
                }
                return (0, i.V)(() => {
                    u.current = c.ZP.timeline(), c.ZP.to(l, {
                        current: 100,
                        ...g,
                        onUpdate: () => {
                            f(t.current, l.current), f(n.current, l.current)
                        }
                    }), u.current.to(s, {
                        current: 100,
                        ...g,
                        onUpdate: () => {
                            x(r.current, s.current - m.current)
                        }
                    }), u.current.fromTo(d.current, {
                        rotation: -270
                    }, {
                        rotation: 90,
                        ...g
                    }, 0)
                }), (0, a.jsxs)("button", {
                    onClick: e.onClick,
                    className: "".concat(e.className),
                    onMouseEnter: function() {
                        u.current && u.current.kill(), h.current && h.current.hover(), c.ZP.to(s, {
                            current: 70,
                            ...p,
                            onUpdate: () => {
                                x(r.current, s.current)
                            }
                        }), c.ZP.to(d.current, {
                            rotation: 135,
                            scale: 1.07,
                            ...p
                        })
                    },
                    onMouseLeave: function() {
                        c.ZP.to(s, {
                            current: 100 - m.current,
                            ...p,
                            onUpdate: () => {
                                x(r.current, s.current)
                            }
                        }), c.ZP.to(d.current, {
                            rotation: 90,
                            scale: 1,
                            ...p
                        })
                    },
                    children: [(0, a.jsx)("span", {
                        className: "landing-cta-button-text type-mono-large",
                        children: (0, a.jsx)("span", {
                            className: "landing-cta-button-text-inner",
                            children: (0, a.jsx)(k.F, {
                                ref: h,
                                text: e.text
                            })
                        })
                    }), (0, a.jsx)("span", {
                        className: "landing-cta-button-bg",
                        children: (0, a.jsxs)("svg", {
                            ref: d,
                            className: "landing-cta-button-bg-svg",
                            width: "130",
                            height: "130",
                            viewBox: "0 0 130 130",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: [(0, a.jsx)("circle", {
                                className: "landing-cta-button-orange-circle",
                                ref: r,
                                cx: "65",
                                cy: "65",
                                r: "60",
                                stroke: "#FFF",
                                strokeWidth: "4"
                            }), (0, a.jsx)("circle", {
                                className: "landing-cta-button-white-circle-inner",
                                ref: t,
                                cx: "65",
                                cy: "65",
                                r: "56",
                                stroke: "#434343"
                            }), (0, a.jsx)("circle", {
                                className: "landing-cta-button-white-circle-outer",
                                ref: n,
                                cx: "65",
                                cy: "65",
                                r: "64",
                                stroke: "#434343"
                            })]
                        })
                    })]
                })
            };
            var F = n(8184);
            let V = e => {
                    let t = (0, j.Z)(e => e.landingActive),
                        {
                            rive: n,
                            RiveComponent: r
                        } = (0, F.useRive)();
                    return (0, o.useEffect)(() => {
                        t && n && n.play()
                    }, [t, n]), (0, a.jsx)("div", {
                        className: "landing-cta-logo ",
                        children: (0, a.jsx)(r, {})
                    })
                },
                C = e => {
                    let t = (0, j.Z)(e => e.landingActive),
                        {
                            rive: n,
                            RiveComponent: r
                        } = (0, F.useRive)();
                    return (0, o.useEffect)(() => {
                        t && n && n.play()
                    }, [t, n]), (0, a.jsx)("div", {
                        className: "landing-cta-logo ",
                        children: (0, a.jsx)(r, {})
                    })
                };
            var R = n(3956);
            let L = e => {
                let {
                    onClick: t
                } = e, [n, s] = (0, o.useState)(!0), l = (0, r.useTranslations)("Home.landing"), i = (0, N.useRouter)();
                // Point d'entré 2 Keany Vy KHUN
                t();
            };
            var _ = n(7208);
            let E = e => {
                    let {
                        onClick: t
                    } = e, n = (0, v.qr)(e => e.setVolumeOn), s = (0, r.useTranslations)("Home.landing");
                },
                T = () => {
                    let e = (0, r.useTranslations)("Home.landing");
                };
            var A = n(7782),
                P = n.n(A);
            let O = e => {
                    let {
                        text: t,
                        locale: n,
                        active: r
                    } = e, s = (0, o.useRef)(null);
                    return (0, a.jsxs)("li", {
                        children: [(0, a.jsx)(P(), {
                            onMouseEnter: () => {
                                s.current && s.current.hover()
                            },
                            href: ""
                        })]
                    })
                },
                S = () => {
                    let e = (0, N.useRouter)(),
                        t = (0, o.useRef)([{
                            id: "english",
                            text: "en",
                            locale: "en"
                        }, {
                            id: "french",
                            text: "fr",
                            locale: "fr"
                        }]),
                        n = (0, o.useMemo)(() => t.current.map(t => {
                            let {
                                id: n,
                                text: r,
                                locale: s
                            } = t;
                            return (0, a.jsx)(O, {
                                text: r,
                                locale: s,
                                active: e.locale === s
                            }, n)
                        }), [t, e.locale]);
                    return (0, o.useMemo)(() => 40 * t.current.length, [t]), (0, a.jsxs)("div", {
                        className: "landing-header-lang",
                        children: [(0, a.jsxs)("svg", {
                            className: "landing-header-lang-bg",
                            width: "82",
                            height: "42",
                            viewBox: "0 0 82 42",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: [(0, a.jsx)("path", {
                                d: "M41 1H79C80.1046 1 81 1.89543 81 3V39C81 40.1046 80.1046 41 79 41H41V1Z",
                                stroke: "#434343"
                            }), (0, a.jsx)("path", {
                                d: "M1 3C1 1.89543 1.89543 1 3 1H41V41H3C1.89543 41 1 40.1046 1 39V3Z",
                                stroke: "#434343"
                            })]
                        }), (0, a.jsx)("ul", {
                            className: "landing-header-lang-ul",
                            children: n
                        })]
                    })
                },
                K = () => (0, a.jsx)("div", {
                    className: "landing-header",
                    children: (0, a.jsxs)("div", {
                        className: "landing-header-inner",
                        children: [(0, a.jsx)(T, {}), (0, a.jsx)(S, {})]
                    })
                });
            var B = n(1021),
                D = n(641);
            let q = [{
                    position: [35.5, -55.5, -25],
                    src: "/images/landing/01.webp",
                    alt: "placeholder",
                    likes: "".concat((10 * Math.random()).toFixed(0), "K"),
                    comments: "".concat((1e3 * Math.random()).toFixed(0))
                }, {
                    position: [45.5, -75.5, -5],
                    src: "/images/landing/02.webp",
                    alt: "placeholder",
                    likes: "10K",
                    comments: 831
                }, {
                    position: [-2.5, -80.5, -18],
                    src: "/images/landing/03.webp",
                    alt: "placeholder",
                    likes: "".concat((10 * Math.random()).toFixed(0), "K"),
                    comments: "".concat((1e3 * Math.random()).toFixed(0))
                }, {
                    position: [87.5, -86.5, -20],
                    src: "/images/landing/04.webp",
                    alt: "placeholder",
                    likes: "".concat((10 * Math.random()).toFixed(0), "K"),
                    comments: "".concat((1e3 * Math.random()).toFixed(0))
                }, {
                    position: [75.5, -56.5, -2],
                    src: "/images/landing/05.webp",
                    alt: "placeholder",
                    likes: "".concat((10 * Math.random()).toFixed(0), "K"),
                    comments: "".concat((1e3 * Math.random()).toFixed(0))
                }, {
                    position: [3.75, -36.25, -20],
                    src: "/images/landing/06.webp",
                    alt: "placeholder",
                    likes: "".concat((10 * Math.random()).toFixed(0), "K"),
                    comments: "".concat((1e3 * Math.random()).toFixed(0))
                }, {
                    position: [9.75, 16.25, 0],
                    src: "/images/landing/07.webp",
                    alt: "placeholder",
                    likes: "".concat((10 * Math.random()).toFixed(0), "K"),
                    comments: "".concat((1e3 * Math.random()).toFixed(0))
                }, {
                    position: [23.5, -6.5, -2],
                    src: "/images/landing/04.webp",
                    alt: "placeholder",
                    likes: "".concat((10 * Math.random()).toFixed(0), "K"),
                    comments: "".concat((1e3 * Math.random()).toFixed(0))
                }, {
                    position: [67.5, -15, -20],
                    src: "/images/landing/09.webp",
                    alt: "placeholder",
                    likes: "".concat((10 * Math.random()).toFixed(0), "K"),
                    comments: "".concat((1e3 * Math.random()).toFixed(0))
                }, {
                    position: [48.5, 32, -20],
                    src: "/images/landing/01.webp",
                    alt: "placeholder",
                    likes: "".concat((10 * Math.random()).toFixed(0), "K"),
                    comments: "".concat((1e3 * Math.random()).toFixed(0))
                }, {
                    position: [82, 9.5, -13.5],
                    src: "/images/landing/02.webp",
                    alt: "placeholder",
                    likes: "".concat((10 * Math.random()).toFixed(0), "K"),
                    comments: "".concat((1e3 * Math.random()).toFixed(0))
                }, {
                    position: [68, 32.5, 1],
                    src: "/images/landing/03.webp",
                    alt: "placeholder",
                    likes: "".concat((10 * Math.random()).toFixed(0), "K"),
                    comments: "".concat((1e3 * Math.random()).toFixed(0))
                }, {
                    position: [24.5, 45.5, -11],
                    src: "/images/landing/08.webp",
                    alt: "placeholder",
                    likes: "".concat((10 * Math.random()).toFixed(0), "K"),
                    comments: "".concat((1e3 * Math.random()).toFixed(0))
                }],
                G = () => {
                    let e = (0, o.useRef)([]),
                        t = (0, o.useRef)(125),
                        n = (0, o.useRef)(150);
                    return (0, B.xQ)((a, r) => {
                        e.current.forEach((e, a) => {
                            t.current += 25e-5 * r;
                            let s = (q[a].position[1] + t.current) % n.current - n.current / 2;
                            e.style.transform = "translate3d(".concat(q[a].position[0], "vw, ").concat(s, "vw, ").concat(q[a].position[2], "vw)"), e.style.setProperty("--darkness", (0, Z.hZ)(q[a].position[2], -20, 1, 0, .1))
                        })
                    }, []), (0, a.jsx)("div", {
                        className: "landing-images",
                        children: q.map((t, n) => (0, a.jsx)(D.n, {
                            ref: t => e.current[n] = t,
                            src: t.src,
                            alt: t.alt,
                            debug: t.debug,
                            likes: t.likes,
                            comments: t.comments
                        }, n))
                    })
                },
                I = u()(() => Promise.all([n.e(502), n.e(646), n.e(242), n.e(936)]).then(n.bind(n, 1538)), {
                    loadableGenerated: {
                        webpack: () => [1538]
                    },
                    ssr: !1
                });

            function z(e) {
                (0, o.useRef)(), (0, o.useRef)([]);
                let t = (0, v.qr)(e => e.appActive),
                    n = (0, v.qr)(e => e.loaderReady),
                    r = (0, j.Z)(e => e.landingActive),
                    s = (0, w.Z)(e => e.setStoryActive),
                    l = (0, j.Z)(e => e.setLandingActive),
                    i = (0, j.Z)(e => e.setAudioButtonActive),
                    d = (0, j.Z)(e => e.setSkipButtonActive),
                    u = (0, v.iY)(e => e.isMobile),
                    N = (0, o.useMemo)(() => window.innerWidth < 1024 ? b.vr : b.QG, []),
                    k = (0, o.useRef)(),
                    Z = () => {
                        (function() {
                            let e = c.p8.timeline({
                                onComplete: () => {
                                    l(!1)
                                }
                            });
                        })(), k.current = setTimeout(() => {
                            s(!0), i(!0)
                        }, 500)
                    };
                (0, o.useEffect)(() => (n && (c.p8.fromTo(".landing", {
                    opacity: 0
                }, {
                    opacity: 1,
                    duration: 1,
                    delay: .5
                }), c.p8.fromTo(".landing-images", {
                    opacity: 0,
                    scale: 2
                }, {
                    opacity: 1,
                    scale: 1,
                    duration: 2,
                    delay: .5,
                    ease: "power2.out"
                }), l(!0)), () => {
                    s(!1), l(!1), i(!1), d(!1), k.current && clearTimeout(k.current)
                }), [n, l, i, s, d]);
                let H = (0, f.q)();
                return (0, a.jsxs)(a.Fragment, {
                    children: [t && (0, a.jsxs)(a.Fragment, {
                        children: [(0, a.jsx)(I, {
                            projectSheet: N,
                            subtitles: e
                        }), (0, a.jsxs)("div", {
                            className: "landing",
                            children: [(0, a.jsx)(x.$, {
                                projectSheet: N
                            }), (0, a.jsx)(g.Z, {
                                projectSheet: N
                            }), (0, a.jsx)(p.j, {
                                projectSheet: N
                            }), (0, a.jsx)(y.S, {
                                projectSheet: N
                            }), r && (0, a.jsx)(K, {}), !u && r && (0, a.jsx)(G, {}), r && (0, a.jsx)(L, {
                                onClick: Z
                            }), r && (0, a.jsx)(E, {
                                onClick: Z
                            })]
                        })]
                    }), (0, a.jsx)(M.a, {}), H && (0, a.jsx)(m.d, {
                        screen: "story"
                    }), H && (0, a.jsx)(h.M, {})]
                })
            }
            var U = !0;

            function Y() {
                let e = (0, r.useTranslations)("Global"),
                    t = (0, r.useTranslations)("Home.subtitles"),
                    n = [t("subtitle1"), t("subtitle2"), t("subtitle3"), t("subtitle4"), t("subtitle5"), t("subtitle6")];
                return (0, a.jsxs)(a.Fragment, {
                    children: [(0, a.jsxs)(l(), {
                        children: [(0, a.jsx)("title", {
                            children: "".concat(e("title"), " - ").concat(e("description"))
                        }), (0, a.jsx)("meta", {
                            name: "description",
                            content: e("description")
                        })]
                    }), (0, a.jsx)("main", {
                        children: (0, a.jsx)(z, {
                            subtitles: n
                        })
                    })]
                })
            }
        },
        2153: function(e) {
            e.exports = {
                cornerText: "MapDetailInfo_cornerText__1a8kp",
                root: "MapDetailInfo_root__rT74G"
            }
        }
    },
    function(e) {
        e.O(0, [959, 673, 921, 337, 162, 774, 888, 179], function() {
            return e(e.s = 8389)
        }), _N_E = e.O()
    }
]);
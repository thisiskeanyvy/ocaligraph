"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [242], {
        1453: function(e, n, t) {
            t.d(n, {
                Q: function() {
                    return m
                }
            });
            var r = t(1527),
                o = t(959),
                i = t(7991),
                a = t(4166),
                l = t(5007),
                u = t(3895),
                s = t(2947),
                c = t(120),
                f = t(4360),
                p = t(1278),
                v = t(5070);
            let m = e => {
                    let {
                        projectSheet: n,
                        onEnded: t,
                        storySubtitles: i
                    } = e, a = (0, o.useRef)([]), l = (0, p.Z)(e => e.subtitlesActive), s = (0, c.Mi)(n, "VoiceOver"), m = (0, u.useRouter)(), g = (0, v.Z)(e => e.storyActive), [x, y, h] = (0, f.Uc)(e => [e.audio, e.currentAudio, e.setCurrentAudio]);
                    (0, o.useEffect)(() => {
                        if (l && s) return x && !y && h(x.globalLoop), s.sequence.play().then(() => {
                            s.sequence.position > 59 && (t && t(), setTimeout(() => {
                                m.push("/ocr")
                            }, 1e3))
                        }), () => {
                            s.sequence.pause(), s.sequence.position = 0
                        }
                    }, [l, s]), (0, o.useEffect)(() => {
                        let e = () => {
                            s && l && (document.hidden ? s.sequence.pause() : s.sequence.play())
                        };
                        return document.addEventListener("visibilitychange", e), () => {
                            document.removeEventListener("visibilitychange", e)
                        }
                    }, [l]);
                    let R = (0, o.useMemo)(() => {
                        if (i && g) return a.current = [], i.subtitles.map((e, n) => (0, r.jsx)(d, {
                            index: n,
                            text: e,
                            sheet: s
                        }, n))
                    }, [s, g]);
                    return (0, r.jsx)("div", {
                        className: "story-subtitles",
                        children: (0, r.jsx)("div", {
                            className: "story-subtitles-inner flex justify-center",
                            children: (0, r.jsx)("div", {
                                className: "story-subtitles-texts",
                                children: R
                            })
                        })
                    })
                },
                d = e => {
                    let {
                        text: n,
                        index: t,
                        sheet: u
                    } = e, f = (0, o.useRef)(null), p = (0, o.useRef)(null), [v, m] = (0, o.useState)(!1), d = (0, o.useRef)([]), g = (0, c.l7)(u, "Subtitle-".concat(t), {
                        opacity: a.types.number(0, {
                            nudgeMultiplier: .01,
                            range: [0, 1]
                        }),
                        wordProgress: a.types.number(0, {
                            nudgeMultiplier: 1,
                            range: [0, 50]
                        }),
                        textActive: a.types.boolean(!1)
                    });
                    return (0, c.GT)(g, e => {
                        var n;
                        f.current && (f.current.style.opacity = e.opacity, m(e.textActive), n = e.wordProgress, d.current && d.current.forEach((e, t) => {
                            t < n ? e.classList.add("is-active") : e.classList.remove("is-active")
                        }))
                    }), (0, i.V)(() => {
                        let e = new l.SplitText(p.current, {
                            type: "words"
                        });
                        d.current = e.words
                    }), (0, r.jsxs)("div", {
                        ref: f,
                        className: "story-subtitles-text type-mono-mid uppercase text-center text-mid-gray opacity-0",
                        children: [(0, r.jsx)("p", {
                            className: "story-subtitles-text-shuffle",
                            children: v && (0, r.jsx)(s.F, {
                                duration: .8,
                                text: n
                            })
                        }), (0, r.jsx)("p", {
                            className: "story-subtitles-text-words",
                            ref: p,
                            children: n
                        })]
                    })
                }
        },
        264: function(e, n, t) {
            t.d(n, {
                A: function() {
                    return r
                }
            });
            let r = "\n".concat("\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+10.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v) {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n", "\n\nvec3 snoiseVec3( vec3 x ){\n\n  float s  = snoise(vec3( x ));\n  float s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));\n  float s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));\n  vec3 c = vec3( s , s1 , s2 );\n  return c;\n\n}\n\n\nvec3 curl( vec3 p ){\n  const float e = .1;\n  vec3 dx = vec3( e   , 0.0 , 0.0 );\n  vec3 dy = vec3( 0.0 , e   , 0.0 );\n  vec3 dz = vec3( 0.0 , 0.0 , e   );\n\n  vec3 p_x0 = snoiseVec3( p - dx );\n  vec3 p_x1 = snoiseVec3( p + dx );\n  vec3 p_y0 = snoiseVec3( p - dy );\n  vec3 p_y1 = snoiseVec3( p + dy );\n  vec3 p_z0 = snoiseVec3( p - dz );\n  vec3 p_z1 = snoiseVec3( p + dz );\n\n  float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;\n  float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;\n  float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;\n\n  const float divisor = 1.0 / ( 2.0 * e );\n  return normalize( vec3( x , y , z ) * divisor );\n}")
        },
        4796: function(e, n, t) {
            t.d(n, {
                R: function() {
                    return d
                }
            });
            var r = t(1527),
                o = t(959),
                i = t(6426);
            t(4166);
            var a = t(7340),
                l = t(8439),
                u = t(8699);
            (0, l.g)({
                color: new u.Color("white"),
                scale: new u.Vector2(1, 1),
                imageBounds: new u.Vector2(1, 1),
                imageOffset: new u.Vector2(0, 0),
                resolution: 1024,
                map: null,
                zoom: 1,
                radius: 0,
                grayscale: 0,
                opacity: 1
            }, "\n  varying vec2 vUv;\n  varying vec2 vPos;\n  void main() {\n    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);\n    vUv = uv;\n    vPos = position.xy;\n  }\n", "\n  // mostly from https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44\n  varying vec2 vUv;\n  varying vec2 vPos;\n  uniform vec2 scale;\n  uniform vec2 imageBounds;\n  uniform vec2 imageOffset;\n  uniform float resolution;\n  uniform vec3 color;\n  uniform sampler2D map;\n  uniform float radius;\n  uniform float zoom;\n  uniform float grayscale;\n  uniform float opacity;\n  const vec3 luma = vec3(.299, 0.587, 0.114);\n  vec4 toGrayscale(vec4 color, float intensity) {\n    return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);\n  }\n  vec2 aspect(vec2 size) {\n    return size / min(size.x, size.y);\n  }\n\n  const float PI = 3.14159265;\n\n  // from https://iquilezles.org/articles/distfunctions\n  float udRoundBox( vec2 p, vec2 b, float r ) {\n    return length(max(abs(p)-b+r,0.0))-r;\n  }\n\n  void main() {\n    vec2 s = aspect(scale);\n    vec2 i = aspect(imageBounds);\n    float rs = s.x / s.y;\n    float ri = i.x / i.y;\n    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);\n    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;\n    vec2 uv = vUv * s / new + offset;\n    vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);\n\n    zUv += (imageOffset * .1);\n\n    vec2 res = vec2(scale * resolution);\n    vec2 halfRes = 0.5 * res;\n    float b = udRoundBox(vUv.xy * res - halfRes, halfRes, resolution * radius);\n	  vec3 a = mix(vec3(1.0,0.0,0.0), vec3(0.0,0.0,0.0), smoothstep(0.0, 1.0, b));\n    gl_FragColor = toGrayscale(texture2D(map, zUv) * vec4(color, opacity * a), grayscale);\n\n    #include <tonemapping_fragment>\n    #include <colorspace_fragment>\n  }\n");
            var s = t(1231),
                c = t(2066);
            let f = (0, l.g)({
                    map: null,
                    blend: 1,
                    resolution: new u.Vector2
                }, "\n  varying vec2 vUv;\n   void main() {\n     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n     vUv = uv;\n   }", "\n  uniform sampler2D map;\n  uniform float time;\n  uniform float blend;\n   uniform vec2 resolution;\n   varying vec2 vUv;\n   #include <packing>\n   void main() {\n     vec2 uv = gl_FragCoord.xy / resolution.xy;\n     vec4 t = texture2D(map, uv);\n     gl_FragColor = vec4(t.rgb, blend);\n     #include <tonemapping_fragment>\n     #include <colorspace_fragment>\n   }"),
                p = o.forwardRef((e, n) => {
                    let {
                        children: t,
                        active: a,
                        ...l
                    } = e;
                    (0, i.e)({
                        PortalMaterialImpl: f
                    });
                    let u = (0, o.useRef)(null),
                        p = (0, i.A)(e => e.size),
                        v = (0, i.A)(e => e.viewport),
                        [m, d] = (0, o.useState)(!0),
                        g = (0, s.U)(d);
                    return (0, o.useLayoutEffect)(() => {
                        var e;
                        g.current = null === (e = u.current) || void 0 === e ? void 0 : e.__r3f.parent
                    }, []), (0, o.useImperativeHandle)(n, () => u.current), (0, r.jsx)("portalMaterialImpl", {
                        ref: u,
                        blend: 1,
                        resolution: [p.width * v.dpr, p.height * v.dpr],
                        attach: "material",
                        ...l,
                        children: a && (0, r.jsx)(c.T, {
                            samples: 0,
                            attach: "map",
                            frames: m ? 1 / 0 : 0,
                            children: t
                        })
                    })
                });
            var v = t(120),
                m = t(109);
            let d = (0, o.forwardRef)((e, n) => {
                let {
                    id: t,
                    projectSheet: l,
                    overlayImage: u,
                    opacity: s = 0,
                    width: c = 1,
                    height: f = 1,
                    children: d,
                    ...g
                } = e;
                (0, v.Mi)(l, t);
                let x = (0, i.A)(e => e.viewport),
                    [y, h] = (0, o.useState)(!0),
                    R = (0, o.useRef)(),
                    b = (0, o.useRef)(),
                    w = (0, o.useRef)(),
                    S = (0, o.useRef)();
                (0, o.useRef)(), (0, o.useRef)();
                let z = (0, o.useRef)([318, 428]),
                    M = (0, o.useRef)([window.innerWidth, window.innerHeight]),
                    P = (0, o.useRef)(document.querySelector(".c-intro-frame"));
                return (0, m.w)(() => {
                    P.current && (z.current = [P.current.offsetWidth, P.current.offsetHeight], M.current = [window.innerWidth, window.innerHeight])
                }, 100, [P]), (0, o.useImperativeHandle)(n, () => ({
                    animateOut() {
                        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : .5;
                        b.current && b.current.kill(), R.current && (w.current = a.ZP.to(R.current.uniforms.blend, {
                            value: 0,
                            duration: e,
                            ease: "none"
                        }))
                    },
                    animateIn() {
                        R.current && (b.current = a.ZP.fromTo(R.current.uniforms.blend, {
                            value: 0
                        }, {
                            value: 1,
                            duration: 2,
                            ease: "none"
                        }))
                    },
                    setActiveState(e) {
                        h(e)
                    }
                }), []), (0, r.jsx)(r.Fragment, {
                    children: (0, r.jsx)("group", {
                        ...g,
                        children: (0, r.jsxs)("mesh", {
                            ref: S,
                            scale: [x.width, x.height, 1],
                            children: [(0, r.jsx)("planeGeometry", {}), (0, r.jsx)(p, {
                                ref: R,
                                active: y,
                                transparent: "true",
                                blend: s,
                                children: y && d
                            })]
                        })
                    })
                })
            })
        },
        7248: function(e, n, t) {
            t.d(n, {
                H: function() {
                    return o
                }
            });
            var r = t(1527);
            let o = (0, t(959).forwardRef)((e, n) => {
                let {
                    geometry: t,
                    ...o
                } = e;
                return (0, r.jsxs)("mesh", {
                    ref: n,
                    ...o,
                    children: [(0, r.jsx)("bufferGeometry", {
                        attach: "geometry",
                        ...t
                    }), (0, r.jsx)("meshBasicMaterial", {
                        color: o.color || "black",
                        clippingPlanes: o.clippingPlanes
                    })]
                })
            })
        },
        2685: function(e, n, t) {
            t.d(n, {
                I: function() {
                    return m
                }
            });
            var r = t(1527),
                o = t(959),
                i = t(355),
                a = t(9840),
                l = t(2390),
                u = t(3581),
                s = t(6426),
                c = t(4166),
                f = t(8699),
                p = t(120),
                v = t(5070);

            function m(e) {
                let {
                    sheet: n,
                    active: t = !0,
                    center: u = [0, 1.25, 0],
                    position: m = [0, .3, 7]
                } = e, {
                    camera: g,
                    size: x
                } = (0, s.A)(), [y, h] = (0, o.useState)(3), [R, b] = (0, o.useState)(3), [w, S] = (0, o.useState)(0), [z, M] = (0, o.useState)(0), P = (0, o.useRef)(), _ = (0, o.useRef)(), j = (0, o.useRef)(), A = (0, o.useRef)();
                (0, o.useRef)();
                let C = (0, o.useRef)(),
                    F = (0, o.useRef)(),
                    V = (0, o.useRef)(),
                    B = (0, v.Z)(e => e.cameraDebugMode),
                    T = (0, v.Z)(e => e.cameraPanning),
                    I = (0, o.useRef)([new f.Vector3(0, 0, 4), new f.Vector3(0, 0, 2), new f.Vector3(0, 0, 0)]),
                    [E, L] = (0, o.useState)(I.current),
                    O = (0, o.useRef)([new f.Vector3(0, 0, -4), new f.Vector3(0, 0, -6), new f.Vector3(0, 0, -8)]),
                    [D, U] = (0, o.useState)(O.current),
                    [q, G] = (0, o.useState)(!0),
                    W = (0, o.useRef)(1),
                    k = (0, p.l7)(n, "Rig", {
                        cameraPathPoints: c.types.number(3, {
                            nudgeMultiplier: 1,
                            range: [2, 15]
                        }),
                        targetPathPoints: c.types.number(3, {
                            nudgeMultiplier: 1,
                            range: [2, 15]
                        }),
                        fov: c.types.number(30, {
                            nudgeMultiplier: .01,
                            range: [1, 30]
                        }),
                        zoom: c.types.number(1, {
                            nudgeMultiplier: .01,
                            range: [.1, 10]
                        }),
                        cameraProgress: c.types.number(0, {
                            nudgeMultiplier: .01
                        }),
                        targetProgress: c.types.number(0, {
                            nudgeMultiplier: .01
                        }),
                        cameraPanningFactor: c.types.number(1, {
                            nudgeMultiplier: .01,
                            range: [0, 1]
                        })
                    });
                (0, p.GT)(k, e => {
                    W.current = e.cameraPanningFactor
                }), (0, o.useEffect)(() => {
                    C.current.needsUpdate = !0, S(C.current.getLength())
                }, [E]), (0, o.useEffect)(() => {
                    F.current.needsUpdate = !0, M(F.current.getLength())
                }, [D]);
                let H = new f.Vector3;
                new f.Vector3(...u);
                let N = (0, o.useRef)(.5),
                    Z = (0, o.useRef)(.5);

                function Y(e) {
                    let {
                        clientX: n,
                        clientY: t
                    } = e;
                    N.current = n / x.width * 2 - 1, Z.current = -(t / x.height * 2) + 1
                }(0, o.useEffect)(() => (addEventListener("mousemove", Y), () => {
                    removeEventListener("mousemove", Y)
                }), []);
                let X = e => {
                        let t = (0, o.useRef)(new f.Vector3(0, 0, 0)),
                            i = (0, p.l7)(n, e.name, {
                                position: c.types.compound({
                                    x: c.types.number(0, {
                                        nudgeMultiplier: .01
                                    }),
                                    y: c.types.number(0, {
                                        nudgeMultiplier: .01
                                    }),
                                    z: c.types.number(0, {
                                        nudgeMultiplier: .01
                                    })
                                })
                            });
                        return (0, p.GT)(i, n => {
                            t.current.set(n.position.x, n.position.y, n.position.z), "target" === e.type ? (O.current[e.index] ? O.current[e.index] = t.current : O.current.push(t.current), U([...O.current])) : (I.current[e.index] ? I.current[e.index] = t.current : I.current.push(t.current), L([...I.current])), B && (G(!1), setTimeout(() => {
                                G(!0)
                            }, 0))
                        }), (0, r.jsx)(r.Fragment, {
                            children: (0, r.jsx)("group", {
                                position: t
                            })
                        })
                    },
                    K = (0, o.useMemo)(() => Array.from({
                        length: y
                    }).map((e, n) => (0, r.jsx)(X, {
                        index: n,
                        name: "RigPoints / RigPoint ".concat(n + 1)
                    }, n)), [y, k]),
                    Q = (0, o.useMemo)(() => Array.from({
                        length: R
                    }).map((e, n) => (0, r.jsx)(X, {
                        index: n,
                        type: "target",
                        name: "RigTargetPoints / RigTargetPoint ".concat(n + 1)
                    }, n)), [R, k]);
                return (0, p.GT)(k, e => {
                    h(e.cameraPathPoints), b(e.targetPathPoints);
                    let t = f.MathUtils.clamp(e.cameraProgress / w || 0, 0, 1),
                        r = C.current.getPointAt(t),
                        o = f.MathUtils.clamp(e.targetProgress / z || 0, 0, 1),
                        i = F.current.getPointAt(o);
                    _.current = r, j.current = i, (n.sequence.position < .05 || !T) && P.current.position.copy(r), P.current.fov = e.fov, P.current.zoom = e.zoom, P.current.updateProjectionMatrix()
                }), (0, s.C)((e, n) => {
                    let r = t ? N.current : 0,
                        o = t ? Z.current : 0;
                    T && P.current.position.lerp(H.set(_.current.x + 1.25 * r * W.current, _.current.y + .25 * o * W.current, _.current.z), 1 - Math.exp(-2.5 * n)), P.current.lookAt(j.current), V.current && V.current.position.copy(V.current)
                }, [P]), (0, r.jsxs)(r.Fragment, {
                    children: [(0, r.jsx)("catmullRomCurve3", {
                        ref: C,
                        points: E,
                        segments: 150,
                        curveType: "catmullrom"
                    }), (0, r.jsx)("catmullRomCurve3", {
                        ref: F,
                        points: D,
                        segments: 150,
                        curveType: "catmullrom"
                    }), (0, r.jsx)(i.c, {
                        ref: P,
                        makeDefault: !B,
                        fov: 30,
                        aspect: x.width / x.height,
                        near: .1,
                        far: 1e3,
                        position: m
                    }), K, Q, B && (0, r.jsxs)(r.Fragment, {
                        children: [q && (0, r.jsxs)(r.Fragment, {
                            children: [E.map((e, n) => (0, r.jsxs)("mesh", {
                                position: e,
                                children: [(0, r.jsx)("sphereGeometry", {
                                    args: [.05, 32, 32]
                                }), (0, r.jsx)("meshBasicMaterial", {
                                    color: "red"
                                })]
                            }, n)), D.map((e, n) => (0, r.jsxs)("mesh", {
                                position: e,
                                children: [(0, r.jsx)("sphereGeometry", {
                                    args: [.05, 32, 32]
                                }), (0, r.jsx)("meshBasicMaterial", {
                                    color: "blue"
                                })]
                            }, n))]
                        }), (0, r.jsxs)("mesh", {
                            ref: V,
                            children: [(0, r.jsx)("sphereGeometry", {
                                args: [.1, 32, 32]
                            }), (0, r.jsx)("meshBasicMaterial", {
                                color: "yellow"
                            })]
                        }), (0, r.jsx)(a.q, {
                            points: E,
                            color: "red",
                            segments: 150,
                            lineWidth: 2,
                            curveType: "catmullrom",
                            tension: .63
                        }), (0, r.jsx)(a.q, {
                            points: D,
                            color: "blue",
                            segments: 150,
                            lineWidth: 2,
                            curveType: "catmullrom",
                            tension: .63
                        }), (0, r.jsx)(i.c, {
                            makeDefault: !0,
                            fov: 30,
                            near: .1,
                            far: 1e3,
                            position: [10, 10, 10]
                        }), (0, r.jsx)(l.z, {}), (0, r.jsx)(d, {
                            camera: P,
                            ref: A
                        })]
                    })]
                })
            }
            let d = (0, o.forwardRef)((e, n) => {
                let {
                    camera: t
                } = e, i = (0, u.H)(t, f.CameraHelper);
                return (0, o.useEffect)(() => {
                    n.current = i
                }, [i]), (0, r.jsx)("primitive", {
                    ref: n,
                    object: i
                })
            })
        },
        1092: function(e, n, t) {
            t.d(n, {
                z: function() {
                    return p
                }
            });
            var r = t(1527),
                o = t(959),
                i = t(7929),
                a = t(468),
                l = t(8864),
                u = t(8699);
            class s extends l.Qm {
                constructor() {
                    super("Overlay", "\n  uniform sampler2D tBloom;\n  uniform vec3 uColor;\n  uniform vec4 uBlurVignette;\n  uniform vec4 uVignette;\n  uniform vec2 uVignetteOffset;\n  uniform float uScale;\n\n  float vignette(vec2 coords, float vignin, float vignout, float vignfade, float fstop) {\n    float dist = distance(coords.xy, vec2(0.5, 0.5));\n    dist = smoothstep(vignout + (fstop / vignfade), vignin + (fstop / vignfade), dist);\n    return clamp(dist, 0.0, 1.0);\n  }\n\n  vec3 contrast(vec3 color, float value) {\n    return 0.5 + value * (color - 0.5);\n  }\n\n  vec4 screen(const in vec4 x, const in vec4 y, const in float opacity) {\n    return mix(x, x + y - min(x * y, 1.0), opacity);\n  }\n\n  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {\n    vec4 bloom = texture2D(tBloom, uv);\n    bloom.rgb = min(bloom.rgb * 4., 1.); // 4. value matches intensity from orig bloom shader\n    bloom = linearToOutputTexel(bloom);\n    vec2 scaledUV = uv;\n    scaledUV.x = (uv.x - 0.5) * uScale + 0.5;\n\n    float blurMask = vignette(scaledUV + uVignetteOffset, uBlurVignette.x, uBlurVignette.y, uBlurVignette.z, uBlurVignette.w);\n    vec4 inputCol = inputColor;\n    inputCol.rgb = clamp(contrast(inputColor.rgb, 2.) * 0.5, 0., 1.);\n    vec4 color = mix(screen(inputCol, bloom, 0.85), bloom, 1. - blurMask);\n\n    // vignette\n    float vig = vignette(scaledUV + uVignetteOffset, uVignette.x, uVignette.y, uVignette.z, uVignette.w);\n    color.rgb = mix(vec3(0.), color.rgb, vig);\n\n    outputColor = max(color, vec4(uColor, 1.));\n  }\n", {
                        uniforms: new Map([
                            ["tBloom", new u.Uniform(null)],
                            ["uColor", new u.Uniform(new u.Color("#4a4a4a"))],
                            ["uBlurVignette", new u.Uniform(new u.Vector4(.01, .75, .9, .01))],
                            ["uVignette", new u.Uniform(new u.Vector4(.1, .55, .5, .01))],
                            ["uVignetteOffset", new u.Uniform(new u.Vector2(0, -.2))],
                            ["uScale", new u.Uniform(1)]
                        ])
                    }), this.inputColorSpace = u.SRGBColorSpace
                }
            }
            let c = u.MathUtils.generateUUID();
            var f = (0, o.forwardRef)(function(e, n) {
                let {
                    bloomPass: t
                } = e, i = (0, o.useMemo)(() => new s(t), [t]);
                return (0, r.jsx)("primitive", {
                    ref: n,
                    object: i
                })
            });
            let p = (0, o.memo)(e => {
                let {
                    vignette: n = [.1, .6, .5, .01],
                    blurVignette: t = [.01, .75, .9, .01],
                    vignetteOffset: s = [0, -.15],
                    scaleX: p = 1
                } = e, v = (0, o.useRef)(), m = (0, o.useRef)();
                return (0, o.useEffect)(() => {
                    m.current && (m.current.uniforms.get("tBloom").value = v.current.texture, m.current.uniforms.get("uVignette").value = new u.Vector4(n[0], n[1], n[2], n[3]), m.current.uniforms.get("uBlurVignette").value = new u.Vector4(t[0], t[1], t[2], t[3]), m.current.uniforms.get("uVignetteOffset").value = new u.Vector2(s[0], s[1]), m.current.uniforms.get("uScale").value = p, m.current.uniforms.get("uColor").value = new u.Color("#0E1A19"))
                }, [n, t, s, p]), (0, r.jsx)(r.Fragment, {
                    children: (0, r.jsxs)(i.x, {
                        disableNormalPass: !0,
                        children: [(0, r.jsx)(a.d, {
                            mipmapBlur: !0,
                            ref: v,
                            luminanceThreshold: .01,
                            luminanceSmoothing: .01,
                            radius: .915,
                            intensity: 1,
                            blendFunction: l.YQ.SKIP
                        }), (0, r.jsx)(f, {
                            ref: m
                        }, c)]
                    })
                })
            })
        },
        5091: function(e, n, t) {
            t.d(n, {
                Y: function() {
                    return p
                }
            });
            var r = t(1527),
                o = t(959),
                i = t(4166),
                a = t(120),
                l = t(6426),
                u = t(8699),
                s = t(264);
            let c = "\n".concat(s.A, "\n\nattribute vec3 inst_position;\nattribute float size;\nattribute float fade;\nattribute float speed;\nattribute float endTime;\nattribute float direction;\n\nuniform float uTime;\nuniform float uSize;\nuniform float uSpreadEnd;\nuniform float uSpreadStart;\nuniform float uSpeed;\nuniform float uSpeedVariation;\nuniform float uSpreadDepth;\nuniform float uWind;\nuniform float uReveal;\nuniform float uRevealRange;\nuniform float uRevealFireoffset;\nuniform bool bReveal;\nuniform bool uRevealReverse;\nuniform float uRevealAngle;\nuniform vec3 uRevealAngleCenterPosition;\nuniform float uRevealFade;\n\nvarying vec2 vUv;\nvarying float vLife;\nvarying float vFade;\nvarying float vAlpha;\n\nvoid main() {\n\n  vFade = fade;\n  vUv = uv;\n\n  vec3 p = inst_position;\n\n\n  float t = uTime * 2.;\n  float v = uSpeed * mix(1., speed, uSpeedVariation);\n  float s = v * t;\n\n  float end = 2. * endTime;\n\n  p.y = mod(p.y + s, end);\n  p.x = p.x * direction;\n\n  float normalizedPY = p.y / (2.);\n\n  vLife = (end - p.y) * .9;\n\n  float spread = mix(uSpreadStart, uSpreadStart + uSpreadEnd, normalizedPY);\n\n  p.x = p.x * spread;\n  p.x += (uWind * 1.) * p.y;\n\n  p.z = p.z * uSpreadDepth;\n\n\n  vAlpha = 1.;\n\n  float fadeStep = uRevealFade;\n  float computedReveal = uReveal;\n  if(uRevealReverse) computedReveal = 1. - uReveal;\n  computedReveal = (computedReveal * uRevealRange) - (uRevealRange / 2.);\n\n  vec4 wPosition = modelMatrix * vec4(p, 1.0);\n  wPosition.xyz = wPosition.xyz - uRevealAngleCenterPosition;\n\n  float dirX = cos(uRevealAngle);\n  float dirZ = sin(uRevealAngle);\n\n  float projection = wPosition.x * dirX + wPosition.z * dirZ;\n\n  if(uRevealReverse) {\n    float revealWOffset = computedReveal + uRevealFireoffset;\n    if(projection < revealWOffset + fadeStep) {\n      float reveal = smoothstep(revealWOffset, revealWOffset + fadeStep, projection);\n      vAlpha *= reveal;\n      if(projection > revealWOffset) p = mix(p, p + curl(p * .5 + uTime * .00005), 1. - reveal);\n    }\n  } else {\n    float revealWOffset = computedReveal - uRevealFireoffset;\n    if(projection > revealWOffset - fadeStep) {\n      float reveal = smoothstep(revealWOffset, revealWOffset - fadeStep, projection);\n      vAlpha *= reveal;\n      if(projection < revealWOffset) p = mix(p, p -curl(p * .5 + uTime * .00005), 1. - reveal);\n    }\n  }\n\n  float baseSize = 30. * size * uSize;\n  float pointSize = baseSize * pow(vLife * .75, 2.);\n\n	vec3 scale;\n	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n  scale.z = length( vec3( modelMatrix[ 2 ].x, modelMatrix[ 2 ].y, modelMatrix[ 2 ].z ) );\n\n  vec4 mvPosition = modelViewMatrix * vec4( p * scale, 1.0 );\n\n  vec3 alignedPosition = (position.xyz * pointSize);\n	mvPosition.xyz += alignedPosition;\n\n	gl_Position = projectionMatrix * mvPosition;\n}"),
                f = (0, o.forwardRef)((e, n) => {
                    let {
                        speed: t,
                        wind: s,
                        speedVariation: f,
                        emitterRotation: p,
                        ...v
                    } = e, m = (0, o.useRef)(), [d, g] = (0, o.useState)(!1), [x, y] = (0, o.useState)(40);
                    (0, o.useEffect)(() => {
                        g(!0)
                    }, []);
                    let h = (0, a.l7)(v.sheet, v.name, {
                            position: i.types.compound({
                                x: i.types.number(v.position[0], {
                                    nudgeMultiplier: .01
                                }),
                                y: i.types.number(v.position[1], {
                                    nudgeMultiplier: .01
                                }),
                                z: i.types.number(v.position[2], {
                                    nudgeMultiplier: .01
                                })
                            }),
                            scale: i.types.number(v.scale, {
                                nudgeMultiplier: .01
                            }),
                            particleSize: i.types.number(.25, {
                                nudgeMultiplier: .01
                            }),
                            spreadStart: i.types.number(.5, {
                                nudgeMultiplier: .01,
                                range: [0, 10]
                            }),
                            spreadEnd: i.types.number(.5, {
                                nudgeMultiplier: .01,
                                range: [0, 10]
                            }),
                            spreadDepth: i.types.number(.5, {
                                nudgeMultiplier: .01,
                                range: [0, 20]
                            }),
                            color: i.types.rgba({
                                r: 1,
                                g: .15,
                                b: 0,
                                a: 1
                            }),
                            colorIntensity: i.types.number(5, {
                                nudgeMultiplier: .01,
                                range: [0, 10]
                            })
                        }),
                        R = (0, o.useMemo)(() => x * x, [x]);
                    (0, a.GT)(h, e => {
                        e.position && m.current.position.set(e.position.x, e.position.y, e.position.z), e.scale && m.current.scale.set(e.scale, e.scale, e.scale), e.particleSize && (m.current.material.uniforms.uSize.value = e.particleSize), e.spreadStart && (m.current.material.uniforms.uSpreadStart.value = e.spreadStart), e.spreadEnd && (m.current.material.uniforms.uSpreadEnd.value = e.spreadEnd), e.spreadDepth && (m.current.material.uniforms.uSpreadDepth.value = e.spreadDepth), e.particleAmount && y(Math.sqrt(e.particleAmount)), e.color && (m.current.material.uniforms.uColor.value = new u.Color(e.color.r, e.color.g, e.color.b)), e.colorIntensity && (m.current.material.uniforms.uColorBrightness.value = e.colorIntensity)
                    }), (0, o.useEffect)(() => {
                        m.current.frustumCulled = !1, m.current.material.uniforms.uSpeed.value = t || .125, m.current.material.uniforms.uSpeedVariation.value = f || 1, m.current.material.uniforms.uWind.value = s || .5
                    }, [t, s, f]);
                    let b = (0, o.useMemo)(() => {
                        let e = new u.ShaderMaterial({
                                vertexShader: c,
                                fragmentShader: "\nuniform vec3 uColor;\nuniform float uColorBrightness;\nvarying vec2 vUv;\nvarying float vLife;\nvarying float vFade;\nvarying float vAlpha;\n\nvoid main() {\n  if( vLife <= .01 ) discard;\n\n  float distanceToCenter = distance(vUv, vec2(0.5));\n  float blurParticle = clamp(.1 / distanceToCenter - 0.1, 0., 1.);\n\n  if(distanceToCenter > 0.5) {\n    discard;\n  }\n\n  vec3 mixed = uColor;\n  mixed *= uColorBrightness;\n\n  gl_FragColor = vec4( mixed + blurParticle * .2, vFade * blurParticle * pow(vLife, -.015) );\n  gl_FragColor.a *= .25;\n  gl_FragColor.a *= vAlpha;\n}\n",
                                uniforms: {
                                    uTime: {
                                        value: 0
                                    },
                                    uSize: {
                                        value: 1
                                    },
                                    uSpreadStart: {
                                        value: .5
                                    },
                                    uSpreadEnd: {
                                        value: .5
                                    },
                                    uSpeed: {
                                        value: t || .125
                                    },
                                    uSpeedVariation: {
                                        value: f || .5
                                    },
                                    uSpreadDepth: {
                                        value: .5
                                    },
                                    uWind: {
                                        value: s || .5
                                    },
                                    uReveal: {
                                        value: 1
                                    },
                                    uRevealRange: {
                                        value: 20
                                    },
                                    bReveal: {
                                        value: !1
                                    },
                                    uRevealFireoffset: {
                                        value: 0
                                    },
                                    uRevealReverse: {
                                        value: !1
                                    },
                                    uRevealAngle: {
                                        value: 0
                                    },
                                    uRevealAngleCenterPosition: {
                                        value: new u.Vector3(0, 0, 0)
                                    },
                                    uRevealFade: {
                                        value: 2.5
                                    },
                                    uColor: {
                                        value: new u.Color(16721408)
                                    },
                                    uColorBrightness: {
                                        value: 5
                                    }
                                },
                                transparent: !0,
                                blending: u.AdditiveBlending,
                                depthWrite: !1
                            }),
                            n = new Float32Array(3 * R),
                            r = new Float32Array(R),
                            o = new Float32Array(R),
                            i = new Float32Array(R),
                            a = new Float32Array(R),
                            l = new Float32Array(R);
                        for (let e = 0; e < x; e++)
                            for (let t = 0; t < x; t++) {
                                let u = e * x + t;
                                n[3 * u] = t / x - .5, n[3 * u + 1] = e / x - .5, n[3 * u + 2] = 2 * Math.random() - 1, r[u] = 3 * Math.random(), o[u] = Math.random(), i[u] = .75 * Math.random() + .25, a[u] = 2 * Math.random(), l[u] = .75 * Math.random() + .25
                            }
                        let p = new u.PlaneGeometry(.01, .01),
                            v = new u.InstancedBufferGeometry().copy(p);
                        return v.instanceCount = R, v.setAttribute("inst_position", new u.InstancedBufferAttribute(n, 3)), v.setAttribute("size", new u.InstancedBufferAttribute(r, 1)), v.setAttribute("fade", new u.InstancedBufferAttribute(o, 1)), v.setAttribute("speed", new u.InstancedBufferAttribute(i, 1)), v.setAttribute("endTime", new u.InstancedBufferAttribute(a, 1)), v.setAttribute("direction", new u.InstancedBufferAttribute(l, 1)), {
                            material: e,
                            instancedPlaneGeo: v
                        }
                    }, [R]);
                    return (0, l.C)(e => {
                        m.current.material.uniforms.uTime.value = e.clock.elapsedTime + 1e3
                    }), (0, o.useImperativeHandle)(n, () => ({
                        el: m.current,
                        loaded: d
                    })), (0, r.jsxs)("mesh", {
                        ref: m,
                        ...v,
                        rotation: p,
                        children: [(0, r.jsx)("primitive", {
                            attach: "geometry",
                            object: b.instancedPlaneGeo
                        }), (0, r.jsx)("primitive", {
                            attach: "material",
                            object: b.material
                        })]
                    })
                }),
                p = (0, o.forwardRef)((e, n) => {
                    let {
                        sheet: t,
                        onAllLoaded: l = () => {}
                    } = e, u = (0, o.useRef)([]), [s, c] = (0, o.useState)(0), [p, v] = (0, o.useState)(.125), [m, d] = (0, o.useState)(.5), [g, x] = (0, o.useState)(1), [y, h] = (0, o.useState)([0, 0, 0]);
                    (0, o.useRef)(null);
                    let R = (0, a.l7)(t, "Emitters", {
                            emitterCount: i.types.number(0, {
                                nudgeMultiplier: 1,
                                range: [0, 10]
                            }),
                            speed: i.types.number(.125, {
                                nudgeMultiplier: .01,
                                range: [0, 1]
                            }),
                            wind: i.types.number(.5, {
                                nudgeMultiplier: .01,
                                range: [-3, 3]
                            }),
                            speedVariation: i.types.number(.5, {
                                nudgeMultiplier: .01,
                                range: [0, 1]
                            }),
                            emitterRotation: i.types.compound({
                                x: i.types.number(0, {
                                    nudgeMultiplier: .01
                                }),
                                y: i.types.number(0, {
                                    nudgeMultiplier: .01
                                }),
                                z: i.types.number(0, {
                                    nudgeMultiplier: .01
                                })
                            })
                        }),
                        [b, w] = (0, o.useState)([]);
                    (0, o.useMemo)(() => {
                        w(Array(s).fill(!1))
                    }, [s]);
                    let S = e => {
                        w(n => {
                            let t = [...n];
                            return t[e] = !0, t
                        })
                    };
                    (0, o.useEffect)(() => {
                        b.every(e => e) && l()
                    }, [b, l]), (0, a.GT)(R, e => {
                        e.emitterCount !== s && (e.emitterCount ? c(e.emitterCount) : c(0)), e.speed && e.speed !== p && v(e.speed), e.wind && e.wind !== m && d(e.wind), e.speedVariation && e.speedVariation !== g && x(e.speedVariation)
                    }), (0, o.useImperativeHandle)(n, () => u.current);
                    let z = (0, o.useMemo)(() => Array.from({
                        length: s
                    }).map((e, n) => (0, r.jsx)(f, {
                        sheet: t,
                        ref: e => {
                            u.current[n] = e, (null == e ? void 0 : e.loaded) && S(n)
                        },
                        name: "Emitters / Emitter-".concat(n),
                        scale: 1,
                        position: [0, -.75, 0],
                        speed: p,
                        wind: m,
                        speedVariation: g
                    }, n)), [t, s, p, m, g]);
                    return (0, r.jsx)(r.Fragment, {
                        children: z
                    })
                })
        },
        5232: function(e, n, t) {
            t.d(n, {
                D: function() {
                    return g
                }
            });
            var r = t(1527),
                o = t(959),
                i = t(1334),
                a = t(4718),
                l = t(6426),
                u = t(4166),
                s = t(8699),
                c = t(3918),
                f = t(120),
                p = t(8439),
                v = t(264);
            let m = (0, p.g)({
                    tPosition: null,
                    tLights: null,
                    uTime: 0,
                    uResolution: new s.Vector2,
                    uFocus: 5.1,
                    uFov: 50,
                    uBlur: 1,
                    uBlurRadius: 2,
                    uBaseSize: 1,
                    uBlurParticle: 1,
                    uRandomSize: .5,
                    uBaseAlpha: .5,
                    uRandomAlpha: .5,
                    tLights: null,
                    uFocusAlpha: .01,
                    uColor: new s.Color(0),
                    bGpu: !1,
                    uReveal: 1,
                    uRevealRange: 20,
                    bReveal: !1,
                    uRevealReverse: !1,
                    uRevealAngle: 0,
                    uRevealAngleCenterPosition: new s.Vector3,
                    uRevealFade: 2.5
                }, "\n  ".concat(v.A, "\n\n  uniform sampler2D tLights;\n  attribute float size;\n  attribute float alpha;\n  attribute float velocity;\n  uniform float uTime;\n  uniform float uFocus;\n  uniform float uFov;\n  uniform float uBaseAlpha;\n  uniform float uRandomAlpha;\n  uniform float uBaseSize;\n  uniform float uRandomSize;\n  uniform float uBlurRadius;\n  uniform float uFocusAlpha;\n  uniform float uBlur;\n  uniform bool bGpu;\n  uniform float uBlurParticle;\n  uniform float uReveal;\n  uniform float uRevealRange;\n  uniform bool bReveal;\n  uniform bool uRevealReverse;\n  uniform float uRevealAngle;\n  uniform vec3 uRevealAngleCenterPosition;\n  uniform float uRevealFade;\n  uniform vec2 uResolution;\n  varying float vDistance;\n  varying float vAlpha;\n\n  void main() {\n    vAlpha = mix(1., alpha, uRandomAlpha) * uBaseAlpha;\n    vec3 pos = position.xyz;\n\n    float fadeStep = uRevealFade;\n    float computedReveal = uReveal;\n\n    if(uRevealReverse) computedReveal = 1. - uReveal;\n    computedReveal = (computedReveal * uRevealRange) - (uRevealRange / 2.);\n\n    vec4 wPosition = modelMatrix * vec4(pos, 1.0);\n    wPosition.xyz = wPosition.xyz - uRevealAngleCenterPosition;\n\n    float dirX = cos(uRevealAngle);\n    float dirZ = sin(uRevealAngle);\n\n    float projection = wPosition.x * dirX + wPosition.z * dirZ;\n\n    float curlSpeed = .025;\n\n    if(velocity < 0.015) {\n      curlSpeed = .015;\n    }\n\n    vec3 curlAnimation = curl(pos * 10.05 + uTime * curlSpeed) * 2.;\n    float reveal = 1.;\n\n    if (uRevealReverse) {\n      if (projection < computedReveal + fadeStep) {\n          reveal = smoothstep(computedReveal, computedReveal + fadeStep, projection);\n          vAlpha *= reveal;\n      }\n    } else {\n      if (projection > computedReveal - fadeStep) {\n        reveal = smoothstep(computedReveal, computedReveal - fadeStep, projection);\n        vAlpha *= reveal;\n      }\n    }\n\n    float sizeF = .5;\n\n    float computedSize = mix(uBaseSize, uBaseSize * size, uRandomSize);\n    if(velocity < 0.02) {\n      pos = mix(pos, pos + curlAnimation, 1.);\n      computedSize = computedSize / pow(size, sizeF);\n    } else {\n      pos = mix(pos, pos + curlAnimation, 1. - reveal);\n    }\n\n\n    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);\n    gl_Position = projectionMatrix * mvPosition;\n\n    float vPosZ = mvPosition.z;\n    vDistance = clamp(abs(uFocus + vPosZ * .5), -25., 25.);\n\n    float pointSize = max(computedSize, computedSize * vDistance * uBlurRadius );\n    pointSize *= uResolution.y /  1200.;\n    gl_PointSize = clamp(pointSize, 0., 40.);\n  }\n  "), "\n      varying float vAlpha;\n      uniform float uBlur;\n      uniform float uFocusAlpha;\n      uniform vec2 uResolution;\n      varying float vDistance;\n      uniform sampler2D tLights;\n      uniform vec3 uColor;\n      uniform float uBlurParticle;\n\n      void main() {\n        vec2 cxy = 2.0 * gl_PointCoord - 1.0;\n        vec3 lightMap = texture2D(tLights, gl_FragCoord.xy / uResolution).rgb;\n        gl_FragColor.rgb = vec3(1.);\n\n        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));\n\n        if(distanceToCenter > 0.5) {\n          discard;\n        }\n\n        if (dot(cxy, cxy) > 1.) discard;\n\n        float blurF = (1.05 - clamp(vDistance * .1, 0.0, 1.0));\n        float blurParticle = clamp(.05 / distanceToCenter - 0.1, 0., 1.);\n        float blurParticleF = mix( 1. , blurParticle, uBlurParticle);\n\n        gl_FragColor = vec4(uColor.rgb, mix(vAlpha, blurF * vAlpha, uBlur) * blurParticleF);\n      }"),
                d = (0, o.forwardRef)((e, n) => {
                    let {
                        ...t
                    } = e;
                    (0, l.e)({
                        ParticlesMaterialImpl: m
                    });
                    let i = (0, o.useRef)(null);
                    return (0, o.useImperativeHandle)(n, () => i.current), (0, r.jsx)("particlesMaterialImpl", {
                        ref: i,
                        attach: "material",
                        ...t
                    })
                }),
                g = (0, o.forwardRef)((e, n) => {
                    let {
                        pcd: t,
                        depthTest: p,
                        sheet: v,
                        ...m
                    } = e, g = (0, o.useRef)(), x = (0, i.R)();
                    (0, o.useEffect)(() => {
                        g.current.uniforms.uColor.value = new s.Color("white"), g.current.depthTest = p
                    }, [p]);
                    let y = (0, f.l7)(v, "Particles", {
                        focus: u.types.number(14, {
                            nudgeMultiplier: .01
                        }),
                        focusAlpha: u.types.number(0, {
                            nudgeMultiplier: .01
                        }),
                        blur: u.types.number(.65, {
                            nudgeMultiplier: .01
                        }),
                        blurParticle: u.types.number(1, {
                            nudgeMultiplier: .01
                        }),
                        blurRadius: u.types.number(.65, {
                            nudgeMultiplier: .01
                        }),
                        randomSize: u.types.number(.65, {
                            nudgeMultiplier: .01
                        }),
                        baseSize: u.types.number(1.2, {
                            nudgeMultiplier: .01
                        }),
                        randomAlpha: u.types.number(.83, {
                            nudgeMultiplier: .01
                        }),
                        baseAlpha: u.types.number(1, {
                            nudgeMultiplier: .01
                        })
                    });
                    (0, f.GT)(y, e => {
                        e.focus && (g.current.uniforms.uFocus.value = e.focus), e.focusAlpha && (g.current.uniforms.uFocusAlpha.value = e.focusAlpha), e.blur && (g.current.uniforms.uBlur.value = e.blur), e.blurRadius && (g.current.uniforms.uBlurRadius.value = e.blurRadius), e.blurParticle && (g.current.uniforms.uBlurParticle.value = e.blurParticle), e.randomSize && (g.current.uniforms.uRandomSize.value = e.randomSize), e.baseSize && (g.current.uniforms.uBaseSize.value = e.baseSize), e.randomAlpha && (g.current.uniforms.uRandomAlpha.value = e.randomAlpha), e.baseAlpha && (g.current.uniforms.uBaseAlpha.value = e.baseAlpha), e.color && (g.current.uniforms.uColor.value = new s.Color(e.colorLight))
                    });
                    let h = (0, o.useMemo)(() => {
                            let e = (t.includes(".glb") ? (0, a.L)(t).scene.children[0] : (0, l.F)(c.w, t)).geometry.attributes.position.array,
                                n = Math.floor(Math.sqrt(e.length - 1)),
                                r = n * n + 20,
                                o = new Float32Array(r / 3),
                                i = new Float32Array(r / 3),
                                u = new Float32Array(r),
                                s = new Float32Array(r / 3);
                            for (let n = 0; n < r; n += 3) 0 === u[n] && (n >= e.length ? (u[n] = -1e3, u[n + 1] = -1e3, u[n + 2] = -1e3) : (u[n] = e[n], u[n + 1] = e[n + 1], u[n + 2] = e[n + 2]));
                            for (let e = 0; e < o.length; e++) o[e] = 3 * Math.random(), i[e] = 1 * Math.random(), s[e] = Math.random();
                            return {
                                positions: u,
                                particles: e,
                                sizes: o,
                                alphas: i,
                                velocities: s
                            }
                        }, [t]),
                        R = (e, n) => {
                            e.tLights.value = x.texture, e.uTime.value = n.clock.elapsedTime, e.uResolution.value.set(n.size.width * n.viewport.dpr, n.size.height * n.viewport.dpr)
                        };
                    return (0, l.C)(e => {
                        R(g.current.uniforms, e)
                    }), (0, r.jsxs)("points", {
                        ref: n,
                        ...m,
                        children: [(0, r.jsx)(d, {
                            ref: g,
                            transparent: !0,
                            blending: s.NormalBlending,
                            depthWrite: !1
                        }), (0, r.jsxs)("bufferGeometry", {
                            children: [(0, r.jsx)("bufferAttribute", {
                                attach: "attributes-position",
                                count: h.positions.length / 3 - 1,
                                array: h.positions,
                                itemSize: 3
                            }), (0, r.jsx)("bufferAttribute", {
                                attach: "attributes-size",
                                count: h.sizes.length,
                                array: h.sizes,
                                itemSize: 1
                            }), (0, r.jsx)("bufferAttribute", {
                                attach: "attributes-alpha",
                                count: h.alphas.length,
                                array: h.alphas,
                                itemSize: 1
                            }), (0, r.jsx)("bufferAttribute", {
                                attach: "attributes-velocity",
                                count: h.sizes.length,
                                array: h.velocities,
                                itemSize: 1
                            })]
                        })]
                    })
                })
        },
        1594: function(e, n, t) {
            t.d(n, {
                o: function() {
                    return a
                }
            });
            var r = t(1527),
                o = t(959),
                i = t(5070);
            let a = (0, o.forwardRef)((e, n) => {
                let {
                    angle: t = 0
                } = e, o = (0, i.Z)(e => e.cameraDebugMode);
                return (0, r.jsx)(r.Fragment, {
                    children: o && (0, r.jsxs)("mesh", {
                        ref: n,
                        children: [(0, r.jsx)("planeGeometry", {
                            args: [10, 10, 1, 1]
                        }), (0, r.jsx)("meshBasicMaterial", {
                            color: "#5ced73",
                            wireframe: !0
                        })]
                    })
                })
            })
        },
        7814: function(e, n, t) {
            t.d(n, {
                L: function() {
                    return v
                }
            });
            var r = t(1527),
                o = t(959),
                i = t(4718),
                a = t(6655);
            t(5091);
            var l = t(7248),
                u = t(5232),
                s = t(2685),
                c = t(1594),
                f = t(1439),
                p = t(120);
            t(1307);
            let v = (0, o.forwardRef)((e, n) => {
                let {
                    projectSheet: t
                } = e, v = (0, p.Mi)(t, "Bear");
                (0, f.r)(v);
                let {
                    nodes: m
                } = (0, i.L)("/models/bear/04_Shot_4_Bear_v2.glb"), [d, g] = (0, o.useState)(!1);
                (0, o.useImperativeHandle)(n, () => ({
                    sheet: v,
                    animateIn() {
                        v.sequence.pause(), v.sequence.position = 0, v.sequence.play()
                    }
                }), [v]);
                let x = (0, o.useRef)(),
                    y = (0, o.useRef)(),
                    h = (0, o.useRef)(),
                    R = (0, o.useRef)();
                return (0, f.L)(v, x, y, h, R, [d]), (0, r.jsxs)(a.yR, {
                    sheet: v,
                    children: [(0, r.jsx)("color", {
                        attach: "background",
                        args: ["#000"]
                    }), (0, r.jsx)(s.I, {
                        sheet: v,
                        center: [0, .4, -7],
                        initialPosition: [0, .4, 6],
                        active: !0
                    }), (0, r.jsxs)(a.Ah.group, {
                        theatreKey: "Scene",
                        children: [(0, r.jsx)(c.o, {
                            ref: R
                        }), (0, r.jsxs)("group", {
                            position: [0, -.75, -12],
                            children: [(0, r.jsx)(l.H, {
                                ref: h,
                                geometry: m.Mesh_Bear.geometry,
                                position: [0, -.01, -.01],
                                rotation: [Math.PI / 2, 0, 0],
                                color: "#000"
                            }), (0, r.jsx)(u.D, {
                                ref: y,
                                sheet: v,
                                pcd: "/models/bear/04_Shot_4_Bear_v2.pcd",
                                depthTest: !0
                            })]
                        })]
                    })]
                })
            });
            i.L.preload("/models/bear/04_Shot_4_Bear_v2.glb")
        },
        7081: function(e, n, t) {
            t.d(n, {
                P: function() {
                    return v
                }
            });
            var r = t(1527),
                o = t(959),
                i = t(4718),
                a = t(6655);
            t(5091);
            var l = t(7248),
                u = t(5232),
                s = t(2685),
                c = t(1594),
                f = t(1439),
                p = t(120);
            let v = (0, o.forwardRef)((e, n) => {
                let {
                    projectSheet: t
                } = e, v = (0, p.Mi)(t, "Forrest");
                (0, f.r)(v);
                let {
                    nodes: m
                } = (0, i.L)("/models/forrest/03_Shot_3_Forest_v1.glb"), [d, g] = (0, o.useState)(!1);
                (0, o.useImperativeHandle)(n, () => ({
                    sheet: v,
                    animateIn() {
                        v.sequence.pause(), v.sequence.position = 0, v.sequence.play()
                    }
                }), [v]);
                let x = (0, o.useRef)(),
                    y = (0, o.useRef)(),
                    h = (0, o.useRef)(),
                    R = (0, o.useRef)();
                return (0, f.L)(v, x, y, h, R, [d]), (0, r.jsxs)(a.yR, {
                    sheet: v,
                    children: [(0, r.jsx)("color", {
                        attach: "background",
                        args: ["#000"]
                    }), (0, r.jsx)(s.I, {
                        sheet: v,
                        initialPosition: [0, 1.565, 18],
                        center: [0, 1, 0],
                        active: !0
                    }), (0, r.jsxs)("group", {
                        position: [0, -.75, -12],
                        children: [(0, r.jsx)(c.o, {
                            ref: R
                        }), (0, r.jsx)("group", {
                            position: [0, -.001, -.05],
                            dispose: null,
                            children: (0, r.jsx)(l.H, {
                                ref: h,
                                color: "#000",
                                geometry: m.Mesh_Shot_03.geometry,
                                rotation: [Math.PI / 2, 0, 0]
                            })
                        }), (0, r.jsx)(u.D, {
                            ref: y,
                            sheet: v,
                            pcd: "/models/forrest/03_Shot_3_Forest_v2.pcd",
                            depthTest: !0
                        })]
                    })]
                })
            });
            i.L.preload("/models/forrest/03_Shot_3_Forest_v1.glb")
        },
        6226: function(e, n, t) {
            t.d(n, {
                p: function() {
                    return d
                }
            });
            var r = t(1527),
                o = t(959),
                i = t(4718),
                a = t(6655),
                l = t(5091),
                u = t(7248),
                s = t(5232),
                c = t(2685),
                f = t(1594),
                p = t(1439),
                v = t(120),
                m = t(1307);
            let d = (0, o.forwardRef)((e, n) => {
                let {
                    projectSheet: t
                } = e, d = (0, v.Mi)(t, "IntroShot");
                (0, p.r)(d);
                let {
                    nodes: g
                } = (0, i.L)("/models/introshot/00_Shot_0_Intro_SCENE_Merged.glb"), [x, y] = (0, o.useState)(!1);
                (0, o.useImperativeHandle)(n, () => ({
                    sheet: d,
                    animateIn() {
                        d.sequence.pause(), d.sequence.position = 0, d.sequence.play()
                    }
                }), [d]);
                let h = (0, o.useRef)(),
                    R = (0, o.useRef)(),
                    b = (0, o.useRef)(),
                    w = (0, o.useRef)([]),
                    S = e => {
                        e && w.current.push(e)
                    };
                (0, p.L)(d, h, w, b, R, [x]);
                let z = async () => {
                    await (0, m._)(0), y(!0)
                };
                return (0, r.jsxs)(a.yR, {
                    sheet: d,
                    children: [(0, r.jsx)("color", {
                        attach: "background",
                        args: ["#000"]
                    }), (0, r.jsx)(c.I, {
                        sheet: d,
                        initialPosition: [0, 1.565, 18],
                        center: [0, 1, 0],
                        active: !0
                    }), (0, r.jsxs)("group", {
                        position: [0, -.75, -12],
                        children: [(0, r.jsx)(l.Y, {
                            ref: h,
                            sheet: d,
                            onAllLoaded: z
                        }), (0, r.jsx)(f.o, {
                            ref: R
                        }), (0, r.jsx)("group", {
                            position: [0, -.001, -.001],
                            dispose: null,
                            children: (0, r.jsx)(u.H, {
                                ref: b,
                                geometry: g.SCENE_MESH.geometry,
                                rotation: [Math.PI / 2, 0, 0],
                                color: "#000"
                            })
                        }), (0, r.jsx)(s.D, {
                            ref: e => S(e),
                            sheet: d,
                            pcd: "/models/introshot/00_Shot_0_Intro_SCENE_v3.pcd",
                            depthTest: !0
                        }), (0, r.jsx)(s.D, {
                            ref: e => S(e),
                            sheet: d,
                            pcd: "/models/introshot/00_Shot_0_Intro_GRASS_v3.pcd",
                            depthTest: !0
                        })]
                    })]
                })
            });
            i.L.preload("/models/introshot/00_Shot_0_Intro_SCENE_v3.glb"), i.L.preload("/models/introshot/00_Shot_0_Intro_GRASS_v3.glb")
        },
        724: function(e, n, t) {
            t.d(n, {
                q: function() {
                    return d
                }
            });
            var r = t(1527),
                o = t(959),
                i = t(4718),
                a = t(4166),
                l = t(6655),
                u = t(8699);
            t(5091);
            var s = t(7248),
                c = t(5232),
                f = t(2685),
                p = t(1594),
                v = t(1439),
                m = t(120);
            t(1307);
            let d = (0, o.forwardRef)((e, n) => {
                let {
                    projectSheet: t,
                    active: d
                } = e, g = (0, m.Mi)(t, "TownBurt");
                (0, v.r)(g);
                let {
                    nodes: x
                } = (0, i.L)("/models/towntwo/02_Shot_2_TownBurnt_v3.glb"), {
                    nodes: y
                } = (0, i.L)("/models/townone/01_Shot_1_TownSafe_v1.glb"), [h, R] = (0, o.useState)(!1), b = (0, o.useRef)(), w = (0, o.useRef)(), S = (0, o.useRef)(), z = (0, o.useRef)(), M = (0, o.useRef)(), P = (0, o.useRef)(), _ = (0, o.useRef)(new u.Plane(new u.Vector3(-1, 0, 0), 0));
                (0, o.useRef)(new u.Plane(new u.Vector3(-1, 0, 0), 0));
                let j = (0, o.useRef)(null),
                    A = (0, m.l7)(g, "Transition", {
                        progress: a.types.number(1, {
                            nudgeMultiplier: .001,
                            range: [0, 1]
                        }),
                        clipOffset: a.types.number(0, {
                            nudgeMultiplier: .01,
                            range: [-1, 1]
                        }),
                        transitionRange: a.types.number(20, {
                            nudgeMultiplier: .01,
                            range: [0, 100]
                        }),
                        fireRevealOffset: a.types.number(0, {
                            nudgeMultiplier: .01,
                            range: [-2.5, 2.5]
                        }),
                        modelRevealOffset: a.types.number(0, {
                            nudgeMultiplier: .01,
                            range: [-2.5, 2.5]
                        }),
                        reverse: a.types.boolean(!1),
                        angle: a.types.number(0, {
                            nudgeMultiplier: .01,
                            range: [-(2 * Math.PI), 2 * Math.PI]
                        }),
                        angleCenterPosition: a.types.compound({
                            x: a.types.number(0, {
                                nudgeMultiplier: .01
                            }),
                            y: a.types.number(0, {
                                nudgeMultiplier: .01
                            }),
                            z: a.types.number(0, {
                                nudgeMultiplier: .01
                            })
                        }),
                        fade: a.types.number(2.5, {
                            nudgeMultiplier: .01,
                            range: [0, 10]
                        }),
                        townsafe: {
                            progress: a.types.number(1, {
                                nudgeMultiplier: .001,
                                range: [0, 1]
                            }),
                            offset: a.types.number(0, {
                                nudgeMultiplier: .01,
                                range: [-1, 1]
                            }),
                            clipOffset: a.types.number(0, {
                                nudgeMultiplier: .01,
                                range: [-1, 1]
                            })
                        }
                    });

                function C(e, n, t, r, o, i, a) {
                    if (n)
                        for (let t = 0; t < n.length; t++) n[t].el.material.uniforms.uReveal.value = e.progress, n[t].el.material.uniforms.uRevealRange.value = e.transitionRange, n[t].el.material.uniforms.uRevealFireoffset.value = e.fireRevealOffset, n[t].el.material.uniforms.uRevealReverse.value = e.reverse, n[t].el.material.uniforms.uRevealAngle.value = e.angle, n[t].el.material.uniforms.uRevealAngleCenterPosition.value = e.angleCenterPosition, n[t].el.material.uniforms.uRevealFade.value = e.fade;
                    if (t && (t.material.uniforms.uReveal.value = e.progress, t.material.uniforms.uRevealRange.value = e.transitionRange, t.material.uniforms.uRevealReverse.value = e.reverse, t.material.uniforms.uRevealAngle.value = e.angle, t.material.uniforms.uRevealAngleCenterPosition.value = e.angleCenterPosition, t.material.uniforms.uRevealFade.value = e.fade, t.renderOrder = 1), r && (r.material.uniforms.uReveal.value = 1 - e.townsafe.progress + e.townsafe.offset, r.material.uniforms.uRevealRange.value = e.transitionRange, r.material.uniforms.uRevealReverse.value = e.reverse, r.material.uniforms.uRevealAngle.value = e.angle, r.material.uniforms.uRevealAngleCenterPosition.value = e.angleCenterPosition, r.material.uniforms.uRevealFade.value = e.fade, r.renderOrder = 1), a && (a.position.set(e.angleCenterPosition.x, e.angleCenterPosition.y, e.angleCenterPosition.z), a.rotation.y = -e.angle + Math.PI / 2), o) {
                        let n = new u.Matrix4,
                            t = (e.progress + e.clipOffset) * e.transitionRange - e.transitionRange / 2,
                            r = e.angleCenterPosition.x - t,
                            i = e.angleCenterPosition.y;
                        n.setPosition(new u.Vector3(r, i, 0)), n.identity().makeRotationY(-e.angle);
                        for (let e = 0; e < o.material.clippingPlanes.length; e++) {
                            let t = o.material.clippingPlanes[e];
                            t.constant = -r, t.normal.set(-1, 0, 0).applyMatrix4(n)
                        }
                        o.renderOrder = 0
                    }
                    if (i) {
                        i.renderOrder = 0;
                        let n = new u.Matrix4,
                            t = (e.townsafe.progress + e.townsafe.clipOffset) * e.transitionRange - e.transitionRange / 2,
                            r = e.angleCenterPosition.x + t,
                            o = e.angleCenterPosition.y;
                        n.setPosition(new u.Vector3(r, o, 0)), n.identity().makeRotationY(-e.angle);
                        for (let e = 0; e < i.material.clippingPlanes.length; e++) {
                            let t = i.material.clippingPlanes[e];
                            t.constant = -r, t.normal.set(1, 0, 0).applyMatrix4(n)
                        }
                    }
                }
                return (0, m.GT)(A, e => {
                    j.current = e, C(e, b.current, w.current, M.current, S.current, z.current, P.current)
                }), (0, o.useEffect)(() => {
                    C(j.current, b.current, w.current, M.current, S.current, z.current)
                }, [h]), (0, o.useImperativeHandle)(n, () => ({
                    sheet: g,
                    animateIn() {
                        g.sequence.pause(), g.sequence.position = 0, g.sequence.play()
                    }
                }), [g]), (0, r.jsxs)(l.yR, {
                    sheet: g,
                    children: [(0, r.jsx)("color", {
                        attach: "background",
                        args: ["#000"]
                    }), (0, r.jsx)(f.I, {
                        sheet: g,
                        center: [0, 0, -6],
                        position: [0, .3, 7],
                        active: !0
                    }), (0, r.jsxs)(l.Ah.group, {
                        theatreKey: "Scene",
                        children: [(0, r.jsxs)("group", {
                            position: [0, -.75, -12],
                            children: [(0, r.jsx)("group", {
                                dispose: null,
                                children: (0, r.jsx)(s.H, {
                                    clippingPlanes: [_.current],
                                    ref: z,
                                    geometry: y["01_Mesh_Shot_1_SafeTown_01"].geometry,
                                    position: [0, -.01, -.01],
                                    rotation: [Math.PI / 2, 0, 0],
                                    color: "#000"
                                })
                            }), (0, r.jsx)(c.D, {
                                ref: M,
                                sheet: g,
                                pcd: "/models/townone/01_Shot_1_TownSafe_v1.pcd",
                                depthTest: !0
                            })]
                        }), (0, r.jsx)(p.o, {
                            ref: P
                        })]
                    })]
                })
            });
            i.L.preload("/models/towntwo/02_Shot_2_TownBurnt_v3.glb")
        },
        1439: function(e, n, t) {
            t.d(n, {
                L: function() {
                    return a
                },
                r: function() {
                    return l
                }
            });
            var r = t(959),
                o = t(4166),
                i = t(120);

            function a(e, n, t, a, l) {
                let u = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : [],
                    s = (0, r.useRef)(null),
                    c = (0, i.l7)(e, "Transition", {
                        progress: o.types.number(1, {
                            nudgeMultiplier: .001,
                            range: [0, 1]
                        }),
                        transitionRange: o.types.number(20, {
                            nudgeMultiplier: .01,
                            range: [0, 100]
                        }),
                        fireRevealOffset: o.types.number(0, {
                            nudgeMultiplier: .01,
                            range: [-2.5, 2.5]
                        }),
                        modelRevealOffset: o.types.number(0, {
                            nudgeMultiplier: .01,
                            range: [-2.5, 2.5]
                        }),
                        reverse: o.types.boolean(!1),
                        angle: o.types.number(0, {
                            nudgeMultiplier: .01,
                            range: [-(2 * Math.PI), 2 * Math.PI]
                        }),
                        angleCenterPosition: o.types.compound({
                            x: o.types.number(0, {
                                nudgeMultiplier: .01
                            }),
                            y: o.types.number(0, {
                                nudgeMultiplier: .01
                            }),
                            z: o.types.number(0, {
                                nudgeMultiplier: .01
                            })
                        }),
                        fade: o.types.number(2.5, {
                            nudgeMultiplier: .01,
                            range: [0, 10]
                        })
                    });

                function f(e, n, t, r, o) {
                    if (n)
                        for (let t = 0; t < n.length; t++) n[t].el.material.uniforms.uReveal.value = e.progress, n[t].el.material.uniforms.uRevealRange.value = e.transitionRange, n[t].el.material.uniforms.uRevealFireoffset.value = e.fireRevealOffset, n[t].el.material.uniforms.uRevealReverse.value = e.reverse, n[t].el.material.uniforms.uRevealAngle.value = e.angle, n[t].el.material.uniforms.uRevealAngleCenterPosition.value = e.angleCenterPosition, n[t].el.material.uniforms.uRevealFade.value = e.fade;
                    if (t) {
                        let n = Array.isArray(t) ? t : [t];
                        for (let t = 0; t < n.length; t++) n[t].material.uniforms.uReveal.value = e.progress, n[t].material.uniforms.uRevealRange.value = e.transitionRange, n[t].material.uniforms.uRevealReverse.value = e.reverse, n[t].material.uniforms.uRevealAngle.value = e.angle, n[t].material.uniforms.uRevealAngleCenterPosition.value = e.angleCenterPosition, n[t].material.uniforms.uRevealFade.value = e.fade, n[t].renderOrder = 1
                    }
                    if (r) {
                        let e = Array.isArray(r) ? r : [r];
                        for (let n = 0; n < e.length; n++) e[n].renderOrder = 0
                    }
                    o && (o.position.set(e.angleCenterPosition.x, e.angleCenterPosition.y, e.angleCenterPosition.z), o.rotation.y = -e.angle + Math.PI / 2)
                }(0, i.GT)(c, e => {
                    s.current = e, f(e, n.current, t.current, a.current, l.current)
                }), (0, r.useEffect)(() => {
                    f(s.current, n.current, t.current, a.current, l.current)
                }, [...u])
            }
            let l = e => {
                (0, r.useEffect)(() => {
                    let n = () => {
                        e && (document.hidden ? e.sequence.pause() : e.sequence.play())
                    };
                    return document.addEventListener("visibilitychange", n), () => {
                        document.removeEventListener("visibilitychange", n)
                    }
                }, [])
            }
        }
    }
]);
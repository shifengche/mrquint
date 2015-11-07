/*
 Highcharts JS v3.0.10 (2014-03-10)

 (c) 2009-2014 Torstein Honsi

 License: www.highcharts.com/license
 */
(function (l, C) {
    function J(a, b, c) {
        this.init.call(this, a, b, c)
    }

    var N = l.arrayMin, O = l.arrayMax, t = l.each, y = l.extend, o = l.merge, P = l.map, q = l.pick, w = l.pInt, p = l.getOptions().plotOptions, h = l.seriesTypes, x = l.extendClass, K = l.splat, r = l.wrap, L = l.Axis, z = l.Tick, G = l.Point, Q = l.Pointer, R = l.TrackerMixin, S = l.CenteredSeriesMixin, s = l.Series, v = Math, D = v.round, A = v.floor, T = v.max, U = l.Color, u = function () {
    };
    y(J.prototype, {
        init: function (a, b, c) {
            var d = this, f = d.defaultOptions;
            d.chart = b;
            if (b.angular)f.background = {};
            d.options = a = o(f, a);
            (a = a.background) && t([].concat(K(a)).reverse(), function (a) {
                var e = a.backgroundColor, a = o(d.defaultBackgroundOptions, a);
                if (e)a.backgroundColor = e;
                a.color = a.backgroundColor;
                c.options.plotBands.unshift(a)
            })
        },
        defaultOptions: {center: ["50%", "50%"], size: "85%", startAngle: 0},
        defaultBackgroundOptions: {
            shape: "circle",
            borderWidth: 1,
            borderColor: "silver",
            backgroundColor: {linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1}, stops: [[0, "#FFF"], [1, "#DDD"]]},
            from: Number.MIN_VALUE,
            innerRadius: 0,
            to: Number.MAX_VALUE,
            outerRadius: "105%"
        }
    });
    var F = L.prototype, z = z.prototype, V = {
        getOffset: u, redraw: function () {
            this.isDirty = !1
        }, render: function () {
            this.isDirty = !1
        }, setScale: u, setCategories: u, setTitle: u
    }, M = {
        isRadial: !0,
        defaultRadialGaugeOptions: {
            labels: {align: "center", x: 0, y: null},
            minorGridLineWidth: 0,
            minorTickInterval: "auto",
            minorTickLength: 10,
            minorTickPosition: "inside",
            minorTickWidth: 1,
            tickLength: 10,
            tickPosition: "inside",
            tickWidth: 2,
            title: {rotation: 0},
            zIndex: 2
        },
        defaultRadialXOptions: {
            gridLineWidth: 1, labels: {align: null, distance: 15, x: 0, y: null},
            maxPadding: 0, minPadding: 0, showLastLabel: !1, tickLength: 0
        },
        defaultRadialYOptions: {
            gridLineInterpolation: "circle",
            labels: {align: "right", x: -3, y: -2},
            showLastLabel: !1,
            title: {x: 4, text: null, rotation: 90}
        },
        setOptions: function (a) {
            a = this.options = o(this.defaultOptions, this.defaultRadialOptions, a);
            if (!a.plotBands)a.plotBands = []
        },
        getOffset: function () {
            F.getOffset.call(this);
            this.chart.axisOffset[this.side] = 0;
            this.center = this.pane.center = S.getCenter.call(this.pane)
        },
        getLinePath: function (a, b) {
            var c = this.center, b = q(b,
                c[2] / 2 - this.offset);
            return this.chart.renderer.symbols.arc(this.left + c[0], this.top + c[1], b, b, {
                start: this.startAngleRad,
                end: this.endAngleRad,
                open: !0,
                innerR: 0
            })
        },
        setAxisTranslation: function () {
            F.setAxisTranslation.call(this);
            if (this.center)this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : this.center[2] / 2 / (this.max - this.min || 1), this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0
        },
        beforeSetTickPositions: function () {
            this.autoConnect && (this.max += this.categories &&
                1 || this.pointRange || this.closestPointRange || 0)
        },
        setAxisSize: function () {
            F.setAxisSize.call(this);
            if (this.isRadial) {
                this.center = this.pane.center = l.CenteredSeriesMixin.getCenter.call(this.pane);
                if (this.isCircular)this.sector = this.endAngleRad - this.startAngleRad;
                this.len = this.width = this.height = this.center[2] * q(this.sector, 1) / 2
            }
        },
        getPosition: function (a, b) {
            if (!this.isCircular)b = this.translate(a), a = this.min;
            return this.postTranslate(this.translate(a), q(b, this.center[2] / 2) - this.offset)
        },
        postTranslate: function (a,
                                 b) {
            var c = this.chart, d = this.center, a = this.startAngleRad + a;
            return {x: c.plotLeft + d[0] + Math.cos(a) * b, y: c.plotTop + d[1] + Math.sin(a) * b}
        },
        getPlotBandPath: function (a, b, c) {
            var d = this.center, f = this.startAngleRad, g = d[2] / 2, e = [q(c.outerRadius, "100%"), c.innerRadius, q(c.thickness, 10)], k = /%$/, n, m = this.isCircular;
            this.options.gridLineInterpolation === "polygon" ? d = this.getPlotLinePath(a).concat(this.getPlotLinePath(b, !0)) : (m || (e[0] = this.translate(a), e[1] = this.translate(b)), e = P(e, function (a) {
                k.test(a) && (a = w(a, 10) * g / 100);
                return a
            }), c.shape === "circle" || !m ? (a = -Math.PI / 2, b = Math.PI * 1.5, n = !0) : (a = f + this.translate(a), b = f + this.translate(b)), d = this.chart.renderer.symbols.arc(this.left + d[0], this.top + d[1], e[0], e[0], {
                start: a,
                end: b,
                innerR: q(e[1], e[0] - e[2]),
                open: n
            }));
            return d
        },
        getPlotLinePath: function (a, b) {
            var c = this.center, d = this.chart, f = this.getPosition(a), g, e, k;
            this.isCircular ? k = ["M", c[0] + d.plotLeft, c[1] + d.plotTop, "L", f.x, f.y] : this.options.gridLineInterpolation === "circle" ? (a = this.translate(a)) && (k = this.getLinePath(0, a)) : (g =
                d.xAxis[0], k = [], a = this.translate(a), c = g.tickPositions, g.autoConnect && (c = c.concat([c[0]])), b && (c = [].concat(c).reverse()), t(c, function (c, b) {
                e = g.getPosition(c, a);
                k.push(b ? "L" : "M", e.x, e.y)
            }));
            return k
        },
        getTitlePosition: function () {
            var a = this.center, b = this.chart, c = this.options.title;
            return {
                x: b.plotLeft + a[0] + (c.x || 0),
                y: b.plotTop + a[1] - {high: 0.5, middle: 0.25, low: 0}[c.align] * a[2] + (c.y || 0)
            }
        }
    };
    r(F, "init", function (a, b, c) {
        var i;
        var d = b.angular, f = b.polar, g = c.isX, e = d && g, k, n;
        n = b.options;
        var m = c.pane || 0;
        if (d) {
            if (y(this,
                    e ? V : M), k = !g)this.defaultRadialOptions = this.defaultRadialGaugeOptions
        } else if (f)y(this, M), this.defaultRadialOptions = (k = g) ? this.defaultRadialXOptions : o(this.defaultYAxisOptions, this.defaultRadialYOptions);
        a.call(this, b, c);
        if (!e && (d || f)) {
            a = this.options;
            if (!b.panes)b.panes = [];
            this.pane = (i = b.panes[m] = b.panes[m] || new J(K(n.pane)[m], b, this), m = i);
            m = m.options;
            b.inverted = !1;
            n.chart.zoomType = null;
            this.startAngleRad = b = (m.startAngle - 90) * Math.PI / 180;
            this.endAngleRad = n = (q(m.endAngle, m.startAngle + 360) - 90) * Math.PI /
                180;
            this.offset = a.offset || 0;
            if ((this.isCircular = k) && c.max === C && n - b === 2 * Math.PI)this.autoConnect = !0
        }
    });
    r(z, "getPosition", function (a, b, c, d, f) {
        var g = this.axis;
        return g.getPosition ? g.getPosition(c) : a.call(this, b, c, d, f)
    });
    r(z, "getLabelPosition", function (a, b, c, d, f, g, e, k, n) {
        var m = this.axis, i = g.y, j = g.align, h = (m.translate(this.pos) + m.startAngleRad + Math.PI / 2) / Math.PI * 180 % 360;
        m.isRadial ? (a = m.getPosition(this.pos, m.center[2] / 2 + q(g.distance, -25)), g.rotation === "auto" ? d.attr({rotation: h}) : i === null && (i = m.chart.renderer.fontMetrics(d.styles.fontSize).b -
            d.getBBox().height / 2), j === null && (j = m.isCircular ? h > 20 && h < 160 ? "left" : h > 200 && h < 340 ? "right" : "center" : "center", d.attr({align: j})), a.x += g.x, a.y += i) : a = a.call(this, b, c, d, f, g, e, k, n);
        return a
    });
    r(z, "getMarkPath", function (a, b, c, d, f, g, e) {
        var k = this.axis;
        k.isRadial ? (a = k.getPosition(this.pos, k.center[2] / 2 + d), b = ["M", b, c, "L", a.x, a.y]) : b = a.call(this, b, c, d, f, g, e);
        return b
    });
    p.arearange = o(p.area, {
        lineWidth: 1,
        marker: null,
        threshold: null,
        tooltip: {pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.low}</b> - <b>{point.high}</b><br/>'},
        trackByArea: !0,
        dataLabels: {verticalAlign: null, xLow: 0, xHigh: 0, yLow: 0, yHigh: 0}
    });
    h.arearange = x(h.area, {
        type: "arearange", pointArrayMap: ["low", "high"], toYData: function (a) {
            return [a.low, a.high]
        }, pointValKey: "low", getSegments: function () {
            var a = this;
            t(a.points, function (b) {
                if (!a.options.connectNulls && (b.low === null || b.high === null))b.y = null; else if (b.low === null && b.high !== null)b.y = b.high
            });
            s.prototype.getSegments.call(this)
        }, translate: function () {
            var a = this.yAxis;
            h.area.prototype.translate.apply(this);
            t(this.points,
                function (b) {
                    var c = b.low, d = b.high, f = b.plotY;
                    d === null && c === null ? b.y = null : c === null ? (b.plotLow = b.plotY = null, b.plotHigh = a.translate(d, 0, 1, 0, 1)) : d === null ? (b.plotLow = f, b.plotHigh = null) : (b.plotLow = f, b.plotHigh = a.translate(d, 0, 1, 0, 1))
                })
        }, getSegmentPath: function (a) {
            var b, c = [], d = a.length, f = s.prototype.getSegmentPath, g, e;
            e = this.options;
            var k = e.step;
            for (b = HighchartsAdapter.grep(a, function (a) {
                return a.plotLow !== null
            }); d--;)g = a[d], g.plotHigh !== null && c.push({plotX: g.plotX, plotY: g.plotHigh});
            a = f.call(this, b);
            if (k)k === !0 && (k = "left"), e.step = {left: "right", center: "center", right: "left"}[k];
            c = f.call(this, c);
            e.step = k;
            e = [].concat(a, c);
            c[0] = "L";
            this.areaPath = this.areaPath.concat(a, c);
            return e
        }, drawDataLabels: function () {
            var a = this.data, b = a.length, c, d = [], f = s.prototype, g = this.options.dataLabels, e, k = this.chart.inverted;
            if (g.enabled || this._hasPointLabels) {
                for (c = b; c--;)e = a[c], e.y = e.high, e._plotY = e.plotY, e.plotY = e.plotHigh, d[c] = e.dataLabel, e.dataLabel = e.dataLabelUpper, e.below = !1, k ? (g.align = "left", g.x = g.xHigh) : g.y = g.yHigh;
                f.drawDataLabels &&
                f.drawDataLabels.apply(this, arguments);
                for (c = b; c--;)e = a[c], e.dataLabelUpper = e.dataLabel, e.dataLabel = d[c], e.y = e.low, e.plotY = e._plotY, e.below = !0, k ? (g.align = "right", g.x = g.xLow) : g.y = g.yLow;
                f.drawDataLabels && f.drawDataLabels.apply(this, arguments)
            }
        }, alignDataLabel: function () {
            h.column.prototype.alignDataLabel.apply(this, arguments)
        }, getSymbol: h.column.prototype.getSymbol, drawPoints: u
    });
    p.areasplinerange = o(p.arearange);
    h.areasplinerange = x(h.arearange, {type: "areasplinerange", getPointSpline: h.spline.prototype.getPointSpline});
    (function () {
        var a = h.column.prototype;
        p.columnrange = o(p.column, p.arearange, {lineWidth: 1, pointRange: null});
        h.columnrange = x(h.arearange, {
            type: "columnrange",
            translate: function () {
                var b = this, c = b.yAxis, d;
                a.translate.apply(b);
                t(b.points, function (a) {
                    var g = a.shapeArgs, e = b.options.minPointLength, k;
                    a.plotHigh = d = c.translate(a.high, 0, 1, 0, 1);
                    a.plotLow = a.plotY;
                    k = d;
                    a = a.plotY - d;
                    a < e && (e -= a, a += e, k -= e / 2);
                    g.height = a;
                    g.y = k
                })
            },
            trackerGroups: ["group", "dataLabels"],
            drawGraph: u,
            pointAttrToOptions: a.pointAttrToOptions,
            drawPoints: a.drawPoints,
            drawTracker: a.drawTracker,
            animate: a.animate,
            getColumnMetrics: a.getColumnMetrics
        })
    })();
    p.gauge = o(p.line, {
        dataLabels: {
            enabled: !0,
            y: 15,
            borderWidth: 1,
            borderColor: "silver",
            borderRadius: 3,
            crop: !1,
            style: {fontWeight: "bold"},
            verticalAlign: "top",
            zIndex: 2
        }, dial: {}, pivot: {}, tooltip: {headerFormat: ""}, showInLegend: !1
    });
    G = {
        type: "gauge",
        pointClass: x(G, {
            setState: function (a) {
                this.state = a
            }
        }),
        angular: !0,
        drawGraph: u,
        fixedBox: !0,
        forceDL: !0,
        trackerGroups: ["group", "dataLabels"],
        translate: function () {
            var a = this.yAxis, b = this.options,
                c = a.center;
            this.generatePoints();
            t(this.points, function (d) {
                var f = o(b.dial, d.dial), g = w(q(f.radius, 80)) * c[2] / 200, e = w(q(f.baseLength, 70)) * g / 100, k = w(q(f.rearLength, 10)) * g / 100, n = f.baseWidth || 3, m = f.topWidth || 1, i = b.overshoot, j = a.startAngleRad + a.translate(d.y, null, null, null, !0);
                i && typeof i === "number" ? (i = i / 180 * Math.PI, j = Math.max(a.startAngleRad - i, Math.min(a.endAngleRad + i, j))) : b.wrap === !1 && (j = Math.max(a.startAngleRad, Math.min(a.endAngleRad, j)));
                j = j * 180 / Math.PI;
                d.shapeType = "path";
                d.shapeArgs = {
                    d: f.path || ["M",
                        -k, -n / 2, "L", e, -n / 2, g, -m / 2, g, m / 2, e, n / 2, -k, n / 2, "z"],
                    translateX: c[0],
                    translateY: c[1],
                    rotation: j
                };
                d.plotX = c[0];
                d.plotY = c[1]
            })
        },
        drawPoints: function () {
            var a = this, b = a.yAxis.center, c = a.pivot, d = a.options, f = d.pivot, g = a.chart.renderer;
            t(a.points, function (e) {
                var c = e.graphic, b = e.shapeArgs, f = b.d, i = o(d.dial, e.dial);
                c ? (c.animate(b), b.d = f) : e.graphic = g[e.shapeType](b).attr({
                    stroke: i.borderColor || "none",
                    "stroke-width": i.borderWidth || 0,
                    fill: i.backgroundColor || "black",
                    rotation: b.rotation
                }).add(a.group)
            });
            c ? c.animate({
                translateX: b[0],
                translateY: b[1]
            }) : a.pivot = g.circle(0, 0, q(f.radius, 5)).attr({
                "stroke-width": f.borderWidth || 0,
                stroke: f.borderColor || "silver",
                fill: f.backgroundColor || "black"
            }).translate(b[0], b[1]).add(a.group)
        },
        animate: function (a) {
            var b = this;
            if (!a)t(b.points, function (a) {
                var d = a.graphic;
                d && (d.attr({rotation: b.yAxis.startAngleRad * 180 / Math.PI}), d.animate({rotation: a.shapeArgs.rotation}, b.options.animation))
            }), b.animate = null
        },
        render: function () {
            this.group = this.plotGroup("group", "series", this.visible ? "visible" : "hidden", this.options.zIndex,
                this.chart.seriesGroup);
            s.prototype.render.call(this);
            this.group.clip(this.chart.clipRect)
        },
        setData: function (a, b) {
            s.prototype.setData.call(this, a, !1);
            this.processData();
            this.generatePoints();
            q(b, !0) && this.chart.redraw()
        },
        drawTracker: R.drawTrackerPoint
    };
    h.gauge = x(h.line, G);
    p.boxplot = o(p.column, {
        fillColor: "#FFFFFF",
        lineWidth: 1,
        medianWidth: 2,
        states: {hover: {brightness: -0.3}},
        threshold: null,
        tooltip: {pointFormat: '<span style="color:{series.color};font-weight:bold">{series.name}</span><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>'},
        whiskerLength: "50%",
        whiskerWidth: 2
    });
    h.boxplot = x(h.column, {
        type: "boxplot",
        pointArrayMap: ["low", "q1", "median", "q3", "high"],
        toYData: function (a) {
            return [a.low, a.q1, a.median, a.q3, a.high]
        },
        pointValKey: "high",
        pointAttrToOptions: {fill: "fillColor", stroke: "color", "stroke-width": "lineWidth"},
        drawDataLabels: u,
        translate: function () {
            var a = this.yAxis, b = this.pointArrayMap;
            h.column.prototype.translate.apply(this);
            t(this.points, function (c) {
                t(b, function (b) {
                    c[b] !== null && (c[b + "Plot"] = a.translate(c[b], 0, 1, 0, 1))
                })
            })
        },
        drawPoints: function () {
            var a =
                this, b = a.points, c = a.options, d = a.chart.renderer, f, g, e, k, n, m, i, j, h, l, p, H, r, o, I, u, x, s, v, w, z, y, E = a.doQuartiles !== !1, B = parseInt(a.options.whiskerLength, 10) / 100;
            t(b, function (b) {
                h = b.graphic;
                z = b.shapeArgs;
                p = {};
                o = {};
                u = {};
                y = b.color || a.color;
                if (b.plotY !== C)if (f = b.pointAttr[b.selected ? "selected" : ""], x = z.width, s = A(z.x), v = s + x, w = D(x / 2), g = A(E ? b.q1Plot : b.lowPlot), e = A(E ? b.q3Plot : b.lowPlot), k = A(b.highPlot), n = A(b.lowPlot), p.stroke = b.stemColor || c.stemColor || y, p["stroke-width"] = q(b.stemWidth, c.stemWidth, c.lineWidth), p.dashstyle =
                        b.stemDashStyle || c.stemDashStyle, o.stroke = b.whiskerColor || c.whiskerColor || y, o["stroke-width"] = q(b.whiskerWidth, c.whiskerWidth, c.lineWidth), u.stroke = b.medianColor || c.medianColor || y, u["stroke-width"] = q(b.medianWidth, c.medianWidth, c.lineWidth), u["stroke-linecap"] = "round", i = p["stroke-width"] % 2 / 2, j = s + w + i, l = ["M", j, e, "L", j, k, "M", j, g, "L", j, n, "z"], E && (i = f["stroke-width"] % 2 / 2, j = A(j) + i, g = A(g) + i, e = A(e) + i, s += i, v += i, H = ["M", s, e, "L", s, g, "L", v, g, "L", v, e, "L", s, e, "z"]), B && (i = o["stroke-width"] % 2 / 2, k += i, n += i, r = ["M", j -
                    w * B, k, "L", j + w * B, k, "M", j - w * B, n, "L", j + w * B, n]), i = u["stroke-width"] % 2 / 2, m = D(b.medianPlot) + i, I = ["M", s, m, "L", v, m, "z"], h)b.stem.animate({d: l}), B && b.whiskers.animate({d: r}), E && b.box.animate({d: H}), b.medianShape.animate({d: I}); else {
                    b.graphic = h = d.g().add(a.group);
                    b.stem = d.path(l).attr(p).add(h);
                    if (B)b.whiskers = d.path(r).attr(o).add(h);
                    if (E)b.box = d.path(H).attr(f).add(h);
                    b.medianShape = d.path(I).attr(u).add(h)
                }
            })
        }
    });
    p.errorbar = o(p.boxplot, {
        color: "#000000",
        grouping: !1,
        linkedTo: ":previous",
        tooltip: {pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.low}</b> - <b>{point.high}</b><br/>'},
        whiskerWidth: null
    });
    h.errorbar = x(h.boxplot, {
        type: "errorbar",
        pointArrayMap: ["low", "high"],
        toYData: function (a) {
            return [a.low, a.high]
        },
        pointValKey: "high",
        doQuartiles: !1,
        drawDataLabels: h.arearange ? h.arearange.prototype.drawDataLabels : u,
        getColumnMetrics: function () {
            return this.linkedParent && this.linkedParent.columnMetrics || h.column.prototype.getColumnMetrics.call(this)
        }
    });
    p.waterfall = o(p.column, {lineWidth: 1, lineColor: "#333", dashStyle: "dot", borderColor: "#333"});
    h.waterfall = x(h.column, {
        type: "waterfall", upColorProp: "fill",
        pointArrayMap: ["low", "y"], pointValKey: "y", init: function (a, b) {
            b.stacking = !0;
            h.column.prototype.init.call(this, a, b)
        }, translate: function () {
            var a = this.options, b = this.yAxis, c, d, f, g, e, k, n, m, i;
            c = a.threshold;
            a = a.borderWidth % 2 / 2;
            h.column.prototype.translate.apply(this);
            m = c;
            f = this.points;
            for (d = 0, c = f.length; d < c; d++) {
                g = f[d];
                e = g.shapeArgs;
                k = this.getStack(d);
                i = k.points[this.index];
                if (isNaN(g.y))g.y = this.yData[d];
                n = T(m, m + g.y) + i[0];
                e.y = b.translate(n, 0, 1);
                g.isSum || g.isIntermediateSum ? (e.y = b.translate(i[1], 0, 1), e.height =
                    b.translate(i[0], 0, 1) - e.y) : m += k.total;
                e.height < 0 && (e.y += e.height, e.height *= -1);
                g.plotY = e.y = D(e.y) - a;
                e.height = D(e.height);
                g.yBottom = e.y + e.height
            }
        }, processData: function (a) {
            var b = this.yData, c = this.points, d, f = b.length, g = this.options.threshold || 0, e, k, n, m, i, j;
            k = e = n = m = g;
            for (j = 0; j < f; j++)i = b[j], d = c && c[j] ? c[j] : {}, i === "sum" || d.isSum ? b[j] = k : i === "intermediateSum" || d.isIntermediateSum ? (b[j] = e, e = g) : (k += i, e += i), n = Math.min(k, n), m = Math.max(k, m);
            s.prototype.processData.call(this, a);
            this.dataMin = n;
            this.dataMax = m
        }, toYData: function (a) {
            if (a.isSum)return "sum";
            else if (a.isIntermediateSum)return "intermediateSum";
            return a.y
        }, getAttribs: function () {
            h.column.prototype.getAttribs.apply(this, arguments);
            var a = this.options, b = a.states, c = a.upColor || this.color, a = l.Color(c).brighten(0.1).get(), d = o(this.pointAttr), f = this.upColorProp;
            d[""][f] = c;
            d.hover[f] = b.hover.upColor || a;
            d.select[f] = b.select.upColor || c;
            t(this.points, function (a) {
                if (a.y > 0 && !a.color)a.pointAttr = d, a.color = c
            })
        }, getGraphPath: function () {
            var a = this.data, b = a.length, c = D(this.options.lineWidth + this.options.borderWidth) %
                2 / 2, d = [], f, g, e;
            for (e = 1; e < b; e++)g = a[e].shapeArgs, f = a[e - 1].shapeArgs, g = ["M", f.x + f.width, f.y + c, "L", g.x, f.y + c], a[e - 1].y < 0 && (g[2] += f.height, g[5] += f.height), d = d.concat(g);
            return d
        }, getExtremes: u, getStack: function (a) {
            var b = this.yAxis.stacks, c = this.stackKey;
            this.processedYData[a] < this.options.threshold && (c = "-" + c);
            return b[c][a]
        }, drawGraph: s.prototype.drawGraph
    });
    p.bubble = o(p.scatter, {
        dataLabels: {inside: !0, style: {color: "white", textShadow: "0px 0px 3px black"}, verticalAlign: "middle"},
        marker: {
            lineColor: null,
            lineWidth: 1
        },
        minSize: 8,
        maxSize: "20%",
        tooltip: {pointFormat: "({point.x}, {point.y}), Size: {point.z}"},
        turboThreshold: 0,
        zThreshold: 0
    });
    h.bubble = x(h.scatter, {
        type: "bubble",
        pointArrayMap: ["y", "z"],
        parallelArrays: ["x", "y", "z"],
        trackerGroups: ["group", "dataLabelsGroup"],
        bubblePadding: !0,
        pointAttrToOptions: {stroke: "lineColor", "stroke-width": "lineWidth", fill: "fillColor"},
        applyOpacity: function (a) {
            var b = this.options.marker, c = q(b.fillOpacity, 0.5), a = a || b.fillColor || this.color;
            c !== 1 && (a = U(a).setOpacity(c).get("rgba"));
            return a
        },
        convertAttribs: function () {
            var a = s.prototype.convertAttribs.apply(this, arguments);
            a.fill = this.applyOpacity(a.fill);
            return a
        },
        getRadii: function (a, b, c, d) {
            var f, g, e, k = this.zData, n = [], m = this.options.sizeBy !== "width";
            for (g = 0, f = k.length; g < f; g++)e = b - a, e = e > 0 ? (k[g] - a) / (b - a) : 0.5, m && e >= 0 && (e = Math.sqrt(e)), n.push(v.ceil(c + e * (d - c)) / 2);
            this.radii = n
        },
        animate: function (a) {
            var b = this.options.animation;
            if (!a)t(this.points, function (a) {
                var d = a.graphic, a = a.shapeArgs;
                d && a && (d.attr("r", 1), d.animate({r: a.r}, b))
            }),
                this.animate = null
        },
        translate: function () {
            var a, b = this.data, c, d, f = this.radii;
            h.scatter.prototype.translate.call(this);
            for (a = b.length; a--;)c = b[a], d = f ? f[a] : 0, c.negative = c.z < (this.options.zThreshold || 0), d >= this.minPxSize / 2 ? (c.shapeType = "circle", c.shapeArgs = {
                x: c.plotX,
                y: c.plotY,
                r: d
            }, c.dlBox = {
                x: c.plotX - d,
                y: c.plotY - d,
                width: 2 * d,
                height: 2 * d
            }) : c.shapeArgs = c.plotY = c.dlBox = C
        },
        drawLegendSymbol: function (a, b) {
            var c = w(a.itemStyle.fontSize) / 2;
            b.legendSymbol = this.chart.renderer.circle(c, a.baseline - c, c).attr({zIndex: 3}).add(b.legendGroup);
            b.legendSymbol.isMarker = !0
        },
        drawPoints: h.column.prototype.drawPoints,
        alignDataLabel: h.column.prototype.alignDataLabel
    });
    L.prototype.beforePadding = function () {
        var a = this, b = this.len, c = this.chart, d = 0, f = b, g = this.isXAxis, e = g ? "xData" : "yData", k = this.min, n = {}, m = v.min(c.plotWidth, c.plotHeight), i = Number.MAX_VALUE, j = -Number.MAX_VALUE, h = this.max - k, l = b / h, p = [];
        this.tickPositions && (t(this.series, function (b) {
            var e = b.options;
            if (b.bubblePadding && (b.visible || !c.options.chart.ignoreHiddenSeries))if (a.allowZoomOutside = !0, p.push(b), g)t(["minSize", "maxSize"], function (a) {
                var b = e[a], g = /%$/.test(b), b = w(b);
                n[a] = g ? m * b / 100 : b
            }), b.minPxSize = n.minSize, b = b.zData, b.length && (i = v.min(i, v.max(N(b), e.displayNegative === !1 ? e.zThreshold : -Number.MAX_VALUE)), j = v.max(j, O(b)))
        }), t(p, function (a) {
            var b = a[e], c = b.length, m;
            g && a.getRadii(i, j, n.minSize, n.maxSize);
            if (h > 0)for (; c--;)typeof b[c] === "number" && (m = a.radii[c], d = Math.min((b[c] - k) * l - m, d), f = Math.max((b[c] - k) * l + m, f))
        }), p.length && h > 0 && q(this.options.min, this.userMin) === C && q(this.options.max,
            this.userMax) === C && (f -= b, l *= (b + d - f) / b, this.min += d / l, this.max += f / l))
    };
    (function () {
        function a(a, b, c) {
            a.call(this, b, c);
            if (this.chart.polar)this.closeSegment = function (a) {
                var b = this.xAxis.center;
                a.push("L", b[0], b[1])
            }, this.closedStacks = !0
        }

        function b(a, b) {
            var c = this.chart, d = this.options.animation, f = this.group, i = this.markerGroup, j = this.xAxis.center, h = c.plotLeft, l = c.plotTop;
            if (c.polar) {
                if (c.renderer.isSVG)if (d === !0 && (d = {}), b) {
                    if (c = {translateX: j[0] + h, translateY: j[1] + l, scaleX: 0.001, scaleY: 0.001}, f.attr(c),
                            i)i.attrSetters = f.attrSetters, i.attr(c)
                } else c = {
                    translateX: h,
                    translateY: l,
                    scaleX: 1,
                    scaleY: 1
                }, f.animate(c, d), i && i.animate(c, d), this.animate = null
            } else a.call(this, b)
        }

        var c = s.prototype, d = Q.prototype, f;
        c.toXY = function (a) {
            var b, c = this.chart, d = a.plotX;
            b = a.plotY;
            a.rectPlotX = d;
            a.rectPlotY = b;
            d = (d / Math.PI * 180 + this.xAxis.pane.options.startAngle) % 360;
            d < 0 && (d += 360);
            a.clientX = d;
            b = this.xAxis.postTranslate(a.plotX, this.yAxis.len - b);
            a.plotX = a.polarPlotX = b.x - c.plotLeft;
            a.plotY = a.polarPlotY = b.y - c.plotTop
        };
        c.orderTooltipPoints =
            function (a) {
                if (this.chart.polar && (a.sort(function (a, b) {
                        return a.clientX - b.clientX
                    }), a[0]))a[0].wrappedClientX = a[0].clientX + 360, a.push(a[0])
            };
        h.area && r(h.area.prototype, "init", a);
        h.areaspline && r(h.areaspline.prototype, "init", a);
        h.spline && r(h.spline.prototype, "getPointSpline", function (a, b, c, d) {
            var f, i, j, h, l, p, o;
            if (this.chart.polar) {
                f = c.plotX;
                i = c.plotY;
                a = b[d - 1];
                j = b[d + 1];
                this.connectEnds && (a || (a = b[b.length - 2]), j || (j = b[1]));
                if (a && j)h = a.plotX, l = a.plotY, b = j.plotX, p = j.plotY, h = (1.5 * f + h) / 2.5, l = (1.5 * i + l) / 2.5,
                    j = (1.5 * f + b) / 2.5, o = (1.5 * i + p) / 2.5, b = Math.sqrt(Math.pow(h - f, 2) + Math.pow(l - i, 2)), p = Math.sqrt(Math.pow(j - f, 2) + Math.pow(o - i, 2)), h = Math.atan2(l - i, h - f), l = Math.atan2(o - i, j - f), o = Math.PI / 2 + (h + l) / 2, Math.abs(h - o) > Math.PI / 2 && (o -= Math.PI), h = f + Math.cos(o) * b, l = i + Math.sin(o) * b, j = f + Math.cos(Math.PI + o) * p, o = i + Math.sin(Math.PI + o) * p, c.rightContX = j, c.rightContY = o;
                d ? (c = ["C", a.rightContX || a.plotX, a.rightContY || a.plotY, h || f, l || i, f, i], a.rightContX = a.rightContY = null) : c = ["M", f, i]
            } else c = a.call(this, b, c, d);
            return c
        });
        r(c, "translate",
            function (a) {
                a.call(this);
                if (this.chart.polar && !this.preventPostTranslate)for (var a = this.points, b = a.length; b--;)this.toXY(a[b])
            });
        r(c, "getSegmentPath", function (a, b) {
            var c = this.points;
            if (this.chart.polar && this.options.connectEnds !== !1 && b[b.length - 1] === c[c.length - 1] && c[0].y !== null)this.connectEnds = !0, b = [].concat(b, [c[0]]);
            return a.call(this, b)
        });
        r(c, "animate", b);
        r(c, "setTooltipPoints", function (a, b) {
            this.chart.polar && y(this.xAxis, {tooltipLen: 360});
            return a.call(this, b)
        });
        if (h.column)f = h.column.prototype,
            r(f, "animate", b), r(f, "translate", function (a) {
            var b = this.xAxis, c = this.yAxis.len, d = b.center, f = b.startAngleRad, h = this.chart.renderer, j, l;
            this.preventPostTranslate = !0;
            a.call(this);
            if (b.isRadial) {
                b = this.points;
                for (l = b.length; l--;)j = b[l], a = j.barX + f, j.shapeType = "path", j.shapeArgs = {
                    d: h.symbols.arc(d[0], d[1], c - j.plotY, null, {
                        start: a,
                        end: a + j.pointWidth,
                        innerR: c - q(j.yBottom, c)
                    })
                }, this.toXY(j)
            }
        }), r(f, "alignDataLabel", function (a, b, d, f, h, i) {
            if (this.chart.polar) {
                a = b.rectPlotX / Math.PI * 180;
                if (f.align === null)f.align =
                    a > 20 && a < 160 ? "left" : a > 200 && a < 340 ? "right" : "center";
                if (f.verticalAlign === null)f.verticalAlign = a < 45 || a > 315 ? "bottom" : a > 135 && a < 225 ? "top" : "middle";
                c.alignDataLabel.call(this, b, d, f, h, i)
            } else a.call(this, b, d, f, h, i)
        });
        r(d, "getIndex", function (a, b) {
            var c, d = this.chart, f;
            d.polar ? (f = d.xAxis[0].center, c = b.chartX - f[0] - d.plotLeft, d = b.chartY - f[1] - d.plotTop, c = 180 - Math.round(Math.atan2(c, d) / Math.PI * 180)) : c = a.call(this, b);
            return c
        });
        r(d, "getCoordinates", function (a, b) {
            var c = this.chart, d = {xAxis: [], yAxis: []};
            c.polar ? t(c.axes,
                function (a) {
                    var f = a.isXAxis, g = a.center, h = b.chartX - g[0] - c.plotLeft, g = b.chartY - g[1] - c.plotTop;
                    d[f ? "xAxis" : "yAxis"].push({
                        axis: a,
                        value: a.translate(f ? Math.PI - Math.atan2(h, g) : Math.sqrt(Math.pow(h, 2) + Math.pow(g, 2)), !0)
                    })
                }) : d = a.call(this, b);
            return d
        })
    })()
})(Highcharts);

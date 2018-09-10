"use strict";
window.HyperSpace = function() {
    this.sprite = null;
    let d = PIXI.Texture.fromImage("hyperspace");
    this.sprite = new PIXI.Sprite(d)
}
,
window.HyperSpace.prototype = {
    sprite: null,
    initialize: function() {
        let d = PIXI.Texture.fromImage("hyperspace");
        this.sprite = new PIXI.Sprite(d)
    },
    show: function() {
        function h() {
            for (name in m)
                "game" != name && (m[name].visible = m[name].prevVisible,
                delete m[name].prevVisible);
            game.graphics.layers.game.removeChild(c.sprite),
            c.sprite.filters = null,
            Graphics.renderBackground()
        }
        let c = this
          , m = game.graphics.layers;
        (function() {
            for (name in m)
                "game" != name && (m[name].prevVisible = m[name].visible,
                m[name].visible = !1);
            c.sprite.width = game.screenX,
            c.sprite.height = game.screenY,
            game.graphics.layers.game.addChild(c.sprite)
        }
        )();
        let S = new PIXI.filters.ZoomBlurFilter(2,{
            x: game.halfScreenX,
            y: game.halfScreenY
        },0)
          , A = new PIXI.filters.AdjustmentFilter({
            gamma: 2,
            brightness: 2,
            alpha: 1
        })
          , f = function() {
            S.strength -= 0.03,
            1 < A.gamma && (A.gamma -= 0.02,
            A.brightness -= 0.02),
            0 < S.strength ? setTimeout(function() {
                f()
            }, 10) : (S.strength = 0,
            h())
        };
        this.sprite.filters = [S, A],
        f()
    }
};
function StarMash_2() {
    SWAM.replaceCSS(getFilePath("style.css"));
    let c = new SettingsProvider({
        nebulas: {
            blue: !0,
            green: !0,
            red: !0
        },
        asteroidLayers: 3,
        decorations: {
            stellar: !0,
            planets: !0,
            moons: !0,
            ships: !0
        }
    },function(S) {
        let A = S;
        if (game.graphics.layers.map.children[0].alpha = 0.8,
        game.graphics.layers.map.children[0].visible = A.nebulas.blue,
        game.graphics.layers.map.children[2].alpha = 0.8,
        game.graphics.layers.map.children[2].visible = A.nebulas.green,
        game.graphics.layers.map.children[4].alpha = 0.8,
        game.graphics.layers.map.children[4].visible = A.nebulas.red,
        SWAM.planet && (SWAM.planet.visible = A.decorations.planets),
        SWAM.ShipContainer && (SWAM.ShipContainer.visible = A.decorations.ships),
        SWAM.asteroids1 && SWAM.asteroids2 && SWAM.asteroids3) {
            var f = [SWAM.asteroids1, SWAM.asteroids2, SWAM.asteroids3];
            for (let D = 0; 3 > D; D++)
                f[D].visible = D < A.asteroidLayers
        }
        Graphics.renderBackground()
    }
    );
    c.root = "",
    c.title = "Mod Settings";
    let m = c.addSection("Background");
    m.addButton("Generate New Background", {
        click: function() {
            SWAM.RandomizeBackground()
        }
    }),
    m.addBoolean("nebulas.blue", "Blue nebulas"),
    m.addBoolean("nebulas.green", "Green nebulas"),
    m.addBoolean("nebulas.red", "Red nebulas"),
    m = c.addSection("Asteroid field"),
    m.addValuesField("asteroidLayers", "Visible layers", {
        0: 0,
        1: 1,
        2: 2,
        3: 3
    }),
    m = c.addSection("Decorative objects"),
    m.addBoolean("decorations.stellar", "Distant stellar objects"),
    m.addBoolean("decorations.planets", "Planets"),
    m.addBoolean("decorations.moons", "Moons"),
    m.addBoolean("decorations.ships", "Ships"),
    this.settingsProvider = c
}
StarMash_2.themeName = "StarMash v.2",
StarMash_2.author = "Bombita",
StarMash_2.version = SWAM_version,
StarMash_2.prototype.start = function() {
    function d() {
        let P = $("#regenerateBackground");
        if (0 == P.length) {
            var F = getTemplate("#regenerateBackground");
            P = $(F),
            $("body").append(P);
            let O = $("#btnRegenerate", P);
            O.click(function() {
                SWAM.RandomizeBackground()
            })
        }
        P.slideDown(),
        d.timer && clearInterval(d.timer);
        let N = $(".timerIndicator", P);
        d.width = 100,
        N.css("width", "100%"),
        d.timer = setInterval(function() {
            d.width--,
            N.animate({
                width: d.width + "%"
            }, 90),
            0 == d.width && (clearInterval(d.timer),
            delete d.timer,
            P.slideUp())
        }, 100)
    }
    function h() {
        function P(V) {
            for (let X = 0; 3 > X; X++)
                j[X].visible = V
        }
        function F(V) {
            for (let X = 0; 3 > X; X++)
                j[X].renderable = V
        }
        let z = game.graphics.layers.map
          , j = [z.children[1], z.children[3], z.children[5]];
        z.visible = !1,
        function() {
            for (let V = 0; 3 > V; V++) {
                z.children[2 * V].mask = null;
                let X = Tools.randInt(0, j.length - 1);
                z.children[2 * V].mask = j[X],
                SWAM.debug && console.log(`${z.children[2 * V].layerName}: ${j[X].layerName}`)
            }
            F(!0)
        }(),
        function() {
            P(!0);
            let V = config.mapWidth * game.scale - game.screenX / game.scale
              , X = config.mapHeight * game.scale - game.screenY / game.scale;
            for (let U = 0; 3 > U; U++)
                z.children[2 * U + 1].position.set(Tools.randInt(-V, 0), Tools.randInt(-X, 0));
            Graphics.renderBackground(),
            P(!1)
        }(),
        z.visible = !0;
        let I = 1 == Tools.randInt(0, 1);
        SWAM.MoveBackgroundTiles = I,
        F(!1),
        P(I),
        SWAM.debug && console.log("movable nebulas: " + I)
    }
    function c() {
        for (let O in T) {
            let z = T[O];
            z.scale = z.scale || 1;
            let j = Graphics.renderer
              , I = PIXI.Texture.fromImage(O)
              , V = null;
            for (let X in z.useMask && (V = PIXI.Texture.fromImage(O + "_Mask")),
            z.items) {
                let U = z.items[X]
                  , H = new PIXI.Texture(I,new PIXI.Rectangle(U[0] * z.scale,U[1] * z.scale,U[2] * z.scale,U[3] * z.scale))
                  , q = new PIXI.Sprite(H);
                q.scale.set(z.resultScale, z.resultScale);
                var P = null;
                if (z.useMask) {
                    var F = z.maskScale || 1
                      , N = new PIXI.Texture(V,new PIXI.Rectangle(U[0] * z.scale / F,U[1] * z.scale / F,U[2] * z.scale / F,U[3] * z.scale / F))
                      , P = new PIXI.Sprite(N);
                    P.scale.set(F, F),
                    q.addChild(P),
                    q.filters = [new PIXI.SpriteMaskFilter(P)],
                    P.position.set(-U[0] * z.scale, -U[1] * z.scale)
                }
                let W = PIXI.RenderTexture.create(q.width, q.height);
                j.render(q, W, !0),
                SWAM.Textures[X] = W
            }
        }
    }
    function m(P, F) {
        let N = SWAM.Textures[P]
          , O = new PIXI.Sprite(N);
        return "undefined" == typeof F && (F = {}),
        O.distanceFactor = F.distanceFactor ? F.distanceFactor : [1, 1],
        O.basePosition = F.basePosition ? F.basePosition : [0, 0],
        F.position && O.position.set(F.position[0], F.position[1]),
        F.anchor && O.anchor.set(F.anchor[0], F.anchor[1]),
        F.pivot && O.pivot.set(F.pivot[0], F.pivot[1]),
        F.scale && (Array.isArray(F.scale) ? O.scale.set(F.scale[0], F.scale[1]) : O.scale.set(F.scale)),
        F.rotation && (O.rotation = F.rotation),
        F.alpha && (O.alpha = F.alpha),
        F.blend && (O.blendMode = PIXI.BLEND_MODES[F.blend]),
        F.tint && (O.tint = F.tint),
        F.mask && (O.mask = F.mask),
        F.visible && (O.visible = F.visible),
        F.container && F.container.addChild(O),
        O
    }
    function S(P, F) {
        "undefined" == typeof F && (F = {});
        let N = m(P, F);
        return N.distanceFactor = F.distanceFactor ? F.distanceFactor : [1, 1],
        N.basePosition = F.basePosition ? F.basePosition : [0, 0],
        N.update = function() {
            let j = Graphics.getCamera()
              , I = j.x + (N.basePosition[0] - j.x) / N.distanceFactor[0]
              , V = j.y + (N.basePosition[1] - j.y) / N.distanceFactor[1];
            N.position.set(I, V)
        }
        ,
        N
    }
    function A() {
        function P(N) {
            N = N || {},
            N.count = N.count || 12,
            N.x = N.x || [-14000, -10000],
            N.y = N.y || [-1000, 1000],
            N.radius = N.radius || [5000, 13000],
            N.baseDistanceFactor = N.baseDistanceFactor || 8,
            N.textures = N.textures || T.ImperialShips.items;
            var O = N.count
              , z = [];
            for (let I in N.textures)
                z.push(I);
            let j = 2 * Math.PI / O;
            for (let I = 0, V = 0; I < O; I++,
            V += j) {
                let X = Tools.randInt(N.radius[0], N.radius[1])
                  , U = Tools.randInt(N.x[0], N.x[1])
                  , H = Tools.randInt(N.y[0], N.y[1])
                  , q = D(U, H, X, V);
                U = q.x,
                H = q.y;
                let W = Tools.rand(0.2, 0.85)
                  , Q = 0.5 * (1 / (W / 0.85)) + 0.5
                  , E = z[Tools.randInt(0, z.length - 1)]
                  , K = S(E, {
                    distanceFactor: [N.baseDistanceFactor * Q, N.baseDistanceFactor * Q],
                    scale: [W, W],
                    basePosition: [U, H],
                    position: [U, H],
                    anchor: [0.5, 0.5]
                });
                K.textureName = E,
                K.angleUsed = V,
                SWAM.Ships.push(K)
            }
        }
        var F = SWAM.ShipContainer;
        null == F ? (F = new PIXI.Container,
        F.scale.set(game.scale, game.scale),
        game.graphics.layers.map.addChildAt(F, C()),
        SWAM.ShipContainer = F) : (F.removeChildren(),
        SWAM.Ships = []),
        P({
            count: 12,
            x: [-17000, -13000]
        }),
        P({
            count: 16,
            x: [13000, 17000],
            radius: [5000, 10000],
            textures: T.RebelShips.items
        }),
        SWAM.Ships.sort(function(N, O) {
            return O.distanceFactor[0] - N.distanceFactor[0]
        });
        for (let N of SWAM.Ships)
            F.addChild(N)
    }
    function f() {
        let P = Graphics.getCamera()
          , F = P.x - game.halfScreenX / game.scale
          , N = P.y - game.halfScreenY / game.scale;
        return {
            x: F,
            y: N
        }
    }
    function D(P, F, N, O) {
        let z = N * Math.cos(O) + P
          , j = N * Math.sin(O) + F;
        return {
            x: z,
            y: j
        }
    }
    function C() {
        let P = game.graphics.layers.map
          , F = game.graphics.layers.doodads
          , N = 0;
        for (var O = 0; O < P.children.length; O++)
            P.children[O] == F && (N = O);
        return N
    }
    function k(P, F, N) {
        var O = Graphics.renderer.width
          , z = Graphics.renderer.height;
        let j = Textures.tile(P, O, z);
        return j.layerName = F,
        game.graphics.layers.map.addChildAt(j, C()),
        j.tileScale.set(N, N),
        j
    }
    function G(P=-1) {
        let N = [];
        for (let j in R)
            N.push(j);
        let O = Tools.randInt(0, N.length - 1);
        0 <= P && P < N.length && (O = P);
        let z = new PIXI.loaders.Loader;
        z.add(N[O], R[N[O]].texture),
        z.add(N[O] + "_Mask", R[N[O]].mask),
        z.load(function() {
            let j = M(Graphics.renderer, N[O]);
            j.layerName = "planet",
            j.scaleModifier = Tools.rand(0.1, 0.65),
            j.scale.set(0.5 * j.scaleModifier, 0.5 * j.scaleModifier);
            let I = 4 * j.scaleModifier;
            j.basePosition = [Tools.randInt(-25000, 7e4), Tools.randInt(-2e4 * I, 4e4 * I)],
            j.distanceFactor = [30, 30],
            SWAM.debug && (console.log("planet: " + N[O]),
            console.log("planet scale: " + j.scale.x.toFixed(2) + "    modifier: " + j.scaleModifier.toFixed(2)),
            console.log("planet pos: " + j.basePosition[0] + ", " + j.basePosition[1])),
            j.update = function(X, U) {
                let H = (X + j.basePosition[0] * game.scale) / j.distanceFactor[0]
                  , q = (U + j.basePosition[1] * game.scale) / j.distanceFactor[1];
                j.position.set(H, q)
            }
            ,
            null != SWAM.planet && game.graphics.layers.map.removeChild(SWAM.planet),
            SWAM.planet = j,
            game.graphics.layers.map.addChildAt(SWAM.planet, 6);
            let V = f();
            j.update(-V.x * game.scale, -V.y * game.scale),
            SWAM.loadSettings()
        })
    }
    function M(P, F) {
        var N = PIXI.Texture.fromImage(F)
          , O = new PIXI.Sprite(N)
          , z = PIXI.Sprite.fromImage(F + "_Mask");
        z.scale.set(1, 1);
        let j = PIXI.RenderTexture.create(2 * O.width, 2 * O.height)
          , I = new PIXI.Sprite(j);
        return O.addChild(z),
        O.filters = [new PIXI.SpriteMaskFilter(z)],
        O.scale.set(2, 2),
        O.position.set(0, 0),
        P.render(O, j),
        I.update = B,
        I
    }
    function B() {
        var N = SWAM.planet;
        let O = Graphics.getCamera()
          , z = game.halfScreenX / game.scale
          , j = game.halfScreenY / game.scale
          , I = O.x - z + 16384
          , V = game.screenX - N.width
          , X = config.mapWidth - game.screenX / game.scale
          , H = O.y + 8192
          , q = 0;
        if (5e3 > H)
            q = game.screenY;
        else {
            let W = config.mapHeight - j - 5e3;
            q = game.screenY - N.height * (H - 5e3) / W
        }
        N.position.set(I * V / X, q)
    }
    config.overdraw = 0,
    config.overdrawOptimize = !0,
    game.graphics.layers.shadows.visible = !1,
    game.graphics.layers.smoke.visible = !1,
    StarMash_2.addGraphicsSetButton(),
    SWAM.ShipContainer = null,
    SWAM.Ships = [],
    SWAM.Planets = [],
    SWAM.Moons = [],
    SWAM.Stellar = [],
    SWAM.Textures = {};
    let T = {
        ImperialShips: {
            scale: 1,
            resultScale: 0.5,
            useMask: !0,
            maskScale: 2,
            items: {
                ISD_01: [0, 0, 1700, 583],
                ISD_02: [0, 2017, 1250, 803],
                ISD_03: [1701, 0, 1414, 741],
                ISD_04: [0, 1288, 1418, 728],
                ISD_05: [1419, 1566, 1109, 738],
                ISD_06: [1251, 2305, 913, 523],
                ISD_07: [1463, 742, 1409, 575],
                ISD_08: [0, 584, 1462, 703],
                Dread_01: [0, 2821, 925, 294],
                Dread_02: [2545, 1318, 657, 505],
                Dread_03: [1419, 1318, 1125, 247],
                Dread_04: [926, 2829, 711, 348]
            }
        },
        RebelShips: {
            scale: 0.5,
            resultScale: 1,
            useMask: !0,
            maskScale: 2,
            items: {
                CR90_1: [0, 2013, 591, 293],
                CR90_2: [0, 2307, 553, 180],
                CR90_3: [2911, 1381, 604, 214],
                CR90_4: [2038, 2005, 417, 407],
                CR90_5: [554, 2307, 402, 237],
                GR75_1: [592, 2013, 508, 264],
                GR75_2: [2467, 492, 738, 207],
                GR75_3: [2911, 1596, 601, 248],
                Liberty_1: [0, 1680, 1115, 332],
                Liberty_2: [1694, 0, 960, 464],
                Liberty_3: [1553, 465, 913, 537],
                M80_1: [0, 1369, 1515, 310],
                M80_2: [0, 462, 1552, 394],
                MonCalamari_1: [0, 0, 1693, 461],
                MonCalamari_2: [0, 857, 1547, 511],
                NebulonB1_1: [1548, 1003, 813, 433],
                NebulonB1_2: [1617, 1970, 420, 578],
                NebulonB1_3: [2655, 0, 794, 491],
                NebulonB1_4: [2296, 1437, 614, 567],
                NebulonB1_5: [1516, 1437, 779, 532],
                NebulonB2_1: [1116, 1970, 500, 660],
                NebulonC_1: [2467, 700, 680, 680]
            }
        }
    }
      , R = {};
    for (let F, P = 2; 12 >= P; P++)
        F = ("0" + P).slice(-2),
        R["Planet" + F] = {
            texture: getFilePath("planets/planet" + F + ".jpg"),
            mask: getFilePath("planets/planet" + F + "-mask.jpg")
        };
    let _ = new PIXI.loaders.Loader;
    _.add("hyperspace", getFilePath("hyperspace.jpg")),
    _.add("ImperialShips", getFilePath("ships/ships1.jpg")),
    _.add("ImperialShips_Mask", getFilePath("ships/ships1-mask-50.jpg")),
    _.add("RebelShips", getFilePath("ships/RebelShips1.jpg")),
    _.add("RebelShips_Mask", getFilePath("ships/RebelShips-mask.jpg")),
    _.load(()=>{
        c(),
        SWAM.RandomizeBackground(),
        SWAM.asteroids3 = k("asteroids1", "asteroids3", game.scale / 3),
        SWAM.asteroids2 = k("asteroids2", "asteroids2", game.scale),
        SWAM.asteroids1 = k("asteroids1", "asteroids1", game.scale),
        SWAM.hyperSpace = new HyperSpace,
        SWAM.loadSettings(),
        Graphics.setCamera(0, 0)
    }
    ),
    SWAM.RandomizeBackground = function(P=-1) {
        d(),
        h(),
        G(P),
        A()
    }
    ,
    SWAM.debug && (SWAM.ShowRegenerateButton = d),
    SWAM.MoveBackgroundTiles = !0,
    SWAM.debug && (SWAM.createShips = A),
    SWAM.BackgroundFactor = 100,
    SWAM.resizeLayers = function(P, F) {
        let N = P / game.scale
          , O = F / game.scale;
        SWAM.planet,
        SWAM.ShipContainer && SWAM.ShipContainer.scale.set(game.scale, game.scale),
        SWAM.asteroids1 && (SWAM.asteroids1.width = P,
        SWAM.asteroids1.height = F),
        SWAM.asteroids2 && (SWAM.asteroids2.width = P,
        SWAM.asteroids2.height = F),
        SWAM.asteroids3 && (SWAM.asteroids3.width = P,
        SWAM.asteroids3.height = F)
    }
    ,
    SWAM.doUpdates = !0,
    SWAM.updateLayers = function(P, F) {
        if (SWAM.doUpdates && SWAM.Settings && (SWAM.Settings.themes.StarMash_2.decorations.planets && this.planet && this.planet.update(P, F),
        0 < SWAM.Settings.themes.StarMash_2.asteroidLayers && this.updateAsteroids(P, F),
        SWAM.Settings.themes.StarMash_2.decorations.ships && SWAM.ShipContainer && (SWAM.ShipContainer.position.set(P, F),
        SWAM.Ships)))
            for (let O in SWAM.Ships)
                SWAM.Ships[O].update(P, F)
    }
    ,
    SWAM.updateAsteroids = function(P, F) {
        SWAM.asteroids1 && SWAM.asteroids1.tilePosition.set(P / 2, F / 2),
        SWAM.asteroids2 && SWAM.asteroids2.tilePosition.set(P / 4, F / 4),
        SWAM.asteroids3 && SWAM.asteroids3.tilePosition.set(P / 6, F / 6)
    }
    ,
    SWAM.on("playerAdded", StarMash_2.overridePlayerMethods),
    SWAM.on("mobAdded", StarMash_2.mobAdded),
    SWAM.on("scoreboardUpdate", StarMash_2.onScoreboardUpdate),
    SWAM.on("aircraftSelected", StarMash_2.aircraftSelected)
}
,
StarMash_2.addGraphicsSetButton = function() {
    const d = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAC/VBMVEUAAAD////////////////////////+/v4LCwv///8ODg7//////////////////////////////v59fHz///////////////8VFRX5+fn//v7//v7///////8SEhL////////////++vr///8bGxsUFBQbGxsuLi7///////////8gICA0NDRcXFxAQED////////SCQkxMTEmJiZBQUFiYmKwsLDa2trOzs7q6uqlpaX////////9/f3////KCwsuLi47OjpUVFRQUFDhV1eBgYFsbGzupqa8vLzS0tLk5OTw8PDl5eX////////////79fXskpLxCgrbCQnOFxfZGRncFBT0GxsqKiraJyf1NzcgICBGRkbjQEDUPT3VVlZDQ0PYZWWHh4fqjo6hBQVHR0f09PTBCgryvb3R0dH43d31xcX+5uY5OTn////uAwPDERG6Cgq/FxfVDw/aIiJPT0/eTEzJHBw5OTncdHR0dHSCgoLULS3WPT1RUVGvAgJ0dHS+vr7ExMTyycn7h4fTLy/sJCT75+fOVFRra2vmenqgoKCampr55ub88fH///+Tk5PY2NioqKjpenrGxsbzwMDQQUH4+PjvWlr209Pr6+v86urs7OzEDAzlDQ3mICDOS0vXKirha2v2YWEzMzODg4PiRESTk5NcWlqhoaHBAgKmpqbreXnPFRXxsbGDg4OzDg5qamrsb2/ehYXuvLzLHh61tbX67e3oVFTmRkZUVFTgVVX2zMy8Gxv6mJjzt7ewsLBpaWn30ND8sLDyra323991dXXtoaHtQkLdYGD////0r6+Ghob////xp6d8fHz56OhVVVXuVFT0w8PafX30zs7toqLrOzvKysrvtbXrnZ3hd3fa2tr1qqq7u7vorKz2trbbaGjtwcHwwcH71dXdfHz12Njzk5P85eUHBwcJCQncAADfAQHIAADtAADqAADmAADRAADiAADWAQHZAADMAADFAADDAQHAAQHxAADKAADOAQG6AADkAADTAQHFcXUqAAAA6XRSTlMAAgUJDzASwP4e/VozIUgYOl4s3VNAPDb6wGRQQiT7Pg1NHBX49/XockpF8u/m11Um/PLy7eHQx8PBiYFubGf58+/o5uXc3NLKycXDt5CHencx/Pv49/f29PHu7Ovq6eXi4drX08zCsKqmpZeOjCn++fj39vTp6Ojk3dzb2tbU09LNzMnJw8O8vLKwo52amZaVlJCNioeHenFwbWVi+/r16OPg3Nzb2NfW09PSz87Nzc3My8jGxsTDwsLAvr29vLu3trOxsa+sqaalo6KhoJqak5GMiIeDgX54eHh2cG9ubGZlYltPTkJCOwDD0BUAAARNSURBVDjLZZRldBNBFIXTrCfZjbunSZqkCVBKgQrFpS20FHd3d3d3d3d3d3d3d99NGwhV2sJhdgsFDu/fzPnOvfe8N294f1VICASHEiQhhiF+CO+/CuGKD6EEIlGqEBIFFFd/I3w+BEF8Pkyo9Y/HP9CrSRic2JsiDCAWGEVhGLaJFPeH5a++W1xkg7krC/Qb40OwmCBTU20EYp0/PC8r2GK+HiFsqakgHcoas0IgiUz0esF7GUKV61Q+PSv441wchfT4+HCRSIaUCIVCWDOURJRP9y/4oDYs7TqxJYAGTOy61KD+tGjCnRdClREFUnwLIaKeDBz/1mB4M2ng4Or1siKqt218+JVS9e7SrshpQgkJ83mQGHEvHlZ+rt7gude7oFfLeln1q9TPrDvXYKa6ygVh8xQiMcSDSxh0R/OHL7aqVC8n9cnNKZ8XEZHR4NBziTqmhtaHjyjnMcI8sVp4o29wis6DIJRrb6+c9Lz8YN1ttSmkO16yaiXcMVUoEvOMVO0NGX0v6swlSLV0RuucbJC8ygydpLsGZxh7I1OxJUqShwivNsjo10knIUKNVMq+5dnpeRE7Yq3dffKSDNOsdEnHHLeMpyq3x5/Zr1O8xGYRq3VdWgCo8Zlyt33RmFzAVNJWxScrRDxPSvM0f/2TLqUNQmXC6azfgC435VptmTYavGJiDUExoYRnTV6Z5q/bNtZqhNEeiluDc7PTq3TrHF22akUBY6qGlQ1vKjXzFLVWfE3zV+kCQhEioJSbk31ZGjtKQ9MMw1TGaoY5pEpe8Vpfvqf5G1RPFqrUbtf5VQW5HWXW2q1oDiqlrTlIIDUA6PMXINX8WHK8Lm7m2D4FHW2I+3+oDqD8mc3HXp955WDLgo4IohTGVjP9Y6dPbviZNcxovKZ62xa9j+v0emlK5+gxci/+JzgV26Qna5iZEVGvfG67TbMXLpy9O1KOdWBbUCpxNNcCpWttzwBnGMxPb0ebvKc6e020JiqJbWZ/7VDmNGimWneiTiDwmTUMtmNAkhoJApBa4BtaOBYNO5Yeim5NvgUCrOFIwND2MtGNaFA4N+AKhQMmzHHj6nxjDUcyrJA3CWuG01xVkFdiNNxTQWWsFKC2V2QAJeiPYVECDokq3cHHFD46CyGJP9vwW2ACNrqyhmFwr3x9RaBkKlUaw4qeLx8tQbnGNdwSVQZLqlrKXmjk8A5JxBKH4OG/FiEECpXpU6aEMa0OaLHoNpHACrfLy2BYjcp002tCM7dSYKfEiLV4zDrGOapsknazTyOotFHboezOcDpsltDMLSe7nRabUaJ/dsTBOKO2JiRE2scklK4WTpvaP1KoAAOEOApCSREljGnvxBlnBQHeKJxmHMVmSd1qYyHzmyJkKuuymAvtw5xOuzOy2OSYZXozQqBFDKCAZSiJqCiFND7O5YqLlxZ3mxGjGP798RSJwWJSJpIoPRTlMahEMvKvT/En4U+imSkuVtwAAAAASUVORK5CYII=')"
      , m = [d, "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAACi1BMVEUAAAD///8LCwv///////8ODg4QEBD////7+/sWFhb///////////8NDQ3///82Njb///////////////////////8ZGRn///////////////////////////8UFBQUFBQmJiZhYWH///////////////////////8cHBwaGhouLi4xMTFHR0dpaWl7e3v///8fHx8fHx8uLi5ubm5+fn7BwcHS0tLv7+/4+Pj///////////////////////////8gICAgICBXV1dkZGSAgICCgoLb29vo6Ojx8fGmpqb///////////////////8YGBgoKCgzMzM/Pz8zMzMqKipLS0tTU1NRUVFbW1tDQ0N5eXkxMTGEhISKioq9vb3Y2NhOTk7l5eXl5eX09PT9/f3///////////////////////8SEhIVFRUrKysiIiI7OztDQ0MkJCRPT091dXVjY2NqamqpqalHR0e0tLS6urrMzMxISEjh4eG+vr7z8/P19fXOzs52dnadnZ2vr6////8aGhpdXV05OTkwMDAqKipOTk5cXFxFRUWSkpI6OjpVVVWfn5+lpaVwcHA/Pz+tra2qqqqvr6+BgYFZWVloaGhnZ2fs7OzOzs7S0tJVVVXt7e3a2tqwsLDR0dHPz89+fn7R0dGKioq6urqWlpba2tqurq6oqKj+/v7AwMD////k5OTe3t74+Pjc3Nz////4+Pj////r6+v19fXq6urw8PD///////8jIyM7Ozs7OztxcXF0dHRbW1tPT094eHjFxcWxsbG1tbW8vLzIyMhoaGhra2tra2ufn5+hoaGYmJicnJzMzMzS0tKSkpLDw8PIyMjKysrPz88HBwcKCgrXv00AAAAA13RSTlMAv/4DAf39IcD6Qgk9/grwPzstJBYS9F5aU0hGHQ/7+PXkV086MRgH+Pjz8uvi3Tf49Ojg3MzIw8BnXDQyLyoU8u3n49zbxsPCilVSUEoN+fTv7evr6ujo5ePd3dvZzcfGxbd+eXNiXyYOAvr19PDv7e3p393Z0dDPzsrKxcXCwL6skoNM8eXk5OPg3tvX1tXU09PT0dHQzs7Nx8PDwL+8uLitp6ajoJWUkpGQhYOBgX12b25ubW1lY18jH/Xh4Nva1tXQy8XEwsC2tbKkop6cmZeVi4l4dpOI3Z0AAAP8SURBVDjLdVRnVxNREN23cVt6JwkhhSRAAoTQkSBGIDE0QVREBRQ79t4Vxd5777333nvvdefnuG+DkuM5vi/75Z6Zu3MLEXs9JLIkPVNaopEmWiyJUk2wlElJkkl6EHFvQmo/PdNLYzEn9Lw5Zsz1nuPMFrnnnr5fKoZ1j7GWalbcXb5sYY7RXmccOHfZ8jsuudZqwMO6MEoDU5JoqhyxEvi6egXpCABpnNtZbMm611vZhZIoe+uyXNcOTeLt67cuWODw5hfMmZ0N9hG/qjXj9THUBJlB5zZXDoNJ294UsjvLbXTTFjZ6cHc2rDmTLB/fWyYRlqUmMe6qzrX8kJcdaH+Lg+Z5OtC8CLGv18H0Uya5zpDag5D0s2ZVncsB53BU2Nzg5cXnbfC3oUWPyemfTW6mXULI9FrXlUeQyaL8Ro7nwZc7U6UAsGXMQ8hPrflhLkmREe2Muuc+yCjMz1XhGeQMFjlpHgDSM+cXrYLNNxJ1SYS+V/XpbMhoxhD8VEvQIIUwEcMqyoD7mFySQtzX3N6j8KWBsIHCoLThfX0ggCgbCZA2md5wS80QpYkXQ4GdgwEcQ5003je/AH+oMn86QMaO9LrztVrC4zoBziKngsxEbGYdT/c/eqy/jeea9gu0oZENw7vqIJFVNQLmRAeR1NDIEtTyYPOXUaPP7nX42aJIC0dObWtVbEp2E3LTMNtiVMGBQjU0v+/xUWOra8aNPnl4QXgqDXQuOhDqU6wm1MV9pixF5RSAQGTWhbFSTy918aVtnPiDg9HIAfYEKSFNMA48gspIDOIHXK7xWK3aFVeH8CJoGjtyNfUfUO2/oPh15PrYOtOl2RP/rMsR1mHidpE4mT6zFROvcWHiL/wqUiQ+RSCOT0DOWYJPMDyKNjqefsUnqM9jOyLNHNnQ1krhE3hqTkA5Kx4T5XrFYw4QjuksRHkUzCgKw1tzEMuSHdhVBlCflzkR0+2SpSmMZZmXbseyMKLAAQDgaIgJPBkLreCwwD5RYMEqZmyVChUAYPVVUTaD5MXn8zcC9wFbpZ2RCqYbhE2HUdQMhJyiZyaXzxNM9wybLmbfh9i+rYM5ALJ/XniqMImetgsJ1HO+C/ZVikFIFoIwK4IKKxrSYos41cxFqO0JGfpk0jBJEiFSBsad3JkDQ14Vob4tDkrg7M2LILR4Hd8nFqkJceE0Pl8aZbc02ejGjWzHwd0hfu03HE6lBFcBjrkbxxyMs7YWFOCY75gd4icu/Nkd81hhBC2myoUrSQj4aLI+mwf79jMJtVk6XBh/q8dg1cpx9cwdaEzzGqdvf195x6XW3jco4wtKLDF5d4lV1co9upT2WInF91gKUxrsqkN5UBtfh78BLbSeZWMjzYgAAAAASUVORK5CYII=')", "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAADAFBMVEUAAAD////////////////////////////////////++/v////////////////////////////////////////////////////////////////////vAwP////////////////////////////////////////////////////zBATICgr////////////////////dBATFBATqAwPRCgrqDAzXDw/oHR36iIj64OD////95OT//////////////////f3////////jBQXXBgbBBQXNEhLFERHdFBT0GBjbGBjUFBTaJCT1JCTTPT32QEDhQEDqSkrbSUnYUlL0bW3wp6f4s7Pvubn//////Pz////yo6P////////////TAgLSBwfnBgbzCQntCQm6CAjxDQ3cCAjvGBjQHBzAHBy7EBDgKCjwODjuJSXtOjriVFTbWFjSV1f0T0/abm7zYmLjdnbfPT3mjo7nbW30sLDyycn66en75+f40NDpWVn8sLD31tb3xcX////4yMj////0oqL5x8f55eX88fH0wMD55ub+6+vwdHTzwMDfQkL////+8vLuq6v98vL209PvsbH88PDvwcHoh4f539/ohYXvoKDMGxvVKSnRLCzqJCT1MzPyNDTFJSXOQkLrFRXgTEzOS0voDg7oQEDlW1vXKirMEhLXYmLYZGTha2vqGxvTMzPUQkLsh4fuLy/UJyfulpbqoaHrqqrXODj6enrreXn2oKDwu7vehYXehYXVMzPuvLzLHh7oVFTmRkb519fQLCzpICDPWVn6mJjzt7f3goLNT0/4o6P0cnLkdHT32tr5wcH239/toaHtQkLtwcH0r6/jfn7uVFT80dH0w8PafX33np7NODj++/v0zs7hd3fvXl784ODuVlb99fX85ubbaGj71dXIAADLAADCAADpAAC6AADfAADQAADkAADaAADXAAC/AADFAADmAAC3AAC1AADcAADrAAC8AADwAADtAADhAADNAADUAADuAADSAADyAABVO9ozAAAA5nRSTlMAAhAIBB4xBjoSGgxkSTdDNVJPHGE8LywlCnJM/lhVRz4rIRaIXUAoIxT++pCNg3wi/v7++/r59sihlI9ubGpbUUYY/v39+fn49/f39PPt6+vp6ebX0a+ql3t3dWdZJv79/fz8/Pr69/b29u/u7uvm5ePi39/d3dfRzMnEvLu6sa6ppKGfnZybmZmWjYyHhICAfHdwaWJeSD4yMPby8fHv7uzr6ejo6Ofk4+Pi4eDf3dzZ2dbU09DQz8/OzcnIx8bGwsLBv769vLu7u7e3trW1r6mmpaKOjIqIh4aEg4N2dXNuaGdlT3CF9PkAAARHSURBVDjLZZRldNpQGIZDQkIIJLhDcVtXmUu9c3d3d3d3d3d3d3d3d/cChQLtWlrWdtsNbO3O2ffv3vOc93mTe+6F/hkGA4GNIgNqhBEmA/pvGKFhImxUilskUgMbUKH5F2GyEARhsWCUL1x0flEyZYDBCuwwizCAcGA2G+bAIkzw7kD+rpcRfBEc3iryMhGYQGNXryJQqWreQYejw/B5QgwlVq2ORQm2IkwxQBM99vXNCj2mTWwRmebwdGieQGLWFfM/YTKDXcGkGRZswCzvL85fSfGWzRo7EEBbx07/wuOv/HDtOY9vsyMMIOOgGNlm99XlPN7y25uGHa/uKNvsUJ/LSy2Sb4+3z1VRsTCLASGpUnLJkchnQh7vVe/0Gk16OuoMqO3tPpenI9vs3/I6mS/iMCC4PY87Pv/EEpVEsvR6L3/pSEfZjr6al9rgVMqy8a7DH1UyOwsiqKRpdTz3PqdgUq3yXA1nmiPfU/XUYlIq05mnlStzl6tDFZCcXDy8oPwjrq59LGWeuceZCZoPmMnFDbG4eVa/QL8XAj0MYUlPa/vqtuDiqF1OxlyIBFDHUQuEVjvBN0/vH+hyi0ulQpKEkaV8dSe1xQlOKsWdWB9AaycmgpWRL57UN6gerOShUEqrHaW8tW8qLSIFLNPM3gt8jSuZpWwFgSc8WB9U14tW2SBhdAV3Tvejb1VyGNYLZg8B0MAZ7aRs2EbGnC4XzOscJbBCgqhyP9zenZVAKRGWNGOI35nZpJKYj6KUuNJQVzCvREmNHooo2SnDnVOzmSlJQpHKh9tynZn177dWURJN9KgKNFRZIwNQmawMt7fhOFOiOL7y6N7pfmfkmZZKcdvocY2yQlA7GuriyvqR4204emrLyWMGZafn+p2Nx0xuOfVKoyoZrgCAgC7Z1CPgAsKqdfcdG7G5a/Z3QJWuP6LZsD6l3AAqLFEywgqRCzaqXbSwoGz1GtXSvwPK7yxdvU55n9edkRUorGUSyiGLcqg6SAt9P/PTnH6ayvXTZxOG1A1itAaIz73RrZAWen0eR5ozNz07G0QBqMCb8yPLpW4aLyEgqyBuQ15hICT0ODKdubQQRHl++mioR3MzZodQXXzFznmFf4WZQBiKyqehjDKDF5JyDsSWRcxp8CsvSH8hENK1QCvnn1IVmnMpAoEUIrzthHq/wrUKAEULgY8u5a7StBUph5kQC26vVVas9W+tcBTwlWoUp8GMCANcO6NMGHOyFhAW1wpHVW04RYyjHCZ9gRUEJmhVsZ4a1ApTQEhHlW08hWuxgRsVego4IkyonNCgW5mivwWiqq0ZGSfWydk0E6YIWQp3TsW+5TpVoWulla7WtdegFq01uI2NFD8rCqMcFyTE3Wnav0LN8uV7rmty9slCsRZDQ64iCoFFeolQHB9jioqKMkW3Tmyn5cuNnD9McRhbZOXrtEJBhCBZxcOlttTiR/E3AYEOqmgNZcgAAAAASUVORK5CYII=')"];
    game.chosenGraphicsSet = -1;
    let S = $("<div class=\"\" style=\"position: relative; width: 44px; height: 44px; cursor: pointer; background-color: rgba(0, 0, 0, 0.3); background-repeat: no-repeat; background-position: center; display: none;\" id=\"graphicsSet\" cgs= \"-1\" title= \"Switch style between Imperial / Rebel / Random\" ></div > ").css("background-image", d).click(function() {
        if (2 != game.gameType) {
            let f = parseInt($(S).attr("cgs"));
            f++,
            2 == f && (f = -1),
            $(S).attr("cgs", f),
            game.chosenGraphicsSet = f,
            $(S).css("background-image", m[f + 1]);
            let D = Players.getMe();
            null != D && (D.destroy(!1),
            D.setupGraphics(!0),
            D.visibilityUpdate(!0)),
            UI.aircraftSelected(D.type)
        }
    });
    $("#sidebar").prepend(S)
}
,
StarMash_2.aircraftSelected = function() {
    for (var h = 0 == game.myGraphicsSet ? "teamImperial" : "teamRebel", c = 1; 5 >= c; c++)
        $("#selectaircraft-" + c).removeClass("teamImperial").removeClass("teamRebel").addClass(h);
    StarMash_2.updateShipNames()
}
,
StarMash_2.updateShipNames = function() {
    let d = {
        1: ["X-Wing"],
        2: ["B-Wing"],
        3: ["A-Wing"],
        4: ["Y-Wing"],
        5: ["Scout ship"],
        101: ["Speed"],
        102: ["Deflector Shields"],
        103: ["Energy Regen"],
        104: ["Laser Speed"]
    }
      , h = {
        1: ["Tie Fighter"],
        2: ["Tie Bomber"],
        3: ["Tie Interceptor"],
        4: ["Tie Advanced"],
        5: ["Tie Phantom"],
        101: ["Speed"],
        102: ["Deflector Shields"],
        103: ["Energy Regen"],
        104: ["Laser Speed"]
    };
    for (var c in game.tooltipValues)
        game.tooltipValues[c][0] = 0 == game.myGraphicsSet ? h[c][0] : d[c][0]
}
,
StarMash_2.mobAdded = function(d, h, c) {
    let m = Mobs.get(d.id)
      , S = -1 < $.inArray(m.type, [1, 2, 3, 5, 6, 7]);
    if (S) {
        if (c) {
            var A = Players.get(c);
            if (0 == A.graphicsSet)
                ;
            else {
                var f = new PIXI.filters.ColorMatrixFilter;
                f.hue(-110),
                m.sprites.sprite.filters = [f]
            }
        } else if (0 == game.myGraphicsSet) {
            var f = new PIXI.filters.ColorMatrixFilter;
            f.hue(-110),
            m.sprites.sprite.filters = [f]
        }
        m.sprites.thruster.alpha = 0,
        m.sprites.thrusterGlow.alpha = 1,
        m.sprites.smokeGlow.alpha = 0,
        2 == m.type ? m.sprites.sprite.scale.set(.3, .4) : 3 == m.type && m.sprites.sprite.scale.set(.56, .4)
    }
}
,
StarMash_2.onScoreboardUpdate = function() {
    let m = SWAM.getLeaders();
    forEachPlayer(S=>{
        let A = ""
          , f = ""
          , D = S.sprites.sprite;
        1 == S.type && (0 == S.graphicsSet ? (f = Textures.get("raptor"),
        A = Textures.get("sith_Infiltrator")) : (f = Textures.get("raptor_2"),
        A = Textures.get("black_Xwing")),
        m[S.id] ? D.texture != A && (D.texture = A) : D.texture != f && (D.texture = f))
    }
    )
}
,
StarMash_2.overridePlayerMethods = function(d) {
    d.setGraphicsSet = function() {
        this.graphicsSet = 2 == game.gameType ? this.team - 1 : this.id == game.myID && -1 != game.chosenGraphicsSet ? game.chosenGraphicsSet : Tools.randInt(0, 1),
        this.id == game.myID && (game.myGraphicsSet = this.graphicsSet)
    }
    ,
    d.setupThrusterColor = function() {
        var h = new PIXI.filters.ColorMatrixFilter
          , c = new PIXI.filters.ColorMatrixFilter;
        0 == this.graphicsSet ? h.hue(-20) : (c.saturate(1, !0),
        h.hue(165)),
        this.sprites.thruster && (this.sprites.thruster.filters = [c, h]),
        this.sprites.thruster1 && (this.sprites.thruster1.filters = [c, h]),
        this.sprites.thruster2 && (this.sprites.thruster2.filters = [c, h])
    }
    ,
    d.setupGraphics = function(h) {
        this.setGraphicsSet();
        var c = 0 == this.graphicsSet ? "" : "_2"
          , m = null;
        switch (this.me() && (m = {
            layer: "aircraftme"
        }),
        this.sprites.powerup = Textures.init("powerupShield", {
            visible: !1,
            alpha: .75
        }),
        this.sprites.powerupCircle = Textures.init("powerupCircle", {
            visible: !1,
            alpha: .75
        }),
        this.type) {
        case 1:
            this.state.baseScale = .25,
            this.state.nameplateDist = 60,
            this.sprites.sprite = Textures.init("shipRaptor" + c, m),
            this.sprites.shadow = Textures.init("shipRaptorShadow" + c, {
                scale: this.state.baseScale * (2.4 / config.shadowScaling)
            }),
            this.sprites.thruster = Textures.init("shipRaptorThruster" + c),
            this.sprites.thrusterGlow = Textures.init("thrusterGlowSmall"),
            this.sprites.thrusterShadow = Textures.init("thrusterShadow");
            break;
        case 2:
            this.state.baseScale = .35,
            this.state.nameplateDist = 60,
            this.sprites.sprite = Textures.init("shipSpirit" + c, m),
            this.sprites.shadow = Textures.init("shipSpiritShadow" + c, {
                scale: this.state.baseScale * (2.4 / config.shadowScaling)
            }),
            this.sprites.thruster1 = Textures.init("shipRaptorThruster" + c),
            this.sprites.thruster2 = Textures.init("shipRaptorThruster" + c),
            this.sprites.thruster1Glow = Textures.init("thrusterGlowSmall"),
            this.sprites.thruster2Glow = Textures.init("thrusterGlowSmall"),
            this.sprites.thruster1Shadow = Textures.init("thrusterShadow"),
            this.sprites.thruster2Shadow = Textures.init("thrusterShadow");
            break;
        case 3:
            this.state.baseScale = .25,
            this.state.nameplateDist = 60,
            this.sprites.sprite = Textures.init("shipComanche" + c, m),
            this.sprites.rotor = Textures.init("shipComancheRotor" + c, m),
            this.sprites.shadow = Textures.init("shipComancheShadow" + c, {
                scale: this.state.baseScale * (2.4 / config.shadowScaling)
            }),
            this.sprites.rotorShadow = Textures.init("shipComancheRotorShadow" + c, {
                scale: 2 * this.state.baseScale * (2.4 / config.shadowScaling)
            });
            break;
        case 4:
            this.state.baseScale = .28,
            this.state.nameplateDist = 60,
            this.sprites.sprite = Textures.init("shipTornado" + c, m),
            this.sprites.shadow = Textures.init("shipTornadoShadow" + c, {
                scale: this.state.baseScale * (2.4 / config.shadowScaling)
            }),
            this.sprites.thruster1 = Textures.init("shipRaptorThruster" + c),
            this.sprites.thruster2 = Textures.init("shipRaptorThruster" + c),
            this.sprites.thruster1Glow = Textures.init("thrusterGlowSmall"),
            this.sprites.thruster2Glow = Textures.init("thrusterGlowSmall"),
            this.sprites.thruster1Shadow = Textures.init("thrusterShadow"),
            this.sprites.thruster2Shadow = Textures.init("thrusterShadow");
            break;
        case 5:
            this.state.baseScale = .28,
            this.state.nameplateDist = 60,
            this.sprites.sprite = Textures.init("shipProwler" + c, m),
            this.sprites.shadow = Textures.init("shipProwlerShadow" + c, {
                scale: this.state.baseScale * (2.4 / config.shadowScaling)
            }),
            this.sprites.thruster1 = Textures.init("shipRaptorThruster" + c),
            this.sprites.thruster2 = Textures.init("shipRaptorThruster" + c),
            this.sprites.thruster1Glow = Textures.init("thrusterGlowSmall"),
            this.sprites.thruster2Glow = Textures.init("thrusterGlowSmall"),
            this.sprites.thruster1Shadow = Textures.init("thrusterShadow"),
            this.sprites.thruster2Shadow = Textures.init("thrusterShadow");
        }
        if ("function" == typeof window.Glow && Glow(this),
        this.setupThrusterColor(),
        (this.reel || h || (this.setupNameplate(),
        this.setupChatBubbles(),
        null != this.level && this.setupLevelPlate()),
        config.debug.collisions)) {
            this.col = new PIXI.Graphics;
            for (var S of config.ships[this.type].collisions)
                this.col.beginFill(16777215, .2),
                this.col.drawCircle(S[0], S[1], S[2]),
                this.col.endFill();
            game.graphics.layers.explosions.addChild(this.col)
        }
    }
    ,
    d.reteam = function(h) {
        var c = this.team;
        this.team = h,
        this.sprites.name.style = new PIXI.TextStyle(this.nameplateTextStyle()),
        UI.changeMinimapTeam(this.id, this.team),
        c != this.team && (this.destroy(!1),
        this.setupGraphics(!0),
        this.visibilityUpdate(!0))
    }
    ,
    d.updateGraphics = function() {
        var c = Tools.oscillator(.025, 1e3, this.randomness) * this.scale
          , m = 1.5 * this.state.thrustLevel
          , S = this.rot
          , A = Graphics.shadowCoords(this.pos);
        if (Graphics.transform(this.sprites.sprite, this.pos.x, this.pos.y, S, c * this.state.baseScale, c * this.state.baseScale),
        Graphics.transform(this.sprites.shadow, A.x, A.y, S, this.state.baseScale * (2.4 / config.shadowScaling) * this.scale, this.state.baseScale * (2.4 / config.shadowScaling) * this.scale),
        this.powerupActive) {
            var f = .35 * (0 == this.state.powerupFadeState ? 2 * (1 - this.state.powerupFade) + 1 : 1 - this.state.powerupFade) * Tools.oscillator(.075, 100, this.randomness)
              , D = .75 * (0 == this.state.powerupFadeState ? Tools.clamp(2 * this.state.powerupFade, 0, 1) : Tools.clamp(1 - 1.3 * this.state.powerupFade, 0, 1)) * this.alpha;
            Graphics.transform(this.sprites.powerup, this.pos.x, this.pos.y - 80, 0, f, f, D),
            Graphics.transform(this.sprites.powerupCircle, this.pos.x, this.pos.y - 80, this.state.powerupAngle, 1.35 * f, 1.35 * f, D)
        }
        var C = Tools.oscillator(.1, .5, this.randomness)
          , k = .01 > Math.abs(this.state.thrustLevel) ? 0 : this.state.thrustLevel / 2 + (0 < this.state.thrustLevel ? .5 : -.5)
          , G = Tools.clamp(2 * Math.abs(this.state.thrustLevel) - .1, 0, 1);
        if (0 == this.graphicsSet)
            switch (this.type) {
            case 1:
                Graphics.transform(this.sprites.thruster, this.pos.x + Math.sin(-S) * (5 * c), this.pos.y + Math.cos(-S) * (5 * c), S + (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * C * k * this.scale, .5 * C * k * this.scale, G),
                this.sprites.thruster.alpha = 0.05,
                Graphics.transform(this.sprites.thrusterGlow, this.pos.x + Math.sin(-S - .5 * this.state.thrustDir) * (40 * c), this.pos.y + Math.cos(-S - .5 * this.state.thrustDir) * (40 * c), null, 1.5 * m * this.scale, 1 * m * this.scale, .3 * this.state.thrustLevel);
                break;
            case 2:
                0 > this.state.thrustLevel && (C *= .7),
                Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-S - .5) * (15 * c), this.pos.y + Math.cos(-S - .5) * (15 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * C * k * this.scale, .6 * C * k * this.scale, G),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(.5 - S) * (15 * c), this.pos.y + Math.cos(.5 - S) * (15 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * C * k * this.scale, .6 * C * k * this.scale, G),
                Graphics.transform(this.sprites.thruster1Shadow, A.x + Math.sin(-S - .5) * (10 * c) / config.shadowScaling, A.y + Math.cos(-S - .5) * (10 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .5 * C * k * this.scale * (4 / config.shadowScaling), .6 * C * k * this.scale * (4 / config.shadowScaling), G / 2.5),
                Graphics.transform(this.sprites.thruster2Shadow, A.x + Math.sin(.5 - S) * (10 * c) / config.shadowScaling, A.y + Math.cos(.5 - S) * (10 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .5 * C * k * this.scale * (4 / config.shadowScaling), .6 * C * k * this.scale * (4 / config.shadowScaling), G / 2.5),
                Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-S - .3) * (50 * c), this.pos.y + Math.cos(-S - .3) * (50 * c), null, 2.5 * this.scale, 1.5 * this.scale, .3 * this.state.thrustLevel),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.3 - S) * (50 * c), this.pos.y + Math.cos(.3 - S) * (50 * c), null, 2.5 * this.scale, 1.5 * this.scale, .3 * this.state.thrustLevel);
                break;
            case 3:
                Graphics.transform(this.sprites.rotor, this.pos.x, this.pos.y, this.state.thrustDir, 2 * (c * this.state.baseScale), 2 * (c * this.state.baseScale), .8),
                Graphics.transform(this.sprites.rotorShadow, A.x, A.y, this.state.thrustDir, 2 * (this.state.baseScale * (2.4 / config.shadowScaling) * this.scale), 2 * (this.state.baseScale * (2.4 / config.shadowScaling) * this.scale));
                break;
            case 4:
                0 > this.state.thrustLevel && (C *= .7),
                Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-S - .25) * (5 * c), this.pos.y + Math.cos(-S - .25) * (5 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * C * k * this.scale, .5 * C * k * this.scale, G),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(.25 - S) * (5 * c), this.pos.y + Math.cos(.25 - S) * (5 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * C * k * this.scale, .5 * C * k * this.scale, G),
                Graphics.transform(this.sprites.thruster1Shadow, A.x + Math.sin(-S - .15) * (28 * c) / config.shadowScaling, A.y + Math.cos(-S - .15) * (28 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * C * k * this.scale * (4 / config.shadowScaling), .5 * C * k * this.scale * (4 / config.shadowScaling), G / 2.5),
                Graphics.transform(this.sprites.thruster2Shadow, A.x + Math.sin(.15 - S) * (28 * c) / config.shadowScaling, A.y + Math.cos(.15 - S) * (28 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * C * k * this.scale * (4 / config.shadowScaling), .5 * C * k * this.scale * (4 / config.shadowScaling), G / 2.5),
                Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-S - .2) * (45 * c), this.pos.y + Math.cos(-S - .2) * (45 * c), null, 2.5 * this.scale, 1.5 * this.scale, .25 * this.state.thrustLevel),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.2 - S) * (45 * c), this.pos.y + Math.cos(.2 - S) * (45 * c), null, 2.5 * this.scale, 1.5 * this.scale, .25 * this.state.thrustLevel);
                break;
            case 5:
                0 > this.state.thrustLevel && (C *= .7),
                Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-S - .35) * (20 * c), this.pos.y + Math.cos(-S - .35) * (20 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * C * k * this.scale, .4 * C * k * this.scale, G * this.alpha),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(.35 - S) * (20 * c), this.pos.y + Math.cos(.35 - S) * (20 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * C * k * this.scale, .4 * C * k * this.scale, G * this.alpha),
                Graphics.transform(this.sprites.thruster1Shadow, A.x + Math.sin(-S - .35) * (20 * c) / config.shadowScaling, A.y + Math.cos(-S - .35) * (20 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * C * k * this.scale * (4 / config.shadowScaling), .4 * C * k * this.scale * (4 / config.shadowScaling), G * this.alpha / 2.5),
                Graphics.transform(this.sprites.thruster2Shadow, A.x + Math.sin(.35 - S) * (20 * c) / config.shadowScaling, A.y + Math.cos(.35 - S) * (20 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * C * k * this.scale * (4 / config.shadowScaling), .4 * C * k * this.scale * (4 / config.shadowScaling), G * this.alpha / 2.5),
                Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-S - .2 - 0 * this.state.thrustDir) * (35 * c), this.pos.y + Math.cos(-S - .2 - 0 * this.state.thrustDir) * (35 * c), null, 2.5 * this.scale, 1.5 * this.scale, .2 * this.state.thrustLevel * this.alpha),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.2 - S - 0 * this.state.thrustDir) * (35 * c), this.pos.y + Math.cos(.2 - S - 0 * this.state.thrustDir) * (35 * c), null, 2.5 * this.scale, 1.5 * this.scale, .2 * this.state.thrustLevel * this.alpha);
            }
        else
            switch (this.type) {
            case 1:
                Graphics.transform(this.sprites.thruster, this.pos.x + Math.sin(-S) * (20 * c), this.pos.y + Math.cos(-S) * (20 * c), S + (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * C * k * this.scale, .5 * C * k * this.scale, G),
                Graphics.transform(this.sprites.thrusterShadow, A.x + Math.sin(-S) * (20 * c) / config.shadowScaling, A.y + Math.cos(-S) * (20 * c) / config.shadowScaling, S + (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * C * k * this.scale * (4 / config.shadowScaling), .5 * C * k * this.scale * (4 / config.shadowScaling), G / 2.5),
                Graphics.transform(this.sprites.thrusterGlow, this.pos.x + Math.sin(-S - .5 * this.state.thrustDir) * (40 * c), this.pos.y + Math.cos(-S - .5 * this.state.thrustDir) * (40 * c), null, 1.5 * m * this.scale, 1 * m * this.scale, .3 * this.state.thrustLevel),
                this.sprites.thruster.scale.x = this.sprites.thruster.scale.y = 0.25;
                break;
            case 2:
                0 > this.state.thrustLevel && (C *= .7),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(0.8 - S) * (50 * c), this.pos.y + Math.cos(.8 - S) * (50 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * C * k * this.scale, .6 * C * k * this.scale, G),
                Graphics.transform(this.sprites.thruster2Shadow, A.x + Math.sin(.5 - S) * (32 * c) / config.shadowScaling, A.y + Math.cos(.5 - S) * (32 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .5 * C * k * this.scale * (4 / config.shadowScaling), .6 * C * k * this.scale * (4 / config.shadowScaling), G / 2.5),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.3 - S) * (50 * c), this.pos.y + Math.cos(.3 - S) * (50 * c), null, 2.5 * this.scale, 1.5 * this.scale, .3 * this.state.thrustLevel),
                this.sprites.thruster1.visible = !1,
                this.sprites.thruster1Glow.visible = !1,
                this.sprites.thruster1Shadow.visible = !1;
                break;
            case 3:
                Graphics.transform(this.sprites.rotor, this.pos.x, this.pos.y, this.state.thrustDir, 2 * (c * this.state.baseScale), 2 * (c * this.state.baseScale), .8),
                Graphics.transform(this.sprites.rotorShadow, A.x, A.y, this.state.thrustDir, 2 * (this.state.baseScale * (2.4 / config.shadowScaling) * this.scale), 2 * (this.state.baseScale * (2.4 / config.shadowScaling) * this.scale));
                break;
            case 4:
                0 > this.state.thrustLevel && (C *= .7),
                Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-S - 1) * (20 * c), this.pos.y + Math.cos(-S - 1) * (20 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * C * k * this.scale, .5 * C * k * this.scale, G),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(1 - S) * (20 * c), this.pos.y + Math.cos(1 - S) * (20 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * C * k * this.scale, .5 * C * k * this.scale, G),
                Graphics.transform(this.sprites.thruster1Shadow, A.x + Math.sin(-S - .15) * (28 * c) / config.shadowScaling, A.y + Math.cos(-S - .15) * (28 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * C * k * this.scale * (4 / config.shadowScaling), .5 * C * k * this.scale * (4 / config.shadowScaling), G / 2.5),
                Graphics.transform(this.sprites.thruster2Shadow, A.x + Math.sin(.15 - S) * (28 * c) / config.shadowScaling, A.y + Math.cos(.15 - S) * (28 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * C * k * this.scale * (4 / config.shadowScaling), .5 * C * k * this.scale * (4 / config.shadowScaling), G / 2.5),
                Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-S - .2) * (45 * c), this.pos.y + Math.cos(-S - .2) * (45 * c), null, 2.5 * this.scale, 1.5 * this.scale, .25 * this.state.thrustLevel),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.2 - S) * (45 * c), this.pos.y + Math.cos(.2 - S) * (45 * c), null, 2.5 * this.scale, 1.5 * this.scale, .25 * this.state.thrustLevel),
                this.sprites.thruster1.scale.x = this.sprites.thruster1.scale.y = 0.35,
                this.sprites.thruster2.scale.x = this.sprites.thruster2.scale.y = 0.35;
                break;
            case 5:
                0 > this.state.thrustLevel && (C *= .7),
                Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-S - 0.3) * (20 * c), this.pos.y + Math.cos(-S - .35) * (20 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * C * k * this.scale, .4 * C * k * this.scale, G * this.alpha),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(0.3 - S) * (20 * c), this.pos.y + Math.cos(.35 - S) * (20 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * C * k * this.scale, .4 * C * k * this.scale, G * this.alpha),
                Graphics.transform(this.sprites.thruster1Shadow, A.x + Math.sin(-S - .35) * (20 * c) / config.shadowScaling, A.y + Math.cos(-S - .35) * (20 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * C * k * this.scale * (4 / config.shadowScaling), .4 * C * k * this.scale * (4 / config.shadowScaling), G * this.alpha / 2.5),
                Graphics.transform(this.sprites.thruster2Shadow, A.x + Math.sin(.35 - S) * (20 * c) / config.shadowScaling, A.y + Math.cos(.35 - S) * (20 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * C * k * this.scale * (4 / config.shadowScaling), .4 * C * k * this.scale * (4 / config.shadowScaling), G * this.alpha / 2.5),
                Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-S - .2 - 0 * this.state.thrustDir) * (35 * c), this.pos.y + Math.cos(-S - .2 - 0 * this.state.thrustDir) * (35 * c), null, 2.5 * this.scale, 1.5 * this.scale, .2 * this.state.thrustLevel * this.alpha),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.2 - S - 0 * this.state.thrustDir) * (35 * c), this.pos.y + Math.cos(.2 - S - 0 * this.state.thrustDir) * (35 * c), null, 2.5 * this.scale, 1.5 * this.scale, .2 * this.state.thrustLevel * this.alpha);
            }
        this.updateNameplate(),
        this.state.bubble && this.updateBubble(),
        config.debug.collisions && this.col && (this.col.position.set(this.pos.x, this.pos.y),
        this.col.rotation = this.rot)
    }
    ,
    d.resetGraphics = function() {
        try {
            this.destroy(!1),
            this.setupGraphics(!0),
            this.visibilityUpdate(!0)
        } catch (h) {}
    }
    ,
    d.resetGraphics(),
    d.me() && UI.aircraftSelected(d.type)
}
,
StarMash_2.prototype.injectTextures = function(d, h, c, m) {
    for (let k in d) {
        var A = d[k];
        A = A.replace("assets/", ""),
        -1 < A.indexOf("?") && (A = A.substr(0, A.indexOf("?"))),
        d[k] = getFilePath(A)
    }
    var f = {
        map_forest_mask: getFilePath("map_forest_mask.jpg"),
        asteroids1: getFilePath("asteroids/asteroids1.png"),
        asteroids2: getFilePath("asteroids/asteroids2.png"),
        asteroids3: getFilePath("asteroids/asteroids3.png")
    };
    for (let k in f)
        d[k] = f[k];
    var D = {
        ui_minimap_1: ["gui", [500, 596, 16, 16]],
        ui_minimap_2: ["gui", [516, 596, 16, 16]],
        ui_minimap_3: ["gui", [532, 596, 16, 16]],
        ui_minimap_target: ["gui", [580, 596, 16, 16]],
        spirit_2: ["aircraft", [4, 260, 512, 256]],
        tornado_2: ["aircraft", [524, 260, 256, 256]],
        raptor_2: ["aircraft", [788, 260, 256, 256]],
        prowler_2: ["aircraft", [1052, 260, 256, 256]],
        comanche_2: ["aircraft", [1316, 260, 128, 256]],
        sith_Infiltrator: ["aircraft", [1540, 4, 256, 256]],
        black_Xwing: ["aircraft", [1540, 260, 256, 256]],
        spirit_shadow_2: ["shadows", [4, 200, 256, 128]],
        tornado_shadow_2: ["shadows", [268, 200, 128, 128]],
        raptor_shadow_2: ["shadows", [540, 200, 128, 128]],
        prowler_shadow_2: ["shadows", [676, 200, 128, 128]],
        comanche_shadow_2: ["shadows", [812, 200, 64, 128]]
    };
    for (let k in D)
        h[k] = D[k];
    var C = {
        minimap1: {
            texture: "ui_minimap_1",
            layer: "ui2",
            anchor: [0.5, 0.5],
            alpha: 1,
            scale: .8
        },
        minimap2: {
            texture: "ui_minimap_2",
            layer: "ui2",
            anchor: [0.5, 0.5],
            alpha: 1,
            scale: .8
        },
        minimap3: {
            texture: "ui_minimap_3",
            layer: "ui2",
            anchor: [0.5, 0.5],
            alpha: 1,
            scale: .8
        },
        minimapTarget: {
            texture: "ui_minimap_target",
            layer: "ui3",
            anchor: [0.5, 0.5],
            alpha: 1,
            scale: .5
        },
        shipRaptor_2: {
            texture: "raptor_2",
            layer: "aircraft",
            anchor: [0.5, 0.6]
        },
        shipRaptorShadow_2: {
            texture: "raptor_shadow_2",
            layer: "shadows",
            anchor: [0.5, 0.57]
        },
        shipRaptorThruster_2: {
            texture: "afterburner",
            layer: "thrusters",
            anchor: [0.5, 0.1],
            scale: [0.25, 0.25]
        },
        shipSpirit_2: {
            texture: "spirit_2",
            layer: "aircraft",
            anchor: [0.5, 0.5]
        },
        shipSpiritShadow_2: {
            texture: "spirit_shadow_2",
            layer: "shadows",
            anchor: [0.5, 0.5]
        },
        shipSpiritThruster_2: {
            texture: "afterburner",
            layer: "thrusters",
            anchor: [0.5, 0.1],
            scale: [0.25, 0.25]
        },
        shipComanche_2: {
            texture: "comanche_2",
            layer: "aircraft",
            anchor: [0.5, 0.4]
        },
        shipComancheShadow_2: {
            texture: "comanche_shadow_2",
            layer: "shadows",
            anchor: [0.5, 0.43]
        },
        shipComancheRotor_2: {
            texture: "comanche_rotor",
            layer: "aircraft",
            anchor: [0.5, 0.5],
            scale: [0.25, 0.25]
        },
        shipComancheRotorShadow_2: {
            texture: "comanche_rotor_shadow",
            layer: "shadows",
            anchor: [0.5, 0.5]
        },
        shipTornado_2: {
            texture: "tornado_2",
            layer: "aircraft",
            anchor: [0.5, 0.65]
        },
        shipTornadoShadow_2: {
            texture: "tornado_shadow_2",
            layer: "shadows",
            anchor: [0.5, 0.605]
        },
        shipProwler_2: {
            texture: "prowler_2",
            layer: "aircraft",
            anchor: [0.5, 0.5]
        },
        shipProwlerShadow_2: {
            texture: "prowler_shadow_2",
            layer: "shadows",
            anchor: [0.5, 0.5]
        }
    };
    for (let k in C)
        m[k] = C[k];
    m.missile.scale = [0.3, 0.3],
    m.missileFat.scale = [0.2, 0.3],
    m.missileSmall.scale = [20, 20]
}
,
StarMash_2.prototype.loadGameModules = function() {
    loadGraphics_SWAM(),
    loadSounds_SWAM()
}
;
function StarMash_1() {
    SWAM.replaceCSS(getFilePath("style.css"));
    let c = new SettingsProvider({
        nebulas: {
            blue: !0,
            green: !0,
            red: !0
        }
    },function(S) {
        let A = S;
        game.graphics.layers.map.children[0].alpha = 0.8,
        game.graphics.layers.map.children[0].visible = A.nebulas.blue,
        game.graphics.layers.map.children[2].alpha = 0.8,
        game.graphics.layers.map.children[2].visible = A.nebulas.green,
        game.graphics.layers.map.children[4].alpha = 0.8,
        game.graphics.layers.map.children[4].visible = A.nebulas.red,
        Graphics.renderBackground()
    }
    );
    c.root = "",
    c.title = "Mod Settings";
    let m = c.addSection("General");
    m.addBoolean("nebulas.blue", "Blue nebulas"),
    m.addBoolean("nebulas.green", "Green nebulas"),
    m.addBoolean("nebulas.red", "Red nebulas"),
    this.settingsProvider = c
}
StarMash_1.themeName = "StarMash v.1, no Parallax",
StarMash_1.author = "Bombita",
StarMash_1.version = SWAM_version,
StarMash_1.prototype.start = function() {
    SWAM.BackgroundFactor = 1,
    SWAM.MoveBackgroundTiles = !0,
    config.overdraw = 256,
    config.overdrawOptimize = !0,
    game.graphics.layers.shadows.visible = !1,
    game.graphics.layers.smoke.visible = !1,
    StarMash_2.addGraphicsSetButton(),
    SWAM.on("playerAdded", StarMash_2.overridePlayerMethods),
    SWAM.on("mobAdded", StarMash_2.mobAdded),
    SWAM.on("scoreboardUpdate", StarMash_2.onScoreboardUpdate),
    SWAM.on("aircraftSelected", StarMash_2.aircraftSelected),
    SWAM.Theme.settingsProvider.apply(SWAM.Settings)
}
,
StarMash_1.prototype.injectTextures = StarMash_2.prototype.injectTextures,
StarMash_1.prototype.loadGameModules = StarMash_2.prototype.loadGameModules;
class VanillaTheme {
    constructor() {
        let h = this;
        this.teamColors = {
            1: {
                player: 10539263,
                mob: 5592575
            },
            2: {
                player: 16756912,
                mob: 16733525
            }
        };
        let m = new SettingsProvider({
            map: {
                sea: !0,
                forest: !0,
                sand: !0,
                rock: !0,
                polygons: !0
            },
            layers: {
                shadows: !0,
                smoke: !0
            },
            gameplay: {
                colorMissiles: !0,
                colorPlayers: !0
            }
        },function(A) {
            h.settings = A;
            let f = A
              , D = game.graphics.layers.sea
              , C = D.children[1]
              , k = game.graphics.layers.map
              , G = k.children[0]
              , L = k.children[1]
              , M = k.children[3]
              , B = k.children[6];
            if (f && f.map) {
                function T() {
                    B = k.children[6],
                    f.map.polygons ? (B.visible = !0,
                    k.mask = B) : (k.mask = null,
                    B.visible = !1)
                }
                if (C.visible = f.map.sea,
                G.visible = f.map.forest,
                D.visible = f.map.forest && !f.map.polygons ? !1 : !0,
                L.visible = f.map.sand,
                M.visible = f.map.rock,
                B)
                    T();
                else {
                    let R = setInterval(function() {
                        game.graphics.layers.map.children[6] && (clearInterval(R),
                        T())
                    }, 200)
                }
            }
            f && f.layers && (game.graphics.layers.shadows.visible = f.layers.shadows,
            game.graphics.layers.smoke.visible = f.layers.smoke,
            Particles.missileSmoke = f.layers.smoke && Particles._missileSmoke ? Particles._missileSmoke : function() {}
            ),
            forEachPlayer(T=>{
                h.tintPlayer(T)
            }
            )
        }
        );
        m.root = "",
        m.title = "Mod Settings";
        let S = m.addSection("Background");
        S.addBoolean("map.sea", "Sea depth"),
        S.addBoolean("map.forest", "Forest"),
        S.addBoolean("map.sand", "Sand"),
        S.addBoolean("map.rock", "Rocks"),
        S.addBoolean("map.polygons", "Continents"),
        S.addBoolean("layers.shadows", "Shadows"),
        S.addBoolean("layers.smoke", "Missile's Smoke"),
        S = m.addSection("Gameplay"),
        S.addBoolean("gameplay.colorMissiles", "Use team colors for missiles."),
        S.addBoolean("gameplay.colorPlayers", "Use team colors for players."),
        this.settingsProvider = m
    }
    start() {
        config.overdraw = 256,
        config.overdrawOptimize = !0,
        Particles._missileSmoke = Particles.missileSmoke;
        var d = this;
        SWAM.on("playerAdded", function(h) {
            "function" == typeof window.Glow && Glow(h),
            d.tintPlayer(h);
            let c = h.setupGraphics;
            h.setupGraphics = function(S) {
                c.call(h, S),
                "function" == typeof window.Glow && Glow(h),
                d.tintPlayer(h)
            }
            ;
            let m = h.reteam;
            h.reteam = function(S) {
                m.call(h, S),
                d.tintPlayer(h)
            }
        }),
        SWAM.on("mobAdded", this.tintMob.bind(this)),
        SWAM.on("mobsRepeled", (h,c)=>{
            if (this.settings.gameplay.colorMissiles && game.gameType == SWAM.GAME_TYPE.CTF)
                for (let m of c) {
                    let S = h.team;
                    m.sprites.sprite.tint = m.sprites.thruster.tint = this.teamColors[S].mob
                }
        }
        ),
        SWAM.Theme.settingsProvider.apply(SWAM.Settings)
    }
    tintPlayer(d) {
        d.sprites.sprite.tint = this.settings && this.settings.gameplay.colorPlayers ? 1 == d.team || 2 == d.team ? this.teamColors[d.team].player : 16777215 : 16777215
    }
    tintMob(d, h, c) {
        if (this.settings.gameplay.colorMissiles) {
            let m = Mobs.get(d.id)
              , S = [1, 2, 3, 5, 6, 7].includes(m.type);
            if (S) {
                if (game.gameType == SWAM.GAME_TYPE.CTF) {
                    let A = 0;
                    A = c ? Players.get(c).team : 1 == Players.getMe().team ? 2 : 1,
                    m.sprites.sprite.tint = m.sprites.thruster.tint = this.teamColors[A].mob
                }
                this.setMobScale(m)
            }
        }
    }
    setMobScale(d) {
        d.sprites.smokeGlow.alpha = 0,
        2 == d.type ? d.sprites.sprite.scale.set(.3, .4) : 3 == d.type ? d.sprites.sprite.scale.set(.56, .4) : d.sprites.sprite.scale.set(.3, .3)
    }
    injectTextures() {}
    injectSounds() {}
    loadGameModules() {
        loadGraphics_Default(),
        loadSounds_Default()
    }
}
VanillaTheme.themeName = "Vanilla Theme",
VanillaTheme.author = "Bombita",
VanillaTheme.version = SWAM_version;
class StPatricksDay2018 extends VanillaTheme {
    constructor() {
        super(),
        $("#logon").css("backgroundColor", "rgba(6, 51, 16, 0.75)")
    }
    injectTextures(d) {
        const A = ["map_forest.jpg", "map_rock.jpg", "map_sand.jpg", "map_sea.jpg", "aircraft.png"];
        for (let f in d) {
            let D = getFileName(d[f]);
            -1 < $.inArray(D, A) && (d[f] = "//molesmalo.github.io/StarWarsMod4AirMash/assets/themes/StPatricksDay2018/" + getFileName(d[f]))
        }
    }
}
StPatricksDay2018.themeName = "St. Patrick's Day 2018 Theme",
StPatricksDay2018.description = "A lucky theme for AirMash!!",
StPatricksDay2018.author = "Bombita";
class RealisticSprites extends VanillaTheme {
    constructor() {
        super()
    }
    injectTextures(d) {
        const A = {
            "map_sea.jpg": "https://image.ibb.co/c5MWKd/map_sea.jpg",
            "map_forest.jpg": "https://image.ibb.co/db9ked/map_forest.jpg",
            "map_rock.jpg": "https://image.ibb.co/bXBnsy/map_rock.jpg",
            "map_sand.jpg": "https://image.ibb.co/nADBKd/map_sand.jpg",
            "aircraft.png": "https://image.ibb.co/k3uJzd/aircraft.png",
            "shadows.png": "https://image.ibb.co/nc75ed/shadows.png",
            "items.png": "https://image.ibb.co/k8JNQJ/items.png",
            "mountains.png": "https://image.ibb.co/neRyzd/mountains.png"
        };
        for (let f in d) {
            let D = getFileName(d[f]);
            "undefined" != typeof A[D] && (SWAM.debug ? d[f] = getFilePath("themes/RealisticSprites/" + D) : d[f] = A[D] ? A[D] : getFilePath("themes/RealisticSprites/" + D))
        }
    }
}
RealisticSprites.themeName = "Realistic Sprites [BETA 1]",
RealisticSprites.description = "WORK IN PROGRES. More detailed/realistic graphics!",
RealisticSprites.author = "Bombita";
class PixelArt_8Bits extends VanillaTheme {
    constructor() {
        function d(h) {
            let c = Math.round(30 * h / 2500) + "px"
              , m = Math.round(25 * h / 2500) + "px";
            config.playerNameSize = c,
            config.playerLevelSize = m;
            game.state != Network.STATE.PLAYING || forEachPlayer(S=>{
                S.sprites.name.style.fontSize = c,
                S.sprites.level && (S.sprites.level.style.fontSize = m)
            }
            )
        }
        super();
        for (let h = 0; h < config.walls.length; h++)
            config.doodads[h][4] = 0;
        $("body").append(`<style>
        @font-face {
            font-family: ModernDOS8x14;
            src: url("${getFilePath("themes/PixelArt_8bits/ModernDOS8x14.ttf")}");
        }
        #logon #playername
        {
            font-family: ModernDOS8x14;
        }
        body {
            font-smooth: never;
            -webkit-font-smoothing : none;
            background: black url("https://image.ibb.co/eFeUhd/Main_Screen.jpg") no-repeat fixed center;
            background-size: contain;
            font-family: ModernDOS8x14;
            font-size: 14px;
            position: fixed;
            width: 100%;
            height: 100%;
            margin: 0px;
        }
        #scoreboard, #chatbox {
            font-size: 14px;
            font-weight: normal;
        }
        #scoreboard .line .nick,
        #scoredetailed .item div,
        #logon div
        {
            font-weight: normal !important;
        }
        #logon .logo {
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjAAAABmAgMAAACo10M/AAAADFBMVEUAAADfJVnCsADb29tHegPaAAAAAXRSTlMAQObYZgAAA7tJREFUaN7tmk1u4zAMhTkDeOONr6ZFdT9tutHpfAON+B+FSYtZzCBM/WDLFCWHH/qsyC0Kly5duvR/1R+oAewarHOwt9WpAsBx6IDKky5KYfDx8jD7ExgJArDXfAZT7liywsx6ERBhKFCYZfpWsAj3KwAlvAMrTF3RLPfyMFQuJjXfFcZpFKY8gfHyPPRjYPYmBajZrF34TL8qZIXp8CXMHmd1KVoDjF7eG6Zr9BRms8YptOcwJTdMFzXdHgLMQnrjTV2e3LeD2cMG2aD5uM9qBqNrO6xpvTqM75UJYdqyQVIUYeyNonltidS3ZzBqXzoY6N/CcGbn2YrwDGa7gak0kBFmb9w4jDP4UJdghSm+mI3Buw4DNSWM+hRh9h5gdoUh1RVG6zoMx26jvbJngIEuZqww5Ak7E2xyGA0cZqNCBuOIK2MKGPHJYSSIMDq3GUM1GG0qtxB8Sggj1doDGIr7uh34RklFAwxQCMGnjDC8ZrvB+PapF3/RAIVZtRlBCWWVNCGM+vQ1jKsvn2wdoZBL9CkjjPnkMEzGI49hatVSHwsMxwWiTwlh1CeGcWv0Gn/xd5gZE4yWVLAAA1VGUCULDPv0DYyTM8xsAgxBBBjdJv0VomaBWTZDq+1f/7cwXWHsb2YKQ70ptiv6xDCUyAOztwBjX/8Ow0lwGAoFRrq1ajp+7WWB+d1FbofVbaCKMFOfhVdqgHGVO5/eBGZebtXxUBmMrmGFCcZUlVqXBmat+D1MD9XQDoHBIw6vqbQwvrR7oMSxvtxQGcFhYNH2o2B6gOFP1ciFmfeB2R2mUZflMG3xqdJZVpjKgsd4aWGawMi2KaKYYSauiypWhynUZ2Fc3wZmVlphFNFhoLd7GFCY29fwLcDw3DQwfZU9teIQsLqlmj3Un7r3cTNVln/J4LiuKuyiTUgD02CFabcwTTL3MGAwUo/FnXuWNDCXLl36hxpwABwntufsDTglMWBqxhhwOMbM4hBOFekkyuEE0TmPec7ZiWFAah8HEUUY//wvYcZ5et4m5YMZAw8mGLNlmBPcJp0yuMoxg3nOCcc48TxweFAEQwpzfsi9B6bTwcAx75T2RA4M6TOIEXXiMWFoHBB4TkHNlu/GC8jtU4gGfsyhjDADa9j9UxiCPcAofaRxnOkdZqAJzDQM5qS7HeYYGWHkB803swOzcRgINkkFPri4VHWYxaZ5ZoQZY4HherYdUM6XNpwIQ8FhS1tt8qU9KKn3ntPIjDB/p5PPA15BrwQz7BXiBfRSMJd+ov4AV20RpyAHVjkAAAAASUVORK5CYII=');
        }
        #logosmall {
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAAAqCAMAAAD1cyU5AAACZ1BMVEUAAADCsADfJVnfJFnfJVnfJVnCsADfJVnCsADCsADCsADfJVnCsADCsADfJVnfJVnCsADCsADCsADfJVnfJVnfJVnfJVnfJVnJO0b////fJVnCsAD////fJVnfJVnCsADCsAD////fJVnfJVnfJVnfJVnCsAD////fJVn////fJVn////////CsADCsAA8CxUjBwz///8EAgLlM0/CsADCsADCsADCsADCsADfJVnfJVnCsADfJVnCsAD///84CRTfJVkoCA7fJVn8NFXfJVnfJVnfJVnfJVnCsADCsADfJVn///9BQ0fCsADfJVnfJVkVAwfCsAARDQ/fJVkPBwnCsAADAwPyMFPBtADgIVve3+Lm5+f////CxMnfJVnHI0a2Iz62ucTCKELfJVnfJVnKM0iho6ulHznfJVmmpqZXER/CsABACxY1BxA5Oj8vMTU1CxHCsADfJVkgDA7CsAAHAQLfJVnCsAD29/vCsADmJlDgKU7BxtXgIlvjME/TI0rd4uzn6OjeM069H0LV2OLhKk/CsADR0tXfJVnRMkzCsACsIDzGx8/fJVmXm6uZGjXCsAC2sbTfJVm+v7+XHjS3LD7CsADfJVmvKjqdJDaalJeoKzyanqiKHTCUlZaaGjZnEyTfJVmNjY11FimCgoaLITBqESZ6e4BrbnTfJVlkGCE5CxRfX148PUBaFh4xCBFJERlMTU/CsADfJVlLS0vCsADCsADfJVkXDhHfJVnCsADfJVkAAADRZy8FBgbCsAD////fJVn/M1v/K1v/O1n8L1ffJE3n6/jj6O7/QmT/LWL/H1L2JUiMbQi6AAAAv3RSTlMA8O/7UPA/8lP0/EGc9tX2hPoUlwj47ckCu5yaIv317fjdiVoVEPLMjWYcEZmQi2lBMwvy3865sqemoJWDgXdjPxkM/uC/sq6soJCIbE9NSDUtLCQkDwX++fj17+7s5OLh39za19XU08++jYduaGRcVFRMTEo/MCH+/v38+vr69vX18O/t7ezn5+Tk4d/f3dvY19HQz8vHxcXFwr69vLu6ubixp6CfnpuZlYB4d3d2cGxnZ19RSTk4MiEgGxYTE3iuilAAAAYRSURBVGje7ZgHUxNBFID3Ts8zgZgQSYiYxIhJRJAIESmhd0R6VZDeBZRu77333nvvvV4IxfqjzGNZV5LojOOMBfhmOHbfvb3ZD9693AWN8X8REMD8FLEYsshMpyProqKG5wUH47hWO86ORuPjQzL1eo1m3CDh4egbMKcxZ7y8YJUj5KxCAbPq6pEvlJoqEkVETPgJDIPQvHnBwXgmCGSlTObhQbNkMoYRBJMJNupmJzZWoSCZHJeVBbG0tEmTSCwxMTyc5jkSHz9u3MWLbk5otePHw3mVimVhLcuOfCFBUKnQT8BCuOxw6YWEECEcpcjlglBQQMpCqcTFZDDwPI5MnkyFenqorpsbGdOCioxELpBKqRBCnp4jX0guF4ngt7u7ROLxDYkkKgpieMYwUE5kxatXEgkVwk0lwg6OhYXpdFiIblqj8fV1FEpL02pJlo8PXUE3TsT4IbTa0SkEJQfH+fNFIvk3du1yd0dIJDKZYAZl1tQEWcuX46KbMIEKmUwMI7JDmsXChYsWoSEaGo4fR4hulwqxbF4e3YOzEMfp9fgjwG8IpfLxYxBsbycZo0UoJIRhcLFAKWGmTcNCcIR/Ly4tiQRueZAXBCoUEODhATOjsa2NCtGiO3QoJcVR6PVrjsMiuF3U1OAcSmSkVkvad3w8jHh+xgyEbt7khkhKGi1CCB07xjDkI9aVUHDwvHm4OFNTp03DIyoUFSUMAo9EMDMa166l1/b2hq07CnHc5MlYSKmEkUoF23dUAllQkko9PYnQ94weIXiwwUqhoUajoxBtG2IxGYvFYWGuPlhhTWcnvsV53svr+zbs7Y2FaDtPTp40KS8Pb4llu7tJLm3nHIcfbaVSlQqE8MxgR68fXUIIHTgAStAiRKLhQgEBEAEJxo6HR04OQs+eQcxZCL9CgBAo8LyfH45rNBYLqGAhi2XHDlx41dWJifgj1NcXVjmSloaV8vJ4nuNAaO9ebgieH9lCYrHEAYYJDSUFRoVgkxkZeI3J1NQkk5HSyslxFDIaGQauBAUFQn5+PI9vb47z8aFCPG8wDBWVnZcvSYOHuZcDNTUgCvJKJQh9/+gzsoV0uoiIqcOAzTsLyeXQjp0JDZVIsJBMBg9NOOruDld6+xYLwUtcUhIUnMHg60uEurtd131ZmcWSnNzQ4O0APsvzo00IHldcN3CxGISmTsVC5HUOXq8JpDQfPcKPPjqdIIAShQhBgygrS05GiAqRlwm4rQl6PbRjjktJgT+AMwaDQsGyo03I9RdWuHlv2wYzo9FkEgQYwZheHsd0urAwkQhGK1fK5RAj8DzLKpX4ZnZzg8YLQrAlrdbLq6dHqWRZyIA4zmEHUSgsFo2GHQbkKezAazys4zgiJJXCuZErlJMz0Ym2NniBw8Ac2vXTp/jc8K9NINLZiVBGBjlXUECvM36Q58/RMHAUoawsMqJkZkIkKwuPHImNpVfIzCRr2tth7uk5UoX+TczmJ08QunOnsfHSpcOHGxvfvKmtvXcPoVu3Tp+G84GBcLx69ejR1tYTJx48iIurre3oQP8uf1nIag0KomNyDAqaMgWhmTP9/dXqWbNgpFbTHGD69KAgtdpqhRFC0dGQhXn4sKQEoStXSkpKS8+d27jx1KmEhL4+s3muHdDZtAmhmJi+vpMnd+6cO3fJkri4jx/nzBkTcs2CBWr14sVkNnv2lEHItkEEhKgI/Q1ZsN7fH4T8/aOjcbywcPv2FStyc69fLy4uLb17d8+egwe/fCkqOnIkIQGEqqpsttbWwMCEhKqqlpZ16yoqzp612caEfgQpGSoEP78qZLXSP0p6utVaV1dZeeNGcXFl5fv3VmtHh8124YLNtnv31q1dXf39FRXl5Wbz7dv19UVFq1fX11++3N8/JuQKUihqNRyxEN7qrzeFWbNgLRTchg1nzuTmWq379n34sGZNV9eWLXV1nz/fv3/+/LVrq1Zt3lxenp3d27t/f2/vwMD69QMD0BQ+fWpuHhP6M5jN6en5+YWFS+0ss/Pu3YsX6ektLfn5CGVnz7GTmwtNO9BOTExcXExMdrbZ3NxsP/9v8jtCXwG6wRbKbHqmOQAAAABJRU5ErkJggg==');
        }
        </style>`),
        SWAM.on("playerAdded", function(h) {
            h.sprites.name.style.fontFamily = "ModernDOS8x14",
            h._nameplateTextStyle = h.nameplateTextStyle,
            h.nameplateTextStyle = function() {
                let c = this._nameplateTextStyle();
                return c.fontFamily = "ModernDOS8x14",
                c
            }
        }),
        SWAM.on("gameRunning", function() {
            $("canvas").hide(),
            Graphics.ticker && Graphics.ticker.stop(),
            SWAM.resizeMap = function(h) {
                config.scalingFactor = h,
                Graphics.resizeRenderer(window.innerWidth, window.innerHeight),
                d(h)
            }
        }),
        SWAM.on("gamePrep", function() {
            $("body").css({
                background: "black url(\"https://image.ibb.co/gK5Gsd/world_background2.jpg\") no-repeat fixed center",
                "background-size": "auto"
            }),
            $("canvas").show(),
            Graphics.ticker && Graphics.ticker.start()
        })
    }
    injectTextures(d) {
        const A = ["map_forest.jpg", "map_rock.jpg", "map_sand.jpg", "map_sea.jpg", "aircraft.png", "items.png", "gui.png", "particles.png", "mountains.png", "flagsbig.png"];
        for (let f in d) {
            let D = getFileName(d[f]);
            -1 < $.inArray(D, A) && (d[f] = getFilePath("themes/PixelArt_8bits/" + D))
        }
    }
}
PixelArt_8Bits.themeName = "PixelArt 8-Bits",
PixelArt_8Bits.description = "With love from the 80's, celebrating 6 months of Airmash!",
PixelArt_8Bits.author = "Bombita";
class Russia2018WC extends VanillaTheme {
    constructor() {
        super();
        let d = $.getJSON;
        $.getJSON = function(S) {
            return "assets/map.json" === S ? void ($.getJSON = d) : d.apply(null, arguments)
        }
        ;
        const h = ["https://image.ibb.co/dzvO0J/2018_FIFA_World_Cup_Background_Wallpapers_33995.jpg", "https://image.ibb.co/mkui0J/2018_FIFA_World_Cup_HQ_Background_Wallpaper_34006.jpg", "https://image.ibb.co/cKQLVJ/2018_FIFA_World_Cup_Best_HD_Wallpaper_33996.jpg", "https://image.ibb.co/etF6LJ/shutterstock_466076552_1.jpg", "https://image.ibb.co/kUit0J/FIFA_World_Cup_2018_Players_Wallpaper1.jpg"];
        let c = Math.floor(Math.random() * h.length)
          , m = h[c];
        $("body").css({
            background: `black url("${m}") no-repeat fixed center`
        }),
        $("body").append(`<style>
        #logon .logo { background-image: url('https://image.ibb.co/etyFVJ/logo.png'); }
        #logon { background: url('https://image.ibb.co/kCrU9d/logon2.jpg') no-repeat center;/* opacity: 0.9;*/}

        </style>`)
    }
    injectTextures(d) {
        const A = {
            "map_forest.jpg": "https://image.ibb.co/chTbpd/map_forest.jpg",
            "map_rock.jpg": "https://image.ibb.co/jyJ47y/map_rock.jpg",
            "map_sand.jpg": "https://image.ibb.co/endbBd/map_sand.jpg",
            "map_rock_mask.jpg": "https://image.ibb.co/g7DnHJ/map_rock_mask.jpg",
            "map_sand_mask.jpg": "https://image.ibb.co/cDCWny/map_sand_mask.jpg",
            "items.png": "https://image.ibb.co/hOmeWd/items.png",
            "mountains.png": "https://image.ibb.co/mpL6LJ/mountains.png"
        };
        for (let f in d) {
            let D = getFileName(d[f]);
            "undefined" != typeof A[D] && (SWAM.debug ? d[f] = getFilePath("themes/Russia2018WC/" + D) : d[f] = A[D] ? A[D] : getFilePath("themes/Russia2018WC/" + D))
        }
    }
    setMobScale(d) {
        super.setMobScale(d),
        d.sprites.thruster.alpha = 0
    }
}
Russia2018WC.themeName = "World Cup Russia 2018",
Russia2018WC.description = "Vamos Argentina!",
Russia2018WC.author = "Bombita";
function getFileName(d) {
    return d = d.substring(d.lastIndexOf("/") + 1),
    -1 < d.indexOf("?") && (d = d.substr(0, d.indexOf("?"))),
    d
}
SWAM.registerExtension({
    name: "StarMash Themes",
    id: "StarMashThemes",
    author: "Bombita",
    version: SWAM_version,
    themes: [VanillaTheme, RealisticSprites, StarMash_1, StarMash_2, StPatricksDay2018, PixelArt_8Bits, Russia2018WC],
    dependencies: []
});
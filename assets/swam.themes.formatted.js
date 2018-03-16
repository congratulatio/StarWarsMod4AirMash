function BaseTheme() {}
BaseTheme.prototype = {
    loadGameModules: function() {
        loadGraphics_Default(),
        loadSounds_Default()
    },
    start: function() {},
    injectTextures: function() {},
    injectSounds: function() {},
    settingsProvider: null
},
window.HyperSpace = function() {
    this.sprite = null;
    let h = PIXI.Texture.fromImage("hyperspace");
    this.sprite = new PIXI.Sprite(h)
}
,
window.HyperSpace.prototype = {
    sprite: null,
    initialize: function() {
        let h = PIXI.Texture.fromImage("hyperspace");
        this.sprite = new PIXI.Sprite(h)
    },
    show: function() {
        function d() {
            for (name in m)
                "game" != name && (m[name].visible = m[name].prevVisible,
                delete m[name].prevVisible);
            game.graphics.layers.game.removeChild(c.sprite),
            c.sprite.filters = null,
            Graphics.renderbackground()
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
          , w = new PIXI.filters.AdjustmentFilter({
            gamma: 2,
            brightness: 2,
            alpha: 1
        })
          , f = function() {
            S.strength -= 0.03,
            1 < w.gamma && (w.gamma -= 0.02,
            w.brightness -= 0.02),
            0 < S.strength ? setTimeout(function() {
                f()
            }, 10) : (S.strength = 0,
            d())
        };
        this.sprite.filters = [S, w],
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
        let w = S;
        if (game.graphics.layers.map.children[0].alpha = 0.8,
        game.graphics.layers.map.children[0].visible = w.nebulas.blue,
        game.graphics.layers.map.children[2].alpha = 0.8,
        game.graphics.layers.map.children[2].visible = w.nebulas.green,
        game.graphics.layers.map.children[4].alpha = 0.8,
        game.graphics.layers.map.children[4].visible = w.nebulas.red,
        SWAM.planet && (SWAM.planet.visible = w.decorations.planets),
        SWAM.ShipContainer && (SWAM.ShipContainer.visible = w.decorations.ships),
        SWAM.asteroids1 && SWAM.asteroids2 && SWAM.asteroids3) {
            var f = [SWAM.asteroids1, SWAM.asteroids2, SWAM.asteroids3];
            for (let _ = 0; 3 > _; _++)
                f[_].visible = _ < w.asteroidLayers
        }
        Graphics.renderbackground()
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
    function h() {
        let R = $("#regenerateBackground");
        if (0 == R.length) {
            var P = getTemplate("#regenerateBackground");
            R = $(P),
            $("body").append(R);
            let A = $("#btnRegenerate", R);
            A.click(function() {
                SWAM.RandomizeBackground()
            })
        }
        R.slideDown(),
        h.timer && clearInterval(h.timer);
        let I = $(".timerIndicator", R);
        h.width = 100,
        I.css("width", "100%"),
        h.timer = setInterval(function() {
            h.width--,
            I.animate({
                width: h.width + "%"
            }, 90),
            0 == h.width && (clearInterval(h.timer),
            delete h.timer,
            R.slideUp())
        }, 100)
    }
    function d() {
        function R(X) {
            for (let z = 0; 3 > z; z++)
                j[z].visible = X
        }
        function P(X) {
            for (let z = 0; 3 > z; z++)
                j[z].renderable = X
        }
        let N = game.graphics.layers.map
          , j = [N.children[1], N.children[3], N.children[5]];
        N.visible = !1,
        function() {
            for (let X = 0; 3 > X; X++) {
                N.children[2 * X].mask = null;
                let z = Tools.randInt(0, j.length - 1);
                N.children[2 * X].mask = j[z],
                SWAM.debug && console.log(`${N.children[2 * X].layerName}: ${j[z].layerName}`)
            }
            P(!0)
        }(),
        function() {
            R(!0);
            let X = config.mapWidth * game.scale - game.screenX / game.scale
              , z = config.mapHeight * game.scale - game.screenY / game.scale;
            for (let Y = 0; 3 > Y; Y++)
                N.children[2 * Y + 1].position.set(Tools.randInt(-X, 0), Tools.randInt(-z, 0));
            Graphics.renderbackground(),
            R(!1)
        }(),
        N.visible = !0;
        let U = 1 == Tools.randInt(0, 1);
        SWAM.MoveBackgroundTiles = U,
        P(!1),
        R(U),
        SWAM.debug && console.log("movable nebulas: " + U)
    }
    function c() {
        for (let A in B) {
            let N = B[A];
            N.scale = N.scale || 1;
            let j = Graphics.renderer
              , U = PIXI.Texture.fromImage(A)
              , X = null;
            for (let z in N.useMask && (X = PIXI.Texture.fromImage(A + "_Mask")),
            N.items) {
                let Y = N.items[z]
                  , V = new PIXI.Texture(U,new PIXI.Rectangle(Y[0] * N.scale,Y[1] * N.scale,Y[2] * N.scale,Y[3] * N.scale))
                  , O = new PIXI.Sprite(V);
                O.scale.set(N.resultScale, N.resultScale);
                var R = null;
                if (N.useMask) {
                    var P = N.maskScale || 1
                      , I = new PIXI.Texture(X,new PIXI.Rectangle(Y[0] * N.scale / P,Y[1] * N.scale / P,Y[2] * N.scale / P,Y[3] * N.scale / P))
                      , R = new PIXI.Sprite(I);
                    R.scale.set(P, P),
                    O.addChild(R),
                    O.filters = [new PIXI.SpriteMaskFilter(R)],
                    R.position.set(-Y[0] * N.scale, -Y[1] * N.scale)
                }
                let H = PIXI.RenderTexture.create(O.width, O.height);
                j.render(O, H, !0),
                SWAM.Textures[z] = H
            }
        }
    }
    function m(R, P) {
        let I = SWAM.Textures[R]
          , A = new PIXI.Sprite(I);
        return "undefined" == typeof P && (P = {}),
        A.distanceFactor = P.distanceFactor ? P.distanceFactor : [1, 1],
        A.basePosition = P.basePosition ? P.basePosition : [0, 0],
        P.position && A.position.set(P.position[0], P.position[1]),
        P.anchor && A.anchor.set(P.anchor[0], P.anchor[1]),
        P.pivot && A.pivot.set(P.pivot[0], P.pivot[1]),
        P.scale && (Array.isArray(P.scale) ? A.scale.set(P.scale[0], P.scale[1]) : A.scale.set(P.scale)),
        P.rotation && (A.rotation = P.rotation),
        P.alpha && (A.alpha = P.alpha),
        P.blend && (A.blendMode = PIXI.BLEND_MODES[P.blend]),
        P.tint && (A.tint = P.tint),
        P.mask && (A.mask = P.mask),
        P.visible && (A.visible = P.visible),
        P.container && P.container.addChild(A),
        A
    }
    function S(R, P) {
        "undefined" == typeof P && (P = {});
        let I = m(R, P);
        return I.distanceFactor = P.distanceFactor ? P.distanceFactor : [1, 1],
        I.basePosition = P.basePosition ? P.basePosition : [0, 0],
        I.update = function() {
            let j = Graphics.getCamera()
              , U = j.x + (I.basePosition[0] - j.x) / I.distanceFactor[0]
              , X = j.y + (I.basePosition[1] - j.y) / I.distanceFactor[1];
            I.position.set(U, X)
        }
        ,
        I
    }
    function w() {
        function R(I) {
            I = I || {},
            I.count = I.count || 12,
            I.x = I.x || [-14000, -10000],
            I.y = I.y || [-1000, 1000],
            I.radius = I.radius || [5000, 13000],
            I.baseDistanceFactor = I.baseDistanceFactor || 8,
            I.textures = I.textures || B.ImperialShips.items;
            var A = I.count
              , N = [];
            for (let U in I.textures)
                N.push(U);
            let j = 2 * Math.PI / A;
            for (let U = 0, X = 0; U < A; U++,
            X += j) {
                let z = Tools.randInt(I.radius[0], I.radius[1])
                  , Y = Tools.randInt(I.x[0], I.x[1])
                  , V = Tools.randInt(I.y[0], I.y[1])
                  , O = _(Y, V, z, X);
                Y = O.x,
                V = O.y;
                let H = Tools.rand(0.2, 0.85)
                  , E = 0.5 * (1 / (H / 0.85)) + 0.5
                  , W = N[Tools.randInt(0, N.length - 1)]
                  , Z = S(W, {
                    distanceFactor: [I.baseDistanceFactor * E, I.baseDistanceFactor * E],
                    scale: [H, H],
                    basePosition: [Y, V],
                    position: [Y, V],
                    anchor: [0.5, 0.5]
                });
                Z.textureName = W,
                Z.angleUsed = X,
                SWAM.Ships.push(Z)
            }
        }
        var P = SWAM.ShipContainer;
        null == P ? (P = new PIXI.Container,
        P.scale.set(game.scale, game.scale),
        game.graphics.layers.map.addChildAt(P, D()),
        SWAM.ShipContainer = P) : (P.removeChildren(),
        SWAM.Ships = []),
        R({
            count: 12,
            x: [-17000, -13000]
        }),
        R({
            count: 16,
            x: [13000, 17000],
            radius: [5000, 10000],
            textures: B.RebelShips.items
        }),
        SWAM.Ships.sort(function(I, A) {
            return A.distanceFactor[0] - I.distanceFactor[0]
        });
        for (let I of SWAM.Ships)
            P.addChild(I)
    }
    function f() {
        let R = Graphics.getCamera()
          , P = R.x - game.halfScreenX / game.scale
          , I = R.y - game.halfScreenY / game.scale;
        return {
            x: P,
            y: I
        }
    }
    function _(R, P, I, A) {
        let N = I * Math.cos(A) + R
          , j = I * Math.sin(A) + P;
        return {
            x: N,
            y: j
        }
    }
    function D() {
        let R = game.graphics.layers.map
          , P = game.graphics.layers.doodads
          , I = 0;
        for (var A = 0; A < R.children.length; A++)
            R.children[A] == P && (I = A);
        return I
    }
    function k(R, P, I) {
        var A = Graphics.renderer.width
          , N = Graphics.renderer.height;
        let j = Textures.tile(R, A, N);
        return j.layerName = P,
        game.graphics.layers.map.addChildAt(j, D()),
        j.tileScale.set(I, I),
        j
    }
    function L(R=-1) {
        let I = [];
        for (let j in T)
            I.push(j);
        let A = Tools.randInt(0, I.length - 1);
        0 <= R && R < I.length && (A = R);
        let N = new PIXI.loaders.Loader;
        N.add(I[A], T[I[A]].texture),
        N.add(I[A] + "_Mask", T[I[A]].mask),
        N.load(function() {
            let j = C(Graphics.renderer, I[A]);
            j.layerName = "planet",
            j.scaleModifier = Tools.rand(0.1, 0.65),
            j.scale.set(0.5 * j.scaleModifier, 0.5 * j.scaleModifier);
            let U = 4 * j.scaleModifier;
            j.basePosition = [Tools.randInt(-25000, 7e4), Tools.randInt(-2e4 * U, 4e4 * U)],
            j.distanceFactor = [30, 30],
            SWAM.debug && (console.log("planet: " + I[A]),
            console.log("planet scale: " + j.scale.x.toFixed(2) + "    modifier: " + j.scaleModifier.toFixed(2)),
            console.log("planet pos: " + j.basePosition[0] + ", " + j.basePosition[1])),
            j.update = function(z, Y) {
                let V = (z + j.basePosition[0] * game.scale) / j.distanceFactor[0]
                  , O = (Y + j.basePosition[1] * game.scale) / j.distanceFactor[1];
                j.position.set(V, O)
            }
            ,
            null != SWAM.planet && game.graphics.layers.map.removeChild(SWAM.planet),
            SWAM.planet = j,
            game.graphics.layers.map.addChildAt(SWAM.planet, 6);
            let X = f();
            j.update(-X.x * game.scale, -X.y * game.scale),
            SWAM.loadSettings()
        })
    }
    function C(R, P) {
        var I = PIXI.Texture.fromImage(P)
          , A = new PIXI.Sprite(I)
          , N = PIXI.Sprite.fromImage(P + "_Mask");
        N.scale.set(1, 1);
        let j = PIXI.RenderTexture.create(2 * A.width, 2 * A.height)
          , U = new PIXI.Sprite(j);
        return A.addChild(N),
        A.filters = [new PIXI.SpriteMaskFilter(N)],
        A.scale.set(2, 2),
        A.position.set(0, 0),
        R.render(A, j),
        U.update = M,
        U
    }
    function M() {
        var I = SWAM.planet;
        let A = Graphics.getCamera()
          , N = game.halfScreenX / game.scale
          , j = game.halfScreenY / game.scale
          , U = A.x - N + 16384
          , X = game.screenX - I.width
          , z = config.mapWidth - game.screenX / game.scale
          , V = A.y + 8192
          , O = 0;
        if (5e3 > V)
            O = game.screenY;
        else {
            let H = config.mapHeight - j - 5e3;
            O = game.screenY - I.height * (V - 5e3) / H
        }
        I.position.set(U * X / z, O)
    }
    game.graphics.layers.shadows.visible = !1,
    game.graphics.layers.smoke.visible = !1,
    SWAM.ShipContainer = null,
    SWAM.Ships = [],
    SWAM.Planets = [],
    SWAM.Moons = [],
    SWAM.Stellar = [],
    SWAM.Textures = {};
    let B = {
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
      , T = {};
    for (let P, R = 2; 11 >= R; R++)
        P = ("0" + R).slice(-2),
        T["Planet" + P] = {
            texture: getFilePath("planets/planet" + P + ".jpg"),
            mask: getFilePath("planets/planet" + P + "-mask.jpg")
        };
    let F = new PIXI.loaders.Loader;
    F.add("hyperspace", getFilePath("hyperspace.jpg")),
    F.add("ImperialShips", getFilePath("ships/ships1.jpg")),
    F.add("ImperialShips_Mask", getFilePath("ships/ships1-mask-50.jpg")),
    F.add("RebelShips", getFilePath("ships/RebelShips1.jpg")),
    F.add("RebelShips_Mask", getFilePath("ships/RebelShips-mask.jpg")),
    F.load(()=>{
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
    SWAM.RandomizeBackground = function(R=-1) {
        h(),
        d(),
        L(R),
        w()
    }
    ,
    SWAM.debug && (SWAM.ShowRegenerateButton = h),
    SWAM.MoveBackgroundTiles = !0,
    SWAM.debug && (SWAM.createShips = w),
    SWAM.BackgroundFactor = 100,
    SWAM.resizeLayers = function(R, P) {
        let I = R / game.scale
          , A = P / game.scale;
        SWAM.planet,
        SWAM.ShipContainer && SWAM.ShipContainer.scale.set(game.scale, game.scale),
        SWAM.asteroids1 && (SWAM.asteroids1.width = R,
        SWAM.asteroids1.height = P),
        SWAM.asteroids2 && (SWAM.asteroids2.width = R,
        SWAM.asteroids2.height = P),
        SWAM.asteroids3 && (SWAM.asteroids3.width = R,
        SWAM.asteroids3.height = P)
    }
    ,
    SWAM.doUpdates = !0,
    SWAM.updateLayers = function(R, P) {
        if (SWAM.doUpdates && SWAM.Settings && (SWAM.Settings.themes.StarMash_2.decorations.planets && this.planet && this.planet.update(R, P),
        0 < SWAM.Settings.themes.StarMash_2.asteroidLayers && this.updateAsteroids(R, P),
        SWAM.Settings.themes.StarMash_2.decorations.ships && SWAM.ShipContainer && (SWAM.ShipContainer.position.set(R, P),
        SWAM.Ships)))
            for (let A in SWAM.Ships)
                SWAM.Ships[A].update(R, P)
    }
    ,
    SWAM.updateAsteroids = function(R, P) {
        SWAM.asteroids1 && SWAM.asteroids1.tilePosition.set(R / 2, P / 2),
        SWAM.asteroids2 && SWAM.asteroids2.tilePosition.set(R / 4, P / 4),
        SWAM.asteroids3 && SWAM.asteroids3.tilePosition.set(R / 6, P / 6)
    }
    ,
    SWAM.on("playerAdded", function(R) {
        overridePlayerMethods(R)
    }),
    SWAM.on("mobAdded", StarMash_2.mobAdded),
    SWAM.on("scoreboardUpdate", StarMash_2.onScoreboardUpdate)
}
,
StarMash_2.prototype.injectTextures = function(h, d, c, m) {
    for (let k in h) {
        var w = h[k];
        w = w.replace("assets/", ""),
        -1 < w.indexOf("?") && (w = w.substr(0, w.indexOf("?"))),
        h[k] = getFilePath(w)
    }
    var f = {
        map_forest_mask: getFilePath("map_forest_mask.jpg"),
        asteroids1: getFilePath("asteroids/asteroids1.png"),
        asteroids2: getFilePath("asteroids/asteroids2.png"),
        asteroids3: getFilePath("asteroids/asteroids3.png")
    };
    for (let k in f)
        h[k] = f[k];
    var _ = {
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
    for (let k in _)
        d[k] = _[k];
    var D = {
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
    for (let k in D)
        m[k] = D[k];
    m.missile.scale = [0.3, 0.3],
    m.missileFat.scale = [0.2, 0.3],
    m.missileSmall.scale = [20, 20]
}
,
StarMash_2.mobAdded = function(h, d, c) {
    let m = Mobs.get(h.id)
      , S = -1 < $.inArray(m.type, [1, 2, 3, 5, 6, 7]);
    if (S) {
        if (c) {
            var w = Players.get(c);
            if (0 == w.graphicsSet)
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
        let w = ""
          , f = ""
          , _ = S.sprites.sprite;
        1 == S.type && (0 == S.graphicsSet ? (f = Textures.get("raptor"),
        w = Textures.get("sith_Infiltrator")) : (f = Textures.get("raptor_2"),
        w = Textures.get("black_Xwing")),
        m[S.id] ? _.texture != w && (_.texture = w) : _.texture != f && (_.texture = f))
    }
    )
}
;
function overridePlayerMethods(h) {
    h.setGraphicsSet = function() {
        this.graphicsSet = 2 == game.gameType ? this.team - 1 : this.id == game.myID && -1 != game.chosenGraphicsSet ? game.chosenGraphicsSet : Tools.randInt(0, 1),
        this.id == game.myID && (game.myGraphicsSet = this.graphicsSet)
    }
    ,
    h.setupThrusterColor = function() {
        var d = new PIXI.filters.ColorMatrixFilter
          , c = new PIXI.filters.ColorMatrixFilter;
        0 == this.graphicsSet ? d.hue(-20) : (c.saturate(1, !0),
        d.hue(165)),
        this.sprites.thruster && (this.sprites.thruster.filters = [c, d]),
        this.sprites.thruster1 && (this.sprites.thruster1.filters = [c, d]),
        this.sprites.thruster2 && (this.sprites.thruster2.filters = [c, d])
    }
    ,
    h.setupGraphics = function(d) {
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
        (this.reel || d || (this.setupNameplate(),
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
    h.reteam = function(d) {
        var c = this.team;
        this.team = d,
        this.sprites.name.style = new PIXI.TextStyle(this.nameplateTextStyle()),
        UI.changeMinimapTeam(this.id, this.team),
        c != this.team && (this.destroy(!1),
        this.setupGraphics(!0),
        this.visibilityUpdate(!0))
    }
    ,
    h.updateGraphics = function() {
        var c = Tools.oscillator(.025, 1e3, this.randomness) * this.scale
          , m = 1.5 * this.state.thrustLevel
          , S = this.rot
          , w = Graphics.shadowCoords(this.pos);
        if (Graphics.transform(this.sprites.sprite, this.pos.x, this.pos.y, S, c * this.state.baseScale, c * this.state.baseScale),
        Graphics.transform(this.sprites.shadow, w.x, w.y, S, this.state.baseScale * (2.4 / config.shadowScaling) * this.scale, this.state.baseScale * (2.4 / config.shadowScaling) * this.scale),
        this.powerupActive) {
            var f = .35 * (0 == this.state.powerupFadeState ? 2 * (1 - this.state.powerupFade) + 1 : 1 - this.state.powerupFade) * Tools.oscillator(.075, 100, this.randomness)
              , _ = .75 * (0 == this.state.powerupFadeState ? Tools.clamp(2 * this.state.powerupFade, 0, 1) : Tools.clamp(1 - 1.3 * this.state.powerupFade, 0, 1)) * this.alpha;
            Graphics.transform(this.sprites.powerup, this.pos.x, this.pos.y - 80, 0, f, f, _),
            Graphics.transform(this.sprites.powerupCircle, this.pos.x, this.pos.y - 80, this.state.powerupAngle, 1.35 * f, 1.35 * f, _)
        }
        var D = Tools.oscillator(.1, .5, this.randomness)
          , k = .01 > Math.abs(this.state.thrustLevel) ? 0 : this.state.thrustLevel / 2 + (0 < this.state.thrustLevel ? .5 : -.5)
          , L = Tools.clamp(2 * Math.abs(this.state.thrustLevel) - .1, 0, 1);
        if (0 == this.graphicsSet)
            switch (this.type) {
            case 1:
                Graphics.transform(this.sprites.thruster, this.pos.x + Math.sin(-S) * (5 * c), this.pos.y + Math.cos(-S) * (5 * c), S + (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * k * this.scale, .5 * D * k * this.scale, L),
                this.sprites.thruster.alpha = 0.05,
                Graphics.transform(this.sprites.thrusterGlow, this.pos.x + Math.sin(-S - .5 * this.state.thrustDir) * (40 * c), this.pos.y + Math.cos(-S - .5 * this.state.thrustDir) * (40 * c), null, 1.5 * m * this.scale, 1 * m * this.scale, .3 * this.state.thrustLevel);
                break;
            case 2:
                0 > this.state.thrustLevel && (D *= .7),
                Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-S - .5) * (15 * c), this.pos.y + Math.cos(-S - .5) * (15 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * D * k * this.scale, .6 * D * k * this.scale, L),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(.5 - S) * (15 * c), this.pos.y + Math.cos(.5 - S) * (15 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * D * k * this.scale, .6 * D * k * this.scale, L),
                Graphics.transform(this.sprites.thruster1Shadow, w.x + Math.sin(-S - .5) * (10 * c) / config.shadowScaling, w.y + Math.cos(-S - .5) * (10 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .5 * D * k * this.scale * (4 / config.shadowScaling), .6 * D * k * this.scale * (4 / config.shadowScaling), L / 2.5),
                Graphics.transform(this.sprites.thruster2Shadow, w.x + Math.sin(.5 - S) * (10 * c) / config.shadowScaling, w.y + Math.cos(.5 - S) * (10 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .5 * D * k * this.scale * (4 / config.shadowScaling), .6 * D * k * this.scale * (4 / config.shadowScaling), L / 2.5),
                Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-S - .3) * (50 * c), this.pos.y + Math.cos(-S - .3) * (50 * c), null, 2.5 * this.scale, 1.5 * this.scale, .3 * this.state.thrustLevel),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.3 - S) * (50 * c), this.pos.y + Math.cos(.3 - S) * (50 * c), null, 2.5 * this.scale, 1.5 * this.scale, .3 * this.state.thrustLevel);
                break;
            case 3:
                Graphics.transform(this.sprites.rotor, this.pos.x, this.pos.y, this.state.thrustDir, 2 * (c * this.state.baseScale), 2 * (c * this.state.baseScale), .8),
                Graphics.transform(this.sprites.rotorShadow, w.x, w.y, this.state.thrustDir, 2 * (this.state.baseScale * (2.4 / config.shadowScaling) * this.scale), 2 * (this.state.baseScale * (2.4 / config.shadowScaling) * this.scale));
                break;
            case 4:
                0 > this.state.thrustLevel && (D *= .7),
                Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-S - .25) * (5 * c), this.pos.y + Math.cos(-S - .25) * (5 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * k * this.scale, .5 * D * k * this.scale, L),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(.25 - S) * (5 * c), this.pos.y + Math.cos(.25 - S) * (5 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * k * this.scale, .5 * D * k * this.scale, L),
                Graphics.transform(this.sprites.thruster1Shadow, w.x + Math.sin(-S - .15) * (28 * c) / config.shadowScaling, w.y + Math.cos(-S - .15) * (28 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * k * this.scale * (4 / config.shadowScaling), .5 * D * k * this.scale * (4 / config.shadowScaling), L / 2.5),
                Graphics.transform(this.sprites.thruster2Shadow, w.x + Math.sin(.15 - S) * (28 * c) / config.shadowScaling, w.y + Math.cos(.15 - S) * (28 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * k * this.scale * (4 / config.shadowScaling), .5 * D * k * this.scale * (4 / config.shadowScaling), L / 2.5),
                Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-S - .2) * (45 * c), this.pos.y + Math.cos(-S - .2) * (45 * c), null, 2.5 * this.scale, 1.5 * this.scale, .25 * this.state.thrustLevel),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.2 - S) * (45 * c), this.pos.y + Math.cos(.2 - S) * (45 * c), null, 2.5 * this.scale, 1.5 * this.scale, .25 * this.state.thrustLevel);
                break;
            case 5:
                0 > this.state.thrustLevel && (D *= .7),
                Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-S - .35) * (20 * c), this.pos.y + Math.cos(-S - .35) * (20 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * k * this.scale, .4 * D * k * this.scale, L * this.alpha),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(.35 - S) * (20 * c), this.pos.y + Math.cos(.35 - S) * (20 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * k * this.scale, .4 * D * k * this.scale, L * this.alpha),
                Graphics.transform(this.sprites.thruster1Shadow, w.x + Math.sin(-S - .35) * (20 * c) / config.shadowScaling, w.y + Math.cos(-S - .35) * (20 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * D * k * this.scale * (4 / config.shadowScaling), .4 * D * k * this.scale * (4 / config.shadowScaling), L * this.alpha / 2.5),
                Graphics.transform(this.sprites.thruster2Shadow, w.x + Math.sin(.35 - S) * (20 * c) / config.shadowScaling, w.y + Math.cos(.35 - S) * (20 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * D * k * this.scale * (4 / config.shadowScaling), .4 * D * k * this.scale * (4 / config.shadowScaling), L * this.alpha / 2.5),
                Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-S - .2 - 0 * this.state.thrustDir) * (35 * c), this.pos.y + Math.cos(-S - .2 - 0 * this.state.thrustDir) * (35 * c), null, 2.5 * this.scale, 1.5 * this.scale, .2 * this.state.thrustLevel * this.alpha),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.2 - S - 0 * this.state.thrustDir) * (35 * c), this.pos.y + Math.cos(.2 - S - 0 * this.state.thrustDir) * (35 * c), null, 2.5 * this.scale, 1.5 * this.scale, .2 * this.state.thrustLevel * this.alpha);
            }
        else
            switch (this.type) {
            case 1:
                Graphics.transform(this.sprites.thruster, this.pos.x + Math.sin(-S) * (20 * c), this.pos.y + Math.cos(-S) * (20 * c), S + (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * k * this.scale, .5 * D * k * this.scale, L),
                Graphics.transform(this.sprites.thrusterShadow, w.x + Math.sin(-S) * (20 * c) / config.shadowScaling, w.y + Math.cos(-S) * (20 * c) / config.shadowScaling, S + (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * D * k * this.scale * (4 / config.shadowScaling), .5 * D * k * this.scale * (4 / config.shadowScaling), L / 2.5),
                Graphics.transform(this.sprites.thrusterGlow, this.pos.x + Math.sin(-S - .5 * this.state.thrustDir) * (40 * c), this.pos.y + Math.cos(-S - .5 * this.state.thrustDir) * (40 * c), null, 1.5 * m * this.scale, 1 * m * this.scale, .3 * this.state.thrustLevel),
                this.sprites.thruster.scale.x = this.sprites.thruster.scale.y = 0.25;
                break;
            case 2:
                0 > this.state.thrustLevel && (D *= .7),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(0.8 - S) * (50 * c), this.pos.y + Math.cos(.8 - S) * (50 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * D * k * this.scale, .6 * D * k * this.scale, L),
                Graphics.transform(this.sprites.thruster2Shadow, w.x + Math.sin(.5 - S) * (32 * c) / config.shadowScaling, w.y + Math.cos(.5 - S) * (32 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .5 * D * k * this.scale * (4 / config.shadowScaling), .6 * D * k * this.scale * (4 / config.shadowScaling), L / 2.5),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.3 - S) * (50 * c), this.pos.y + Math.cos(.3 - S) * (50 * c), null, 2.5 * this.scale, 1.5 * this.scale, .3 * this.state.thrustLevel),
                this.sprites.thruster1.visible = !1,
                this.sprites.thruster1Glow.visible = !1,
                this.sprites.thruster1Shadow.visible = !1;
                break;
            case 3:
                Graphics.transform(this.sprites.rotor, this.pos.x, this.pos.y, this.state.thrustDir, 2 * (c * this.state.baseScale), 2 * (c * this.state.baseScale), .8),
                Graphics.transform(this.sprites.rotorShadow, w.x, w.y, this.state.thrustDir, 2 * (this.state.baseScale * (2.4 / config.shadowScaling) * this.scale), 2 * (this.state.baseScale * (2.4 / config.shadowScaling) * this.scale));
                break;
            case 4:
                0 > this.state.thrustLevel && (D *= .7),
                Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-S - 1) * (20 * c), this.pos.y + Math.cos(-S - 1) * (20 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * k * this.scale, .5 * D * k * this.scale, L),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(1 - S) * (20 * c), this.pos.y + Math.cos(1 - S) * (20 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * k * this.scale, .5 * D * k * this.scale, L),
                Graphics.transform(this.sprites.thruster1Shadow, w.x + Math.sin(-S - .15) * (28 * c) / config.shadowScaling, w.y + Math.cos(-S - .15) * (28 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * k * this.scale * (4 / config.shadowScaling), .5 * D * k * this.scale * (4 / config.shadowScaling), L / 2.5),
                Graphics.transform(this.sprites.thruster2Shadow, w.x + Math.sin(.15 - S) * (28 * c) / config.shadowScaling, w.y + Math.cos(.15 - S) * (28 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * k * this.scale * (4 / config.shadowScaling), .5 * D * k * this.scale * (4 / config.shadowScaling), L / 2.5),
                Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-S - .2) * (45 * c), this.pos.y + Math.cos(-S - .2) * (45 * c), null, 2.5 * this.scale, 1.5 * this.scale, .25 * this.state.thrustLevel),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.2 - S) * (45 * c), this.pos.y + Math.cos(.2 - S) * (45 * c), null, 2.5 * this.scale, 1.5 * this.scale, .25 * this.state.thrustLevel),
                this.sprites.thruster1.scale.x = this.sprites.thruster1.scale.y = 0.35,
                this.sprites.thruster2.scale.x = this.sprites.thruster2.scale.y = 0.35;
                break;
            case 5:
                0 > this.state.thrustLevel && (D *= .7),
                Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-S - 0.3) * (20 * c), this.pos.y + Math.cos(-S - .35) * (20 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * k * this.scale, .4 * D * k * this.scale, L * this.alpha),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(0.3 - S) * (20 * c), this.pos.y + Math.cos(.35 - S) * (20 * c), S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * D * k * this.scale, .4 * D * k * this.scale, L * this.alpha),
                Graphics.transform(this.sprites.thruster1Shadow, w.x + Math.sin(-S - .35) * (20 * c) / config.shadowScaling, w.y + Math.cos(-S - .35) * (20 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * D * k * this.scale * (4 / config.shadowScaling), .4 * D * k * this.scale * (4 / config.shadowScaling), L * this.alpha / 2.5),
                Graphics.transform(this.sprites.thruster2Shadow, w.x + Math.sin(.35 - S) * (20 * c) / config.shadowScaling, w.y + Math.cos(.35 - S) * (20 * c) / config.shadowScaling, S + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * D * k * this.scale * (4 / config.shadowScaling), .4 * D * k * this.scale * (4 / config.shadowScaling), L * this.alpha / 2.5),
                Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-S - .2 - 0 * this.state.thrustDir) * (35 * c), this.pos.y + Math.cos(-S - .2 - 0 * this.state.thrustDir) * (35 * c), null, 2.5 * this.scale, 1.5 * this.scale, .2 * this.state.thrustLevel * this.alpha),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.2 - S - 0 * this.state.thrustDir) * (35 * c), this.pos.y + Math.cos(.2 - S - 0 * this.state.thrustDir) * (35 * c), null, 2.5 * this.scale, 1.5 * this.scale, .2 * this.state.thrustLevel * this.alpha);
            }
        this.updateNameplate(),
        this.state.bubble && this.updateBubble(),
        config.debug.collisions && this.col && (this.col.position.set(this.pos.x, this.pos.y),
        this.col.rotation = this.rot)
    }
    ,
    h.resetGraphics = function() {
        try {
            this.destroy(!1),
            this.setupGraphics(!0),
            this.visibilityUpdate(!0)
        } catch (d) {}
    }
    ,
    h.resetGraphics(),
    h.me() && UI.aircraftSelected(h.type)
}
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
        let w = S;
        game.graphics.layers.map.children[0].alpha = 0.8,
        game.graphics.layers.map.children[0].visible = w.nebulas.blue,
        game.graphics.layers.map.children[2].alpha = 0.8,
        game.graphics.layers.map.children[2].visible = w.nebulas.green,
        game.graphics.layers.map.children[4].alpha = 0.8,
        game.graphics.layers.map.children[4].visible = w.nebulas.red,
        Graphics.renderbackground()
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
    SWAM.on("playerAdded", function(h) {
        overridePlayerMethods(h)
    }),
    SWAM.on("mobAdded", StarMash_2.mobAdded),
    SWAM.on("scoreboardUpdate", StarMash_2.onScoreboardUpdate),
    SWAM.Theme.settingsProvider.apply(SWAM.Settings)
}
,
StarMash_1.prototype.getFilePath = StarMash_2.prototype.getFilePath = function(h) {
    return "/assets/" + h + "?" + SWAM_version
}
,
StarMash_1.prototype.injectTextures = StarMash_2.prototype.injectTextures,
StarMash_1.prototype.loadGameModules = StarMash_2.prototype.loadGameModules;
function VanillaTheme() {
    let c = new SettingsProvider({
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
        }
    },function(S) {
        let w = S
          , f = game.graphics.layers.sea
          , _ = f.children[1]
          , D = game.graphics.layers.map
          , k = D.children[0]
          , L = D.children[1]
          , G = D.children[3]
          , C = D.children[6];
        if (w && w.map) {
            function M() {
                C = D.children[6],
                w.map.polygons ? (C.visible = !0,
                D.mask = C) : (D.mask = null,
                C.visible = !1)
            }
            if (_.visible = w.map.sea,
            k.visible = w.map.forest,
            f.visible = w.map.forest && !w.map.polygons ? !1 : !0,
            L.visible = w.map.sand,
            G.visible = w.map.rock,
            C)
                M();
            else {
                let B = setInterval(function() {
                    game.graphics.layers.map.children[6] && (clearInterval(B),
                    M())
                }, 500)
            }
        }
        w && w.layers && (game.graphics.layers.shadows.visible = w.layers.shadows,
        game.graphics.layers.smoke.visible = w.layers.smoke)
    }
    );
    c.root = "",
    c.title = "Mod Settings";
    let m = c.addSection("Background");
    m.addBoolean("map.sea", "Sea depth"),
    m.addBoolean("map.forest", "Forest"),
    m.addBoolean("map.sand", "Sand"),
    m.addBoolean("map.rock", "Rocks"),
    m.addBoolean("map.polygons", "Continents"),
    m.addBoolean("layers.shadows", "Shadows"),
    m.addBoolean("layers.smoke", "Missile's Smoke"),
    this.settingsProvider = c
}
VanillaTheme.themeName = "Vanilla Theme",
VanillaTheme.author = "Bombita",
VanillaTheme.version = SWAM_version,
VanillaTheme.prototype.start = function() {
    var h = this;
    SWAM.on("playerAdded", function(d) {
        h.tintPlayer(d);
        let c = d.setupGraphics;
        d.setupGraphics = function(S) {
            c.call(d, S),
            h.tintPlayer(d)
        }
        ;
        let m = d.reteam;
        d.reteam = function(S) {
            m.call(d, S),
            h.tintPlayer(d)
        }
    }),
    SWAM.on("mobAdded", function(d, c, m) {
        let S = Mobs.get(d.id)
          , w = -1 < $.inArray(S.type, [1, 2, 3, 5, 6, 7]);
        if (w) {
            if (2 == game.gameType)
                if (m) {
                    var f = Players.get(m);
                    1 == f.team ? (S.sprites.sprite.tint = 5592575,
                    S.sprites.thruster.tint = 5592575) : (S.sprites.sprite.tint = 16733525,
                    S.sprites.thruster.tint = 16733525)
                } else
                    1 == Players.getMe().team ? (S.sprites.sprite.tint = 16733525,
                    S.sprites.thruster.tint = 16733525) : (S.sprites.sprite.tint = 5592575,
                    S.sprites.thruster.tint = 5592575);
            S.sprites.smokeGlow.alpha = 0,
            2 == S.type ? S.sprites.sprite.scale.set(.3, .4) : 3 == S.type ? S.sprites.sprite.scale.set(.56, .4) : S.sprites.sprite.scale.set(.3, .3)
        }
    }),
    SWAM.Theme.settingsProvider.apply(SWAM.Settings)
}
,
VanillaTheme.prototype.tintPlayer = function(h) {
    h.sprites.sprite.tint = 1 == h.team ? 10539263 : 2 == h.team ? 16756912 : 16777215
}
,
VanillaTheme.prototype.getFilePath = function(h) {
    return "/assets/" + h + "?" + SWAM_version
}
,
VanillaTheme.prototype.injectTextures = function() {}
,
VanillaTheme.prototype.injectSounds = function() {}
,
VanillaTheme.prototype.loadGameModules = function() {
    loadGraphics_Default(),
    loadSounds_Default()
}
,
SWAM.registerExtension({
    name: "StarMash Themes",
    id: "StarMashThemes",
    author: "Bombita",
    version: SWAM_version,
    themes: [VanillaTheme, StarMash_1, StarMash_2],
    dependencies: []
});
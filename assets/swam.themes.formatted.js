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
        let F = $("#regenerateBackground");
        if (0 == F.length) {
            var R = getTemplate("#regenerateBackground");
            F = $(R),
            $("body").append(F);
            let A = $("#btnRegenerate", F);
            A.click(function() {
                SWAM.RandomizeBackground()
            })
        }
        F.slideDown(),
        h.timer && clearInterval(h.timer);
        let I = $(".timerIndicator", F);
        h.width = 100,
        I.css("width", "100%"),
        h.timer = setInterval(function() {
            h.width--,
            I.animate({
                width: h.width + "%"
            }, 90),
            0 == h.width && (clearInterval(h.timer),
            delete h.timer,
            F.slideUp())
        }, 100)
    }
    function d() {
        function F(X) {
            for (let O = 0; 3 > O; O++)
                j[O].visible = X
        }
        function R(X) {
            for (let O = 0; 3 > O; O++)
                j[O].renderable = X
        }
        let N = game.graphics.layers.map
          , j = [N.children[1], N.children[3], N.children[5]];
        N.visible = !1,
        function() {
            for (let X = 0; 3 > X; X++) {
                N.children[2 * X].mask = null;
                let O = Tools.randInt(0, j.length - 1);
                N.children[2 * X].mask = j[O],
                SWAM.debug && console.log(`${N.children[2 * X].layerName}: ${j[O].layerName}`)
            }
            R(!0)
        }(),
        function() {
            F(!0);
            let X = config.mapWidth * game.scale - game.screenX / game.scale
              , O = config.mapHeight * game.scale - game.screenY / game.scale;
            for (let z = 0; 3 > z; z++)
                N.children[2 * z + 1].position.set(Tools.randInt(-X, 0), Tools.randInt(-O, 0));
            Graphics.renderbackground(),
            F(!1)
        }(),
        N.visible = !0;
        let U = 1 == Tools.randInt(0, 1);
        SWAM.MoveBackgroundTiles = U,
        R(!1),
        F(U),
        SWAM.debug && console.log("movable nebulas: " + U)
    }
    function c() {
        for (let A in B) {
            let N = B[A];
            N.scale = N.scale || 1;
            let j = Graphics.renderer
              , U = PIXI.Texture.fromImage(A)
              , X = null;
            for (let O in N.useMask && (X = PIXI.Texture.fromImage(A + "_Mask")),
            N.items) {
                let z = N.items[O]
                  , Y = new PIXI.Texture(U,new PIXI.Rectangle(z[0] * N.scale,z[1] * N.scale,z[2] * N.scale,z[3] * N.scale))
                  , V = new PIXI.Sprite(Y);
                V.scale.set(N.resultScale, N.resultScale);
                var F = null;
                if (N.useMask) {
                    var R = N.maskScale || 1
                      , I = new PIXI.Texture(X,new PIXI.Rectangle(z[0] * N.scale / R,z[1] * N.scale / R,z[2] * N.scale / R,z[3] * N.scale / R))
                      , F = new PIXI.Sprite(I);
                    F.scale.set(R, R),
                    V.addChild(F),
                    V.filters = [new PIXI.SpriteMaskFilter(F)],
                    F.position.set(-z[0] * N.scale, -z[1] * N.scale)
                }
                let H = PIXI.RenderTexture.create(V.width, V.height);
                j.render(V, H, !0),
                SWAM.Textures[O] = H
            }
        }
    }
    function m(F, R) {
        let I = SWAM.Textures[F]
          , A = new PIXI.Sprite(I);
        return "undefined" == typeof R && (R = {}),
        A.distanceFactor = R.distanceFactor ? R.distanceFactor : [1, 1],
        A.basePosition = R.basePosition ? R.basePosition : [0, 0],
        R.position && A.position.set(R.position[0], R.position[1]),
        R.anchor && A.anchor.set(R.anchor[0], R.anchor[1]),
        R.pivot && A.pivot.set(R.pivot[0], R.pivot[1]),
        R.scale && (Array.isArray(R.scale) ? A.scale.set(R.scale[0], R.scale[1]) : A.scale.set(R.scale)),
        R.rotation && (A.rotation = R.rotation),
        R.alpha && (A.alpha = R.alpha),
        R.blend && (A.blendMode = PIXI.BLEND_MODES[R.blend]),
        R.tint && (A.tint = R.tint),
        R.mask && (A.mask = R.mask),
        R.visible && (A.visible = R.visible),
        R.container && R.container.addChild(A),
        A
    }
    function S(F, R) {
        "undefined" == typeof R && (R = {});
        let I = m(F, R);
        return I.distanceFactor = R.distanceFactor ? R.distanceFactor : [1, 1],
        I.basePosition = R.basePosition ? R.basePosition : [0, 0],
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
        function F(I) {
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
                let O = Tools.randInt(I.radius[0], I.radius[1])
                  , z = Tools.randInt(I.x[0], I.x[1])
                  , Y = Tools.randInt(I.y[0], I.y[1])
                  , V = _(z, Y, O, X);
                z = V.x,
                Y = V.y;
                let H = Tools.rand(0.2, 0.85)
                  , W = 0.5 * (1 / (H / 0.85)) + 0.5
                  , E = N[Tools.randInt(0, N.length - 1)]
                  , Z = S(E, {
                    distanceFactor: [I.baseDistanceFactor * W, I.baseDistanceFactor * W],
                    scale: [H, H],
                    basePosition: [z, Y],
                    position: [z, Y],
                    anchor: [0.5, 0.5]
                });
                Z.textureName = E,
                Z.angleUsed = X,
                SWAM.Ships.push(Z)
            }
        }
        var R = SWAM.ShipContainer;
        null == R ? (R = new PIXI.Container,
        R.scale.set(game.scale, game.scale),
        game.graphics.layers.map.addChildAt(R, D()),
        SWAM.ShipContainer = R) : (R.removeChildren(),
        SWAM.Ships = []),
        F({
            count: 12,
            x: [-17000, -13000]
        }),
        F({
            count: 16,
            x: [13000, 17000],
            radius: [5000, 10000],
            textures: B.RebelShips.items
        }),
        SWAM.Ships.sort(function(I, A) {
            return A.distanceFactor[0] - I.distanceFactor[0]
        });
        for (let I of SWAM.Ships)
            R.addChild(I)
    }
    function f() {
        let F = Graphics.getCamera()
          , R = F.x - game.halfScreenX / game.scale
          , I = F.y - game.halfScreenY / game.scale;
        return {
            x: R,
            y: I
        }
    }
    function _(F, R, I, A) {
        let N = I * Math.cos(A) + F
          , j = I * Math.sin(A) + R;
        return {
            x: N,
            y: j
        }
    }
    function D() {
        let F = game.graphics.layers.map
          , R = game.graphics.layers.doodads
          , I = 0;
        for (var A = 0; A < F.children.length; A++)
            F.children[A] == R && (I = A);
        return I
    }
    function k(F, R, I) {
        var A = Graphics.renderer.width
          , N = Graphics.renderer.height;
        let j = Textures.tile(F, A, N);
        return j.layerName = R,
        game.graphics.layers.map.addChildAt(j, D()),
        j.tileScale.set(I, I),
        j
    }
    function L(F=-1) {
        let I = [];
        for (let j in T)
            I.push(j);
        let A = Tools.randInt(0, I.length - 1);
        0 <= F && F < I.length && (A = F);
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
            j.update = function(O, z) {
                let Y = (O + j.basePosition[0] * game.scale) / j.distanceFactor[0]
                  , V = (z + j.basePosition[1] * game.scale) / j.distanceFactor[1];
                j.position.set(Y, V)
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
    function C(F, R) {
        var I = PIXI.Texture.fromImage(R)
          , A = new PIXI.Sprite(I)
          , N = PIXI.Sprite.fromImage(R + "_Mask");
        N.scale.set(1, 1);
        let j = PIXI.RenderTexture.create(2 * A.width, 2 * A.height)
          , U = new PIXI.Sprite(j);
        return A.addChild(N),
        A.filters = [new PIXI.SpriteMaskFilter(N)],
        A.scale.set(2, 2),
        A.position.set(0, 0),
        F.render(A, j),
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
          , O = config.mapWidth - game.screenX / game.scale
          , Y = A.y + 8192
          , V = 0;
        if (5e3 > Y)
            V = game.screenY;
        else {
            let H = config.mapHeight - j - 5e3;
            V = game.screenY - I.height * (Y - 5e3) / H
        }
        I.position.set(U * X / O, V)
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
    for (let R, F = 2; 11 >= F; F++)
        R = ("0" + F).slice(-2),
        T["Planet" + R] = {
            texture: getFilePath("planets/planet" + R + ".jpg"),
            mask: getFilePath("planets/planet" + R + "-mask.jpg")
        };
    let P = new PIXI.loaders.Loader;
    P.add("hyperspace", getFilePath("hyperspace.jpg")),
    P.add("ImperialShips", getFilePath("ships/ships1.jpg")),
    P.add("ImperialShips_Mask", getFilePath("ships/ships1-mask-50.jpg")),
    P.add("RebelShips", getFilePath("ships/RebelShips1.jpg")),
    P.add("RebelShips_Mask", getFilePath("ships/RebelShips-mask.jpg")),
    P.load(()=>{
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
    SWAM.RandomizeBackground = function(F=-1) {
        h(),
        d(),
        L(F),
        w()
    }
    ,
    SWAM.debug && (SWAM.ShowRegenerateButton = h),
    SWAM.MoveBackgroundTiles = !0,
    SWAM.debug && (SWAM.createShips = w),
    SWAM.BackgroundFactor = 100,
    SWAM.resizeLayers = function(F, R) {
        let I = F / game.scale
          , A = R / game.scale;
        SWAM.planet,
        SWAM.ShipContainer && SWAM.ShipContainer.scale.set(game.scale, game.scale),
        SWAM.asteroids1 && (SWAM.asteroids1.width = F,
        SWAM.asteroids1.height = R),
        SWAM.asteroids2 && (SWAM.asteroids2.width = F,
        SWAM.asteroids2.height = R),
        SWAM.asteroids3 && (SWAM.asteroids3.width = F,
        SWAM.asteroids3.height = R)
    }
    ,
    SWAM.doUpdates = !0,
    SWAM.updateLayers = function(F, R) {
        if (SWAM.doUpdates && SWAM.Settings && (SWAM.Settings.themes.StarMash_2.decorations.planets && this.planet && this.planet.update(F, R),
        0 < SWAM.Settings.themes.StarMash_2.asteroidLayers && this.updateAsteroids(F, R),
        SWAM.Settings.themes.StarMash_2.decorations.ships && SWAM.ShipContainer && (SWAM.ShipContainer.position.set(F, R),
        SWAM.Ships)))
            for (let A in SWAM.Ships)
                SWAM.Ships[A].update(F, R)
    }
    ,
    SWAM.updateAsteroids = function(F, R) {
        SWAM.asteroids1 && SWAM.asteroids1.tilePosition.set(F / 2, R / 2),
        SWAM.asteroids2 && SWAM.asteroids2.tilePosition.set(F / 4, R / 4),
        SWAM.asteroids3 && SWAM.asteroids3.tilePosition.set(F / 6, R / 6)
    }
    ,
    SWAM.on("playerAdded", function(F) {
        overridePlayerMethods(F)
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
    let d = this
      , m = new SettingsProvider({
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
    },function(w) {
        d.settings = w;
        let f = w
          , _ = game.graphics.layers.sea
          , D = _.children[1]
          , k = game.graphics.layers.map
          , L = k.children[0]
          , G = k.children[1]
          , C = k.children[3]
          , M = k.children[6];
        if (f && f.map) {
            function B() {
                M = k.children[6],
                f.map.polygons ? (M.visible = !0,
                k.mask = M) : (k.mask = null,
                M.visible = !1)
            }
            if (D.visible = f.map.sea,
            L.visible = f.map.forest,
            _.visible = f.map.forest && !f.map.polygons ? !1 : !0,
            G.visible = f.map.sand,
            C.visible = f.map.rock,
            M)
                B();
            else {
                let T = setInterval(function() {
                    game.graphics.layers.map.children[6] && (clearInterval(T),
                    B())
                }, 500)
            }
        }
        f && f.layers && (game.graphics.layers.shadows.visible = f.layers.shadows,
        game.graphics.layers.smoke.visible = f.layers.smoke),
        forEachPlayer(B=>{
            d.tintPlayer(B)
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
VanillaTheme.themeName = "Vanilla Theme",
VanillaTheme.author = "Bombita",
VanillaTheme.version = SWAM_version,
VanillaTheme.prototype.start = function() {
    var h = this;
    SWAM.on("playerAdded", function(d) {
        "function" == typeof window.Glow && Glow(d),
        h.tintPlayer(d);
        let c = d.setupGraphics;
        d.setupGraphics = function(S) {
            c.call(d, S),
            "function" == typeof window.Glow && Glow(d),
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
        if (h.settings.gameplay.colorMissiles) {
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
        }
    }),
    SWAM.Theme.settingsProvider.apply(SWAM.Settings)
}
,
VanillaTheme.prototype.tintPlayer = function(h) {
    h.sprites.sprite.tint = this.settings && this.settings.gameplay.colorPlayers ? 1 == h.team ? 10539263 : 2 == h.team ? 16756912 : 16777215 : 16777215
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
;
class StPatricksDay2018 extends VanillaTheme {
    constructor() {
        super(),
        $("#logon").css("backgroundColor", "rgba(6, 51, 16, 0.75)")
    }
    injectTextures(h) {
        const w = ["map_forest.jpg", "map_rock.jpg", "map_sand.jpg", "map_sea.jpg", "aircraft.png"];
        for (let f in h) {
            let _ = getFileName(h[f]);
            -1 < $.inArray(_, w) && (h[f] = "//molesmalo.github.io/StarWarsMod4AirMash/assets/themes/StPatricksDay2018/" + getFileName(h[f]))
        }
    }
}
StPatricksDay2018.themeName = "St. Patrick's Day 2018 Theme",
StPatricksDay2018.description = "A lucky theme for AirMash!!",
StPatricksDay2018.author = "Bombita";
function getFileName(h) {
    return h = h.substring(h.lastIndexOf("/") + 1),
    -1 < h.indexOf("?") && (h = h.substr(0, h.indexOf("?"))),
    h
}
SWAM.registerExtension({
    name: "StarMash Themes",
    id: "StarMashThemes",
    author: "Bombita",
    version: SWAM_version,
    themes: [VanillaTheme, StarMash_1, StarMash_2, StPatricksDay2018],
    dependencies: []
});

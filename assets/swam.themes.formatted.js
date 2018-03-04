function BaseTheme() {}
BaseTheme.prototype = {
    loadGameModules: function() {
        loadGraphics_Default(),
        loadSounds_Default()
    },
    start: function() {},
    injectTextures: function() {},
    injectSounds: function() {},
    getDefaultSettings: function() {},
    getSettings: function() {},
    applySettings: function() {},
    setSettingsWindow: function() {}
};
function StarMash_2() {
    SWAM.replaceCSS(getFilePath("style.css"))
}
StarMash_2.prototype.start = function() {
    function h() {
        let I = $("#regenerateBackground");
        if (0 == I.length) {
            var P = getTemplate("#regenerateBackground");
            I = $(P),
            $("body").append(I);
            let B = $("#btnRegenerate", I);
            B.click(function() {
                SWAM.RandomizeBackground()
            })
        }
        I.slideDown(),
        h.timer && clearInterval(h.timer);
        let V = $(".timerIndicator", I);
        h.width = 100,
        V.css("width", "100%"),
        h.timer = setInterval(function() {
            h.width--,
            V.animate({
                width: h.width + "%"
            }, 90),
            0 == h.width && (clearInterval(h.timer),
            delete h.timer,
            I.slideUp())
        }, 100)
    }
    function c() {
        function I(U) {
            for (let X = 0; 3 > X; X++)
                N[X].visible = U
        }
        function P(U) {
            for (let X = 0; 3 > X; X++)
                N[X].renderable = U
        }
        let A = game.graphics.layers.map
          , N = [A.children[1], A.children[3], A.children[5]];
        A.visible = !1,
        function() {
            for (let U = 0; 3 > U; U++) {
                A.children[2 * U].mask = null;
                let X = Tools.randInt(0, N.length - 1);
                A.children[2 * U].mask = N[X],
                SWAM.debug && console.log(`${A.children[2 * U].layerName}: ${N[X].layerName}`)
            }
            P(!0)
        }(),
        function() {
            I(!0);
            let U = config.mapWidth * game.scale - game.screenX / game.scale
              , X = config.mapHeight * game.scale - game.screenY / game.scale;
            for (let W = 0; 3 > W; W++)
                A.children[2 * W + 1].position.set(Tools.randInt(-U, 0), Tools.randInt(-X, 0));
            Graphics.renderbackground(),
            I(!1)
        }(),
        A.visible = !0;
        let j = 1 == Tools.randInt(0, 1);
        SWAM.MoveBackgroundTiles = j,
        P(!1),
        I(j),
        SWAM.debug && console.log("movable nebulas: " + j)
    }
    function d() {
        for (let B in T) {
            let A = T[B];
            A.scale = A.scale || 1;
            let N = Graphics.renderer
              , j = PIXI.Texture.fromImage(B)
              , U = null;
            for (let X in A.useMask && (U = PIXI.Texture.fromImage(B + "_Mask")),
            A.items) {
                let W = A.items[X]
                  , Y = new PIXI.Texture(j,new PIXI.Rectangle(W[0] * A.scale,W[1] * A.scale,W[2] * A.scale,W[3] * A.scale))
                  , z = new PIXI.Sprite(Y);
                z.scale.set(A.resultScale, A.resultScale);
                var I = null;
                if (A.useMask) {
                    var P = A.maskScale || 1
                      , V = new PIXI.Texture(U,new PIXI.Rectangle(W[0] * A.scale / P,W[1] * A.scale / P,W[2] * A.scale / P,W[3] * A.scale / P))
                      , I = new PIXI.Sprite(V);
                    I.scale.set(P, P),
                    z.addChild(I),
                    z.filters = [new PIXI.SpriteMaskFilter(I)],
                    I.position.set(-W[0] * A.scale, -W[1] * A.scale)
                }
                let O = PIXI.RenderTexture.create(z.width, z.height);
                N.render(z, O, !0),
                SWAM.Textures[X] = O
            }
        }
    }
    function S(I, P) {
        let V = SWAM.Textures[I]
          , B = new PIXI.Sprite(V);
        return "undefined" == typeof P && (P = {}),
        B.distanceFactor = P.distanceFactor ? P.distanceFactor : [1, 1],
        B.basePosition = P.basePosition ? P.basePosition : [0, 0],
        P.position && B.position.set(P.position[0], P.position[1]),
        P.anchor && B.anchor.set(P.anchor[0], P.anchor[1]),
        P.pivot && B.pivot.set(P.pivot[0], P.pivot[1]),
        P.scale && (Array.isArray(P.scale) ? B.scale.set(P.scale[0], P.scale[1]) : B.scale.set(P.scale)),
        P.rotation && (B.rotation = P.rotation),
        P.alpha && (B.alpha = P.alpha),
        P.blend && (B.blendMode = PIXI.BLEND_MODES[P.blend]),
        P.tint && (B.tint = P.tint),
        P.mask && (B.mask = P.mask),
        P.visible && (B.visible = P.visible),
        P.container && P.container.addChild(B),
        B
    }
    function m(I, P) {
        "undefined" == typeof P && (P = {});
        let V = S(I, P);
        return V.distanceFactor = P.distanceFactor ? P.distanceFactor : [1, 1],
        V.basePosition = P.basePosition ? P.basePosition : [0, 0],
        V.update = function() {
            let N = Graphics.getCamera()
              , j = N.x + (V.basePosition[0] - N.x) / V.distanceFactor[0]
              , U = N.y + (V.basePosition[1] - N.y) / V.distanceFactor[1];
            V.position.set(j, U)
        }
        ,
        V
    }
    function w() {
        function I(V) {
            V = V || {},
            V.count = V.count || 12,
            V.x = V.x || [-14000, -10000],
            V.y = V.y || [-1000, 1000],
            V.radius = V.radius || [5000, 13000],
            V.baseDistanceFactor = V.baseDistanceFactor || 8,
            V.textures = V.textures || T.ImperialShips.items;
            var B = V.count
              , A = [];
            for (let j in V.textures)
                A.push(j);
            let N = 2 * Math.PI / B;
            for (let j = 0, U = 0; j < B; j++,
            U += N) {
                let X = Tools.randInt(V.radius[0], V.radius[1])
                  , W = Tools.randInt(V.x[0], V.x[1])
                  , Y = Tools.randInt(V.y[0], V.y[1])
                  , z = f(W, Y, X, U);
                W = z.x,
                Y = z.y;
                let O = Tools.rand(0.2, 0.85)
                  , E = 0.5 * (1 / (O / 0.85)) + 0.5
                  , H = A[Tools.randInt(0, A.length - 1)]
                  , K = m(H, {
                    distanceFactor: [V.baseDistanceFactor * E, V.baseDistanceFactor * E],
                    scale: [O, O],
                    basePosition: [W, Y],
                    position: [W, Y],
                    anchor: [0.5, 0.5]
                });
                K.textureName = H,
                K.angleUsed = U,
                SWAM.Ships.push(K)
            }
        }
        var P = SWAM.ShipContainer;
        null == P ? (P = new PIXI.Container,
        P.scale.set(game.scale, game.scale),
        game.graphics.layers.map.addChildAt(P, k()),
        SWAM.ShipContainer = P) : (P.removeChildren(),
        SWAM.Ships = []),
        I({
            count: 12,
            x: [-17000, -13000]
        }),
        I({
            count: 16,
            x: [13000, 17000],
            radius: [5000, 10000],
            textures: T.RebelShips.items
        }),
        SWAM.Ships.sort(function(V, B) {
            return B.distanceFactor[0] - V.distanceFactor[0]
        });
        for (let V of SWAM.Ships)
            P.addChild(V)
    }
    function _() {
        let I = Graphics.getCamera()
          , P = I.x - game.halfScreenX / game.scale
          , V = I.y - game.halfScreenY / game.scale;
        return {
            x: P,
            y: V
        }
    }
    function f(I, P, V, B) {
        let A = V * Math.cos(B) + I
          , N = V * Math.sin(B) + P;
        return {
            x: A,
            y: N
        }
    }
    function k() {
        let I = game.graphics.layers.map
          , P = game.graphics.layers.doodads
          , V = 0;
        for (var B = 0; B < I.children.length; B++)
            I.children[B] == P && (V = B);
        return V
    }
    function M(I, P, V) {
        var B = Graphics.renderer.width
          , A = Graphics.renderer.height;
        let N = Textures.tile(I, B, A);
        return N.layerName = P,
        game.graphics.layers.map.addChildAt(N, k()),
        N.tileScale.set(V, V),
        N
    }
    function D(I=-1) {
        let V = [];
        for (let N in F)
            V.push(N);
        let B = Tools.randInt(0, V.length - 1);
        0 <= I && I < V.length && (B = I);
        let A = new PIXI.loaders.Loader;
        A.add(V[B], F[V[B]].texture),
        A.add(V[B] + "_Mask", F[V[B]].mask),
        A.load(function() {
            let N = C(Graphics.renderer, V[B]);
            N.layerName = "planet",
            N.scaleModifier = Tools.rand(0.1, 0.65),
            N.scale.set(0.5 * N.scaleModifier, 0.5 * N.scaleModifier);
            let j = 4 * N.scaleModifier;
            N.basePosition = [Tools.randInt(-25000, 7e4), Tools.randInt(-2e4 * j, 4e4 * j)],
            N.distanceFactor = [30, 30],
            SWAM.debug && (console.log("planet: " + V[B]),
            console.log("planet scale: " + N.scale.x.toFixed(2) + "    modifier: " + N.scaleModifier.toFixed(2)),
            console.log("planet pos: " + N.basePosition[0] + ", " + N.basePosition[1])),
            N.update = function(X, W) {
                let Y = (X + N.basePosition[0] * game.scale) / N.distanceFactor[0]
                  , z = (W + N.basePosition[1] * game.scale) / N.distanceFactor[1];
                N.position.set(Y, z)
            }
            ,
            null != SWAM.planet && game.graphics.layers.map.removeChild(SWAM.planet),
            SWAM.planet = N,
            game.graphics.layers.map.addChildAt(SWAM.planet, 6);
            let U = _();
            N.update(-U.x * game.scale, -U.y * game.scale),
            SWAM.loadSettings()
        })
    }
    function C(I, P) {
        var V = PIXI.Texture.fromImage(P)
          , B = new PIXI.Sprite(V)
          , A = PIXI.Sprite.fromImage(P + "_Mask");
        A.scale.set(1, 1);
        let N = PIXI.RenderTexture.create(2 * B.width, 2 * B.height)
          , j = new PIXI.Sprite(N);
        return B.addChild(A),
        B.filters = [new PIXI.SpriteMaskFilter(A)],
        B.scale.set(2, 2),
        B.position.set(0, 0),
        I.render(B, N),
        j.update = G,
        j
    }
    function G() {
        var V = SWAM.planet;
        let B = Graphics.getCamera()
          , A = game.halfScreenX / game.scale
          , N = game.halfScreenY / game.scale
          , j = B.x - A + 16384
          , U = game.screenX - V.width
          , X = config.mapWidth - game.screenX / game.scale
          , Y = B.y + 8192
          , z = 0;
        if (5e3 > Y)
            z = game.screenY;
        else {
            let O = config.mapHeight - N - 5e3;
            z = game.screenY - V.height * (Y - 5e3) / O
        }
        V.position.set(j * U / X, z)
    }
    game.graphics.layers.shadows.visible = !1,
    game.graphics.layers.smoke.visible = !1,
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
      , F = {};
    for (let P, I = 2; 11 >= I; I++)
        P = ("0" + I).slice(-2),
        F["Planet" + P] = {
            texture: getFilePath("planets/planet" + P + ".jpg"),
            mask: getFilePath("planets/planet" + P + "-mask.jpg")
        };
    let R = new PIXI.loaders.Loader;
    R.add("hyperspace", getFilePath("hyperspace.jpg")),
    R.add("ImperialShips", getFilePath("ships/ships1.jpg")),
    R.add("ImperialShips_Mask", getFilePath("ships/ships1-mask-50.jpg")),
    R.add("RebelShips", getFilePath("ships/RebelShips1.jpg")),
    R.add("RebelShips_Mask", getFilePath("ships/RebelShips-mask.jpg")),
    R.load(()=>{
        d(),
        SWAM.RandomizeBackground(),
        SWAM.asteroids3 = M("asteroids1", "asteroids3", game.scale / 3),
        SWAM.asteroids2 = M("asteroids2", "asteroids2", game.scale),
        SWAM.asteroids1 = M("asteroids1", "asteroids1", game.scale),
        SWAM.hyperSpace = new HyperSpace,
        SWAM.loadSettings(),
        Graphics.setCamera(0, 0)
    }
    ),
    SWAM.RandomizeBackground = function(I=-1) {
        h(),
        c(),
        D(I),
        w()
    }
    ,
    SWAM.debug && (SWAM.ShowRegenerateButton = h),
    SWAM.MoveBackgroundTiles = !0,
    SWAM.debug && (SWAM.createShips = w),
    SWAM.BackgroundFactor = 100,
    SWAM.resizeLayers = function(I, P) {
        let V = I / game.scale
          , B = P / game.scale;
        SWAM.planet,
        SWAM.ShipContainer && SWAM.ShipContainer.scale.set(game.scale, game.scale),
        SWAM.asteroids1 && (SWAM.asteroids1.width = I,
        SWAM.asteroids1.height = P),
        SWAM.asteroids2 && (SWAM.asteroids2.width = I,
        SWAM.asteroids2.height = P),
        SWAM.asteroids3 && (SWAM.asteroids3.width = I,
        SWAM.asteroids3.height = P)
    }
    ,
    SWAM.doUpdates = !0,
    SWAM.updateLayers = function(I, P) {
        if (SWAM.doUpdates && SWAM.Settings && (SWAM.Settings.StarMash_2.decorations.planets && this.planet && this.planet.update(I, P),
        0 < SWAM.Settings.StarMash_2.asteroidLayers && this.updateAsteroids(I, P),
        SWAM.Settings.StarMash_2.decorations.ships && SWAM.ShipContainer && (SWAM.ShipContainer.position.set(I, P),
        SWAM.Ships)))
            for (let B in SWAM.Ships)
                SWAM.Ships[B].update(I, P)
    }
    ,
    SWAM.updateAsteroids = function(I, P) {
        SWAM.asteroids1 && SWAM.asteroids1.tilePosition.set(I / 2, P / 2),
        SWAM.asteroids2 && SWAM.asteroids2.tilePosition.set(I / 4, P / 4),
        SWAM.asteroids3 && SWAM.asteroids3.tilePosition.set(I / 6, P / 6)
    }
    ,
    SWAM.on("playerAdded", function(I, P) {
        overridePlayerMethods(P)
    }),
    SWAM.on("mobAdded", StarMash_2.mobAdded),
    SWAM.on("scoreboardUpdate", StarMash_2.onScoreboardUpdate)
}
,
StarMash_2.prototype.getDefaultSettings = function() {
    return {
        theme: "StarMash_2",
        StarMash_2: {
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
        }
    }
}
,
StarMash_2.prototype.getSettings = function(h, c) {
    function d(S, m) {
        return "undefined" == typeof S ? m : S
    }
    null != c && c.StarMash_2 && (h.StarMash_2.nebulas && (h.StarMash_2.nebulas.blue = d(c.StarMash_2.nebulas.blue, !0),
    h.StarMash_2.nebulas.green = d(c.StarMash_2.nebulas.green, !0),
    h.StarMash_2.nebulas.red = d(c.StarMash_2.nebulas.red, !0)),
    h.StarMash_2.asteroidLayers = d(c.StarMash_2.asteroidLayers, 3),
    h.StarMash_2.decorations && (h.StarMash_2.decorations.stellar = d(c.StarMash_2.decorations.stellar, !0),
    h.StarMash_2.decorations.planets = d(c.StarMash_2.decorations.planets, !0),
    h.StarMash_2.decorations.moons = d(c.StarMash_2.decorations.moons, !0),
    h.StarMash_2.decorations.ships = d(c.StarMash_2.decorations.ships, !0)))
}
,
StarMash_2.prototype.applySettings = function(h) {
    let c = h.StarMash_2;
    game.graphics.layers.map.children[0].alpha = 0.8,
    game.graphics.layers.map.children[0].visible = c.nebulas.blue,
    game.graphics.layers.map.children[2].alpha = 0.8,
    game.graphics.layers.map.children[2].visible = c.nebulas.green,
    game.graphics.layers.map.children[4].alpha = 0.8,
    game.graphics.layers.map.children[4].visible = c.nebulas.red,
    SWAM.planet && (SWAM.planet.visible = c.decorations.planets),
    SWAM.ShipContainer && (SWAM.ShipContainer.visible = c.decorations.ships);
    var d = [SWAM.asteroids1, SWAM.asteroids2, SWAM.asteroids3];
    for (let S = 0; 3 > S; S++)
        d[S].visible = S < c.asteroidLayers;
    Graphics.renderbackground()
}
,
StarMash_2.prototype.setSettingsWindow = function(h, c) {
    let S = $(getTemplate("#StarMash2_Settings")).html();
    return $(".sectionsContainer", c).append(S),
    $(".selAsteroidLayers", c).change(m=>{
        h.StarMash_2.asteroidLayers = $(m.target).val()
    }
    ),
    $(".chkNebula", c).click(m=>{
        let w = $(m.target).data("layer");
        h.StarMash_2.nebulas[w] = m.target.checked
    }
    ),
    $(".chkDecorations", c).click(m=>{
        let w = $(m.target).data("layer");
        h.StarMash_2.decorations[w] = m.target.checked
    }
    ),
    {
        setValues: function(m) {
            h = m;
            var w = $(".chkNebula", c);
            w[0].checked = h.StarMash_2.nebulas.blue,
            w[1].checked = h.StarMash_2.nebulas.green,
            w[2].checked = h.StarMash_2.nebulas.red,
            $(".selAsteroidLayers", c).val(h.StarMash_2.asteroidLayers);
            var _ = $(".chkDecorations", c);
            _[0].checked = h.StarMash_2.decorations.stellar,
            _[1].checked = h.StarMash_2.decorations.planets,
            _[2].checked = h.StarMash_2.decorations.moons,
            _[3].checked = h.StarMash_2.decorations.ships
        },
        accept: function() {},
        cancel: function() {}
    }
}
,
StarMash_2.prototype.injectTextures = function(h, c, d, S) {
    for (let M in h) {
        var w = h[M];
        w = w.replace("assets/", ""),
        -1 < w.indexOf("?") && (w = w.substr(0, w.indexOf("?"))),
        h[M] = getFilePath(w)
    }
    var _ = {
        map_forest_mask: getFilePath("map_forest_mask.jpg"),
        asteroids1: getFilePath("asteroids/asteroids1.png"),
        asteroids2: getFilePath("asteroids/asteroids2.png"),
        asteroids3: getFilePath("asteroids/asteroids3.png")
    };
    for (let M in _)
        h[M] = _[M];
    var f = {
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
    for (let M in f)
        c[M] = f[M];
    var k = {
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
    for (let M in k)
        S[M] = k[M];
    S.missile.scale = [0.3, 0.3],
    S.missileFat.scale = [0.2, 0.3],
    S.missileSmall.scale = [20, 20]
}
,
StarMash_2.mobAdded = function(h, c, d, S) {
    let m = Mobs.get(c.id)
      , w = -1 < $.inArray(m.type, [1, 2, 3, 5, 6, 7]);
    if (w) {
        if (S) {
            var _ = Players.get(S);
            if (0 == _.graphicsSet)
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
    forEachPlayer(w=>{
        let _ = ""
          , f = ""
          , k = w.sprites.sprite;
        1 == w.type && (0 == w.graphicsSet ? (f = Textures.get("raptor"),
        _ = Textures.get("sith_Infiltrator")) : (f = Textures.get("raptor_2"),
        _ = Textures.get("black_Xwing")),
        m[w.id] ? k.texture != _ && (k.texture = _) : k.texture != f && (k.texture = f))
    }
    )
}
;
function overridePlayerMethods(h) {
    h.setGraphicsSet = function() {
        var c = 0;
        2 == game.gameType ? c = this.team - 1 : this.id == game.myID && -1 != game.chosenGraphicsSet ? (c = game.chosenGraphicsSet,
        game.myGraphicsSet = c) : c = Tools.randInt(0, 1),
        this.graphicsSet = c,
        this.id == game.myID && (game.myGraphicsSet = c)
    }
    ,
    h.setupThrusterColor = function() {
        var c = new PIXI.filters.ColorMatrixFilter
          , d = new PIXI.filters.ColorMatrixFilter;
        0 == this.graphicsSet ? c.hue(-20) : (d.saturate(1, !0),
        c.hue(165)),
        this.sprites.thruster && (this.sprites.thruster.filters = [d, c]),
        this.sprites.thruster1 && (this.sprites.thruster1.filters = [d, c]),
        this.sprites.thruster2 && (this.sprites.thruster2.filters = [d, c])
    }
    ,
    h.setupGraphics = function(c) {
        this.setGraphicsSet();
        var d = 0 == this.graphicsSet ? "" : "_2"
          , S = null;
        switch (this.me() && (S = {
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
            this.sprites.sprite = Textures.init("shipRaptor" + d, S),
            this.sprites.shadow = Textures.init("shipRaptorShadow" + d, {
                scale: this.state.baseScale * (2.4 / config.shadowScaling)
            }),
            this.sprites.thruster = Textures.init("shipRaptorThruster" + d),
            this.sprites.thrusterGlow = Textures.init("thrusterGlowSmall"),
            this.sprites.thrusterShadow = Textures.init("thrusterShadow");
            break;
        case 2:
            this.state.baseScale = .35,
            this.state.nameplateDist = 60,
            this.sprites.sprite = Textures.init("shipSpirit" + d, S),
            this.sprites.shadow = Textures.init("shipSpiritShadow" + d, {
                scale: this.state.baseScale * (2.4 / config.shadowScaling)
            }),
            this.sprites.thruster1 = Textures.init("shipRaptorThruster" + d),
            this.sprites.thruster2 = Textures.init("shipRaptorThruster" + d),
            this.sprites.thruster1Glow = Textures.init("thrusterGlowSmall"),
            this.sprites.thruster2Glow = Textures.init("thrusterGlowSmall"),
            this.sprites.thruster1Shadow = Textures.init("thrusterShadow"),
            this.sprites.thruster2Shadow = Textures.init("thrusterShadow");
            break;
        case 3:
            this.state.baseScale = .25,
            this.state.nameplateDist = 60,
            this.sprites.sprite = Textures.init("shipComanche" + d, S),
            this.sprites.rotor = Textures.init("shipComancheRotor" + d, S),
            this.sprites.shadow = Textures.init("shipComancheShadow" + d, {
                scale: this.state.baseScale * (2.4 / config.shadowScaling)
            }),
            this.sprites.rotorShadow = Textures.init("shipComancheRotorShadow" + d, {
                scale: 2 * this.state.baseScale * (2.4 / config.shadowScaling)
            });
            break;
        case 4:
            this.state.baseScale = .28,
            this.state.nameplateDist = 60,
            this.sprites.sprite = Textures.init("shipTornado" + d, S),
            this.sprites.shadow = Textures.init("shipTornadoShadow" + d, {
                scale: this.state.baseScale * (2.4 / config.shadowScaling)
            }),
            this.sprites.thruster1 = Textures.init("shipRaptorThruster" + d),
            this.sprites.thruster2 = Textures.init("shipRaptorThruster" + d),
            this.sprites.thruster1Glow = Textures.init("thrusterGlowSmall"),
            this.sprites.thruster2Glow = Textures.init("thrusterGlowSmall"),
            this.sprites.thruster1Shadow = Textures.init("thrusterShadow"),
            this.sprites.thruster2Shadow = Textures.init("thrusterShadow");
            break;
        case 5:
            this.state.baseScale = .28,
            this.state.nameplateDist = 60,
            this.sprites.sprite = Textures.init("shipProwler" + d, S),
            this.sprites.shadow = Textures.init("shipProwlerShadow" + d, {
                scale: this.state.baseScale * (2.4 / config.shadowScaling)
            }),
            this.sprites.thruster1 = Textures.init("shipRaptorThruster" + d),
            this.sprites.thruster2 = Textures.init("shipRaptorThruster" + d),
            this.sprites.thruster1Glow = Textures.init("thrusterGlowSmall"),
            this.sprites.thruster2Glow = Textures.init("thrusterGlowSmall"),
            this.sprites.thruster1Shadow = Textures.init("thrusterShadow"),
            this.sprites.thruster2Shadow = Textures.init("thrusterShadow");
        }
        if ("function" == typeof window.Glow && Glow(this),
        this.setupThrusterColor(),
        (this.reel || c || (this.setupNameplate(),
        this.setupChatBubbles(),
        null != this.level && this.setupLevelPlate()),
        config.debug.collisions)) {
            this.col = new PIXI.Graphics;
            for (var m of config.ships[this.type].collisions)
                this.col.beginFill(16777215, .2),
                this.col.drawCircle(m[0], m[1], m[2]),
                this.col.endFill();
            game.graphics.layers.explosions.addChild(this.col)
        }
    }
    ,
    h.reteam = function(c) {
        var d = this.team;
        this.team = c,
        this.sprites.name.style = new PIXI.TextStyle(this.nameplateTextStyle()),
        UI.changeMinimapTeam(this.id, this.team),
        d != this.team && (this.destroy(!1),
        this.setupGraphics(!0),
        this.visibilityUpdate(!0))
    }
    ,
    h.updateGraphics = function() {
        var d = Tools.oscillator(.025, 1e3, this.randomness) * this.scale
          , S = 1.5 * this.state.thrustLevel
          , m = this.rot
          , w = Graphics.shadowCoords(this.pos);
        if (Graphics.transform(this.sprites.sprite, this.pos.x, this.pos.y, m, d * this.state.baseScale, d * this.state.baseScale),
        Graphics.transform(this.sprites.shadow, w.x, w.y, m, this.state.baseScale * (2.4 / config.shadowScaling) * this.scale, this.state.baseScale * (2.4 / config.shadowScaling) * this.scale),
        this.powerupActive) {
            var _ = .35 * (0 == this.state.powerupFadeState ? 2 * (1 - this.state.powerupFade) + 1 : 1 - this.state.powerupFade) * Tools.oscillator(.075, 100, this.randomness)
              , f = .75 * (0 == this.state.powerupFadeState ? Tools.clamp(2 * this.state.powerupFade, 0, 1) : Tools.clamp(1 - 1.3 * this.state.powerupFade, 0, 1)) * this.alpha;
            Graphics.transform(this.sprites.powerup, this.pos.x, this.pos.y - 80, 0, _, _, f),
            Graphics.transform(this.sprites.powerupCircle, this.pos.x, this.pos.y - 80, this.state.powerupAngle, 1.35 * _, 1.35 * _, f)
        }
        var k = Tools.oscillator(.1, .5, this.randomness)
          , M = .01 > Math.abs(this.state.thrustLevel) ? 0 : this.state.thrustLevel / 2 + (0 < this.state.thrustLevel ? .5 : -.5)
          , D = Tools.clamp(2 * Math.abs(this.state.thrustLevel) - .1, 0, 1);
        if (0 == this.graphicsSet)
            switch (this.type) {
            case 1:
                Graphics.transform(this.sprites.thruster, this.pos.x + Math.sin(-m) * (5 * d), this.pos.y + Math.cos(-m) * (5 * d), m + (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * k * M * this.scale, .5 * k * M * this.scale, D),
                this.sprites.thruster.alpha = 0.05,
                Graphics.transform(this.sprites.thrusterGlow, this.pos.x + Math.sin(-m - .5 * this.state.thrustDir) * (40 * d), this.pos.y + Math.cos(-m - .5 * this.state.thrustDir) * (40 * d), null, 1.5 * S * this.scale, 1 * S * this.scale, .3 * this.state.thrustLevel);
                break;
            case 2:
                0 > this.state.thrustLevel && (k *= .7),
                Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-m - .5) * (15 * d), this.pos.y + Math.cos(-m - .5) * (15 * d), m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * k * M * this.scale, .6 * k * M * this.scale, D),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(.5 - m) * (15 * d), this.pos.y + Math.cos(.5 - m) * (15 * d), m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * k * M * this.scale, .6 * k * M * this.scale, D),
                Graphics.transform(this.sprites.thruster1Shadow, w.x + Math.sin(-m - .5) * (10 * d) / config.shadowScaling, w.y + Math.cos(-m - .5) * (10 * d) / config.shadowScaling, m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .5 * k * M * this.scale * (4 / config.shadowScaling), .6 * k * M * this.scale * (4 / config.shadowScaling), D / 2.5),
                Graphics.transform(this.sprites.thruster2Shadow, w.x + Math.sin(.5 - m) * (10 * d) / config.shadowScaling, w.y + Math.cos(.5 - m) * (10 * d) / config.shadowScaling, m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .5 * k * M * this.scale * (4 / config.shadowScaling), .6 * k * M * this.scale * (4 / config.shadowScaling), D / 2.5),
                Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-m - .3) * (50 * d), this.pos.y + Math.cos(-m - .3) * (50 * d), null, 2.5 * this.scale, 1.5 * this.scale, .3 * this.state.thrustLevel),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.3 - m) * (50 * d), this.pos.y + Math.cos(.3 - m) * (50 * d), null, 2.5 * this.scale, 1.5 * this.scale, .3 * this.state.thrustLevel);
                break;
            case 3:
                Graphics.transform(this.sprites.rotor, this.pos.x, this.pos.y, this.state.thrustDir, 2 * (d * this.state.baseScale), 2 * (d * this.state.baseScale), .8),
                Graphics.transform(this.sprites.rotorShadow, w.x, w.y, this.state.thrustDir, 2 * (this.state.baseScale * (2.4 / config.shadowScaling) * this.scale), 2 * (this.state.baseScale * (2.4 / config.shadowScaling) * this.scale));
                break;
            case 4:
                0 > this.state.thrustLevel && (k *= .7),
                Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-m - .25) * (5 * d), this.pos.y + Math.cos(-m - .25) * (5 * d), m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * k * M * this.scale, .5 * k * M * this.scale, D),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(.25 - m) * (5 * d), this.pos.y + Math.cos(.25 - m) * (5 * d), m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * k * M * this.scale, .5 * k * M * this.scale, D),
                Graphics.transform(this.sprites.thruster1Shadow, w.x + Math.sin(-m - .15) * (28 * d) / config.shadowScaling, w.y + Math.cos(-m - .15) * (28 * d) / config.shadowScaling, m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * k * M * this.scale * (4 / config.shadowScaling), .5 * k * M * this.scale * (4 / config.shadowScaling), D / 2.5),
                Graphics.transform(this.sprites.thruster2Shadow, w.x + Math.sin(.15 - m) * (28 * d) / config.shadowScaling, w.y + Math.cos(.15 - m) * (28 * d) / config.shadowScaling, m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * k * M * this.scale * (4 / config.shadowScaling), .5 * k * M * this.scale * (4 / config.shadowScaling), D / 2.5),
                Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-m - .2) * (45 * d), this.pos.y + Math.cos(-m - .2) * (45 * d), null, 2.5 * this.scale, 1.5 * this.scale, .25 * this.state.thrustLevel),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.2 - m) * (45 * d), this.pos.y + Math.cos(.2 - m) * (45 * d), null, 2.5 * this.scale, 1.5 * this.scale, .25 * this.state.thrustLevel);
                break;
            case 5:
                0 > this.state.thrustLevel && (k *= .7),
                Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-m - .35) * (20 * d), this.pos.y + Math.cos(-m - .35) * (20 * d), m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * k * M * this.scale, .4 * k * M * this.scale, D * this.alpha),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(.35 - m) * (20 * d), this.pos.y + Math.cos(.35 - m) * (20 * d), m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * k * M * this.scale, .4 * k * M * this.scale, D * this.alpha),
                Graphics.transform(this.sprites.thruster1Shadow, w.x + Math.sin(-m - .35) * (20 * d) / config.shadowScaling, w.y + Math.cos(-m - .35) * (20 * d) / config.shadowScaling, m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * k * M * this.scale * (4 / config.shadowScaling), .4 * k * M * this.scale * (4 / config.shadowScaling), D * this.alpha / 2.5),
                Graphics.transform(this.sprites.thruster2Shadow, w.x + Math.sin(.35 - m) * (20 * d) / config.shadowScaling, w.y + Math.cos(.35 - m) * (20 * d) / config.shadowScaling, m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * k * M * this.scale * (4 / config.shadowScaling), .4 * k * M * this.scale * (4 / config.shadowScaling), D * this.alpha / 2.5),
                Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-m - .2 - 0 * this.state.thrustDir) * (35 * d), this.pos.y + Math.cos(-m - .2 - 0 * this.state.thrustDir) * (35 * d), null, 2.5 * this.scale, 1.5 * this.scale, .2 * this.state.thrustLevel * this.alpha),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.2 - m - 0 * this.state.thrustDir) * (35 * d), this.pos.y + Math.cos(.2 - m - 0 * this.state.thrustDir) * (35 * d), null, 2.5 * this.scale, 1.5 * this.scale, .2 * this.state.thrustLevel * this.alpha);
            }
        else
            switch (this.type) {
            case 1:
                Graphics.transform(this.sprites.thruster, this.pos.x + Math.sin(-m) * (20 * d), this.pos.y + Math.cos(-m) * (20 * d), m + (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * k * M * this.scale, .5 * k * M * this.scale, D),
                Graphics.transform(this.sprites.thrusterShadow, w.x + Math.sin(-m) * (20 * d) / config.shadowScaling, w.y + Math.cos(-m) * (20 * d) / config.shadowScaling, m + (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * k * M * this.scale * (4 / config.shadowScaling), .5 * k * M * this.scale * (4 / config.shadowScaling), D / 2.5),
                Graphics.transform(this.sprites.thrusterGlow, this.pos.x + Math.sin(-m - .5 * this.state.thrustDir) * (40 * d), this.pos.y + Math.cos(-m - .5 * this.state.thrustDir) * (40 * d), null, 1.5 * S * this.scale, 1 * S * this.scale, .3 * this.state.thrustLevel),
                this.sprites.thruster.scale.x = this.sprites.thruster.scale.y = 0.25;
                break;
            case 2:
                0 > this.state.thrustLevel && (k *= .7),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(0.8 - m) * (50 * d), this.pos.y + Math.cos(.8 - m) * (50 * d), m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * k * M * this.scale, .6 * k * M * this.scale, D),
                Graphics.transform(this.sprites.thruster2Shadow, w.x + Math.sin(.5 - m) * (32 * d) / config.shadowScaling, w.y + Math.cos(.5 - m) * (32 * d) / config.shadowScaling, m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .5 * k * M * this.scale * (4 / config.shadowScaling), .6 * k * M * this.scale * (4 / config.shadowScaling), D / 2.5),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.3 - m) * (50 * d), this.pos.y + Math.cos(.3 - m) * (50 * d), null, 2.5 * this.scale, 1.5 * this.scale, .3 * this.state.thrustLevel),
                this.sprites.thruster1.visible = !1,
                this.sprites.thruster1Glow.visible = !1,
                this.sprites.thruster1Shadow.visible = !1;
                break;
            case 3:
                Graphics.transform(this.sprites.rotor, this.pos.x, this.pos.y, this.state.thrustDir, 2 * (d * this.state.baseScale), 2 * (d * this.state.baseScale), .8),
                Graphics.transform(this.sprites.rotorShadow, w.x, w.y, this.state.thrustDir, 2 * (this.state.baseScale * (2.4 / config.shadowScaling) * this.scale), 2 * (this.state.baseScale * (2.4 / config.shadowScaling) * this.scale));
                break;
            case 4:
                0 > this.state.thrustLevel && (k *= .7),
                Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-m - 1) * (20 * d), this.pos.y + Math.cos(-m - 1) * (20 * d), m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * k * M * this.scale, .5 * k * M * this.scale, D),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(1 - m) * (20 * d), this.pos.y + Math.cos(1 - m) * (20 * d), m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * k * M * this.scale, .5 * k * M * this.scale, D),
                Graphics.transform(this.sprites.thruster1Shadow, w.x + Math.sin(-m - .15) * (28 * d) / config.shadowScaling, w.y + Math.cos(-m - .15) * (28 * d) / config.shadowScaling, m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * k * M * this.scale * (4 / config.shadowScaling), .5 * k * M * this.scale * (4 / config.shadowScaling), D / 2.5),
                Graphics.transform(this.sprites.thruster2Shadow, w.x + Math.sin(.15 - m) * (28 * d) / config.shadowScaling, w.y + Math.cos(.15 - m) * (28 * d) / config.shadowScaling, m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * k * M * this.scale * (4 / config.shadowScaling), .5 * k * M * this.scale * (4 / config.shadowScaling), D / 2.5),
                Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-m - .2) * (45 * d), this.pos.y + Math.cos(-m - .2) * (45 * d), null, 2.5 * this.scale, 1.5 * this.scale, .25 * this.state.thrustLevel),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.2 - m) * (45 * d), this.pos.y + Math.cos(.2 - m) * (45 * d), null, 2.5 * this.scale, 1.5 * this.scale, .25 * this.state.thrustLevel),
                this.sprites.thruster1.scale.x = this.sprites.thruster1.scale.y = 0.35,
                this.sprites.thruster2.scale.x = this.sprites.thruster2.scale.y = 0.35;
                break;
            case 5:
                0 > this.state.thrustLevel && (k *= .7),
                Graphics.transform(this.sprites.thruster1, this.pos.x + Math.sin(-m - 0.3) * (20 * d), this.pos.y + Math.cos(-m - .35) * (20 * d), m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * k * M * this.scale, .4 * k * M * this.scale, D * this.alpha),
                Graphics.transform(this.sprites.thruster2, this.pos.x + Math.sin(0.3 - m) * (20 * d), this.pos.y + Math.cos(.35 - m) * (20 * d), m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .3 * k * M * this.scale, .4 * k * M * this.scale, D * this.alpha),
                Graphics.transform(this.sprites.thruster1Shadow, w.x + Math.sin(-m - .35) * (20 * d) / config.shadowScaling, w.y + Math.cos(-m - .35) * (20 * d) / config.shadowScaling, m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * k * M * this.scale * (4 / config.shadowScaling), .4 * k * M * this.scale * (4 / config.shadowScaling), D * this.alpha / 2.5),
                Graphics.transform(this.sprites.thruster2Shadow, w.x + Math.sin(.35 - m) * (20 * d) / config.shadowScaling, w.y + Math.cos(.35 - m) * (20 * d) / config.shadowScaling, m + .5 * (0 < this.state.thrustLevel ? this.state.thrustDir : 0), .4 * k * M * this.scale * (4 / config.shadowScaling), .4 * k * M * this.scale * (4 / config.shadowScaling), D * this.alpha / 2.5),
                Graphics.transform(this.sprites.thruster1Glow, this.pos.x + Math.sin(-m - .2 - 0 * this.state.thrustDir) * (35 * d), this.pos.y + Math.cos(-m - .2 - 0 * this.state.thrustDir) * (35 * d), null, 2.5 * this.scale, 1.5 * this.scale, .2 * this.state.thrustLevel * this.alpha),
                Graphics.transform(this.sprites.thruster2Glow, this.pos.x + Math.sin(.2 - m - 0 * this.state.thrustDir) * (35 * d), this.pos.y + Math.cos(.2 - m - 0 * this.state.thrustDir) * (35 * d), null, 2.5 * this.scale, 1.5 * this.scale, .2 * this.state.thrustLevel * this.alpha);
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
        } catch (c) {}
    }
    ,
    h.resetGraphics()
}
StarMash_2.prototype.loadGameModules = function() {
    loadGraphics_SWAM(),
    loadSounds_SWAM()
}
;
function StarMash_1() {
    SWAM.replaceCSS(getFilePath("style.css"))
}
StarMash_1.prototype.start = function() {
    SWAM.BackgroundFactor = 1,
    SWAM.MoveBackgroundTiles = !0,
    config.overdraw = 256,
    config.overdrawOptimize = !0,
    game.graphics.layers.shadows.visible = !1,
    game.graphics.layers.smoke.visible = !1,
    SWAM.on("playerAdded", function(h, c) {
        overridePlayerMethods(c)
    }),
    SWAM.on("mobAdded", StarMash_2.mobAdded),
    SWAM.on("scoreboardUpdate", StarMash_2.onScoreboardUpdate),
    SWAM.Theme.applySettings(SWAM.Settings)
}
,
StarMash_1.prototype.getDefaultSettings = function() {
    return {
        theme: "StarMash_1",
        StarMash_1: {
            nebulas: {
                blue: !0,
                green: !0,
                red: !0
            }
        }
    }
}
,
StarMash_1.prototype.getSettings = function(h, c) {
    function d(S, m) {
        return "undefined" == typeof S ? m : S
    }
    null != c && c.StarMash_1 && h.StarMash_1.nebulas && (h.StarMash_1.nebulas.blue = d(c.StarMash_1.nebulas.blue, !0),
    h.StarMash_1.nebulas.green = d(c.StarMash_1.nebulas.green, !0),
    h.StarMash_1.nebulas.red = d(c.StarMash_1.nebulas.red, !0))
}
,
StarMash_1.prototype.applySettings = function(h) {
    let c = h.StarMash_1;
    game.graphics.layers.map.children[0].alpha = 0.8,
    game.graphics.layers.map.children[0].visible = c.nebulas.blue,
    game.graphics.layers.map.children[2].alpha = 0.8,
    game.graphics.layers.map.children[2].visible = c.nebulas.green,
    game.graphics.layers.map.children[4].alpha = 0.8,
    game.graphics.layers.map.children[4].visible = c.nebulas.red,
    Graphics.renderbackground()
}
,
StarMash_1.prototype.setSettingsWindow = function(h, c) {
    let S = $(getTemplate("#StarMash1_Settings")).html();
    return $(".sectionsContainer", c).append(S),
    $(".chkNebula", c).click(m=>{
        let w = $(m.target).data("layer");
        h.StarMash_1.nebulas[w] = m.target.checked
    }
    ),
    {
        setValues: function(m) {
            h = m;
            var w = $(".chkNebula", c);
            w[0].checked = h.StarMash_1.nebulas.blue,
            w[1].checked = h.StarMash_1.nebulas.green,
            w[2].checked = h.StarMash_1.nebulas.red
        },
        accept: function() {},
        cancel: function() {}
    }
}
,
StarMash_1.prototype.getFilePath = StarMash_2.prototype.getFilePath = function(h) {
    return "/assets/" + h + "?" + SWAM_version
}
,
StarMash_1.prototype.injectTextures = StarMash_2.prototype.injectTextures,
StarMash_1.prototype.loadGameModules = StarMash_2.prototype.loadGameModules;
function VanillaTheme() {}
VanillaTheme.prototype.start = function() {
    var h = this;
    SWAM.on("playerAdded", function(c, d) {
        h.tintPlayer(d);
        let S = d.setupGraphics;
        d.setupGraphics = function(w) {
            S.call(d, w),
            h.tintPlayer(d)
        }
        ;
        let m = d.reteam;
        d.reteam = function(w) {
            m.call(d, w),
            h.tintPlayer(d)
        }
    }),
    SWAM.on("mobAdded", function(c, d, S, m) {
        let w = Mobs.get(d.id)
          , _ = -1 < $.inArray(w.type, [1, 2, 3, 5, 6, 7]);
        if (_) {
            if (2 == game.gameType)
                if (m) {
                    var f = Players.get(m);
                    1 == f.team ? (w.sprites.sprite.tint = 5592575,
                    w.sprites.thruster.tint = 5592575) : (w.sprites.sprite.tint = 16733525,
                    w.sprites.thruster.tint = 16733525)
                } else
                    1 == Players.getMe().team ? (w.sprites.sprite.tint = 16733525,
                    w.sprites.thruster.tint = 16733525) : (w.sprites.sprite.tint = 5592575,
                    w.sprites.thruster.tint = 5592575);
            w.sprites.smokeGlow.alpha = 0,
            2 == w.type ? w.sprites.sprite.scale.set(.3, .4) : 3 == w.type ? w.sprites.sprite.scale.set(.56, .4) : w.sprites.sprite.scale.set(.3, .3)
        }
    }),
    SWAM.Theme.applySettings(SWAM.Settings)
}
,
VanillaTheme.prototype.tintPlayer = function(h) {
    h.sprites.sprite.tint = 1 == h.team ? 10539263 : 2 == h.team ? 16756912 : 16777215
}
,
VanillaTheme.prototype.getDefaultSettings = function() {
    return {
        theme: "Vanilla",
        Vanilla: {
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
        }
    }
}
,
VanillaTheme.prototype.getSettings = function(h, c) {
    function d(S, m) {
        return "undefined" == typeof S ? m : S
    }
    null != c && c.Vanilla && (h.Vanilla.map && (h.Vanilla.map.sea = d(c.Vanilla.map.sea, !0),
    h.Vanilla.map.forest = d(c.Vanilla.map.forest, !0),
    h.Vanilla.map.sand = d(c.Vanilla.map.sand, !0),
    h.Vanilla.map.rock = d(c.Vanilla.map.rock, !0),
    h.Vanilla.map.polygons = d(c.Vanilla.map.polygons, !0)),
    h.Vanilla.layers && (h.Vanilla.layers.shadows = d(c.Vanilla.layers.shadows, !0),
    h.Vanilla.layers.smoke = d(c.Vanilla.layers.smoke, !0)))
}
,
VanillaTheme.prototype.applySettings = function(h) {
    let c = h.Vanilla
      , d = game.graphics.layers.sea
      , S = d.children[1]
      , m = game.graphics.layers.map
      , w = m.children[0]
      , _ = m.children[1]
      , f = m.children[3]
      , k = m.children[6];
    if (c && c.map) {
        function M() {
            k = m.children[6],
            c.map.polygons ? (k.visible = !0,
            m.mask = k) : (m.mask = null,
            k.visible = !1)
        }
        if (S.visible = c.map.sea,
        w.visible = c.map.forest,
        d.visible = c.map.forest && !c.map.polygons ? !1 : !0,
        _.visible = c.map.sand,
        f.visible = c.map.rock,
        k)
            M();
        else {
            let D = setInterval(function() {
                game.graphics.layers.map.children[6] && (clearInterval(D),
                M())
            }, 500)
        }
    }
    c && c.layers && (game.graphics.layers.shadows.visible = c.layers.shadows,
    game.graphics.layers.smoke.visible = c.layers.smoke)
}
,
VanillaTheme.prototype.setSettingsWindow = function(h, c) {
    let S = $(getTemplate("#Vanilla_Settings")).html();
    return $(".sectionsContainer", c).append(S),
    {
        setValues: function(m) {
            h = m;
            let w = h.Vanilla;
            var _ = $(".swamVanilla input[type='checkbox']", c);
            _[0].checked = w.map.sea,
            _[1].checked = w.map.forest,
            _[2].checked = w.map.sand,
            _[3].checked = w.map.rock,
            _[4].checked = w.map.polygons,
            _[5].checked = w.layers.shadows,
            _[6].checked = w.layers.smoke
        },
        accept: function() {
            let m = h.Vanilla;
            var w = $(".swamVanilla input[type='checkbox']", c);
            m.map.sea = w[0].checked,
            m.map.forest = w[1].checked,
            m.map.sand = w[2].checked,
            m.map.rock = w[3].checked,
            m.map.polygons = w[4].checked,
            m.layers.shadows = w[5].checked,
            m.layers.smoke = w[6].checked
        },
        cancel: function() {}
    }
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
    themes: [{
        id: "VanillaTheme",
        name: "Vanilla Theme",
        author: "Bombita",
        version: SWAM_version,
        object: VanillaTheme
    }, {
        id: "StarMash_1",
        name: "StarMash v.1, no Parallax",
        author: "Bombita",
        version: SWAM_version,
        object: StarMash_1
    }, {
        id: "StarMash_2",
        name: "StarMash v.2",
        author: "Bombita",
        version: SWAM_version,
        object: StarMash_2
    }],
    dependencies: []
});

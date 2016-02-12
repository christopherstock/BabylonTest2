
    /*****************************************************************************
    *   Specifies the initialization part of the game logic.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgInit
    {
        public          static      canvas          :HTMLCanvasElement          = null;

        public          static      divFps          :HTMLDivElement             = null;

        /*****************************************************************************
        *   Inits this app from scratch.
        *****************************************************************************/
        public static init()
        {
            //acclaim debug console
            MfgDebug.acclaim.log( MfgSettings.TITLE );

            //set document title
            document.title = MfgSettings.TITLE;

            //reference canvas element and fps counter div
            MfgInit.canvas = <HTMLCanvasElement>document.getElementById("renderCanvas");
            MfgInit.divFps = <HTMLDivElement>   document.getElementById("fps");





            // Babylon
            var engine = new BABYLON.Engine(MfgInit.canvas, true);
            var scene;

            var demo = {
                constructor: CreatePhysicsScene,
                onload: function (scene) {
                    scene.onPointerDown = function (evt, pickResult) {
                        if (pickResult.hit) {
                            var dir = pickResult.pickedPoint.subtract(scene.activeCamera.position);
                            dir.normalize();
                            pickResult.pickedMesh.applyImpulse(dir.scale(10), pickResult.pickedPoint);
                        }
                    };
                }
            };

            var loadCustomScene = function (demoConstructor, then) {
                BABYLON.SceneLoader.ShowLoadingScreen = false;
                engine.displayLoadingUI();

                setTimeout(function () {
                    scene = demoConstructor(engine);

                    if (scene.activeCamera) {
                        scene.activeCamera.attachControl(MfgInit.canvas, false);
                    }

                    scene.executeWhenReady(function () {
                        MfgInit.canvas.style.opacity = 1;
                        engine.hideLoadingUI();
                        BABYLON.SceneLoader.ShowLoadingScreen = true;
                        if (then) {
                            then(scene);
                        }
                    });
                }, 15);
            };

            // Render loop
            var renderFunction = function () {
                // Fps
                MfgInit.divFps.innerHTML = engine.getFps().toFixed() + " fps";

                // Render scene
                if (scene) {
/*
                    if (!sceneChecked) {
                        var remaining = scene.getWaitingItemsCount();
                        engine.loadingUIText = "Streaming items..." + (remaining ? (remaining + " remaining") : "");
                    }
*/
                    scene.render();

                    // Streams
                    if (scene.useDelayedTextureLoading) {
                        var waiting = scene.getWaitingItemsCount();
                        if (waiting > 0) {
                            console.log("Streaming items..." + waiting + " remaining");
                        }
                    }
                }
            };

            // Resize
            window.addEventListener("resize", function () {
                engine.resize();
            });

            //launch render loop
            engine.runRenderLoop(renderFunction);

            //load the scene
            loadCustomScene(demo.constructor, demo.onload);
        }
    }

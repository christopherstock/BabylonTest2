
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

        public          static      engine          :BABYLON.Engine             = null;

        public          static      scene           :any                        = null;

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
            MfgInit.canvas = <HTMLCanvasElement>document.getElementById( "renderCanvas" );
            MfgInit.divFps = <HTMLDivElement>   document.getElementById( "fps"          );

            //init Babylon.js engine
            MfgInit.engine = new BABYLON.Engine( MfgInit.canvas, true );

            //specify the demo
            var demo = {
                constructor: MfgScene.CreatePhysicsScene,
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

            // Resize
            window.addEventListener("resize", function () {
                MfgInit.engine.resize();
            });

            //launch render loop
            MfgInit.engine.runRenderLoop(MfgGame.render);

            //load the scene
            MfgScene.loadCustomScene( demo.constructor, demo.onload );
        }
    }

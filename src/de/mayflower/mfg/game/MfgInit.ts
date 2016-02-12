
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

            //add resize event listener
            window.addEventListener(
                "resize",
                function () {
                    MfgInit.engine.resize();
                }
            );

            //launch render loop
            MfgInit.engine.runRenderLoop( MfgGame.render );

            //load the scene
            MfgScene.initScene();
        }
    }

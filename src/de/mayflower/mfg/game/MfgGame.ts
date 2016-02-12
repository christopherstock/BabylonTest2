
    /*****************************************************************************
    *   Specifies the paramount part of the game logic.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgGame
    {
        public static render()
        {
            // Fps
            MfgInit.divFps.innerHTML = MfgInit.engine.getFps().toFixed() + " fps";

            // Render scene
            if (MfgInit.scene) {

                MfgInit.scene.render();

                // Streams
                if (MfgInit.scene.useDelayedTextureLoading) {
                    var waiting = MfgInit.scene.getWaitingItemsCount();
                    if (waiting > 0) {
                        console.log("Streaming items..." + waiting + " remaining");
                    }
                }
            }
        }
    }

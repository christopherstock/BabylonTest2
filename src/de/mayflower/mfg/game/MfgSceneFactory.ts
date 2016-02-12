
    /*****************************************************************************
    *   Constructs scene objects.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgSceneFactory
    {
        /*****************************************************************************
        *   Creates a box.
        *****************************************************************************/
        public static createBox( id:string, material:BABYLON.Material, scene:BABYLON.Scene ):BABYLON.Mesh
        {
            var ground:BABYLON.Mesh = BABYLON.Mesh.CreateBox( id, 1, scene );

            ground.scaling          = new BABYLON.Vector3( 100, 1, 100 );
            ground.position         = new BABYLON.Vector3( 0.0, -5.0, 0.0 );
            ground.checkCollisions  = true;
            ground.material         = material;
            ground.receiveShadows   = true;
            ground.setPhysicsState
            (
                BABYLON.PhysicsEngine.BoxImpostor,
                {
                    mass:        0,
                    friction:    0.5,
                    restitution: 0.7
                }
            );

            return ground;
        }
    }


    /*****************************************************************************
    *   Specifies the game scene.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgScene
    {
        public          static                  SPHERES_TO_SPAWN        :number                     = 250;
        public          static                  CAMERA_STARTUP          :BABYLON.Vector3            = new BABYLON.Vector3( -80.0, 40.0, -80.0 );

        public          static                  scene                   :BABYLON.Scene              = null;
        private         static                  shadowGenerator1         :BABYLON.ShadowGenerator    = null;
        public          static                  camera                  :BABYLON.FreeCamera         = null;

        public          static                  spawnSpheres            :boolean                    = true;
        public          static                  spawnBox0               :boolean                    = true;
        public          static                  spawnCompound           :boolean                    = true;
        public          static                  spawnBorders            :boolean                    = true;

        /*****************************************************************************
        *   Sets up the scene.
        *****************************************************************************/
        public static initScene()
        {
            BABYLON.SceneLoader.ShowLoadingScreen = false;
            MfgInit.engine.displayLoadingUI();

            setTimeout(
                function () {
                    MfgScene.createScene();

                    if (MfgScene.scene.activeCamera) {
                        MfgScene.scene.activeCamera.attachControl(MfgInit.canvas);
                    }

                    MfgScene.scene.executeWhenReady(
                        MfgScene.initSceneCompleted
                    );
                },
                20
            );
        }

        /*****************************************************************************
        *   Being invoked when the scene is set up.
        *****************************************************************************/
        public static initSceneCompleted()
        {
            MfgInit.canvas.style.opacity = "1";
            MfgInit.engine.hideLoadingUI();
            BABYLON.SceneLoader.ShowLoadingScreen = true;

            MfgScene.scene.onPointerDown = MfgPointer.assignPointerDown;
        }

        /*****************************************************************************
        *   Constructs and fills the scene.
        *****************************************************************************/
        public static createScene()
        {
            //create scene
            MfgScene.scene            = new BABYLON.Scene( MfgInit.engine );
            MfgScene.scene.clearColor = LibUI.COLOR_ORANGE_MAYFLOWER;
            MfgScene.scene.gravity    = new BABYLON.Vector3( 0, MfgSettings.GRAVITY, 0 );

            //init materials
            MfgMaterial.initMaterials( MfgScene.scene );

            //setup camera
            MfgScene.setupCamera();

            //setup lights
            MfgScene.setupLights();











            //setup physics
            MfgScene.scene.enablePhysics( null, new BABYLON.OimoJSPlugin() );

            //setup all scene data
            MfgScene.setupGround();
            MfgScene.setupCollidableBox();

            if ( MfgScene.spawnSpheres  ) MfgScene.setupSpheres();
            if ( MfgScene.spawnBox0     ) MfgScene.setupBox0();
            if ( MfgScene.spawnCompound ) MfgScene.setupCompound();
            if ( MfgScene.spawnBorders  ) MfgScene.setupGlassPanes();
        }

        /*****************************************************************************
        *   Sets up the ground for the scene.
        *****************************************************************************/
        private static setupGround():void
        {
            MfgSceneFactory.createBox(
                "Ground1",
                new BABYLON.Vector3( 0.0,   -4.4, 1.0   ),
                new BABYLON.Vector3( 100.0, 1.0,  100.0 ),
                new BABYLON.Vector3( 0.0,   0.0,  0.0   ),
                0.0,
                MfgMaterial.materialGrass,
                MfgScene.scene
            );

            MfgSceneFactory.createBox(
                "Ground2",
                new BABYLON.Vector3( 0.0,   -26.0, -93.5 ),
                new BABYLON.Vector3( 100.0, 1.0,   100.0  ),
                new BABYLON.Vector3( 1.0,   0.0, 0.0 ),
                -0.45,
                MfgMaterial.materialGrass,
                MfgScene.scene
            );

            MfgSceneFactory.createBox(
                "Ground3",
                new BABYLON.Vector3( 0.0,   -48.0, -185.0 ),
                new BABYLON.Vector3( 100.0, 1.0,   100.0  ),
                new BABYLON.Vector3( 0.0,   0.0,   0.0    ),
                0.0,
                MfgMaterial.materialGrass,
                MfgScene.scene
            );
        }

        /*****************************************************************************
        *   Sets up the spheres for the scene.
        *****************************************************************************/
        private static setupSpheres():void
        {
            var y = 0;
            for ( var index = 0; index < MfgScene.SPHERES_TO_SPAWN; index++ )
            {
                var sphere = BABYLON.Mesh.CreateSphere( "Sphere0", 16, 3, MfgScene.scene );
                sphere.material = MfgMaterial.materialMFLogo;
                sphere.position = new BABYLON.Vector3( Math.random() * 20 - 10, y, Math.random() * 10 - 5 );

                MfgScene.shadowGenerator1.getShadowMap().renderList.push(sphere);

                sphere.setPhysicsState(BABYLON.PhysicsEngine.SphereImpostor, { mass: 1, friction: 0.0, restitution: 0.0 });

                y += 2;
            }

            // Add 10 linked spheres
            var spheres = [];
            for (index = 0; index < 10; index++)
            {
                sphere = BABYLON.Mesh.CreateSphere("Sphere0", 16, 1, MfgScene.scene);
                spheres.push(sphere);
                sphere.material = MfgMaterial.materialAmiga;
                sphere.position = new BABYLON.Vector3(Math.random() * 20 - 10, y, Math.random() * 10 - 5);

                MfgScene.shadowGenerator1.getShadowMap().renderList.push(sphere);

                sphere.setPhysicsState(BABYLON.PhysicsEngine.SphereImpostor, { mass: 1, friction: 0.0, restitution: 0.0 });
            }

            for (index = 0; index < 10; index++)
            {
                spheres[index].setPhysicsLinkWith(spheres[index + 1], new BABYLON.Vector3(0, 0.5, 0), new BABYLON.Vector3(0, -0.5, 0));
            }
        }

        /*****************************************************************************
        *   Sets up the box0 for the scene.
        *****************************************************************************/
        private static setupBox0()
        {
            // Box
            var box0             = BABYLON.Mesh.CreateBox("Box0", 3, MfgScene.scene);
            box0.position        = new BABYLON.Vector3(3, 30, 0);
            box0.material        = MfgMaterial.materialWood;

            MfgScene.shadowGenerator1.getShadowMap().renderList.push(box0);

            box0.setPhysicsState(   BABYLON.PhysicsEngine.BoxImpostor, { mass: 2, friction: 0.4, restitution: 0.3 } );
        }

        /*****************************************************************************
        *   Sets up the compound for the scene.
        *****************************************************************************/
        private static setupCompound()
        {
            // Compound
            var part0 = BABYLON.Mesh.CreateBox("part0", 3, MfgScene.scene);
            part0.position = new BABYLON.Vector3(3, 30, 0);
            part0.material = MfgMaterial.materialWood;

            var part1 = BABYLON.Mesh.CreateBox("part1", 3, MfgScene.scene);
            part1.parent = part0; // We need a hierarchy for compound objects
            part1.position = new BABYLON.Vector3(0, 3, 0);
            part1.material = MfgMaterial.materialWood;

            MfgScene.shadowGenerator1.getShadowMap().renderList.push(part0);
            MfgScene.shadowGenerator1.getShadowMap().renderList.push(part1);

            MfgScene.scene.createCompoundImpostor(
                [
                    { mesh: part0, impostor: BABYLON.PhysicsEngine.BoxImpostor },
                    { mesh: part1, impostor: BABYLON.PhysicsEngine.BoxImpostor },
                ],
                {
                    mass: 2, friction: 0.4, restitution: 0.3
                }
            );
        }

        /*****************************************************************************
        *   Sets up the borders for the scene.
        *****************************************************************************/
        private static setupGlassPanes()
        {
            var glassPane1              = BABYLON.Mesh.CreateBox( "border0", 1.0, MfgScene.scene );
            glassPane1.position         = new BABYLON.Vector3( 0.0,   5.0,  0.0  );
            glassPane1.scaling          = new BABYLON.Vector3( 1.0,   20.0, 50.0 );
            glassPane1.checkCollisions  = true;

            var glassPane2              = BABYLON.Mesh.CreateBox( "border2", 1.0, MfgScene.scene );
            glassPane2.position         = new BABYLON.Vector3( 0.0,   5.0,  0.0 );
            glassPane2.scaling          = new BABYLON.Vector3( 50.0,  20.0, 1.0 );
            glassPane2.checkCollisions  = true;

            glassPane1.setPhysicsState( BABYLON.PhysicsEngine.BoxImpostor, { mass: 0, friction: 0.0, restitution: 0.0 } );
            glassPane2.setPhysicsState( BABYLON.PhysicsEngine.BoxImpostor, { mass: 0, friction: 0.0, restitution: 0.0 } );

            glassPane1.material = MfgMaterial.materialGlass;
            glassPane2.material = MfgMaterial.materialGlass;

            //MfgScene.shadowGenerator.getShadowMap().renderList.push( glassPane1 );
            //MfgScene.shadowGenerator.getShadowMap().renderList.push( glassPane2 );
        }

        /*****************************************************************************
        *   Sets up a collidable box.
        *****************************************************************************/
        private static setupCollidableBox()
        {
            var solidBox = BABYLON.Mesh.CreateBox("box1", 1.0, MfgScene.scene);
            solidBox.scaling         = new BABYLON.Vector3( 3.0,  3.0,  3.0   );
            solidBox.position        = new BABYLON.Vector3( 45.0, -2.0, -45.0 );
            solidBox.checkCollisions = true;

            solidBox.material = MfgMaterial.materialAmiga;
        }

        /*****************************************************************************
        *   Sets up the camera.
        *****************************************************************************/
        private static setupCamera()
        {
            MfgScene.camera = new BABYLON.FreeCamera( "Camera", MfgScene.CAMERA_STARTUP, MfgScene.scene );
            MfgScene.camera.checkCollisions = true;
            MfgScene.camera.applyGravity    = true;
            MfgScene.camera.setTarget( new BABYLON.Vector3( 0, 0, 0 ) );
        }

        /*****************************************************************************
        *   Sets up all lights.
        *****************************************************************************/
        private static setupLights()
        {
            //setup lights
            var light1 = new BABYLON.DirectionalLight( "dir01", new BABYLON.Vector3( 0.2, -1, 0 ), MfgScene.scene );
            light1.position  = new BABYLON.Vector3( 0, 80, 0 );

            var light2 = new BABYLON.PointLight( "Omni03", new BABYLON.Vector3( -10.0, 0.0, -10.0 ), MfgScene.scene );
            light2.intensity = 0.5;

            var light3 = new BABYLON.PointLight( "Omni05", new BABYLON.Vector3( 10.0,  0.0, 10.0  ), MfgScene.scene );
            light3.intensity = 0.5;


            //setup shadows
            MfgScene.shadowGenerator1                      = new BABYLON.ShadowGenerator( 4096, light1 );
            MfgScene.shadowGenerator1.useVarianceShadowMap = true;
            MfgScene.shadowGenerator1.usePoissonSampling   = true;




        }
    }

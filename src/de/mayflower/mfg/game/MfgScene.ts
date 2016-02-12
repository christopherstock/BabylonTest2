
    /*****************************************************************************
    *   Specifies the game scene.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgScene
    {
        public              static                          scene                       :BABYLON.Scene      = null;

        public              static                          spawnSpheres                :boolean            = true;
        public              static                          spawnBox0                   :boolean            = true;
        public              static                          spawnCompound               :boolean            = true;
        public              static                          spawnBorders                :boolean            = false;

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
            MfgScene.scene            = new BABYLON.Scene(MfgInit.engine);
            MfgScene.scene.clearColor = LibUI.COLOR_ORANGE_MAYFLOWER;
            MfgScene.scene.gravity    = new BABYLON.Vector3( 0, MfgSettings.GRAVITY, 0 );

            //init materials
            MfgMaterial.initMaterials( MfgScene.scene );

            //setup camera
            var camera = new BABYLON.FreeCamera( "Camera", new BABYLON.Vector3( 0, 0, -20 ), MfgScene.scene );
            camera.checkCollisions = true;
            camera.applyGravity    = true;
            camera.setTarget( new BABYLON.Vector3( 0, 0, 0 ) );

            //setup lights
            var light = new BABYLON.DirectionalLight( "dir02", new BABYLON.Vector3( 0.2, -1, 0 ), MfgScene.scene );
            light.position = new BABYLON.Vector3(0, 80, 0);

            //setup shadows
            var shadowGenerator = new BABYLON.ShadowGenerator( 2048, light );

            //setup physics
            MfgScene.scene.enablePhysics( null, new BABYLON.OimoJSPlugin() );






            // Ground
            MfgScene.setupGround();



            // Spheres
            if ( MfgScene.spawnSpheres )
            {
                var y = 0;
                for (var index = 0; index < 100; index++) {
                    var sphere = BABYLON.Mesh.CreateSphere("Sphere0", 16, 3, MfgScene.scene);
                    sphere.material = MfgMaterial.materialMFLogo;
                    sphere.position = new BABYLON.Vector3(Math.random() * 20 - 10, y, Math.random() * 10 - 5);

                    shadowGenerator.getShadowMap().renderList.push(sphere);

                    sphere.setPhysicsState(BABYLON.PhysicsEngine.SphereImpostor, { mass: 1, friction: 0.0, restitution: 0.0 });

                    y += 2;
                }

                // Link
                var spheres = [];
                for (index = 0; index < 10; index++)
                {
                    sphere = BABYLON.Mesh.CreateSphere("Sphere0", 16, 1, MfgScene.scene);
                    spheres.push(sphere);
                    sphere.material = MfgMaterial.materialAmiga2;
                    sphere.position = new BABYLON.Vector3(Math.random() * 20 - 10, y, Math.random() * 10 - 5);

                    shadowGenerator.getShadowMap().renderList.push(sphere);

                    sphere.setPhysicsState(BABYLON.PhysicsEngine.SphereImpostor, { mass: 1, friction: 0.0, restitution: 0.0 });
                }

                for (index = 0; index < 10; index++) {
                    spheres[index].setPhysicsLinkWith(spheres[index + 1], new BABYLON.Vector3(0, 0.5, 0), new BABYLON.Vector3(0, -0.5, 0));
                }
            }

            // Box 0
            if ( MfgScene.spawnBox0 )
            {
                // Box
                var box0 = BABYLON.Mesh.CreateBox("Box0", 3, MfgScene.scene);
                box0.position = new BABYLON.Vector3(3, 30, 0);
                var materialWood = new BABYLON.StandardMaterial("wood", MfgScene.scene);
                materialWood.diffuseTexture = new BABYLON.Texture("res/image/texture/wood.jpg", MfgScene.scene);
                materialWood.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
                box0.material = materialWood;

                shadowGenerator.getShadowMap().renderList.push(box0);

                box0.setPhysicsState(   BABYLON.PhysicsEngine.BoxImpostor, { mass: 2, friction: 0.4, restitution: 0.3 } );
            }

            // Compound
            if ( MfgScene.spawnCompound )
            {
                // Compound
                var part0 = BABYLON.Mesh.CreateBox("part0", 3, MfgScene.scene);
                part0.position = new BABYLON.Vector3(3, 30, 0);
                part0.material = materialWood;

                var part1 = BABYLON.Mesh.CreateBox("part1", 3, MfgScene.scene);
                part1.parent = part0; // We need a hierarchy for compound objects
                part1.position = new BABYLON.Vector3(0, 3, 0);
                part1.material = materialWood;

                shadowGenerator.getShadowMap().renderList.push(part0);
                shadowGenerator.getShadowMap().renderList.push(part1);

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

            // Borders
            if ( MfgScene.spawnBorders )
            {
                var border0 = BABYLON.Mesh.CreateBox("border0", 1, MfgScene.scene);
                border0.scaling = new BABYLON.Vector3(1, 100, 100);
                border0.position.y = -5.0;
                border0.position.x = -50.0;
                border0.checkCollisions = true;

                var border1 = BABYLON.Mesh.CreateBox("border1", 1, MfgScene.scene);
                border1.scaling = new BABYLON.Vector3(1, 100, 100);
                border1.position.y = -5.0;
                border1.position.x = 50.0;
                border1.checkCollisions = true;

                var border2 = BABYLON.Mesh.CreateBox("border2", 1, MfgScene.scene);
                border2.scaling = new BABYLON.Vector3(100, 100, 1);
                border2.position.y = -5.0;
                border2.position.z = 50.0;
                border2.checkCollisions = true;

                var border3 = BABYLON.Mesh.CreateBox("border3", 1, MfgScene.scene);
                border3.scaling = new BABYLON.Vector3(100, 100, 1);
                border3.position.y = -5.0;
                border3.position.z = -50.0;
                border3.checkCollisions = true;

                border0.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0, friction: 0.0, restitution: 0.0 } );
                border1.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0, friction: 0.0, restitution: 0.0 } );
                border2.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0, friction: 0.0, restitution: 0.0 } );
                border3.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0, friction: 0.0, restitution: 0.0 } );

                border0.material = MfgMaterial.groundMat;
                border1.material = MfgMaterial.groundMat;
                border2.material = MfgMaterial.groundMat;
                border3.material = MfgMaterial.groundMat;
            }
        }

        /*****************************************************************************
        *   Sets up the ground for the scene.
        *****************************************************************************/
        private static setupGround():void
        {
            MfgSceneFactory.createBox(
                "Ground1",
                new BABYLON.Vector3( 0.0, -5.0, 0.0 ),
                new BABYLON.Vector3( 100, 1, 100 ),
                MfgMaterial.groundMat,
                MfgScene.scene
            );

            MfgSceneFactory.createBox(
                "Ground2",
                new BABYLON.Vector3( 0.0, -25.0, -100.0 ),
                new BABYLON.Vector3( 100, 1, 100 ),
                MfgMaterial.groundMat,
                MfgScene.scene
            );
        }
    }

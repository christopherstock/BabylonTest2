
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
        public          static                  camera                  :BABYLON.FreeCamera         = null;

        public          static                  light1                  :BABYLON.DirectionalLight   = null;
        public          static                  light2                  :BABYLON.PointLight         = null;
        public          static                  light3                  :BABYLON.PointLight         = null;

        private         static                  shadowGenerator1        :BABYLON.ShadowGenerator    = null;

        private         static                  spriteManager           :BABYLON.SpriteManager      = null;

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

            //setup shadows
            MfgScene.setupShadows();

            //setup sprites
            MfgScene.setupSprites();

            //setup physics
            MfgScene.scene.enablePhysics( null, new BABYLON.OimoJSPlugin() );

            //setup all scene data
            MfgScene.setupGround();
            MfgScene.setupCollidableBox();

            if ( MfgScene.spawnSpheres  ) MfgScene.setupSpheres();
            if ( MfgScene.spawnBox0     ) MfgScene.setupBox0();
            if ( MfgScene.spawnCompound ) MfgScene.setupCompound();
            if ( MfgScene.spawnBorders  ) MfgScene.setupGlassPanes();

            MfgScene.setupSkybox();

            MfgScene.importMesh();



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

                MfgScene.shadowGenerator1.getShadowMap().renderList.push( sphere );

                sphere.setPhysicsState(BABYLON.PhysicsEngine.SphereImpostor, { mass: 1, friction: 0.0, restitution: 0.0 });

                y += 4;
            }

            // Add 10 linked spheres
            var spheres = [];
            for (index = 0; index < 10; index++)
            {
                sphere = BABYLON.Mesh.CreateSphere("Sphere0", 16, 1, MfgScene.scene);
                spheres.push(sphere);
                sphere.material = MfgMaterial.materialAmiga;
                sphere.position = new BABYLON.Vector3(Math.random() * 20 - 10, y, Math.random() * 10 - 5);

                MfgScene.shadowGenerator1.getShadowMap().renderList.push( sphere );

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

            MfgScene.shadowGenerator1.getShadowMap().renderList.push( box0 );

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

            MfgScene.shadowGenerator1.getShadowMap().renderList.push( part0 );
            MfgScene.shadowGenerator1.getShadowMap().renderList.push( part1 );

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

            MfgScene.camera.setTarget( new BABYLON.Vector3( 0, 0, 0 ) );

            MfgScene.camera.checkCollisions = true;
            MfgScene.camera.applyGravity    = true;

            //Set the ellipsoid around the camera (e.g. your player's size)
            MfgScene.camera.ellipsoid = new BABYLON.Vector3( 1, 1, 1 );
        }

        /*****************************************************************************
        *   Sets up all lights.
        *****************************************************************************/
        private static setupLights()
        {
            //setup lights
            MfgScene.light1           = new BABYLON.DirectionalLight( "dir01", new BABYLON.Vector3( 0.2, -1, 0 ), MfgScene.scene );
            MfgScene.light1.intensity = 1.0;
            MfgScene.light1.position  = new BABYLON.Vector3( 0, 80, 0 );

            MfgScene.light2           = new BABYLON.PointLight( "omni01", new BABYLON.Vector3( -10.0, 0.0, -10.0 ), MfgScene.scene );
            MfgScene.light2.intensity = 1.0;
            MfgScene.light2.diffuse   = new BABYLON.Color3( 1.0, 0.0, 0.0 );
            MfgScene.light2.specular  = new BABYLON.Color3( 1.0, 0.0, 0.0 );

            MfgScene.light3           = new BABYLON.PointLight( "spot01", new BABYLON.Vector3( 10.0,  0.0, 10.0  ), MfgScene.scene );
            MfgScene.light3.intensity = 1.0;
            MfgScene.light3.diffuse   = new BABYLON.Color3( 0.0, 0.0, 1.0 );
            MfgScene.light3.specular  = new BABYLON.Color3( 0.0, 0.0, 1.0 );
        }

        /*****************************************************************************
        *   Sets up all shadows.
        *****************************************************************************/
        private static setupShadows()
        {
            //setup shadows
            MfgScene.shadowGenerator1                      = new BABYLON.ShadowGenerator( 2048, MfgScene.light1 );
            MfgScene.shadowGenerator1.useVarianceShadowMap = true;
            MfgScene.shadowGenerator1.usePoissonSampling   = true;
        }

        /*****************************************************************************
        *   Sets up all sprites.
        *****************************************************************************/
        private static setupSprites()
        {
            MfgScene.spriteManager = new BABYLON.SpriteManager( "treesManager", MfgSettings.PATH_IMAGE_TEXTURE + "tree.png", 100, 357, MfgScene.scene );

            var tree1        = new BABYLON.Sprite( "tree1", MfgScene.spriteManager );
            tree1.position   = new BABYLON.Vector3( 45.0, 5.0, -35.0 );
            tree1.size       = 20.0;

            var tree2        = new BABYLON.Sprite( "tree1", MfgScene.spriteManager );
            tree2.position   = new BABYLON.Vector3( 45.0, 5.0, -20.0 );
            tree2.size       = 20.0;

            var tree3        = new BABYLON.Sprite( "tree1", MfgScene.spriteManager );
            tree3.position   = new BABYLON.Vector3( 45.0, 5.0, -5.0 );
            tree3.size       = 20.0;

            var tree4        = new BABYLON.Sprite( "tree1", MfgScene.spriteManager );
            tree4.position   = new BABYLON.Vector3( 45.0, 5.0, 10.0 );
            tree4.size       = 20.0;

            var tree5        = new BABYLON.Sprite( "tree1", MfgScene.spriteManager );
            tree5.position   = new BABYLON.Vector3( 45.0, 5.0, 25.0 );
            tree5.size       = 20.0;

            var tree6        = new BABYLON.Sprite( "tree1", MfgScene.spriteManager );
            tree6.position   = new BABYLON.Vector3( 45.0, 5.0, 40.0 );
            tree6.size       = 20.0;
        }

        /*****************************************************************************
        *   Sets up the skybox.
        *****************************************************************************/
        private static setupSkybox()
        {
            // Skybox
            var skybox = BABYLON.Mesh.CreateBox("skyBox", 500.0, MfgScene.scene);
            var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", MfgScene.scene);
            //skybox.position.z -= 200.0;
            skyboxMaterial.backFaceCulling = false;
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture( MfgSettings.PATH_IMAGE_TEXTURE + "skybox", MfgScene.scene);
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
            skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            //skyboxMaterial.disableLighting = true;
            skybox.material = skyboxMaterial;
        }

        /*****************************************************************************
        *   Imports a mesh in the .babylon format.
        *****************************************************************************/
        private static importMesh()
        {
            // The first parameter can be used to specify which mesh to import. Here we import all meshes
            BABYLON.SceneLoader.ImportMesh(
                "",
                MfgSettings.PATH_3DS,
                "rabbit.babylon",
                MfgScene.scene, function (newMeshes:Array<BABYLON.Mesh>)
                {
                    var rabbit:BABYLON.Mesh = newMeshes[ 0 ];

                    rabbit.position.z += 60.0;
                    rabbit.position.y -= 4.0;

                    rabbit.rotate( new BABYLON.Vector3( 0.0, 1.0, 0.0 ), 135.0, BABYLON.Space.LOCAL );

                    //rabbit.checkCollisions = true;

                    //NOW hide the loading UI! :D
                    MfgInit.engine.hideLoadingUI();
                }
            );
        }
    }

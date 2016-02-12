
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

            //init Babylin.js engine
            MfgInit.engine = new BABYLON.Engine( MfgInit.canvas, true );



var CreatePhysicsScene = function (engine) {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = BABYLON.Color3.Purple();

    var camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 0, -20), scene);
    camera.checkCollisions = true;
    camera.applyGravity = true;
    camera.setTarget(new BABYLON.Vector3(0, 0, 0));

    var light = new BABYLON.DirectionalLight("dir02", new BABYLON.Vector3(0.2, -1, 0), scene);
    light.position = new BABYLON.Vector3(0, 80, 0);

    // Material
    var materialAmiga = new BABYLON.StandardMaterial("amiga", scene);
    materialAmiga.diffuseTexture = new BABYLON.Texture("res/image/texture//amiga.jpg", scene);
    materialAmiga.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    materialAmiga.diffuseTexture.uScale = 5;
    materialAmiga.diffuseTexture.vScale = 5;

    var materialAmiga2 = new BABYLON.StandardMaterial("amiga", scene);
    materialAmiga2.diffuseTexture = new BABYLON.Texture("res/image/texture/mosaic.jpg", scene);
    materialAmiga2.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);

    // Shadows
    var shadowGenerator = new BABYLON.ShadowGenerator(2048, light);
    shadowGenerator.getShadowMap().renderList.push(box0);

    // Physics
    //scene.enablePhysics(null, new BABYLON.CannonJSPlugin());
    scene.enablePhysics(null, new BABYLON.OimoJSPlugin());

    // Spheres
    var y = 0;
    for (var index = 0; index < 100; index++) {
        var sphere = BABYLON.Mesh.CreateSphere("Sphere0", 16, 3, scene);
        sphere.material = materialAmiga;

        sphere.position = new BABYLON.Vector3(Math.random() * 20 - 10, y, Math.random() * 10 - 5);

        shadowGenerator.getShadowMap().renderList.push(sphere);

        sphere.setPhysicsState(BABYLON.PhysicsEngine.SphereImpostor, { mass: 1 });

        y += 2;
    }

    // Link
    var spheres = [];
    for (index = 0; index < 10; index++) {
        sphere = BABYLON.Mesh.CreateSphere("Sphere0", 16, 1, scene);
        spheres.push(sphere);
        sphere.material = materialAmiga2;
        sphere.position = new BABYLON.Vector3(Math.random() * 20 - 10, y, Math.random() * 10 - 5);

        shadowGenerator.getShadowMap().renderList.push(sphere);

        sphere.setPhysicsState(BABYLON.PhysicsEngine.SphereImpostor, { mass: 1 });
    }

    for (index = 0; index < 10; index++) {
        spheres[index].setPhysicsLinkWith(spheres[index + 1], new BABYLON.Vector3(0, 0.5, 0), new BABYLON.Vector3(0, -0.5, 0));
    }

    // Box
    var box0 = BABYLON.Mesh.CreateBox("Box0", 3, scene);
    box0.position = new BABYLON.Vector3(3, 30, 0);
    var materialWood = new BABYLON.StandardMaterial("wood", scene);
    materialWood.diffuseTexture = new BABYLON.Texture("res/image/texture/wood.jpg", scene);
    materialWood.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    box0.material = materialWood;

    shadowGenerator.getShadowMap().renderList.push(box0);

    // Compound
    var part0 = BABYLON.Mesh.CreateBox("part0", 3, scene);
    part0.position = new BABYLON.Vector3(3, 30, 0);
    part0.material = materialWood;

    var part1 = BABYLON.Mesh.CreateBox("part1", 3, scene);
    part1.parent = part0; // We need a hierarchy for compound objects
    part1.position = new BABYLON.Vector3(0, 3, 0);
    part1.material = materialWood;

    shadowGenerator.getShadowMap().renderList.push(part0);
    shadowGenerator.getShadowMap().renderList.push(part1);


    // Playground
    var ground = BABYLON.Mesh.CreateBox("Ground", 1, scene);
    ground.scaling = new BABYLON.Vector3(100, 1, 100);
    ground.position.y = -5.0;
    ground.checkCollisions = true;

    var border0 = BABYLON.Mesh.CreateBox("border0", 1, scene);
    border0.scaling = new BABYLON.Vector3(1, 100, 100);
    border0.position.y = -5.0;
    border0.position.x = -50.0;
    border0.checkCollisions = true;

    var border1 = BABYLON.Mesh.CreateBox("border1", 1, scene);
    border1.scaling = new BABYLON.Vector3(1, 100, 100);
    border1.position.y = -5.0;
    border1.position.x = 50.0;
    border1.checkCollisions = true;

    var border2 = BABYLON.Mesh.CreateBox("border2", 1, scene);
    border2.scaling = new BABYLON.Vector3(100, 100, 1);
    border2.position.y = -5.0;
    border2.position.z = 50.0;
    border2.checkCollisions = true;

    var border3 = BABYLON.Mesh.CreateBox("border3", 1, scene);
    border3.scaling = new BABYLON.Vector3(100, 100, 1);
    border3.position.y = -5.0;
    border3.position.z = -50.0;
    border3.checkCollisions = true;

    var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    groundMat.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    groundMat.backFaceCulling = false;
    ground.material = groundMat;
    border0.material = groundMat;
    border1.material = groundMat;
    border2.material = groundMat;
    border3.material = groundMat;
    ground.receiveShadows = true;

    // Physics
    box0.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 2, friction: 0.4, restitution: 0.3 });
    ground.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 });
    border0.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0 });
    border1.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0 });
    border2.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0 });
    border3.setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, { mass: 0 });

    scene.createCompoundImpostor({
        mass: 2, friction: 0.4, restitution: 0.3, parts: [
        { mesh: part0, impostor: BABYLON.PhysicsEngine.BoxImpostor },
        { mesh: part1, impostor: BABYLON.PhysicsEngine.BoxImpostor }]
    });

    return scene;
};





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
                MfgInit.engine.displayLoadingUI();

                setTimeout(function () {
                    MfgInit.scene = demoConstructor(MfgInit.engine);

                    if (MfgInit.scene.activeCamera) {
                        MfgInit.scene.activeCamera.attachControl(MfgInit.canvas, false);
                    }

                    MfgInit.scene.executeWhenReady(function () {
                        MfgInit.canvas.style.opacity = "1";
                        MfgInit.engine.hideLoadingUI();
                        BABYLON.SceneLoader.ShowLoadingScreen = true;
                        if (then) {
                            then(MfgInit.scene);
                        }
                    });
                }, 15);
            };

            // Render loop
            var renderFunction = function () {
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
            };

            // Resize
            window.addEventListener("resize", function () {
                MfgInit.engine.resize();
            });

            //launch render loop
            MfgInit.engine.runRenderLoop(renderFunction);

            //load the scene
            loadCustomScene(demo.constructor, demo.onload);
        }
    }

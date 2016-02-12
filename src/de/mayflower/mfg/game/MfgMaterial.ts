
    /*****************************************************************************
    *   Specifies the game material.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgMaterial
    {
        public          static              materialMFLogo          :BABYLON.StandardMaterial           = null;
        public          static              materialAmiga          :BABYLON.StandardMaterial            = null;
        public          static              materialGround          :BABYLON.StandardMaterial           = null;
        public          static              materialWood            :BABYLON.StandardMaterial           = null;

        /*****************************************************************************
        *   Inits all materials being used in the game.
        *****************************************************************************/
        public static initMaterials( scene:BABYLON.Scene )
        {
            MfgMaterial.materialMFLogo = new BABYLON.StandardMaterial( "amiga", scene );
            MfgMaterial.materialMFLogo.diffuseTexture = new BABYLON.Texture( "res/image/texture/mfLogo.jpg", scene );
            MfgMaterial.materialMFLogo.emissiveColor = new BABYLON.Color3( 0.5, 0.5, 0.5 );
            MfgMaterial.materialMFLogo.diffuseTexture.uScale = 5;
            MfgMaterial.materialMFLogo.diffuseTexture.vScale = 5;

            MfgMaterial.materialAmiga = new BABYLON.StandardMaterial( "amiga", scene );
            MfgMaterial.materialAmiga.diffuseTexture = new BABYLON.Texture( "res/image/texture/mosaic.jpg", scene );
            MfgMaterial.materialAmiga.emissiveColor = new BABYLON.Color3( 0.5, 0.5, 0.5 );

            MfgMaterial.materialGround = new BABYLON.StandardMaterial( "groundMat", scene );
            MfgMaterial.materialGround.diffuseColor = new BABYLON.Color3( 0.5, 0.5, 0.5 );
            MfgMaterial.materialGround.emissiveColor = new BABYLON.Color3( 0.2, 0.2, 0.2 );
            MfgMaterial.materialGround.backFaceCulling = false;

            MfgMaterial.materialWood = new BABYLON.StandardMaterial("wood", MfgScene.scene);
            MfgMaterial.materialWood.diffuseTexture = new BABYLON.Texture("res/image/texture/wood.jpg", MfgScene.scene);
            MfgMaterial.materialWood.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        }
    }

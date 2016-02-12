
    /*****************************************************************************
    *   Specifies the game material.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgMaterial
    {
        public          static              materialMFLogo          :BABYLON.StandardMaterial           = null;

        public          static              materialAmiga2          :BABYLON.StandardMaterial           = null;

        public          static              groundMat               :BABYLON.StandardMaterial           = null;

        /*****************************************************************************
        *   Inits all materials being used in the game.
        *****************************************************************************/
        public static initMaterials()
        {
            // Materials
            MfgMaterial.materialMFLogo = new BABYLON.StandardMaterial("amiga", MfgScene.scene);
            MfgMaterial.materialMFLogo.diffuseTexture = new BABYLON.Texture("res/image/texture/mfLogo.jpg", MfgScene.scene);
            MfgMaterial.materialMFLogo.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
            MfgMaterial.materialMFLogo.diffuseTexture.uScale = 5;
            MfgMaterial.materialMFLogo.diffuseTexture.vScale = 5;

            MfgMaterial.materialAmiga2 = new BABYLON.StandardMaterial("amiga", MfgScene.scene);
            MfgMaterial.materialAmiga2.diffuseTexture = new BABYLON.Texture("res/image/texture/mosaic.jpg", MfgScene.scene);
            MfgMaterial.materialAmiga2.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);

            MfgMaterial.groundMat = new BABYLON.StandardMaterial("groundMat", MfgScene.scene);
            MfgMaterial.groundMat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
            MfgMaterial.groundMat.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
            MfgMaterial.groundMat.backFaceCulling = false;
        }
    }

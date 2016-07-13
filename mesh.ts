///<reference path="./three.d.ts"/>
///<reference path="./renderscene.ts"/>

class Mesh
{
	m_mesh: THREE.Mesh;
	//m_geometry: THREE.PlaneGeometry;
	//m_geometry: THREE.SphereGeometry;
	m_geometry: THREE.Geometry;
	m_material: THREE.MeshBasicMaterial;
	m_scene: THREE.Scene;

	m_splatShader: THREE.ShaderMaterial;


	//All of this belongs to stuff related to the render to texture
	m_renderCamera : THREE.OrthographicCamera;
	m_textureQuad : THREE.PlaneGeometry;
	m_renderScene : THREE.Scene;
	m_textureRenderTarget : THREE.WebGLRenderTarget;

	constructor(_scene)
	{
		//this.m_geometry = new THREE.PlaneGeometry(300, 300, 64, 64);
		var modelLoader = new THREE.JSONLoader();
		//this.m_geometry = new THREE.SphereGeometry(50,16,16);
		modelLoader.load("monkey.json", (geometry) => {
			// create a mesh using the passed in geometry and textures
			this.m_geometry = geometry;
			
		this.m_material =
			new THREE.MeshBasicMaterial(
				{
					color: 0xCCCC00
				});
		this.m_mesh = new THREE.Mesh(this.m_geometry, this.m_material);
		this.m_mesh.rotation.x = -Math.PI/2;
			_scene.add(this.m_mesh);
			//this.m_mesh.scale.set(20,20,20);
		});
		
		
	}

	//renderer as an argument is temporary!
	paint(_point: THREE.Vector2, _camera: THREE.Camera, _renderer) : void
	{

		var raycaster : THREE.Raycaster = new THREE.Raycaster();

		raycaster.setFromCamera(_point, _camera);
		var intersects = raycaster.intersectObject(this.m_mesh);

		
		if(intersects.length > 0)
		{

			//var imageData = _renderer.domElement.toDataURL();

			//try to load imageData?

			
			var intersect = intersects[0];
			console.log(intersect.uv);

			RenderScene.getInstance().paint(intersect.uv);

			var t=	<THREE.MeshBasicMaterial>this.m_mesh.material;
			t.map = RenderScene.getInstance().getRenderTexture().texture;
			t.needsUpdate=true;			

		}
		
	}

		

	renderToTexture(_renderer) : void
	{
		//render to rendertarget
		//_renderer.render(this.m_renderScene, this.m_renderCamera);
		RenderScene.getInstance().renderToTexture(_renderer);
	}

	

}

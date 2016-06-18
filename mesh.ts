///<reference path="./three.d.ts"/>

class Mesh
{
	m_mesh: THREE.Mesh;
	m_geometry: THREE.PlaneGeometry;
	//m_geometry: THREE.SphereGeometry;
	m_material: THREE.MeshLambertMaterial;
	m_scene: THREE.Scene;

	m_splatShader: THREE.ShaderMaterial;

	constructor(_scene)
	{
		this.m_geometry = new THREE.PlaneGeometry(100, 100, 32, 32);
		//this.m_geometry = new THREE.SphereGeometry(50,16,16);

		this.m_material =
			new THREE.MeshLambertMaterial(
				{
					color: 0xCCCC00
				});
		this.m_mesh = new THREE.Mesh(this.m_geometry, this.m_material);
		_scene.add(this.m_mesh);
	}

	paint(_point: THREE.Vector3, _camera: THREE.Camera) : void
	{

		var raycaster : THREE.Raycaster = new THREE.Raycaster();

		//var direction = new THREE.Vector3( 0, 0, -1 ).transformDirection( _camera.matrixWorld );
		//raycaster.set(_point, direction);
		raycaster.setFromCamera(_point, _camera);
		var intersects = raycaster.intersectObject(this.m_mesh);
		console.log(intersects);
	}
}

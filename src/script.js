import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';




const gui = new GUI()
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()


const ambientLight = new THREE.AmbientLight('#ffffff', 0.009)

scene.add(ambientLight)

// GUI
// gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001)


// MODELES
const loader = new GLTFLoader();
loader.load( 'models/Houseplant.glb', function ( gltf ) {
gltf.scene.scale.set(2,2,2)
gltf.scene.position.set(-0.8,-0.64,-0.8)
	scene.add( gltf.scene );
    let monstera =  gltf.scene.clone()
    let monstera2 =  gltf.scene.clone()
    let monstera3 =  gltf.scene.clone()

    monstera.position.set(3,0.74,-1.5)

    monstera2.position.set(-1.5,-0.64,3.3)
    monstera2.scale.set(1,1,1)

    monstera3.position.set(2.5,0.74,-0.5)
    monstera3.scale.set(1,1,1)

    scene.add(monstera, monstera2, monstera3)

}, undefined, function ( error ) {

	console.error( error );

} );


loader.load( 'models/Lamp.glb', function ( gltf ) {
    gltf.scene.scale.set(2,2,2)
    gltf.scene.position.set(1.5,-2.2,-2)
    gltf.scene.rotation.set(0,3,0)
        scene.add( gltf.scene );
        let lamp2 =  gltf.scene.clone()
        lamp2.position.set(6,-2.2,6)
        lamp2.rotation.set(0,-0.5,0)
        scene.add( gltf.scene, lamp2 );

    
    }, undefined, function ( error ) {
    
        console.error( error );
    
    } );


loader.load( 'models/Rug.glb', function ( gltf ) {
    gltf.scene.scale.set(20,20,20)
    gltf.scene.position.set(-0.3,-0.65,3)

        scene.add( gltf.scene );
        
    }, undefined, function ( error ) {
        
        console.error( error );
        
} );

loader.load( 'models/Couch-Small.glb', function ( gltf ) {
    gltf.scene.scale.set(0.6,0.6,0.6)
    gltf.scene.position.set(5,-0.65,4.5)
    gltf.scene.rotation.set(0,1.2,0)

        scene.add( gltf.scene );
        
    }, undefined, function ( error ) {
        
        console.error( error );
        
} );



loader.load( 'models/Bed-Double.glb', function ( gltf ) {
    gltf.scene.scale.set(1,1,1)
    gltf.scene.position.set(-0.7,-0.65,5)
    gltf.scene.rotation.set(0,1.6,0)
    
        scene.add( gltf.scene );
            
    }, undefined, function ( error ) {
            
        console.error( error );
            
    } );

loader.load( 'models/Table.glb', function ( gltf ) {
    gltf.scene.scale.set(0.2,0.2,0.2)
    gltf.scene.position.set(3,-0.7,-1.4)
    gltf.scene.rotation.set(0,1.6,0)
        
        scene.add( gltf.scene );
                
    }, undefined, function ( error ) {
                
        console.error( error );
                
    } );

loader.load( 'models/Watering-Can.glb', function ( gltf ) {
    gltf.scene.scale.set(0.35,0.35,0.35)
    gltf.scene.position.set(2,0.03,1)
    gltf.scene.rotation.set(0,1,0)
    
    scene.add( gltf.scene );
    console.log(gltf.scene)
    
    }, undefined, function ( error ) {
    
        console.error( error );
    
    } );
    

    let maxwell;

loader.load('models/Maxwell.glb', function (gltf) {
    gltf.scene.scale.set(0.35,0.35,0.35)
    gltf.scene.position.set(-1,-0.6,1.5)
    gltf.scene.rotation.set(0,1.8,0)
    
    scene.add(gltf.scene);
    maxwell = gltf.scene;  

}, undefined, function (error) {
    console.error(error);
});


loader.load( 'models/Doorway.glb', function ( gltf ) {
    gltf.scene.scale.set(4,4,4)
    gltf.scene.position.set(7.2,-0.5,1)
    gltf.scene.rotation.set(0,1.5,0)
    
    scene.add( gltf.scene );
    console.log(gltf.scene)
    
    }, undefined, function ( error ) {
    
        console.error( error );
    
    } );



//MATERIALS
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    material
)

const wall1 = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    material
)

const wall2 = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    material
)
const wall3 = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    material
)
const wall4 = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    material
)

plane.rotation.x = - Math.PI * 0.5
plane.position.set(2.5, -0.65, 2.5)
wall1.position.set(2.5, 4.3, -2.5)
wall2.position.set(-2.5, 4.3, 2.5)
wall2.rotation.y = Math.PI * 0.5
wall3.position.set(2.5, 4.3, 7.4)
wall3.rotation.y = Math.PI * 1
wall4.position.set(7.4, 4.3, 2.5)
wall4.rotation.y = Math.PI * 1.5


scene.add(plane, wall1, wall2, wall3, wall4)


// SIZES
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

// CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.2, 100)
camera.position.set(2, 4, 2)
scene.add(camera)

// TORCH
const flashlight = new THREE.SpotLight('#FFFDEF', 4.5, 30, Math.PI * 0.1, 0.25, 1);
flashlight.position.set(0,0,1);
flashlight.target = camera;
camera.add(flashlight);

// CONTROLS CAMERA
const controls = new OrbitControls(camera, canvas)


const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


let time = 0;
const tick = () => {
    time += 0.1; 

    if (maxwell) {
        maxwell.rotation.x = Math.sin(time); 
    }

    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

tick();
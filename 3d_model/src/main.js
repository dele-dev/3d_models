import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


/***
 * 
 * set up a scene 
 *  
 *  */ 
const scene = new THREE.Scene();


// create geometyry and mesh

// const cubeGeometry = new THREE.BoxGeometry(1,1,1,2,2,2);
// const cubeGeometry = new THREE.SphereGeometry(1,16,16);
const cubeGeometry = new THREE.TorusKnotGeometry(15,3,100,16);



// create custome geometry
const vertices = new Float32Array([
  0,0,0,
  0,2,0,
  2,0,0
]);

const bufferAttribute = new THREE.BufferAttribute(vertices,3);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', bufferAttribute);


const circleMaterial = new THREE.MeshBasicMaterial(
  {
    color:"red",
    wireframe:true
  }
);

// create Mesh 
const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  circleMaterial
);

// cubeMesh.rotation.x = THREE.MathUtils.degToRad(90);

// const cubeMesh1 = new THREE.Mesh(
//   cubeGeometry,
//   circleMaterial
// );
// cubeMesh1.position.x = 2;

// const cubeMesh2 = new THREE.Mesh(
//   cubeGeometry,
//   circleMaterial
// );
// cubeMesh2.position.x = -2;

// add mesh to scene
// const group = new THREE.Group();
// group.add(cubeMesh);
// group.add(cubeMesh1);
// group.add(cubeMesh2);

//group.position.y = 2

scene.add(cubeMesh)


// get width and height of the window
const width_ = window.innerWidth;
const height_ = window.innerHeight;


// add axies helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);



// initialize the camera
const camera = new THREE.PerspectiveCamera(45,
  width_/height_,
  0.12,
  45
);

// const aspectRatio = width_/height_;

// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   200
// );

camera.position.z = 5 ;

// add camera to scene
//scene.add(camera);

// create render
const canvas = document.querySelector("canvas.threejs");

const renderer =   new THREE.WebGLRenderer({
  canvas : canvas ,
  antialias: true
});

renderer.setSize(width_,height_);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//instantiate the controls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;
controls.autoRotate = true;

// resive window
window.addEventListener('resize', () =>{

  camera.aspect = width_/height_;
  camera.updateProjectionMatrix ();
  renderer.setSize(width_,height_);

});

// initiate the clock
const clock = new THREE.Clock();
let previousTime = 0;

// render scence
function renderLoop () {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime ;

  previousTime = currentTime ;

  cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 20 ;

  controls.update();

  // render the scene together with the camera
  renderer.render(scene,camera);
  window.requestAnimationFrame(renderLoop);

}

renderLoop();


console.log(scene,cubeMesh)
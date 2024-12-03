import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


/***
 * 
 * set up a scene 
 *  
 *  */ 
const scene = new THREE.Scene();


// create geometyry and mesh

const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const circleMaterial = new THREE.MeshBasicMaterial(
  {
    color:"red",
  }
);

// create Mesh 
const roundMesh = new THREE.Mesh(
  cubeGeometry,
  circleMaterial
);

const roundMesh1 = new THREE.Mesh(
  cubeGeometry,
  circleMaterial
);
roundMesh1.position.x = 2;

const roundMesh2 = new THREE.Mesh(
  cubeGeometry,
  circleMaterial
);
roundMesh2.position.x = -2;

// add mesh to scene
const group = new THREE.Group();
group.add(roundMesh);
group.add(roundMesh1);
group.add(roundMesh2);

group.position.y = 2

scene.add(group)


// get width and height of the window
const width_ = window.innerWidth;
const height_ = window.innerHeight;


// add axies helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);



// initialize the camera
const camera = new THREE.PerspectiveCamera(35,
  width_/height_,
  0.1,
  35
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

// render scence
function renderLoop () {

  controls.update();

  // render the scene together with the camera
  renderer.render(scene,camera);

  window.requestAnimationFrame(renderLoop);

}

renderLoop();


console.log(scene,roundMesh)
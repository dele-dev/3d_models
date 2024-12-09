import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";


// shining light effect to the code
// and adding pane 


/***
 * 
 * set up a scene 
 *  
 *  */ 
const scene = new THREE.Scene();

//initialize the pane
const pane = new Pane();


// create geometyry and mesh

const cubeGeometry = new THREE.BoxGeometry(1,1,1);
// const cubeGeometry = new THREE.BoxGeometry(1,1,1,2,2,2);
// const cubeGeometry = new THREE.SphereGeometry(1,1 6,16);
//  const cubeGeometry = new THREE.TorusKnotGeometry();
const planeGeometry = new THREE.PlaneGeometry(1,1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5,0.15, 100, 16);

// create custome geometry
// const vertices = new Float32Array([
//   0,0,0,
//   0,2,0,
//   2,0,0
// ]);

// const bufferAttribute = new THREE.BufferAttribute(vertices,3);

// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute('position', bufferAttribute);


// const cubeMaterial = new THREE.MeshBasicMaterial(
//   {
//     color: 0xffffff,
//     transparent: true,
//     opacity:0.5
//   }
// );

const cubeMaterial = new THREE.MeshPhongMaterial(); // shining light effect to the code
cubeMaterial.shininess = 90;

const PARAMS = {
  min : 0,
  max: 100,
  step: 1
}


pane.addBinding(cubeMaterial, "shininess",PARAMS);


// const circleMaterial = new THREE.MeshBasicMaterial(
//   {
//     color:"red",
//     wireframe:true
//   }
// );

// create Mesh 
const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
);

// cubeMesh.rotation.x = THREE.MathUtils.degToRad(90);

const cubeMesh1 = new THREE.Mesh(
  torusKnotGeometry,
  cubeMaterial
);

cubeMesh1.position.x = 1.5;

const plane = new THREE.Mesh(
  planeGeometry,
  cubeMaterial
);
plane.position.x = -1.5;

// add mesh to scene
// const group = new THREE.Group();
// group.add(cubeMesh);
// group.add(cubeMesh1);
// group.add(cubeMesh2);

//group.position.y = 2
// cubeMaterial.side = THREE.FrontSide;
// cubeMaterial.fog =false;

// const fog = new THREE.Fog(0xffffff,1,10);
// scene.background = new THREE.Color("black");
// scene.fog =fog;

scene.add(cubeMesh);
scene.add(cubeMesh1);
scene.add(plane);

// initialize the light
const light = new THREE.AmbientLight(0xffffff, 0.2) ;
scene.add(light);

//  create point light
const pointLight = new THREE.PointLight(0xffffff, 0.3);
pointLight.position.set(5,5,5);
scene.add(pointLight);

// get width and height of the window
const width_ = window.innerWidth;
const height_ = window.innerHeight;


// add axies helper
// const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);



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
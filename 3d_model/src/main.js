import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";


// set up
// And the texture
 


/***
 * 
 * set up a scene 
 *  
 *  */ 
const scene = new THREE.Scene();

// initialize loader
const textureLoader = new THREE.TextureLoader();

//initialize the pane
const pane = new Pane();


// create geometyry and mesh

const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const planeGeometry = new THREE.PlaneGeometry(1,1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5,0.15, 100, 16);
const spareGeometry = new THREE.SphereGeometry(0.5,32,32);
const cylinderGeometry = new THREE.CylinderGeometry(0.5,0.5,1,32);


// initialize the texture
const textureTest = textureLoader.load("/testures/14.PNG");

// initialize the material
// const cubeMaterial = new THREE.MeshStandardMaterial();
const cubeMaterial = new THREE.MeshBasicMaterial();
 cubeMaterial.map =  textureTest
//  cubeMaterial.color = new THREE.Color('red');

//initialize a group
const group = new THREE.Group();

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
plane.rotation.x = Math.PI * 0.5;

const sphere = new THREE.Mesh();
sphere.geometry = spareGeometry;
sphere.material = cubeMaterial
sphere.position.y = 1.5 

const cylinder = new THREE.Mesh();
cylinder.geometry = cylinderGeometry;
cylinder.material = cubeMaterial;
cylinder.position.y = -1.5


// add to scene
// group.add(cubeMesh,cubeMesh1,plane,sphere,cylinder);
group.add(plane);

scene.add(group);

// initialize the light
const light = new THREE.AmbientLight(0xffffff, 0.4) ;
scene.add(light);

//  create point light
const pointLight = new THREE.PointLight(0xffffff, 0.9);
pointLight.position.set(5,5,5);
scene.add(pointLight);

// get width and height of the window
const width_ = window.innerWidth;
const height_ = window.innerHeight;

// initialize the camera
const camera = new THREE.PerspectiveCamera(45,
  width_/height_,
  0.12,
  45
);

camera.position.z = 5 ;

// add camera to scene
scene.add(camera);

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
// controls.enableDamping = true;
// controls.autoRotate = true;

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

  // group.children.forEach(child => {
  //   if(child instanceof THREE.Mesh){
  //     child.rotation.y += 0.01;
  //   }
  // })
  
  controls.update();
  // render the scene together with the camera
  renderer.render(scene,camera);
  window.requestAnimationFrame(renderLoop);

}

renderLoop();


console.log(scene,cubeMesh)
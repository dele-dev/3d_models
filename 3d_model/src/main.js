import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";


// Introduction to solar system using three js
// moving objects along obits



/***
 * 
 * set up a scene 
 *  
 *  */ 
const scene = new THREE.Scene();


// add stuff to our scene
const spareGeometry = new THREE.SphereGeometry(1, 32, 32);

//create sun material
const sunMaterial =  new THREE.MeshBasicMaterial({
  color:0xfff700
});

const sun = new THREE.Mesh(
  spareGeometry,
    sunMaterial
);
sun.scale.setScalar(5)

//create sun material
const earthMaterial =  new THREE.MeshBasicMaterial({
  color:"blue"
});

const earth = new THREE.Mesh(
  spareGeometry,
  earthMaterial
);
earth.position.x = 10


// create moon 
const moonMaterial = new THREE.MeshBasicMaterial(
  {
    color:"grey"
  }
)

// moon 
const moon = new THREE.Mesh(
  spareGeometry,
  moonMaterial
);

moon.scale.setScalar(0.3)
moon.position.x = 2




// add moon to earth 
earth.add(moon)

// sun.add(earth)

// add sun to scene
// add earth
scene.add(sun);
scene.add(earth);


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
const camera = new THREE.PerspectiveCamera(35,
  width_/height_,
  0.12,
  400
);

camera.position.z = 100 ;
camera.position.y = 5

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
controls.enableDamping = true
controls.maxDistance = 200
controls.minDistance = 20

// resive window
window.addEventListener('resize', () =>{
  camera.aspect = width_/height_;
  camera.updateProjectionMatrix ();
  renderer.setSize(width_,height_);
});


// initialize a clock
const clock = new THREE.Clock();

// render scence
function renderLoop () {

    const elapsedTime = clock.getElapsedTime()

  // add animation here
  earth.rotation.y +=0.01

  earth.position.x = Math.sin(elapsedTime) * 10
  earth.position.z = Math.cos(elapsedTime) * 10

  moon.position.x - Math.sin(elapsedTime) * 2 
  moon.position.z - Math.cos(elapsedTime) * 2 
  
  controls.update();
  // render the scene together with the camera
  renderer.render(scene,camera);
  window.requestAnimationFrame(renderLoop);

}

renderLoop();


console.log(scene,sun)
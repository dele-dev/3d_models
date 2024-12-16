import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";


// Introduction to solar system using three js
// moving objects along obits
// plant array


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


// add sun to scene
scene.add(sun);

// planet array
const planets = [
    {
      name: 'Mecury',
      radius: 0.5,
      distance: 10,
      speed: 0.01,
      material: mecuryMaterial
      moons:[]
    },
    {
      name: 'Venus',
      radius: 0.8,
      distance: 15,
      speed: 0.007,
      material: venusMaterial
      moons:[]
    },
    {
      name: 'Earth',
      radius: 1,
      distance: 20,
      speed: 0.005,
      material: earthMaterial
      moons:[
        {
          name:"Moon",
          radius: 0.3,
          distance: 3,
          speed: 0.015
        }
      ]
    },
    {
      name: 'Mars',
      radius: 0.7,
      distance: 25,
      speed: 0.003,
      material: marsMaterial
      moons:[
        {
          name:"Phobos",
          radius: 0.1,
          distance: 2,
          speed: 0.02
        },
        {
          name:"Deimos",
          radius: 0.2,
          distance: 3,
          speed: 0.015,
          color: 0xffffff,
        },
      ]
    },
]


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


// render scence
function renderLoop () {

  controls.update();
  // render the scene together with the camera
  renderer.render(scene,camera);
  window.requestAnimationFrame(renderLoop);

}

renderLoop();


console.log(scene,sun)
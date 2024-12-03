import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


/***
 * 
 * set up a scene 
 *  
 *  */ 
const scene = new THREE.Scene();


// create geometyry and mesh

const circleGeometry = new THREE.CircleGeometry;
const circleMaterial = new THREE.MeshBasicMaterial(
  {
    color:"red",
  }
);

// create Mesh 
const roundMesh = new THREE.Mesh(
  circleGeometry,
  circleMaterial
)

// add mesh to scene
scene.add(roundMesh)


// get width and height of the window
const width_ = window.innerWidth;
const height_ = window.innerHeight;


// initialize the camera
const camera = new THREE.PerspectiveCamera(35,
  width_/height_,
  0.1,
  35
);

camera.position.z = 5 ;

// add camera to scene
//scene.add(camera);

// create render
const canvas = document.querySelector("canvas.threejs");

const renderer =   new THREE.WebGLRenderer({
  canvas : canvas 
});

renderer.setSize(width_,height_);


//instantiate the controls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;
controls.autoRotate = true;

function renderLoop () {

  controls.update();
  
  // render the scene together with the camera
  renderer.render(scene,camera);

  window.requestAnimationFrame(renderLoop);

}

renderLoop();


console.log(scene,roundMesh)
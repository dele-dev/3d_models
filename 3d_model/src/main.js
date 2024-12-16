import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";


// Introduction to solar system using three js



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


// adding stuff to my planet
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

//sun material
const sunMaterial = new THREE.MeshBasicMaterial(
  {
  color:0xfff700
});


// create sun
const sun = new THREE.Mesh(
  sphereGeometry,
  sunMaterial
)


// add sun to scene
scene.add(sun);

// const cubeGeometry = new THREE.BoxGeometry(1,1,1);
// const uv2 = new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2);
// cubeGeometry.setAttribute('uv2',uv2);


// const planeGeometry = new THREE.PlaneGeometry(1,1);
// const uv2PlaneGeometry = new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2);
// cubeGeometry.setAttribute('uv2',uv2PlaneGeometry);


// const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5,0.15, 100, 16);
// const uv2TorusKnotGeometry = new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2);
// cubeGeometry.setAttribute('uv2',uv2TorusKnotGeometry);


// const spareGeometry = new THREE.SphereGeometry(0.5,32,32);
// const uv2SpareGeometry = new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2);
// cubeGeometry.setAttribute('uv2',uv2SpareGeometry);

// const cylinderGeometry = new THREE.CylinderGeometry(0.5,0.5,1,32);
// const uv2CylinderGeometry = new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2);
// cubeGeometry.setAttribute('uv2',uv2CylinderGeometry);

// // initialize the texture
// const grassTexture = textureLoader.load("/testures/14.PNG"); // try another texture
// // const grassTexture1 = textureLoader.load("/testures/12.PNG"); // try another texture
// // const grassTexture2 = textureLoader.load("/testures/13.PNG"); // try another texture
// const grassTextureAmbientOcclusion = textureLoader.load("/testures/Stylized_Wood_Floor_001_SD/Stylized_Wood_Floor_001_ambientOcclusion.png"); // try another texture
// const grassTextureRoughness = textureLoader.load("/testures/Stylized_Wood_Floor_001_SD/Stylized_Wood_Floor_001_roughness.png"); // try another texture
// const grassTextureMetallic= textureLoader.load("/testures/Stylized_Wood_Floor_001_SD/Stylized_Wood_Floor_001_metallic.png"); // try another texture
// const grassTextureBase = textureLoader.load("/testures/Stylized_Wood_Floor_001_SD/Stylized_Wood_Floor_001_basecolor.png"); // try another texture
// const grassTextureHeight = textureLoader.load("/testures/Stylized_Wood_Floor_001_SD/Stylized_Wood_Floor_001_height.png"); // try another texture
// const grassTextureNormal = textureLoader.load("/testures/Stylized_Wood_Floor_001_SD/Stylized_Wood_Floor_001_normal.png"); // try another texture



// // initialize the texture
// const woodTexture = textureLoader.load("/testures/Stylized_Metal_Shingles_001_SD/untitled2.png"); // try another texture
// const woodTextureAmbientOcclusion = textureLoader.load("/testures/Stylized_Metal_Shingles_001_SD/Stylized_Metal_Shingles_001_ambientOcclusion.png"); // try another texture
// const woodTextureRoughness = textureLoader.load("/testures/Stylized_Metal_Shingles_001_SD/Stylized_Metal_Shingles_001_roughness.png"); // try another texture
// const woodTextureMetallic= textureLoader.load("/testures/Stylized_Metal_Shingles_001_SD/Stylized_Metal_Shingles_001_metallic.png"); // try another texture
// const woodTextureBase = textureLoader.load("/testures/Stylized_Metal_Shingles_001_SD/Stylized_Metal_Shingles_001_basecolor.png"); // try another texture
// const woodTextureHeight = textureLoader.load("/testures/Stylized_Metal_Shingles_001_SD/Stylized_Metal_Shingles_001_height.png"); // try another texture
// const woodTextureNormal = textureLoader.load("/testures/Stylized_Metal_Shingles_001_SD/Stylized_Metal_Shingles_001_normal.png"); // try another texture




// // initialize the material
// const cubeMaterial = new THREE.MeshStandardMaterial();
// // const cubeMaterial = new THREE.MeshBasicMaterial();
//  cubeMaterial.map =  grassTexture
// cubeMaterial.roughnessMap = grassTextureRoughness
// cubeMaterial.roughness = 1

// cubeMaterial.metalnessMap =  grassTextureMetallic
// cubeMaterial.metalness = 1

// cubeMaterial.normalMap = grassTextureNormal

// // cubeMaterial.displacementMap =  grassTextureHeight
// // cubeMaterial.displacementScale = 10

// cubeMaterial.aoMap = grassTextureAmbientOcclusion
// cubeMaterial.aoMapIntensity = 0.99


// // initialize the wood material
// const woodMaterial = new THREE.MeshStandardMaterial();
// // const cubeMaterial = new THREE.MeshBasicMaterial();
// woodMaterial.map =  woodTexture
// woodMaterial.roughnessMap = woodTextureRoughness
// woodMaterial.roughness = 1

// woodMaterial.metalnessMap =  woodTextureMetallic
// woodMaterial.metalness = 1

// woodMaterial.normalMap = woodTextureNormal


// woodMaterial.aoMap = woodTextureAmbientOcclusion
// woodMaterial.aoMapIntensity = 0.99



// //  cubeMaterial.color = new THREE.Color('red');

// //initialize a group
// const group = new THREE.Group();

// // create Mesh 
// const cubeMesh = new THREE.Mesh(
//   cubeGeometry,
//   cubeMaterial
// );

// // cubeMesh.rotation.x = THREE.MathUtils.degToRad(90);

// const cubeMesh1 = new THREE.Mesh(
//   torusKnotGeometry,
//   cubeMaterial
// );

// cubeMesh1.position.x = 1.5;

// const plane = new THREE.Mesh(
//   planeGeometry,
//   cubeMaterial
// );
// plane.position.x = -1.5;

// const sphere = new THREE.Mesh();
// sphere.geometry = spareGeometry;
// sphere.material = cubeMaterial
// sphere.position.y = 1.5 

// const cylinder = new THREE.Mesh();
// cylinder.geometry = cylinderGeometry;
// cylinder.material = woodMaterial;
// cylinder.position.y = -1.5


// // add to scene
// group.add(cubeMesh,cubeMesh1,plane,sphere,cylinder);
// // group.add(plane);

// scene.add(group);

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
  2000
);

camera.position.z = 10 ;
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
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";


// Introduction to solar system using three js
// moving objects along obits
// plant array
// adding helper function and add texture loader
// automating mesh generation
// animating planets 
// final touches on light and add background  url  { https://polyhaven.com/hdris , https://matheowis.github.io/HDRI-to-CubeMap/ } 


/***
 * 
 * set up a scene 
 *  
 *  */ 
const scene = new THREE.Scene();



// add texttureLoader
const texttureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath("/testures/cubeMap/")


// adding texttures to materials
const sunTexture = texttureLoader.load("/testures/sun.jpg"); // sun texture
const mecuryTexture = texttureLoader.load("/testures/2k_mercury.jpg"); // mecury texture
const venusTexture = texttureLoader.load("/testures/4k_venus_atmosphere.jpg"); // venus texture
const earthTexture = texttureLoader.load("/testures/2k_earth_daymap.jpg"); // earth texture
const marsTexture = texttureLoader.load("/testures/2k_mars.jpg"); // mars texture
const moonTexture = texttureLoader.load("/testures/2k_moon.jpg"); // moon texture

const backgroundCubemap = cubeTextureLoader.load([
    "px.png",
    "nx.png",
    "py.png",
    "ny.png",
    "pz.png",
    "nz.png"
]);


scene.background = backgroundCubemap

// add stuff to our scene
const spareGeometry = new THREE.SphereGeometry(1, 32, 32);

//create sun material
const sunMaterial =  new THREE.MeshBasicMaterial({
  map:sunTexture
});


const sun = new THREE.Mesh(
  spareGeometry,
    sunMaterial
);
sun.scale.setScalar(5)


//create sun material
const mecuryMaterial =  new THREE.MeshStandardMaterial({
  map:mecuryTexture
});

//create sun material
const venusMaterial =  new THREE.MeshStandardMaterial({
  map:venusTexture
});

//create sun material
const earthMaterial =  new THREE.MeshStandardMaterial({
  map:earthTexture
});

//create sun material
const marsMaterial =  new THREE.MeshStandardMaterial({
  map:marsTexture
});

//create sun material
const moonMaterial =  new THREE.MeshStandardMaterial({
  map:moonTexture
});



// add sun to scene
scene.add(sun);

// planet array
const planets = [
    {
      name: 'Mecury',
      radius: 0.5,
      distance: 10,
      speed: 0.01,
      material: mecuryMaterial,
      moons:[]
    },
    {
      name: 'Venus',
      radius: 0.8,
      distance: 15,
      speed: 0.007,
      material: venusMaterial,
      moons:[]
    },
    {
      name: 'Earth',
      radius: 1,
      distance: 20,
      speed: 0.005,
      material: earthMaterial,
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
      material: marsMaterial,
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



const createPlanet = (planet) => {
  // create Mesh and add it to the scene

      // create mesh
      const planetMesh = new THREE.Mesh(
        spareGeometry,
        planet.material
      );
      // set planet scale
      planetMesh.scale.setScalar(planet.radius)

      // set planet position
      planetMesh.position.x = planet.distance

      return planetMesh;
  
}

const createMoon = (moon) => {
  // create Mesh and add it to the planet
    
      // add to planet
      const moonMesh = new THREE.Mesh(
        spareGeometry,
        moonMaterial
      )
      moonMesh.scale.setScalar(moon.radius)
      moonMesh.position.x = moon.distance ;


    return moonMesh

}

const planetMeshes = planets.map((planet) => {

    const planetMesh = createPlanet (planet);
    // add it to scene
    scene.add(planetMesh)

    // loop through moons if exist create the moon 
    planet.moons.forEach((moon) => {
          const moonMesh = createMoon(moon);

          planetMesh.add(moonMesh)
    });

    return planetMesh
});

// get width and height of the window
const width_ = window.innerWidth;
const height_ = window.innerHeight;


// // add lights to scene
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);


const pointLight = new THREE.PointLight(0xffffff, 15);

// // add light to scene
scene.add(pointLight);

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

  planetMeshes.forEach((planet, planetIndex) => {
    planet.rotation.y +=  planets[planetIndex].speed;

    planet.position.x = Math.sin(planet.rotation.y) * planets[planetIndex].distance
    planet.position.z = Math.cos(planet.rotation.y) * planets[planetIndex].distance

    planet.children.forEach((moon,moonIndex) => {
          moon.rotation.y += planets[planetIndex].moons[moonIndex].speed

          moon.position.x = Math.sin(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance 
          moon.position.z = Math.cos(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance 
    } )
  })

  controls.update();
  // render the scene together with the camera
  renderer.render(scene,camera);
  window.requestAnimationFrame(renderLoop);

}

renderLoop();


console.log(scene,sun)
import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// get width and height of the window
const width = window.innerWidth;
const height = window.innerHeight;

// create render
const renderer =    new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(width,height);

//add renderer to body of the HTML
document.body.appendChild(renderer.domElement);


/**
 * ALL ATTRIBUTE OF 
 * CAMERA
 * **/
const fov = 75 ; // in degree(s)
const aspect = width / height ; // in degree(s)
const near = 0.1 ; // in degree(s)
const far = 10 ; // in degree(s)
 

// set up camera for the scene
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far );
camera.position.y = 2; // this control/ position the camera



// initialize orbit control 
const controls = new OrbitControls (camera, renderer.domElement) ;
controls.enableDamping = true;
controls.dampingFactor = 0.0;


/***
 * 
 * set up a scene 
 *  
 *  */ 
const scene = new THREE.Scene();

// create geometry 
const geometry = new THREE.IcosahedronGeometry(1.0, 2);

// create metrials
const metrials = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    flatShading: true
});

//create mesh
const mesh = new THREE.Mesh(geometry, metrials);

//add mesh to scene 
scene.add(mesh);


// create wire frame material
const wireMeshMaterial = new THREE.MeshBasicMaterial({
    color:0xffffff,
    wireFrame : true
});

// create wire mesh
const wireMesh = new THREE.Mesh(geometry,wireMeshMaterial);      

//scale wire frame
wireMesh.scale.setScaler(1.001);

// add wire mesh to mesh  
mesh.add(wireMesh);

// create like
const hemiLight = new THREE.HemisphereLight(0x0099ff,0xaa5500);


//add light to scene
scene.add(hemiLight);


// add animation
function animate(t = 0 ) {

    requestAnimationFrame(animate);

    // rotate the mesh 
    mesh.rotation.y = t * 0.0001;

    // render the scene together with the camera
    renderer.render(scene,camera);

    controls.update();
}

animate();


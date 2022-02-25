import './style.css';

//it takes secene, camera and renderer to show animaions
import * as THREE from 'three';


//container to hold all elements
const scene = new THREE.Scene();

//there are many cameras but this is like human eye
// 4 arguments on note pad
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);

//render graphics to screen
// it takes canvas element as object
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

//set pixels ration according to device uyou using
renderer.setPixelRatio(window.devicePixelRatio);
//set renderer size to all visible screen
renderer.setSize(window.innerWidth, window.innerHeight);
//move camera at z axis
camera.position.setX(30);
camera.position.setY(10);

//render methods that takes scene + camera
renderer.render(scene, camera);

// ring shape
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//wrapping shape
const material = new THREE.MeshStandardMaterial({ color: 0x00FF00});
// mesh combile shape and wrappping
const torus = new THREE.Mesh(geometry, material);
//add it to scene
scene.add(torus);




//add Lights on shape
const pointLight = new THREE.PointLight(0xffffff);
//set light position in 3 axis
pointLight.position.set(9, 15, 10);
//ambient light is like light in room and throw light equally everywhere
// const ambientLight = new THREE.AmbientLight(0xffffff);
//add light to screen
scene.add(pointLight);

//show light source position on screen, for developer only
// const lighthelper = new THREE.PointLightHelper(pointLight);
// scene.add(lighthelper)


function addStar() 
{
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background img
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar
const jeffTexture = new THREE.TextureLoader().load('jeff.png');

const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));

scene.add(jeff);

// earth
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;

// Scroll Animation

function moveCamera() 
{
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop that re render shape again and again to create animations
function animate() 
{
  requestAnimationFrame(animate);

  //animation duration from 0 to 1  
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01; 

  moon.rotation.x += 0.005;
  moon.rotation.y +=0.003

  //render again on screen
  renderer.render(scene, camera);
}

animate();

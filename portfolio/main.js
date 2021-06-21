import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x121212);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusKnotGeometry(10, 3, 90, 16);
const material = new THREE.MeshStandardMaterial({
  color: 0x008296,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function addStar() {
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

// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);
// const controls = new OrbitControls(camera, renderer.domElement);

function moveCamera() {
  // Get viewport dimensions
  const top = document.body.getBoundingClientRect().top;

  // Move camera
  camera.position.x = top * -0.002;
  camera.position.y = top * -0.002;
  camera.position.z = top * -0.01;
}

// Move camera when page is scrolled
document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.003;

  // controls.update();

  renderer.render(scene, camera);
}

animate();

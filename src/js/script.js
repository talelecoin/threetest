import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
)

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(10,10,10);

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color:0x00FF00});
const box = new THREE.Mesh(boxGeometry,boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshBasicMaterial({
    color:0xFFFFFF,
    side:THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane);
plane.rotation.y = -0.5 * Math.PI;


const gridHelper = new THREE.GridHelper(30,50);
scene.add(gridHelper);


const sphereGeometry = new THREE.SphereGeometry(40,5,10);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color:0x0000FF,
    wireframe:true,
});
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphere);

function animate(time){
    box.rotation.x=time/1000;
    box.rotation.y=time/1000;
    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate);
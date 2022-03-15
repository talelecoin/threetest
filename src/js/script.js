import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

const sunsetURL = new URL('../models/scene.glb', import.meta.url);

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

camera.position.set(0,0,40);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

renderer.render(scene,camera);


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


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


const gridHelper = new THREE.GridHelper(30,50);
scene.add(gridHelper);


const sphereGeometry = new THREE.SphereGeometry(40,5,10);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color:0x0000FF,
    wireframe:true,
});
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphere);

const assetLoader = new GLTFLoader();

assetLoader.load(sunsetURL.href, function(gltf){
    const model = gltf.scene;
    scene.add(model);
    model.position.set(0,0,0);
},undefined,function(error){
    console.log(error);
})

const gui = new dat.GUI();

const options = {
    sphereColor: '#ddea00',
    wireframe: false,
    planeRotateX:2,
    planeRotateY:2,
    planeRotateZ:2,
};

gui.addColor(options, 'sphereColor').onChange(function(e){
    sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange(function(e){
    sphere.material.wireframe = e;
})

gui.add(options, 'planeRotateX').onChange(function(e){
    plane.rotation.x = e;
})
gui.add(options, 'planeRotateY').onChange(function(e){
    plane.rotation.y = e;
})
gui.add(options, 'planeRotateZ').onChange(function(e){
    plane.rotation.z = e;
})

function animate(time){
    box.rotation.x=time/1000;
    box.rotation.y=time/1000;
    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate);
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Crear la escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Configurar controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(2, 2, 5);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Luz ambiental
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Luz direccional
directionalLight.position.set(5, 5, 5); // Posición de la luz
scene.add(directionalLight);

var gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// Modelo Personaje GLB
const loader = new GLTFLoader();
loader.load('./src/modelo/ModeloSebas.glb', function(glb) {
    const model = glb.scene; // Almacenar el modelo en una variable
    model.scale.set(50, 50, 50); // Ajustar la escala si es necesario
    model.position.set(0, 1.5, 0); // Ajustar la posición si es necesario
    scene.add(model); // Agregar el modelo a la escena
}, undefined, function(error) {
    console.error("Error al cargar el modelo:", error);
});

// Función de animación
function animate() {
    controls.update(); // Actualizar controles
    renderer.render(scene, camera); // Renderizar la escena
}

// Manejar el cambio de tamaño de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
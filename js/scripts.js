import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const renderer = new THREE.WebGL1Renderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 25);

const orbit = new OrbitControls(camera, renderer.domElement);

const gltfLoader = new GLTFLoader();
const rgbeLoader = new RGBELoader();

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

rgbeLoader.load('./assets/rural_asphalt_road_4k.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;

    gltfLoader.load('./assets/scene.gltf', function (gltf) {
        const model = gltf.scene;

        // Ajuste de posição e escala
        model.position.set(0, 0, 0);

        // Adicione o modelo à cena
        scene.add(model);

        // Defina o alvo da câmera para o modelo
        camera.lookAt(model.position);
    }, undefined, function (error) {
        console.error('Erro ao carregar o modelo GLTF:', error);
    });
}, undefined, function (error) {
    console.error('Erro ao carregar a textura HDR:', error);
});

function animate(time) {
    // Renderize a cena
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Limpar recursos ao fechar a página
window.addEventListener('beforeunload', function () {
    // Descarregar recursos, se necessário
    // Por exemplo, dispose() de texturas, geometrias, etc.
});






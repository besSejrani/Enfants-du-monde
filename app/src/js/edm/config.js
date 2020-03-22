import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//==============================================================================================================================

// Initialisation THREE JS
// http://www.ianww.com/blog/2014/02/17/making-a-skydome-in-THREE-dot-js/
export let scene = new THREE.Scene();
export let rendererWidth = window.innerWidth;
export let rendererHeight = window.innerHeight;

export let camera = new THREE.PerspectiveCamera(75, rendererWidth / rendererHeight, 0.1, 50000);
export let camSpherical = new THREE.Spherical();
export let camPos = new THREE.Vector3();
export let renderer = new THREE.WebGLRenderer();
export let controls = new OrbitControls(camera, renderer.domElement);
export let raycaster = new THREE.Raycaster();
export let mouse = new THREE.Vector2();
export let data = [];

//==============================================================================================================================

// Creation of the canvas
export let container = renderer.domElement;
container.id = "CanvContainer";
container.className = "canvas";

//==============================================================================================================================

export const userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

//==============================================================================================================================

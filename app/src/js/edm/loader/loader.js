import * as THREE from "three";
import * as Config from "../config";

import WorkerProcessImages from "./loadImages.worker";

import images from "../../../data/images.json";
import Earth from "../../../assets/images/earth.webp";

//==============================================================================================================================

const textureLoader = new THREE.TextureLoader();

// Show element
let showSearchButton = document.getElementById("showSearch");
showSearchButton.style.display = "block";
// container.style.display = "block";

let index = 0;

// base plane
let plane = new THREE.PlaneGeometry(100, 125);
let material = new THREE.MeshBasicMaterial({ color: 0xffffff });

let nbImagesLat = [
  0,
  0,
  0,
  0,
  2,
  2,
  2,
  2,
  4,
  4,
  4,
  6,
  6,
  6,
  6,
  8,
  8,
  8,
  8,
  10,
  10,
  10,
  10,
  10,
  10,
  12,
  12,
  12,
  12,
  12,
  12,
  12,
  12,
  12,
  12,
  12,
  12,
  10,
  10,
  10,
  10,
  10,
  10,
  8,
  8,
  8,
  8,
  6,
  6,
  6,
  6,
  4,
  4,
  4,
  2,
  2,
  2,
  2
];

// coordonées
let _x;
let _y;
let _z;

let long;
let lat;

let cellWidth = 100;
let cellHeight = 125;

const originalSpacing = 1.1;
let xSpacing = originalSpacing;
let ySpacing = originalSpacing;

const totalMeridians = 12;
const meridianWidth = 12;
const meridianHeight = 54;
let rayon = (cellWidth * originalSpacing * meridianWidth * totalMeridians) / (2 * Math.PI);

let Spherical = new THREE.Spherical();
let spherePos = new THREE.Vector3();

let TextureLoader = new THREE.TextureLoader();

let totalImages = 0;
let imageLoaded = 0;

//================================================================================================

export const loadData = (scene, controls) => {
  renderMap(scene, controls);
};

//================================================================================================

// 1) Iterate over all the json file
const renderMap = scene => {
  images.forEach(item => {
    if (item.ImageOK == "VRAI") {
      totalImages++;
    }
  });

  TextureLoader.load(Earth, texture => {
    let geometry = new THREE.SphereGeometry(rayon - 15, 30, 30);
    let material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
    let sphere = new THREE.Mesh(geometry, material);

    sphere.rotateZ(Math.PI);
    sphere.rotateY(-Math.PI / 1.7);
    scene.add(sphere);

    fetchImages(images);

    scene.rotation.z = Math.PI;
  });
};

//================================================================================================

const fetchImages = images => {
  //Web worker
  const worker = new WorkerProcessImages();
  worker.postMessage(images);

  worker.addEventListener("message", workerMessaged);
  worker.addEventListener("error", workerError);

  function workerMessaged({ data }) {
    renderTexture(data.res, data.item);
  }

  function workerError() {
    console.log("no");
  }

  // Keep in case we must change the web worker

  // images.forEach(image => {
  //   if (image.ImageOK != 0) {
  //     index++;

  //     let file = require(`../../../assets/64-64/${image.IDImage}.webp`);
  //     renderTexture(file, image);
  //   }
  // });
};
//==============================================================================================================================

export const renderTexture = (file, image) => {
  let texture = textureLoader.load(file, () => {
    imageLoaded++;

    if (imageLoaded == totalImages) {
      document.getElementById("loading").style.display = "none";
      controls.autoRotate = false;
    }
  });

  createMesh(texture, image);
};

//==============================================================================================================================

const createMesh = (texture, image) => {
  // Textures inversion
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x = -1;
  texture.repeat.y = -1;

  let material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });

  // Create plane
  let mesh = new THREE.Mesh(plane, material);

  long =
    -(
      image.mer * cellWidth * meridianWidth * originalSpacing +
      (((image.lon - 7) * cellWidth * 12) / nbImagesLat[image.lat]) * xSpacing
    ) / rayon;

  lat = (cellHeight * meridianHeight * ySpacing + image.lat * cellHeight * originalSpacing) / rayon + Math.PI / 30;

  Spherical.set(rayon, lat, long);
  spherePos.setFromSpherical(Spherical);
  mesh.lookAt(spherePos);
  mesh.position.set(spherePos.x, spherePos.y, spherePos.z);

  // Name plane component
  mesh.name = image.IDPlace;
  mesh.type = image.ImageOK;
  mesh.uuid = index;

  renderChild(mesh);
};

//==============================================================================================================================

const renderChild = mesh => {
  Config.scene.add(mesh);
};

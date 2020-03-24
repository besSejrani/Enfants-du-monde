import * as THREE from "three";

//https://stackoverflow.com/questions/12732590/how-map-2d-grid-points-x-y-onto-sphere-as-3d-points-x-y-z

import images from "../../data/images.json";
import Earth from "../../assets/images/earth.jpg";

//==============================================================================================================================

export const loadData = (scene, canvContainer, controls) => {
  let dataJson = "";
  let dbParam = "";
  let data = "";
  let x = "";

  const textureLoader = new THREE.TextureLoader();

  // Show element
  let showSearchButton = document.getElementById("showSearch");
  showSearchButton.style.display = "block";
  canvContainer.style.display = "block";

  let index = 0;

  // data = JSON.parse(images);
  data = images;

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
  let _x, _y, _z;
  let long, lat;

  let cellWidth = 100;
  let cellHeight = 125;

  let originalSpacing = 1.1;
  let xSpacing = originalSpacing;
  let ySpacing = originalSpacing;

  let totalMeridians = 12;
  let meridianWidth = 12;
  let meridianHeight = 54;
  let rayon = (cellWidth * originalSpacing * meridianWidth * totalMeridians) / (2 * Math.PI);

  let Spherical = new THREE.Spherical();
  let spherePos = new THREE.Vector3();

  let TextureLoader = new THREE.TextureLoader();

  let totalImages = 0;
  let imageLoaded = 0;

  // 1) Iterate over all the json file
  // 2) Increments totalImages
  data.forEach(item => {
    if (item.ImageOK == "VRAI") {
      totalImages++;
    }
  });

  TextureLoader.load(Earth, texture => {
    let geometry = new THREE.SphereGeometry(rayon - 15, 30, 30);
    let material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
    let sphere = new THREE.Mesh(geometry, material);
    let mesh;

    sphere.rotateZ(Math.PI);
    sphere.rotateY(-Math.PI / 1.7);
    scene.add(sphere);

    // Child images
    data.forEach((image, i) => {
      if (image.ImageOK != 0) {
        index++;

        // When last image loaded, show canvas
        let file = require(`../../assets/64-64/${image.IDImage}.webp`);

        let texture = textureLoader.load(file, () => {
          imageLoaded++;

          if (imageLoaded == totalImages) {
            document.getElementById("loading").style.display = "none";
            controls.autoRotate = false;
          }
        });

        // Textures inversion
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.x = -1;
        texture.repeat.y = -1;

        material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });

        // Create plane
        let mesh = new THREE.Mesh(plane, material);

        long =
          -(
            image.mer * cellWidth * meridianWidth * originalSpacing +
            (((image.lon - 7) * cellWidth * 12) / nbImagesLat[image.lat]) * xSpacing
          ) / rayon;

        lat =
          (cellHeight * meridianHeight * ySpacing + image.lat * cellHeight * originalSpacing) / rayon + Math.PI / 30;

        Spherical.set(rayon, lat, long);
        spherePos.setFromSpherical(Spherical);
        mesh.lookAt(spherePos);
        mesh.position.set(spherePos.x, spherePos.y, spherePos.z);

        // Name plane component
        mesh.name = image.IDPlace;
        mesh.type = image.ImageOK;
        mesh.uuid = index;

        scene.add(mesh);
      }
    });

    scene.rotation.z = Math.PI;
  });
};

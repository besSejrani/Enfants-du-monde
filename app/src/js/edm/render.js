import * as THREE from "three";
import * as Tween from "tween";

import * as Config from "./config";
import { onImageClick } from "./childDetails";
import { searchChild } from "./search";

//==============================================================================================================================

/**
 * @name animateVector3
 * @description test
 * @see https://medium.com/@lachlantweedie/animation-in-THREE-js-using-Tween-js-with-examples-c598a19b1263
 */
export function animateVector3(vectorToAnimate, target, options = {}) {
  // 1) Get targets from options or set to defaults
  let to = target || THREE.Vector3(),
    easing = options.easing || Tween.Easing.Quadratic.In,
    duration = options.duration || 2000;

  // 2) Create the Tween
  let TweenVector3 = new Tween.Tween(vectorToAnimate)
    .to({ x: to.x, y: to.y, z: to.z }, duration)
    .easing(easing)
    .onUpdate(d => {
      if (options.update) {
        options.update(d);
      }
    })
    .onComplete(() => {
      if (options.callback) options.callback();
    });

  // 3) Start the Tween
  TweenVector3.start();

  // 4) Return the Tween in case we want to manipulate it later on
  return TweenVector3;
}

/**
 * @name settingsInFrench
 * @description test
 */
export function settingsInFrench() {
  let credit = document.getElementById("creditBox");
  credit.style.display = "none";

  let box = document.getElementById("box");
  box.style.display = "flex";

  let deplacementSouris = document.getElementById("aideDeplacementSouris");
  deplacementSouris.textContent = "déplacez vous en maintenant le clic gauche de la souris.";

  let aideZoom = document.getElementById("aideZoom");
  aideZoom.textContent = "utilisez les touches +/- ou la molette de souris pour zoomer/dézoomer";

  let aideAgrandirImage = document.getElementById("aideAgrandirImage");
  aideAgrandirImage.textContent = "Double-cliquez sur l'image pour l'agrandir et afficher ses informations";

  let aideRecherche = document.getElementById("aideRecherche");
  aideRecherche.textContent = "Pour recherche un/votre pseudo cliquez sur la loupe et ecrivez ensuite un/votre pseudo.";
}

/**
 * @name settingsInEnglish
 * @description test
 */
export function settingsInEnglish() {
  let credit = document.getElementById("creditBox");
  credit.style.display = "none";

  let deplacementSouris = document.getElementById("aideDeplacementSouris");
  deplacementSouris.textContent = "Drag the mouse arround while maintaining the left button down to explore the globe";

  let aideZoom = document.getElementById("aideZoom");
  aideZoom.textContent = "use +/- or the mouse wheel  to zoom/out";

  let aideAgrandirImage = document.getElementById("aideAgrandirImage");
  aideAgrandirImage.textContent = "Doubleclick on the picture to enlarge and display the informations";

  let aideRecherche = document.getElementById("aideRecherche");
  aideRecherche.textContent = "To find a/your pseudo, click on the magnifying glass and write a/your pseudo";
}

/**
 * @name createdByStudents
 * @description test
 */
export function createdByStudents() {
  let aide = document.getElementById("box");
  aide.style.display = "none";

  let credit = document.getElementById("creditBox");
  credit.style.display = "block";

  let groupeMembresContenu = document.getElementById("groupeMembresContenu");
  groupeMembresContenu.textContent =
    "Schneiter Raphael, Ristic Vojislav, Janssens Emmanuel, Bompard Corentin, Petit Maylis, Pittet Valentin, Houlmann Gildas, Herzig Melvyn, Gianinetti Lucas.";
}

/**
 * @name closeSideBar2
 * @description test
 */
export function closeSideBar2(event) {
  if (sideBar.style.display != "none") {
    if (event.keyCode == 27) {
      hideSideBar();
    }
  }

  if (helpDiv.style.display != "none") {
    if (event.keyCode == 27) {
      closeHelp();
    }
  }

  if (SearchBox.style.display != "none") {
    if (event.keyCode == 27) {
      hideSearchBar();
    }
  }
}

/**
 * @name showSearchBar
 * @description test
 */
export function showSearchBar() {
  SearchBox.style.display = "flex";
  showSearchButton.style.display = "none";
  SearchBox.className = "GUI w3-animate-top";
  SearchTextBox.focus();
}

/**
 * @name hideSearchBar
 * @description test
 */
export function hideSearchBar() {
  SearchBox.style.display = "none";
  showSearchButton.style.display = "block";
}

/**
 * @name showHelp
 * @description test
 */
export function showHelp() {
  helpDiv.style.display = "block";
  helpDiv.className = "GUI w3-animate-left";

  if (userAgent) {
    Config.container.onmousedown = null;
    helpButton.style.display = "none";
    SearchBox.style.display = "none";
    showSearchButton.style.display = "none";
  }
}

/**
 * @name closeHelp
 * @description test
 */
export function closeHelp() {
  helpDiv.style.display = "none";

  if (userAgent) {
    Config.container.onmousedown = onMouseDBClick;
    helpButton.style.display = "block";
    showSearchButton.style.display = "block";
  }
}

/**
 * @name showSearchResults
 * @description test
 */
export function showSearchResults() {
  searchChild(Config.camera, Config.scene);

  if (userAgent) {
    SearchBox.style.display = "none";
    showSearchButton.style.display = "none";
    helpButton.style.display = "none";
  } else {
    SearchBox.style.display = "none";
    showSearchButton.style.display = "block";
  }

  onClickDetails.style.display = "none";
  onSearchDetails.style.display = "flex";

  imageLoader.style.display = "none";
  let nodes = onSearchDetails.childNodes;

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].style != null) nodes[i].style.display = "block";
  }
}

/**
 * @name showChildDetails
 * @description test
 */
export function showChildDetails() {
  onSearchDetails.style.display = "none";
  onClickDetails.style.display = "flex";

  imageLoader.style.display = "none";
  let nodes = onClickDetails.childNodes;

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].style != null) nodes[i].style.display = "flex";
  }
}

/**
 * @name hideSideBar
 * @description test
 */
export function hideSideBar() {
  sideBar.style.display = "none";
  sideBar.className = "";

  if (userAgent) {
    Config.container.onmousedown = onMouseDBClick;
    helpButton.style.display = "block";
    showSearchButton.style.display = "block";
  }
}

/**
 * @name showSideBar
 * @description test
 */
export function showSideBar() {
  imageLoader.style.display = "block";

  sideBar.className = "GUI w3-animate-right";
  sideBar.style.display = "block";

  if (userAgent) {
    if (helpDiv.style.display != "none") {
      helpDiv.style.display = "none";
    }

    Config.container.onmousedown = null;
    helpButton.style.display = "none";
    showSearchButton.style.display = "none";
  }
}

/**
 * @name checkEnter
 * @description test
 */
export function checkEnter(event) {
  if (SearchBox.style.display != "none") {
    if (event.keyCode == 13) {
      showSearchResults();
    }
  }
}

/**
 * @name onWindowResize
 * @description test
 */
export function onWindowResize() {
  Config.rendererWidth = window.innerWidth;
  Config.rendererHeight = window.innerHeight;
  Config.camera.aspect = Config.rendererWidth / Config.rendererHeight;
  Config.camera.updateProjectionMatrix();
  Config.renderer.setSize(Config.rendererWidth, Config.rendererHeight);
}

/**
 * @name onMouseMove
 * @description test
 */
export function onMouseMove(event) {
  Config.mouse.x = (event.clientX / Config.rendererWidth) * 2 - 1;
  Config.mouse.y = -(event.clientY / Config.rendererHeight) * 2 + 1;
}

/**
 * @name onMouseClick
 * @description test
 */
export function onMouseClick(event) {
  if (Config.controls.autoRotate) {
    Config.controls.autoRotate = false;
  }
}

/**
 * @name distanceVector
 * @description test
 */
export function onMouseDBClick(event) {
  if (userAgent) {
    if (Config.controls.autoRotate) {
      Config.controls.autoRotate = false;
    }
  }

  Config.mouse.x = (event.clientX / Config.rendererWidth) * 2 - 1;
  Config.mouse.y = -(event.clientY / Config.rendererHeight) * 2 + 1;

  switch (event.button) {
    case 0:
      // 1) update the picking ray with the camera and mouse position
      Config.raycaster.setFromCamera(Config.mouse, Config.camera);

      // 2) calculate objects intersecting the picking ray
      let intersects = Config.raycaster.intersectObjects(Config.scene.children);

      if (intersects.length > 0) {
        if (intersects[0].object.type == "VRAI") {
          onImageClick(intersects[0].object.name);
        }
      }
      break;

    case 2:
      break;

    default:
      break;
  }
}

/**
 * @name distanceVector
 * @description test
 */
export function distanceVector(valueOne, valueTwo) {
  let distanceX = valueOne.x - valueTwo.x;
  let distanceY = valueOne.y - valueTwo.y;
  let distanceZ = valueOne.z - valueTwo.z;

  return Math.sqrt(distanceX * distanceX + distanceY * distanceY + distanceZ * distanceZ);
}

/**
 * @name animate
 * @description test
 */
export function animate() {
  const timeout = 1000 / 30;

  setTimeout(() => {
    requestAnimationFrame(animate);
    Tween.update();
    Config.controls.update();
  }, timeout);

  render();
}

/**
 * @name render
 * @description test
 */
export function render() {
  Config.controls.rotateSpeed = 0.1 / (10000 / distanceVector(Config.camera.position, new THREE.Vector3(0, 0, 0)));

  // 1) update the picking ray with the camera and mouse position
  Config.raycaster.setFromCamera(Config.mouse, Config.camera);

  // 2) calculate objects intersecting the picking ray
  let intersects = Config.raycaster.intersectObjects(Config.scene.children);

  intersects.length > 0 ? (Config.container.style.cursor = "pointer") : (Config.container.style.cursor = "default");
  Config.renderer.render(Config.scene, Config.camera);
}

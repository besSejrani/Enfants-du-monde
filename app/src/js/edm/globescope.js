import * as THREE from "three";

import { fragmentShader, vertexShader } from "./webglShaders";
import * as Render from "./render";
import * as Config from "./config";

import { loadData } from "./loader";
import milkyWay from "../../assets/images/MilkyWay.jpg";

//============================================================================================================================================================================================================================================================

// Disable globe
Config.controls.enablePan = false;
Config.controls.enableDamping = true;
Config.controls.minDistance = 2850;
Config.controls.maxDistance = 5000;
Config.controls.autoRotate = true;

// Show image container onclick
Config.camera.position.z = 7000;

Config.renderer.setSize(Config.rendererWidth, Config.rendererHeight);

//==============================================================================================================================

// SkyBox
const geometry = new THREE.SphereGeometry(10000, 60, 40);
let TextureLoader = new THREE.TextureLoader();

const uniforms = {
  texture: {
    type: "t",
    value: TextureLoader.load(milkyWay)
  }
};

const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vertexShader(),
  fragmentShader: fragmentShader()
});

const skyBox = new THREE.Mesh(geometry, material);
skyBox.scale.set(-1, 1, 1);

skyBox.rotation.order = "XZY";
skyBox.renderDepth = 1000.0;
Config.scene.add(skyBox);

//==============================================================================================================================

// SearchBar
let showSearchButton = document.getElementById("showSearch");
showSearchButton.addEventListener("click", () => showSearch());

// console.log(showSearchButton);
// showSearchButton.onclick = showSearch;

let SearchBox = document.getElementById("searchBar");
SearchBox.style.display = "none";

let xmlSearch;
let SearchTextBox = document.getElementById("searchText");

SearchTextBox.onfocus = () => {
  xmlSearch = new XMLHttpRequest();
};

let SearchButton = document.getElementById("searchButton");
SearchButton.onclick = Render.showSearchResults;

let dynamicSearchResult = document.getElementById("onDynamicSearch");
dynamicSearchResult.style.display = "none";

//==============================================================================================================================

// SideBar
let sideBar = document.getElementById("sideBar");
let closeSideBar = document.getElementById("closeSideBar");
let onClickDetails = document.getElementById("onClickDetails");
let onSearchDetails = document.getElementById("onSearchDetails");

let childImage = document.getElementById("childImage");
let childPseudo = document.getElementById("childPseudo");
let childCitation = document.getElementById("childCitation");
let childRight = document.getElementById("childRight");

childImage.onload = Render.showChildDetails;
closeSideBar.onclick = Render.hideSideBar;
sideBar.style.display = "none";

//==============================================================================================================================

// ImageLoader
let imageLoader = document.getElementById("imageLoader");
imageLoader.className = "loader";

//==============================================================================================================================

// Help
let helpDiv = document.getElementById("Help");
helpDiv.style.display = "none";

let helpButton = document.getElementById("helpButton");
helpButton.style.display = "block";
helpButton.onclick = Render.showHelp;

//==============================================================================================================================

//Loader
window.addEventListener("resize", () => Render.onWindowResize(), false);
window.addEventListener("keydown", closeSideBar);

if (Config.userAgent) {
  Config.container.onmousedown = Render.onMouseDBClick;
} else {
  Config.container.onmousedown = Render.onMouseClick;
  Config.container.ondblclick = Render.onMouseDBClick;
}

Config.container.onmousemove = Render.onMouseMove;
document.body.onkeydown = Render.checkEnter;
document.body.appendChild(Config.container);

loadData(Config.scene, Config.container, Config.controls);

Render.animate();

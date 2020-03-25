/**
|--------------------------------------------------
| EXPLANATION :
|
| Entrypoint for webpack, takes in consideration
| all the files listed in
|--------------------------------------------------
*/

// Materialize
import "./utils/materialize";

// JS
// import "./utils/intserectingObserver";
// import "./utils/lazyImages";
import "./utils/materialize";

// EDM
import "./edm/globescope";
import "./edm/childDetails";
import "./edm/loader/loader";
import "./edm/loader/loadImages.worker";
import "./edm/search";

// PWA
import "./pwa/app";

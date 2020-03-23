import * as Three from "three/build/three";
import * as Tween from "tween";

//==============================================================================================================================

const userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

//==============================================================================================================================

/**
 * @name searchChild
 * @description test
 * @see https://stackoverflow.com/questions/15860683/onclick-event-in-a-for-loop
 * @see https://medium.com/@lachlantweedie/animation-in-three-js-using-Tween-js-with-examples-c598a19b1263
 */
export const searchChild = (camera, scene) => {
  let objJSON, dbParam, xmlhttp, myObj;

  //les paramètres a passer dans la requête SQL
  //SearchTextBox => input de la barre de recherche
  objJSON = { Pseudo: SearchTextBox.value };
  dbParam = JSON.stringify(objJSON);

  xmlhttp = new XMLHttpRequest();

  showSideBar();
  onSearchDetails.innerHTML = "";

  xmlhttp.onreadystatechange = () => {
    if (this.readyState == 4 && this.status == 200) {
      ///Afficher un tableau avec tout les résultats

      if (this.responseText != "" && SearchTextBox.value != "") {
        myObj = JSON.parse(this.responseText);

        //pour partir d'une div vide
        //tableau de résultat de la recherche/requete SQL
        for (let i = 0; i < myObj.length; i++)
          (i => {
            console.log(i);
            if (myObj[i].ImageOK != 0) {
              let details = document.getElementById("onSearchDetails");
              let det = document.createElement("div");

              let img = document.createElement("img");
              let searchPseudo = document.createElement("p");

              img.id = myObj[i].IDImage;
              img.src = "images/64-64/" + myObj[i].IDImage + ".png";
              img.onclick = () => {
                let plane = scene.getObjectByName(myObj[i].IDPlace);

                let target = new Three.Vector3(
                  plane.position.x * -1 * 1.1,
                  plane.position.y * -1 * 1.1,
                  plane.position.z * 1.1
                ); // create on init

                animateVector3(camera.position, target, {
                  duration: 2000,

                  easing: Tween.Easing.Cubic.InOut
                });
                if (userAgent) {
                  hideSideBar();
                } else {
                  onImageClick(myObj[i].IDPlace);
                }
              };

              searchPseudo.innerHTML = myObj[i].Pseudo;
              det.appendChild(img);
              det.appendChild(searchPseudo);

              details.appendChild(det);
            }
          })(i);
      } else {
        hideSideBar();
        alert("Aucun resultat");
      }
    }
  };

  xmlhttp.open("POST", "GetData.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + dbParam + "&Mode=search");
};

// Add The Colors In Storage
let mainColor = window.localStorage.getItem("color");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.querySelectorAll(".colors-list li").forEach((el) => {
    el.classList.remove("active");
    if (el.dataset.color === mainColor) {
      el.classList.add("active");
    }
  });
}

// Random Background Option
let backgroundOption = true;
// variable To Control The Background Interval
let backgroundInterval;

// Check If There Is Local Storage
let mainBackgroundItem = window.localStorage.getItem("Background-Option");
if (mainBackgroundItem !== null) {
  if (mainBackgroundItem === true) {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  document.querySelectorAll(".random-backgrounds span").forEach((el) => {
    el.classList.remove("active");
    if (mainBackgroundItem === "true") {
      document
        .querySelector(".random-backgrounds .yes")
        .classList.add("active");
    } else {
      document.querySelector(".random-backgrounds .no").classList.add("active");
    }
  });
}

//Show Settings Box
let settingsBox = document.querySelector(".settings-box");
let settings = document.querySelector(".settings");

settings.addEventListener("click", function () {
  settingsBox.classList.toggle("active");
  document.querySelector(".set").classList.toggle("fa-spin");
});

//Switch Colors
let colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach(function (li) {
  li.addEventListener("click", (e) => {
    //Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    handleActive(e);

    //Set Color On Local Storage
    window.localStorage.setItem("color", e.target.dataset.color);
    //Add Color To Option Box
  });
});

let randomBackEl = document.querySelectorAll(".random-backgrounds span");
randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      backGrounds();

      //Set Background On Local Storage
      window.localStorage.setItem("Background-Option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);

      window.localStorage.setItem("Background-Option", false);
    }
  });
});
//Select Landing Page Elemant
let landingPage = document.querySelector(".landing-page");

//Get Array Of Imgs
let imgs = [
  "landing-1.png",
  "landing-2.png",
  "landing-3.png",
  "landing-4.png",
  "landing-5.png",
];

function backGrounds() {
  if (backgroundOption === true) {
    //Change Background Imgs Url
    backgroundInterval = setInterval(() => {
      //Get Random Number
      let randomNumber = Math.trunc(Math.random() * imgs.length);

      landingPage.style.backgroundImage = `url("imgs/${imgs[randomNumber]}")`;
    }, 5000);
  }
}
backGrounds();

//Show Bullets and hide it
let showBullets = document.querySelectorAll(".random-bullets span");
let navBullets = document.querySelector(".nav-bullets");

let bulletsLocalItem = window.localStorage.getItem("Show-Bullets");

if (bulletsLocalItem !== null) {
  showBullets.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletsLocalItem === "block") {
    navBullets.style.display = "block";
    document.querySelector(".random-bullets .yes").classList.add("active");
  } else {
    navBullets.style.display = "none";
    document.querySelector(".random-bullets .no").classList.add("active");
  }
}

showBullets.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.bullets === "yes") {
      navBullets.style.display = "block";
      window.localStorage.setItem("Show-Bullets", "block");
    } else {
      navBullets.style.display = "none";
      window.localStorage.setItem("Show-Bullets", "none");
    }
  });
});

// Scrolled
let ourSkills = document.querySelector(".our-skills");
let allSkills = document.querySelectorAll(".prog span");

window.onscroll = function () {
  if (window.scrollY >= ourSkills.offsetTop - 230) {
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// window.onscroll = function () {
//   // Skills Offset Top
//   let skillsOffsetTop = ourSkills.offsetTop;

//   // Outer height
//   let skillsOuterHeight = ourSkills.offsetHeight;

//   // Window Height
//   let windowHeight = this.innerHeight;

//   // Window scrollTop
//   let windowScrollTop = this.scrollY;

//   if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight) - 200) {
//     let allSkills = document.querySelectorAll(".prog span").forEach( (span) => {
//       span.style.width = span.dataset.progress;
//     })
//   }
// };

//Create Popup With The Image
let ourGallery = document.querySelectorAll(".images img");
let GallerySection = document.querySelector(".gallery");

ourGallery.forEach((img) => {
  img.addEventListener("click", () => {
    let overlay = document.createElement("div");
    let div = document.createElement("div");
    let h3 = document.createElement("h3");
    let photo = document.createElement("img");
    let X = document.createElement("div");
    document.body.append(overlay);
    overlay.append(div);
    if (img.alt !== null) {
      div.append(h3);
      h3.textContent = img.alt;
    }
    div.append(photo);
    div.append(X);
    X.textContent = "X";
    photo.src = img.src;
    overlay.style =
      "position: fixed; background-color: rgba(0, 0, 0, 70%); width: 100%; height: 100%; left: 0; top: 0; z-index: 1000; display: flex; justify-content: center; align-items: center;";
    div.style =
      "position: relative; border: 2px solid #ccc; padding: 20px; background-color: white;";
    h3.style =
      "text-align: center; color: var(--main-color); font-size: 20px; margin: 0 0 12px;";
    photo.style = "max-width: 700px;";
    X.style =
      "position: absolute; background-color: var(--main-color); top: -14px; right: -14px; width: 30px; height: 30px; border-radius: 50%; color: white; display: flex; justify-content: center; align-items: center; font-weight: bold; font-size: 18px; cursor: pointer;";

    X.addEventListener("click", () => {
      overlay.remove();
    });
  });
});

//scroll To Some Where
function scrollToSomeWhere(elemants) {
  elemants.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

//Select All Bullets
scrollToSomeWhere(document.querySelectorAll(".nav-bullets .bullet"));
//Select All links header
scrollToSomeWhere(document.querySelectorAll(".landing-page li a"));

//Handle Active State
function handleActive(ev) {
  //Remove Active Class
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  //Add Active Class
  ev.target.classList.add("active");
}

//Reset Button
document.querySelector(".reset-button").onclick = function () {
  // localStorage.clear();
  localStorage.removeItem("Background-Option");
  localStorage.removeItem("Show-Bullets");
  localStorage.removeItem("color");

  window.location.reload();
};

//Show Bars
let bars = (document.querySelector(".landing-page i").onclick = function () {
  document.querySelector(".landing-page ul.open").classList.toggle("show");
});

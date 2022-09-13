//______________________________________________________________________________________________________
// - Constants and local variables
const body = document.body;
let today = new Date();


//______________________________________________________________________________________________________
// - Workout tracker
import WorkoutTracker from "./WorkoutTracker.js";
const app = document.getElementById("app");

const wt = new WorkoutTracker(app);

window.wt = wt;





//______________________________________________________________________________________________________
// - Check if the page has scrolled and either hide or display the nav bar
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        body.classList.remove("scroll-up");
    }

    if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
        body.classList.remove("scroll-up");
        body.classList.add("scroll-down");
    }

    if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
        body.classList.remove("scroll-down");
        body.classList.add("scroll-up");
    }

    lastScroll = currentScroll;
})


//______________________________________________________________________________________________________
// - Check the Date of Birth is between the ages of 16 and 200 years old
let bday = document.getElementById("bday");

function checkDOB() {
    let month = today.getMonth().toLocaleString('en-UK', {minimumIntegerDigits: 2, useGrouping: false});
    let date = today.getDate().toLocaleString('en-UK', {minimumIntegerDigits: 2, useGrouping: false});

    bday.min = (today.getFullYear()-200)+'-'+month+'-'+date;
    bday.max = (today.getFullYear()-16)+'-'+month+'-'+date;
}


//______________________________________________________________________________________________________
// - Change the units for height and weight based on metric or imperial
function changeUnit() {
    const units = document.getElementById("unit");

    const weight = document.getElementById("bodyweight");
    
    const height = document.getElementById("height");

    if (units.value == "imperial") {
        weight.value = Math.round(weight.value * 2.205);
        weight.placeholder = "Weight (lb)";
        weight.max = 2500;

        height.value = Math.round(height.value / 2.54);
        height.placeholder = "Height (in)";
        height.max = 200;

    } else { // metric
        weight.value = Math.round(weight.value / 2.205);
        weight.placeholder = "Weight (kg)";
        weight.max = 1000;

        height.value = Math.round(height.value * 2.54);
        height.placeholder = "Height (cm)";
        height.max = 400;
    }
}


//______________________________________________________________________________________________________
// - Clock Message depending on the time of day
let newElement = document.createElement("h1")
let currentHour = today.getHours();
let greet;

if (currentHour >= 4 && currentHour < 10) {
    greet = "Good morning";
} else if (currentHour >= 10 && currentHour < 12) {
    greet = "Good day";
} else if (currentHour >= 12 && currentHour < 18) {
    greet = "Good afternoon";
} else if (currentHour >= 18 && currentHour < 22) {
    greet = "Good evening";
} else if ((currentHour >= 22 && currentHour < 24) || (currentHour >= 0 && currentHour < 4)) {
    greet = "Good night";
} else {
    greet = ""
};

greet = greet + ' and welcome to FeelGood';

let createEleTxt = document.createTextNode(greet);
newElement.appendChild(createEleTxt);

body.appendChild(newElement);

newElement.setAttribute("class", "filled");

newElement.style.cssText = "text-align: center; font-size: 2rem";


//______________________________________________________________________________________________________
// - Check the password has at least one number and one uppercase and lowercase letter,
//   and at least 8 or more characters
var passw = document.getElementById('passw');
var letter = document.getElementById('letter');
var capital = document.getElementById('capital');
var number = document.getElementById('number');
var length = document.getElementById('length');

passw.onfocus = function() {
  document.getElementById('tool-tip').style.display = 'block';
}

passw.onblur = function() {
  document.getElementById('tool-tip').style.display = 'none';
}

passw.onkeyup = function() {
    var lowerCaseLetters = /[a-z]/g;
  if (passw.value.match(lowerCaseLetters)) {
    letter.classList.remove('invalid');
    letter.classList.add('valid');
  } else {
    letter.classList.remove('valid');
    letter.classList.add('invalid');
}
var upperCaseLetters = /[A-Z]/g;
  if (passw.value.match(upperCaseLetters)) {
    capital.classList.remove('invalid');
    capital.classList.add('valid');
  } else {
    capital.classList.remove('valid');
    capital.classList.add('invalid');
  }
  var numbers = /[0-9]/g;
  if (passw.value.match(numbers)) {
    number.classList.remove('invalid');
    number.classList.add('valid');
  } else {
    number.classList.remove('valid');
    number.classList.add('invalid');
  }
  if (passw.value.length >= 8) {
    length.classList.remove('invalid');
    length.classList.add('valid');
  } else {
    length.classList.remove('valid');
    length.classList.add('invalid');
  }
}
















// Auto scroll
/*
const autoscroll = document.querySelectorAll(".auto-scroll");
var autoscroll_index = 0;
autoscroll[autoscroll_index].scrollIntoView();

setInterval(function () {
                        if (autoscroll_index >= autoscroll.length - 1) {
                            autoscroll_index = 0;
                        } else {
                            autoscroll_index += 1;
                        }
                        autoscroll[autoscroll_index].scrollIntoView();
                        }, 10000);
*/

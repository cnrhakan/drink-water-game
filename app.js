const glasses = document.querySelectorAll(".glass");
const fillPx = document.querySelector(".fill-px");
const remainedWater = document.querySelector(".remained-water");
const areYouSureDiv = document.querySelector(".are-you-sure-div");
const noBtn = document.querySelector(".no");
const yesBtn = document.querySelector(".yes");
const resultScreen = document.querySelector(".result-screen");
const container = document.querySelector(".container");
const yourStepsNumber = document.querySelector(".your-steps-number");
const showAnswer = document.querySelector(".show-answer");
const correctAnswer = document.querySelector(".correct-answer");
const correctChoice = document.querySelector(".correct-choice");
const yourChoice = document.querySelector(".your-choice");
const startBeginning = document.querySelector(".start-beginning");
const root = document.documentElement;

const waterStats = {
  total: 47,
  totalPx: 380,
  current: 0,
  currentPx: 0,
  activeGlassesNumber: 0
};
let glassTypeCount = {
  "threeHGlass": 0,
  "sevenHGlass": 0,
  "elevenHGlass": 0,
  "sixteenHGlass": 0
};
let showAnswerIsOpen = true;

function updateWaterLevel(water, waterPx) {
  const waterPercentage = water / waterStats.total;
  const calculatedHeight = Math.min(waterStats.totalPx * waterPercentage, waterStats.totalPx);

  if (water > 0) {
    fillPx.style.visibility = "visible";
    remainedWater.style.height = `${waterStats.totalPx - calculatedHeight}px`;
    fillPx.style.height = `${calculatedHeight}px`;
    fillPx.textContent = water + "L";

    if (water > waterStats.total) {
      areYouSureDiv.classList.add('show');
      remainedWater.style.visibility = "hidden";
      remainedWater.style.height = "0px";

      fillPx.style.height = `${waterStats.totalPx}px`;
      fillPx.style.color = "red"
    }
    else if (water == waterStats.total) {
      areYouSureDiv.classList.add('show');
      remainedWater.style.visibility = "hidden";
      remainedWater.style.height = "0px";

      fillPx.style.height = `${waterStats.totalPx}px`;
      fillPx.style.color = "green"
    }
    else {
      fillPx.style.color = "white"
      areYouSureDiv.classList.remove('show');
      remainedWater.style.visibility = "visible";
      remainedWater.textContent = `${waterStats.total - water}L Remained`;
    }
  } else {
    areYouSureDiv.classList.remove('show');
    fillPx.style.visibility = "hidden";
    fillPx.style.height = "0px";
    remainedWater.style.visibility = "visible";
    remainedWater.style.height = `${waterStats.totalPx}px`;
    remainedWater.textContent = `${waterStats.total}L Remained`;
  }
}

function countGlasses(g) {
  if (parseInt(g.textContent) == 3) {
    glassTypeCount["threeHGlass"]++;
  }
  else if (parseInt(g.textContent) == 7) {
    glassTypeCount["sevenHGlass"]++;
  } else if (parseInt(g.textContent) == 11) {
    glassTypeCount["elevenHGlass"]++;
  } else if (parseInt(g.textContent) == 16) {
    glassTypeCount["sixteenHGlass"]++;
  }
}

function updateResultScreen(activeGlassesNumber) {
  yourStepsNumber.innerHTML = `<h4 class="your-steps-number">You completed the challenge in <i>${activeGlassesNumber}</i> steps</h4>`;
  yourChoice.innerHTML = `
        <h3 class="your-choice-text">Your choice:</h3>
        <div class="your-choice-content">
        ${glassTypeCount["threeHGlass"] !== 0 ? `
          <div class="three-h">
            <button class="glass">3L</button>x${glassTypeCount["threeHGlass"]}
          </div>
        ` : ''}
        ${glassTypeCount["sevenHGlass"] !== 0 ? `
          <div class="seven-h">
            <button class="glass">7L</button>x${glassTypeCount["sevenHGlass"]}
          </div>
        ` : ''}
        ${glassTypeCount["elevenHGlass"] !== 0 ? `
          <div class="eleven-h">
            <button class="glass">11L</button>x${glassTypeCount["elevenHGlass"]}
          </div>
        ` : ''}
        ${glassTypeCount["sixteenHGlass"] !== 0 ? `
          <div class="sixteen-h">
            <button class="glass">16L</button>x${glassTypeCount["sixteenHGlass"]}
          </div>
        ` : ''}
        </div>`;
}

function handleGlassClick(glass) {
  let water = 0;
  let waterPx = 0;
  let activeGlassesNumber = 0;

  glassTypeCount = {
    "threeHGlass": 0,
    "sevenHGlass": 0,
    "elevenHGlass": 0,
    "sixteenHGlass": 0
  };

  glass.classList.toggle("active");

  glasses.forEach((g) => {
    if (g.classList.contains("active")) {
      activeGlassesNumber++;
      water += parseInt(g.textContent);
      waterPx += parseInt(getComputedStyle(g).height);
      countGlasses(g);
    }
  });

  waterStats.activeGlassesNumber = activeGlassesNumber;
  updateWaterLevel(water, waterPx);
}

noBtn.addEventListener("click", () => {
  areYouSureDiv.classList.remove('show');
});

yesBtn.addEventListener("click", () => {
  areYouSureDiv.classList.remove('show');
  resultScreen.style.display = "flex";
  container.style.opacity = "0.5";
  resultScreen.style.opacity = "1";



  updateResultScreen(waterStats.activeGlassesNumber);
  glasses.forEach((gl) => {
    gl.style.pointerEvents = "none"
  })
  isTrue()

});

showAnswer.addEventListener("click", () => {
  correctAnswer.style.gridTemplateRows = "1fr";
  correctAnswer.innerHTML = ` 
  <div>
        ${waterStats.activeGlassesNumber != 5 ? `<h3 class="correct-steps-number">You should have completed in <i>5</i> steps</h3>` : ""}
         <div class="correct-choice">
    <h3 class=correct-choice-text"">Correct choice:</h3>
    <div class="correct-choice-content">
      <div class="correct-choice-content-1">
        <div class="seven-h">
          <button class="glass">7L</button>x2
        </div>
        <div class="eleven-h">
          <button class="glass">11L</button>x3         

        </div>
      </div>
      <i><b>OR </b></i>
      <div class="correct-choice-content-2">
        <div class="three-h">
          <button class="glass">3L</button>x1
        </div>
        <div class="eleven-h">
          <button class="glass">11L</button>x4
        </div>
      </div>
    </div>
  </div>`

});


startBeginning.addEventListener("click", () => {

  glasses.forEach((glass) => {
    glass.style.pointerEvents = "auto";
    glass.classList.remove("active");
  });

  updateWaterLevel(0, 0);
  correctAnswer.style.gridTemplateRows = "0fr"
  resultScreen.style.display = "none";
  container.style.opacity = "1";
});

glasses.forEach((glass) => {
  glass.addEventListener("click", () => handleGlassClick(glass));
});

function isTrue() {
  const yourChoiceContent = document.querySelector(".your-choice-content").innerHTML.replace(/\s+/g, ' ').trim();
  const correctChoiceContent1 = `<div class="seven-h">
   <button class="glass">7L</button>x2
</div>
<div class="eleven-h">
   <button class="glass">11L</button>x3
</div>`.replace(/\s+/g, ' ').trim();

  const correctChoiceContent2 = `<div class="three-h">
            <button class="glass">3L</button>x1
        </div>
        <div class="eleven-h">
            <button class="glass">11L</button>x4
        </div>`.replace(/\s+/g, ' ').trim();

  if (yourChoiceContent === correctChoiceContent1 || yourChoiceContent === correctChoiceContent2) {
    console.log("true asnwer");
    yourChoice.classList.add("your-choice-true")
    yourChoice.classList.remove("your-choice-false")
    yourStepsNumber.innerHTML += `<h5 class="answer-status">Your answer is <i style="color: green;">true</i></h5>`;
  }
  else {
    console.log("false answer");
    yourChoice.classList.remove("your-choice-true")
    yourChoice.classList.add("your-choice-false")
    yourStepsNumber.innerHTML += `<h5 class="answer-status">Your answer is <i style="color: red;">wrong</i></h5>`;
  }
}
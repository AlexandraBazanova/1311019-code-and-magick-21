'use strict';

const WIZARD_FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];

const yates = function (arr) {
  return [...arr].map((_, i, arrCopy) => {
    let rand = i + (Math.floor(Math.random() * (arrCopy.length - i)));
    [arrCopy[rand], arrCopy[i]] = [arrCopy[i], arrCopy[rand]];
    return arrCopy[i];
  });
};
const returnRandomElement = (arr) => {
  arr = yates(arr);
  return arr[Math.floor(Math.random() * arr.length)];
};

const userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);

const similarListElement = userDialog.querySelector(`.setup-similar-list`);

const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

const generateWizard = function () {

  const getWizard = function () {
    return {
      name: returnRandomElement(WIZARD_FIRST_NAMES) + ` ` + returnRandomElement(WIZARD_SURNAMES),
      coatColor: returnRandomElement(COAT_COLORS),
      eyesColor: returnRandomElement(EYES_COLORS)
    };
  };
  const requiredAmountWizards = [];
  for (let i = 0; i <= 3; i++) {
    requiredAmountWizards.push(getWizard());
  }
  return requiredAmountWizards;
};

const renderWizard = function (getWizard) {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = getWizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = getWizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = getWizard.eyesColor;

  return wizardElement;
};

const fragment = document.createDocumentFragment();

generateWizard().forEach((e) => fragment.appendChild(renderWizard(e)));

similarListElement.appendChild(fragment);

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);

// ****************Учебный проект: одеть Надежду**************** //

const setupOpen = document.querySelector(`.setup-open`);
const setup = document.querySelector(`.setup`);
const setupClose = setup.querySelector(`.setup-close`);

const onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = function () {
  setup.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = function () {
  setup.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onPopupEscPress);

};

setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;

const userNameInput = document.querySelector(`.setup-user-name`);

userNameInput.addEventListener(`input`, function () {
  const valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - valueLength) + ` симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + ` симв.`);
  } else {
    userNameInput.setCustomValidity(``);
  }

  userNameInput.reportValidity();
});

const wizardCoat = document.querySelector(`.setup-wizard .wizard-coat`);
const wizardEyes = document.querySelector(`.setup-wizard .wizard-eyes`);
const fireball = document.querySelector(`.setup-fireball-wrap`);
const inputCoat = document.querySelector(`input[name = coat-color]`);
const inputEyes = document.querySelector(`input[name = eyes-color]`);

let currentIndex = 0;
const nextItem = function (arr, currentItem) {
  return arr[currentIndex === arr.length - 1 ? 0 : arr.indexOf(currentItem) + 1];
};

wizardCoat.addEventListener(`click`, function () {
  inputCoat.value = wizardCoat.style.fill = nextItem(COAT_COLORS, wizardCoat.style.fill);
});

wizardEyes.addEventListener(`click`, function () {
  inputEyes.value = wizardEyes.style.fill = nextItem(EYES_COLORS, wizardEyes.style.fill);
});

function hexToRGB(h) {
  let r = 0;
  let g = 0;
  let b = 0;

  r = `0x` + h[1] + h[2];
  g = `0x` + h[3] + h[4];
  b = `0x` + h[5] + h[6];

  return `rgb(` + +r + `, ` + +g + `, ` + +b + `)`;
}

const RGB_FIREBALL_COLORS = [];
const rgbArrMaker = function () {
  for (let i = 0; i < FIREBALL_COLORS.length; i++) {
    RGB_FIREBALL_COLORS.push(hexToRGB(FIREBALL_COLORS[i]));
  }
};
rgbArrMaker();

fireball.addEventListener(`click`, function () {
  fireball.style.background = nextItem(RGB_FIREBALL_COLORS, fireball.style.background);
});

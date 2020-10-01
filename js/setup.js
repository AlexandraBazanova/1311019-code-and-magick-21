'use strict';

const WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
const WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
const COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
const EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

const yates = function (arr) {
  return [...arr].map((_, i, arrCopy) => {
    let rand = i + (Math.floor(Math.random() * (arrCopy.length - i)));
    [arrCopy[rand], arrCopy[i]] = [arrCopy[i], arrCopy[rand]]
    return arrCopy[i]
  })
}
const returnRandomElement = arr => {
  arr = yates(arr)
  return arr[Math.floor(Math.random() * arr.length)]
};


const userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

const similarListElement = userDialog.querySelector('.setup-similar-list');

const similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

  const generateWizard = function () {

  const getWizard = function () {
    return {
      name: returnRandomElement(WIZARD_FIRST_NAMES) + ' ' + returnRandomElement(WIZARD_SURNAMES),
      coatColor: returnRandomElement(COAT_COLORS),
      eyesColor: returnRandomElement(EYES_COLORS)
    }
  }
  const requiredAmountWizards = [];
  for ( let i = 0; i <= 3; i++) {
    requiredAmountWizards.push(getWizard())
  };
  return requiredAmountWizards
};

const renderWizard = function (getWizard) {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = getWizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = getWizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = getWizard.eyesColor;

  return wizardElement;
}

const fragment = document.createDocumentFragment();

generateWizard().forEach(e => fragment.appendChild(renderWizard(e)))

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

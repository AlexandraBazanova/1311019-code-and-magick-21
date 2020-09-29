'use strict';

const WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
const WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
const COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
const EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var wizards = function (WIZARD_FIRST_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYES_COLORS) {
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
  const wizard = function () {
    return {
      name: returnRandomElement(WIZARD_FIRST_NAMES) + ' ' + returnRandomElement(WIZARD_SURNAMES),
      coatColor: returnRandomElement(COAT_COLORS),
      eyesColor: returnRandomElement(EYES_COLORS)
    }
  }
  var wiz = [];
  for (var i = 0; i <= 3; i++) {
    wiz.push(wizard())
  };
  return wiz
};

var wizardList = wizards(WIZARD_FIRST_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYES_COLORS)

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

var fragment = document.createDocumentFragment();

wizardList.forEach(e => fragment.appendChild(renderWizard(e)))

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

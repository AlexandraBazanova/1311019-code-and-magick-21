'use strict';

var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var wizardNames = [];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

for ( var i = 0; i < WIZARD_FIRST_NAMES.length; i++) {
  wizardNames[i] =  String(WIZARD_FIRST_NAMES[Math.floor(Math.random() * WIZARD_FIRST_NAMES.length )] + ' ' + WIZARD_SURNAMES[Math.floor(Math.random() *  WIZARD_SURNAMES.length)]);
};

for ( var i = 0; i < COAT_COLORS.length; i++) {
  COAT_COLORS[i] =  COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)];
};

for ( var i = 0; i < EYES_COLORS.length; i++) {
  EYES_COLORS[i] = EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)];
};

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var wizards = [
  {
    name: wizardNames[0],
    coatColor: COAT_COLORS[0],
    eyesColor: EYES_COLORS[0]
  },
  {
    name: wizardNames[1],
    coatColor: COAT_COLORS[1],
    eyesColor: EYES_COLORS[1]
  },
  {
    name: wizardNames[2],
    coatColor: COAT_COLORS[2],
    eyesColor: EYES_COLORS[2]
  },
  {
    name: wizardNames[3],
    coatColor: COAT_COLORS[3],
    eyesColor: EYES_COLORS[3]
  }
];

var renderWizard = function(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

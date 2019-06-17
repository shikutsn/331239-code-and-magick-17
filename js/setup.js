'use strict';

var WIZARDS_QUANTITY = 4;

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var WIZARD_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZARD_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var getRandomNumber = function (min, max) {
  // случайное целое число из полуинтервала [min, max)
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomArrayElement = function (arr) {
  return arr[getRandomNumber(0, arr.length)];
}

var getRandomWizardName = function () {
  if (Math.random() < 0.5) {
    return getRandomArrayElement(WIZARD_NAMES) + ' ' + getRandomArrayElement(WIZARD_SURNAMES);
  } else {
    return getRandomArrayElement(WIZARD_SURNAMES) + ' ' + getRandomArrayElement(WIZARD_NAMES);
  }
};

var getRandomWizard = function () {
  return {
    name: getRandomWizardName(),
    coatColor: getRandomArrayElement(WIZARD_COAT_COLORS),
    eyesColor: getRandomArrayElement(WIZARD_EYES_COLORS)
  };
};

var getWizards = function (quantity) {
  var output = [];

  for (var i = 0; i < quantity; i++) {
    output.push(getRandomWizard());
  }

  return output;
};

var renderWizard = function (wizard, template) {
  var wizardElement = template.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fillFragment = function (wizardsList, template) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizardsList.length; i++) {
    fragment.appendChild(renderWizard(wizards[i], template));
  }

  return fragment;
};


var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var wizards = getWizards(WIZARDS_QUANTITY);
var fragment = fillFragment(wizards, similarWizardTemplate)


similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');

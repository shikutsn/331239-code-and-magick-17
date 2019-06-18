'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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

var WIZARD_FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var getRandomNumber = function (min, max) {
  // случайное целое число из полуинтервала [min, max)
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomArrayElement = function (arr) {
  return arr[getRandomNumber(0, arr.length)];
};

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


var setup = document.querySelector('.setup');

var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var wizards = getWizards(WIZARDS_QUANTITY);
var fragment = fillFragment(wizards, similarWizardTemplate);


similarListElement.appendChild(fragment);
setup.querySelector('.setup-similar').classList.remove('hidden');


var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var wizardNameField = setup.querySelector('.setup-user-name');
var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var wizardCoatColorField = setup.querySelector('[name="coat-color"]');
var wizardEyesColorField = setup.querySelector('[name="eyes-color"]');
var wizardFireballColorField = setup.querySelector('[name="fireball-color"]');

var setWizardCoatColor = function () {
  wizardCoat.style.fill = getRandomArrayElement(WIZARD_COAT_COLORS);
  wizardCoatColorField.value = wizardCoat.style.fill;
};

var setWizardEyesColor = function () {
  wizardEyes.style.fill = getRandomArrayElement(WIZARD_EYES_COLORS);
  wizardEyesColorField.value = wizardEyes.style.fill;
};

var setWizardFireballColor = function () {
  wizardFireball.style.backgroundColor = getRandomArrayElement(WIZARD_FIREBALL_COLORS);
  wizardFireballColorField.value = wizardFireball.style.backgroundColor;
};

var onSetupWindowEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== wizardNameField) {
    closeSetupWindow();
  }
};

var openSetupWindow = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onSetupWindowEscPress);

  wizardCoat.addEventListener('click', setWizardCoatColor);
  wizardEyes.addEventListener('click', setWizardEyesColor);
  wizardFireball.addEventListener('click', setWizardFireballColor);
};

var closeSetupWindow = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onSetupWindowEscPress);

  wizardCoat.removeEventListener('click', setWizardCoatColor);
  wizardEyes.removeEventListener('click', setWizardEyesColor);
  wizardFireball.removeEventListener('click', setWizardFireballColor);
};

setupOpen.addEventListener('click', function () {
  openSetupWindow();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetupWindow();
  }
});

setupClose.addEventListener('click', function () {
  closeSetupWindow();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetupWindow();
  }
});

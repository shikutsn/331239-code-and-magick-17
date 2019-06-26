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
  var name = getRandomArrayElement(WIZARD_NAMES);
  var surname = getRandomArrayElement(WIZARD_SURNAMES);
  return Math.random() < 0.5 ? name + ' ' + surname : surname + ' ' + name;
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
    fragment.appendChild(renderWizard(wizardsList[i], template));
  }

  return fragment;
};


var setupEl = document.querySelector('.setup');

var similarListEl = setupEl.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var wizards = getWizards(WIZARDS_QUANTITY);
var fragment = fillFragment(wizards, similarWizardTemplate);


similarListEl.appendChild(fragment);
setupEl.querySelector('.setup-similar').classList.remove('hidden');


var setupOpenEl = document.querySelector('.setup-open');
var setupCloseEl = setupEl.querySelector('.setup-close');
var wizardNameEl = setupEl.querySelector('.setup-user-name');
var wizardCoatEl = setupEl.querySelector('.setup-wizard .wizard-coat');
var wizardEyesEl = setupEl.querySelector('.setup-wizard .wizard-eyes');
var wizardFireballEl = setupEl.querySelector('.setup-fireball-wrap');
var wizardCoatColorEl = setupEl.querySelector('[name="coat-color"]');
var wizardEyesColorEl = setupEl.querySelector('[name="eyes-color"]');
var wizardFireballColorEl = setupEl.querySelector('[name="fireball-color"]');

var setWizardCoatColor = function () {
  wizardCoatEl.style.fill = getRandomArrayElement(WIZARD_COAT_COLORS);
  wizardCoatColorEl.value = wizardCoatEl.style.fill;
};

var setWizardEyesColor = function () {
  wizardEyesEl.style.fill = getRandomArrayElement(WIZARD_EYES_COLORS);
  wizardEyesColorEl.value = wizardEyesEl.style.fill;
};

var setWizardFireballColor = function () {
  var fireballColor = getRandomArrayElement(WIZARD_FIREBALL_COLORS);
  wizardFireballEl.style.backgroundColor = fireballColor;
  wizardFireballColorEl.value = fireballColor;
};

var onSetupWindowEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== wizardNameEl) {
    closeSetupWindow();
  }
};

var resetSetupWindowPosition = function (element) {
  element.style = '';
}

var openSetupWindow = function () {
  setupEl.classList.remove('hidden');
  document.addEventListener('keydown', onSetupWindowEscPress);

  wizardCoatEl.addEventListener('click', setWizardCoatColor);
  wizardEyesEl.addEventListener('click', setWizardEyesColor);
  wizardFireballEl.addEventListener('click', setWizardFireballColor);
};

var closeSetupWindow = function () {
  setupEl.classList.add('hidden');
  document.removeEventListener('keydown', onSetupWindowEscPress);

  wizardCoatEl.removeEventListener('click', setWizardCoatColor);
  wizardEyesEl.removeEventListener('click', setWizardEyesColor);
  wizardFireballEl.removeEventListener('click', setWizardFireballColor);

  resetSetupWindowPosition(setupEl);
};

setupOpenEl.addEventListener('click', function () {
  openSetupWindow();
});

setupOpenEl.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetupWindow();
  }
});

setupCloseEl.addEventListener('click', function () {
  closeSetupWindow();
});

setupCloseEl.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetupWindow();
  }
});

// Задание 9
// сразу открываем окно настроек для отладки
openSetupWindow();

var setupDragHandleEl = setupEl.querySelector('.upload');

setupDragHandleEl.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragging = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragging = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setupEl.style.top = (setupEl.offsetTop - shift.y) + 'px';
    setupEl.style.left = (setupEl.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragging) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          setupDragHandleEl.removeEventListener('click', onClickPreventDefault)
        };
        setupDragHandleEl.addEventListener('click', onClickPreventDefault);
      }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

let lang;
if (localStorage.language) {
  lang = localStorage.language;
} else lang = 'eng';
let isShift = false;
let keyboardLayout;
let keyLayout;

const keysArrayEng = [
  '`',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '-',
  '=',
  'Backspace',
  'Tab',
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  '[',
  ']',
  '\\',
  'Delete',
  'CapsLock',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  ';',
  '\'',
  'Enter',
  'Shift',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  ',',
  '.',
  '/',
  'ArrowUp',
  'Smile',
  'Control',
  'Lang',
  'Alt',
  'Space',
  'ArrowLeft',
  'ArrowDown',
  'ArrowRight',
];

const keysArrayEngShift = [
  '~',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '_',
  '+',
  'Backspace',
  'Tab',
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  '{',
  '}',
  '|',
  'Delete',
  'CapsLock',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  ':',
  '\'',
  'Enter',
  'Shift',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
  '<',
  '>',
  '?',
  'ArrowUp',
  'Smile',
  'Control',
  'Lang',
  'Alt',
  'Space',
  'ArrowLeft',
  'ArrowDown',
  'ArrowRight',
];

const keysArrayRus = [
  'ё',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '-',
  '=',
  'Backspace',
  'Tab',
  'й',
  'ц',
  'у',
  'к',
  'е',
  'н',
  'г',
  'ш',
  'щ',
  'з',
  'х',
  'ъ',
  '\\',
  'Delete',
  'CapsLock',
  'ф',
  'ы',
  'в',
  'а',
  'п',
  'р',
  'о',
  'л',
  'д',
  'ж',
  'э',
  'Enter',
  'Shift',
  'я',
  'ч',
  'с',
  'м',
  'и',
  'т',
  'ь',
  'б',
  'ю',
  '.',
  'ArrowUp',
  'Smile',
  'Control',
  'Lang',
  'Alt',
  'Space',
  'ArrowLeft',
  'ArrowDown',
  'ArrowRight',
];

const keysArrayRusShift = [
  'Ё',
  '!',
  '\'',
  '№',
  ';',
  '%',
  ':',
  '?',
  '*',
  '(',
  ')',
  '_',
  '+',
  'Backspace',
  'Tab',
  'Й',
  'Ц',
  'У',
  'К',
  'Е',
  'Н',
  'Г',
  'Ш',
  'Щ',
  'З',
  'Х',
  'Ъ',
  '/',
  'Delete',
  'CapsLock',
  'Ф',
  'Ы',
  'В',
  'А',
  'П',
  'Р',
  'О',
  'Л',
  'Д',
  'Ж',
  'Э',
  'Enter',
  'Shift',
  'Я',
  'Ч',
  'С',
  'М',
  'И',
  'Т',
  'Ь',
  'Б',
  'Ю',
  ',',
  'ArrowUp',
  'Smile',
  'Control',
  'Lang',
  'Alt',
  'Space',
  'ArrowLeft',
  'ArrowDown',
  'ArrowRight',
];

const letters = [
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  'ё',
  'й',
  'ц',
  'у',
  'к',
  'е',
  'н',
  'г',
  'ш',
  'щ',
  'з',
  'х',
  'ъ',
  'ф',
  'ы',
  'в',
  'а',
  'п',
  'р',
  'о',
  'л',
  'д',
  'ж',
  'э',
  'я',
  'ч',
  'с',
  'м',
  'и',
  'т',
  'ь',
  'б',
  'ю',
];

function setLang() {
  if (lang === 'eng') {
    if (isShift) {
      keyboardLayout = keysArrayEngShift;
      keyLayout = 'engShift';
    } else {
      keyboardLayout = keysArrayEng;
      keyLayout = 'eng';
    }
  } else if (isShift) {
    keyboardLayout = keysArrayRusShift;
    keyLayout = 'rusShift';
  } else {
    keyboardLayout = keysArrayRus;
    keyLayout = 'rus';
  }
}
setLang();

function changeLang() {
  if (lang === 'eng') {
    lang = 'ru';
  } else lang = 'eng';
  localStorage.language = `${lang}`;
  setLang();
  KeyboardObj.createKeysHTML(keyboardLayout, keyLayout);
}

function insertBreak() {
  const keyboardKeys = document.querySelector('.keyboard__keys');
  keyboardKeys.append(document.createElement('br'));
}

const lettersArray = [];
class Letter {
  constructor(rus, rusShift, eng, engShift) {
    this.rus = rus;
    this.rusShift = rusShift;
    this.eng = eng;
    this.engShift = engShift;
  }
}

function createLetters() {
  for (let i = 0; i < keysArrayEng.length; i++) {
    const oneLetter = new Letter(
      keysArrayRus[i],
      keysArrayRusShift[i],
      keysArrayEng[i],
      keysArrayEngShift[i],
    );
    lettersArray.push(oneLetter);
  }
}

const KeyboardObj = {
  elements: {
    main: null,
    keyContainer: [],
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    capsLock: false,
  },

  init() {
    const body = document.querySelector('body');
    const wrapper = document.createElement('div');
    const textarea = document.createElement('textarea');
    const shortcut = document.createElement('div');
    const keyboard = document.createElement('div');
    const keyboardKeys = document.createElement('div');
    const footer = document.createElement('div');
    footer.innerHTML = '<a href="https://github.com/XtinaT/Virtual-keyboard/tree/develop">Привет! Тут ссылка на PR =) </a>';

    wrapper.classList.add('wrapper');
    textarea.classList.add('textarea');
    keyboard.classList.add('keyboard');
    keyboardKeys.classList.add('keyboard__keys');
    shortcut.textContent = 'Press Lang to change language';

    body.append(wrapper);
    body.append(footer);
    wrapper.append(textarea);
    wrapper.append(shortcut);
    wrapper.append(keyboard);
    keyboard.append(keyboardKeys);
    this.createKeys();
    createLetters();
  },

  createKeysHTML(layout) {
    this.elements.keyContainer = [];
    const keyboardKeys = document.querySelector('.keyboard__keys');
    keyboardKeys.innerHTML = '';
    layout.forEach((key) => {
      const keyboardKey = document.createElement('div');
      keyboardKey.classList.add('keyboard__key');
      const textarea = document.querySelector('.textarea');
      switch (key) {
        case 'Backspace':
          keyboardKey.classList.add('keyboard__key_bigger');
          keyboardKey.classList.add('keyboard__key_dark');
          keyboardKey.textContent = key;
          keyboardKey.addEventListener('click', () => {
            textarea.focus();
            const i = textarea.selectionStart;
            let newValue = '';
            for (let j = 0; j < this.properties.value.length; j++) {
              if (j !== i - 1) newValue += this.properties.value[j];
            }
            this.properties.value = newValue;
            this.triggerEvent('oninput');
            textarea.selectionStart = i - 1;
            textarea.selectionEnd = i - 1;
          });
          keyboardKeys.append(keyboardKey);
          insertBreak();
          break;

        case 'Tab':
          keyboardKey.classList.add('keyboard__key_dark');
          keyboardKey.textContent = key;
          keyboardKey.addEventListener('click', () => {
            textarea.focus();
            if (textarea.selectionStart === 0) {
              textarea.selectionStart = this.properties.value.length;
              textarea.selectionEnd = this.properties.value.length;
            }
            const i = textarea.selectionStart;
            if (i === this.properties.value.length) {
              this.properties.value += '    ';
            } else {
              let newValue = '';
              for (let j = 0; j < this.properties.value.length; j++) {
                if (j === i) newValue += '    ';
                newValue += this.properties.value[j];
              }
              this.properties.value = newValue;
            }

            this.triggerEvent('oninput');
            textarea.selectionStart = i + 4;
            textarea.selectionEnd = i + 4;
          });
          keyboardKeys.append(keyboardKey);
          break;

        case 'Lang':
          keyboardKey.classList.add('keyboard__key_dark');
          keyboardKey.textContent = key;
          keyboardKey.addEventListener('click', () => {
            changeLang();
          });
          keyboardKeys.append(keyboardKey);
          break;

        case 'Delete':
          keyboardKey.classList.add('keyboard__key_dark');
          keyboardKey.textContent = 'Del';
          keyboardKey.addEventListener('click', () => {
            textarea.focus();
            const i = textarea.selectionStart;
            if (i < this.properties.value.length) {
              let newValue = '';
              for (let j = 0; j < this.properties.value.length; j++) {
                if (j !== i) newValue += this.properties.value[j];
              }

              this.properties.value = newValue;
              this.triggerEvent('oninput');
            }
            textarea.selectionStart = i;
            textarea.selectionEnd = i;
          });
          keyboardKeys.append(keyboardKey);
          insertBreak();
          break;

        case 'Shift':
          keyboardKey.classList.add('keyboard__key_bigger');
          keyboardKey.classList.add('keyboard__key_dark');
          keyboardKey.textContent = key;
          keyboardKey.setAttribute('data-name', `${key}`);
          keyboardKey.addEventListener('mousedown', () => {
            this.togleCapsLock(true);
            keyboardKey.classList.toggle('keyboard__key_active');
          });
          keyboardKey.addEventListener('mouseup', () => {
            this.togleCapsLock(false);
            keyboardKey.classList.toggle('keyboard__key_active');
          });
          keyboardKeys.append(keyboardKey);
          break;

        case 'Control':
          keyboardKey.classList.add('keyboard__key_dark');
          keyboardKey.textContent = 'Ctrl';
          keyboardKey.addEventListener('click', () => {});
          keyboardKeys.append(keyboardKey);
          break;

        case 'Alt':
          keyboardKey.classList.add('keyboard__key_dark');
          keyboardKey.textContent = 'Alt';
          keyboardKey.addEventListener('click', () => {});
          keyboardKeys.append(keyboardKey);
          break;

        case 'CapsLock':
          keyboardKey.classList.add('keyboard__key_bigger');
          keyboardKey.classList.add('keyboard__key_dark');
          keyboardKey.classList.add('keyboard__key_activatable');
          keyboardKey.setAttribute('data-name', `${key}`);
          keyboardKey.textContent = 'Caps';
          keyboardKey.addEventListener('click', () => {
            this.togleCapsLock();
            keyboardKey.classList.toggle(
              'keyboard__key_active',
              this.properties.capsLock,
            );
          });
          keyboardKeys.append(keyboardKey);
          break;

        case 'Enter':
          keyboardKey.classList.add('keyboard__key_bigger');
          keyboardKey.classList.add('keyboard__key_dark');
          keyboardKey.textContent = key;
          keyboardKey.addEventListener('click', () => {
            textarea.focus();
            if (textarea.selectionStart === 0) {
              textarea.selectionStart = this.properties.value.length;
              textarea.selectionEnd = this.properties.value.length;
            }
            const i = textarea.selectionStart;
            if (i === this.properties.value.length) {
              this.properties.value += '\n';
            } else {
              let newValue = '';
              for (let j = 0; j < this.properties.value.length; j++) {
                if (j === i) newValue += '\n';
                newValue += this.properties.value[j];
              }
              this.properties.value = newValue;
            }

            this.triggerEvent('oninput');
            textarea.selectionStart = i + 1;
            textarea.selectionEnd = i + 1;
          });
          keyboardKeys.append(keyboardKey);
          insertBreak();
          break;

        case 'Space':
          keyboardKey.classList.add('keyboard__key_the-biggest');
          keyboardKey.classList.add('keyboard__key_dark');
          keyboardKey.textContent = key;
          keyboardKey.addEventListener('click', () => {
            textarea.focus();
            if (textarea.selectionStart === 0) {
              textarea.selectionStart = this.properties.value.length;
              textarea.selectionEnd = this.properties.value.length;
            }
            const i = textarea.selectionStart;
            if (i === this.properties.value.length) {
              this.properties.value += ' ';
            } else {
              let newValue = '';
              for (let j = 0; j < this.properties.value.length; j++) {
                if (j === i) newValue += ' ';
                newValue += this.properties.value[j];
              }
              this.properties.value = newValue;
            }

            this.triggerEvent('oninput');
            textarea.selectionStart = i + 1;
            textarea.selectionEnd = i + 1;
          });
          keyboardKeys.append(keyboardKey);
          break;

        case 'ArrowUp':
          keyboardKey.classList.add('keyboard__key_dark');
          keyboardKey.setAttribute('data-name', key);
          keyboardKey.innerHTML = '&#9650;';
          keyboardKey.addEventListener('click', () => {
            textarea.focus();
            if (textarea.selectionStart === 0) {
              textarea.selectionStart = this.properties.value.length;
              textarea.selectionEnd = this.properties.value.length;
            } else {
              textarea.selectionStart -= 1;
              textarea.selectionEnd = textarea.selectionStart;
            }
          });
          keyboardKeys.append(keyboardKey);
          break;

        case 'Smile':
          keyboardKey.classList.add('keyboard__key_dark');
          keyboardKey.classList.add('keyboard__key_bigger');
          keyboardKey.innerHTML = '&#128522;';
          keyboardKey.addEventListener('click', () => {
            textarea.focus();
            if (textarea.selectionStart === 0) {
              textarea.selectionStart = this.properties.value.length;
              textarea.selectionEnd = this.properties.value.length;
            }
            const i = textarea.selectionStart;
            if (i === this.properties.value.length) {
              this.properties.value += '&#128522;';
            } else {
              let newValue = '';
              for (let j = 0; j < this.properties.value.length; j++) {
                if (j === i) newValue += '&#128522;';
                newValue += this.properties.value[j];
              }
              this.properties.value = newValue;
            }

            this.triggerEvent('oninput');
            textarea.selectionStart = i + 1;
            textarea.selectionEnd = i + 1;
          });
          keyboardKeys.append(keyboardKey);
          insertBreak();
          break;

        case 'ArrowDown':
          keyboardKey.classList.add('keyboard__key_dark');
          keyboardKey.setAttribute('data-name', key);
          keyboardKey.innerHTML = '&#9660;';
          keyboardKey.addEventListener('click', () => {
            textarea.focus();
            if (textarea.selectionStart === 0) {
              textarea.selectionStart = this.properties.value.length;
              textarea.selectionEnd = this.properties.value.length;
            } else {
              textarea.selectionStart += 1;
              textarea.selectionEnd = textarea.selectionStart;
            }
          });
          keyboardKeys.append(keyboardKey);
          break;

        case 'ArrowLeft':
          keyboardKey.classList.add('keyboard__key_dark');
          keyboardKey.setAttribute('data-name', key);
          keyboardKey.innerHTML = '&#9664;';
          keyboardKey.addEventListener('click', () => {
            textarea.focus();
            if (textarea.selectionStart === 0) {
              textarea.selectionStart = this.properties.value.length;
              textarea.selectionEnd = this.properties.value.length;
            } else {
              textarea.selectionStart -= 1;
              textarea.selectionEnd = textarea.selectionStart;
            }
          });
          keyboardKeys.append(keyboardKey);
          break;

        case 'ArrowRight':
          keyboardKey.classList.add('keyboard__key_dark');
          keyboardKey.setAttribute('data-name', key);
          keyboardKey.innerHTML = '&#9654;';
          keyboardKey.addEventListener('click', () => {
            textarea.focus();
            if (textarea.selectionStart === 0) {
              textarea.selectionStart = this.properties.value.length;
              textarea.selectionEnd = this.properties.value.length;
            } else {
              textarea.selectionStart += 1;
              textarea.selectionEnd = textarea.selectionStart;
            }
          });
          keyboardKeys.append(keyboardKey);
          break;

        default:
          keyboardKey.textContent = key;
          keyboardKey.setAttribute('data-name', key);
          keyboardKey.addEventListener('click', () => {
            textarea.focus();
            if (textarea.selectionStart === 0) {
              textarea.selectionStart = this.properties.value.length;
              textarea.selectionEnd = this.properties.value.length;
            }
            const i = textarea.selectionStart;
            if (i === this.properties.value.length) {
              this.properties.value += this.properties.capsLock
                ? key.toUpperCase()
                : key.toLowerCase();
            } else {
              let newValue = '';
              for (let j = 0; j < this.properties.value.length; j++) {
                if (j === i) {
                  newValue += this.properties.capsLock
                    ? key.toUpperCase()
                    : key.toLowerCase();
                }
                newValue += this.properties.value[j];
              }
              this.properties.value = newValue;
            }

            this.triggerEvent('oninput');
            textarea.selectionStart = i + 1;
            textarea.selectionEnd = i + 1;
          });
          keyboardKeys.append(keyboardKey);
          if (letters.includes(key)) {
            this.elements.keys.push(keyboardKey);
          }
          break;
      }
      this.elements.keyContainer.push(keyboardKey);
    });
  },

  createKeys() {
    const self = this;
    this.createKeysHTML(keyboardLayout);

    function keyEventsHandler() {
      function keyDown(e) {
        e.preventDefault();
        let keyValue;
        let keyToComp = e.key;
        if (e.code === 'Space') {
          keyToComp = e.code;
        }
        let arrayForComp;
        if (self.properties.capsLock) {
          arrayForComp = keysArrayEngShift;
          if (letters.includes(keyToComp)) {
            keyToComp = keyToComp.toUpperCase();
          }
        } else arrayForComp = keysArrayEng;
        if (keyLayout === 'rus') {
          const index = arrayForComp.indexOf(keyToComp);
          keyValue = keysArrayRus[index];
        } else if (keyLayout === 'eng') {
          keyValue = keyToComp;
        } else if (keyLayout === 'engShift') {
          const index = arrayForComp.indexOf(keyToComp);
          keyValue = keysArrayEngShift[index];
        } else {
          const index = arrayForComp.indexOf(keyToComp);
          keyValue = keysArrayRusShift[index];
        }
        for (let m = 0; m < self.elements.keyContainer.length; m++) {
          const elem = self.elements.keyContainer[m];
          if (
            keyValue.toLowerCase() === elem.innerHTML.toLowerCase()
            || keyValue.toLowerCase() === elem.textContent.toLowerCase()
            || (e.code === 'Space' && elem.textContent === 'Space')
            || (e.code === 'Delete' && elem.textContent === 'Del')
            || (e.code === 'CapsLock' && elem.textContent === 'Caps')
            || (e.code === 'ControlLeft' && elem.textContent === 'Ctrl')
            || (e.code === 'ControlRight' && elem.textContent === 'Ctrl')
            || (e.code === 'ArrowUp' && elem.dataset.name === 'ArrowUp')
            || (e.code === 'ArrowDown' && elem.dataset.name === 'ArrowDown')
            || (e.code === 'ArrowRight' && elem.dataset.name === 'ArrowRight')
            || (e.code === 'ArrowLeft' && elem.dataset.name === 'ArrowLeft')
          ) {
            elem.classList.add('keyboard__key_pressed');
            const textarea = document.querySelector('.textarea');
            let k;
            let newValue;
            switch (e.code) {
              case 'Backspace':
                textarea.focus();
                k = textarea.selectionStart;
                newValue = '';
                for (let j = 0; j < self.properties.value.length; j++) {
                  if (j !== k - 1) newValue += self.properties.value[j];
                }

                self.properties.value = newValue;
                self.triggerEvent('oninput');
                textarea.selectionStart = k - 1;
                textarea.selectionEnd = k - 1;
                break;

              case 'Tab':
                textarea.focus();
                if (textarea.selectionStart === 0) {
                  textarea.selectionStart = self.properties.value.length;
                  textarea.selectionEnd = self.properties.value.length;
                }
                k = textarea.selectionStart;
                if (k === self.properties.value.length) {
                  self.properties.value += '    ';
                } else {
                  newValue = '';
                  for (let j = 0; j < self.properties.value.length; j++) {
                    if (j === k) newValue += '    ';
                    newValue += self.properties.value[j];
                  }
                  self.properties.value = newValue;
                }

                self.triggerEvent('oninput');
                textarea.selectionStart = k + 4;
                textarea.selectionEnd = k + 4;
                break;

              case 'Delete':
                textarea.focus();
                k = textarea.selectionStart;
                if (k < self.properties.value.length) {
                  newValue = '';
                  for (let j = 0; j < self.properties.value.length; j++) {
                    if (j !== k) newValue += self.properties.value[j];
                  }

                  self.properties.value = newValue;
                  self.triggerEvent('oninput');
                }
                textarea.selectionStart = k;
                textarea.selectionEnd = k;

                break;

              case 'ShiftLeft':
              case 'ShiftRight':
                isShift = true;
                setLang();
                document.removeEventListener('keydown', keyDown, false);
                document.removeEventListener('keyup', keyUp, false);
                self.createKeys();
                self.togleCapsLock(true);
                break;

              case 'ControlLeft':
              case 'ControlRight':
                break;

              case 'AltLeft':
                break;

              case 'CapsLock':
                self.togleCapsLock(e.getModifierState('CapsLock'));
                break;

              case 'Enter':
                textarea.focus();
                if (textarea.selectionStart === 0) {
                  textarea.selectionStart = self.properties.value.length;
                  textarea.selectionEnd = self.properties.value.length;
                }
                k = textarea.selectionStart;
                if (k === self.properties.value.length) {
                  self.properties.value += '\n';
                } else {
                  newValue = '';
                  for (let j = 0; j < self.properties.value.length; j++) {
                    if (j === k) newValue += '\n';
                    newValue += self.properties.value[j];
                  }
                  self.properties.value = newValue;
                }

                self.triggerEvent('oninput');
                textarea.selectionStart = k + 1;
                textarea.selectionEnd = k + 1;
                break;

              case 'Space':
                textarea.focus();
                if (textarea.selectionStart === 0) {
                  textarea.selectionStart = self.properties.value.length;
                  textarea.selectionEnd = self.properties.value.length;
                }
                k = textarea.selectionStart;
                if (k === self.properties.value.length) {
                  self.properties.value += ' ';
                } else {
                  newValue = '';
                  for (let j = 0; j < self.properties.value.length; j++) {
                    if (j === k) newValue += ' ';
                    newValue += self.properties.value[j];
                  }
                  self.properties.value = newValue;
                }

                self.triggerEvent('oninput');
                textarea.selectionStart = k + 1;
                textarea.selectionEnd = k + 1;
                break;

              case 'ArrowUp':
              case 'ArrowLeft':
                textarea.focus();
                if (textarea.selectionStart === 0) {
                  textarea.selectionStart = self.properties.value.length;
                  textarea.selectionEnd = self.properties.value.length;
                } else {
                  textarea.selectionStart -= 1;
                  textarea.selectionEnd = textarea.selectionStart;
                }
                break;

              case 'ArrowDown':
              case 'ArrowRight':
                textarea.focus();
                if (textarea.selectionStart === 0) {
                  textarea.selectionStart = self.properties.value.length;
                  textarea.selectionEnd = self.properties.value.length;
                } else {
                  textarea.selectionStart += 1;
                  textarea.selectionEnd = textarea.selectionStart;
                }
                break;

              default:
                textarea.focus();
                if (textarea.selectionStart === 0) {
                  textarea.selectionStart = self.properties.value.length;
                  textarea.selectionEnd = self.properties.value.length;
                }
                k = textarea.selectionStart;
                if (k === self.properties.value.length) {
                  self.properties.value += self.properties.capsLock
                    ? keyValue.toUpperCase()
                    : keyValue.toLowerCase();
                } else {
                  newValue = '';
                  for (let j = 0; j < self.properties.value.length; j++) {
                    if (j === k) {
                      newValue += self.properties.capsLock
                        ? keyValue.toUpperCase()
                        : keyValue.toLowerCase();
                    }
                    newValue += self.properties.value[j];
                  }
                  self.properties.value = newValue;
                }

                self.triggerEvent('oninput');
                textarea.selectionStart = k + 1;
                textarea.selectionEnd = k + 1;
                break;
            }
          }
        }
      }
      function keyUp(e) {
        e.preventDefault();
        const pressedKey = document.querySelector('.keyboard__key_pressed');
        if (pressedKey) pressedKey.classList.remove('keyboard__key_pressed');
        if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
          isShift = false;
          document.removeEventListener('keydown', keyDown, false);
          document.removeEventListener('keyup', keyUp, false);
          setLang();
          self.togleCapsLock(false);
          self.createKeys();
        }
      }
      document.addEventListener('keydown', keyDown, false);
      document.addEventListener('keyup', keyUp, false);
    }
    keyEventsHandler();
  },

  triggerEvent() {
    const textarea = document.querySelector('.textarea');
    textarea.innerHTML = this.properties.value;
  },

  togleCapsLock(isCaps) {
    if (isCaps !== undefined) {
      this.properties.capsLock = isCaps;
      const capsKey = document.querySelector('[data-name=CapsLock]');
      capsKey.classList.toggle(
        'keyboard__key_active',
        this.properties.capsLock,
      );
    } else {
      this.properties.capsLock = !this.properties.capsLock;
    }
    if (this.properties.capsLock) {
      for (let i = 0; i < this.elements.keys.length; i++) {
        this.elements.keys[i].textContent = this.elements.keys[i].textContent.toUpperCase();
      }
    } else {
      for (let i = 0; i < this.elements.keys.length; i++) {
        this.elements.keys[i].textContent = this.elements.keys[i].textContent.toLowerCase();
      }
    }
  },

  togleShift() {},
};

KeyboardObj.init();

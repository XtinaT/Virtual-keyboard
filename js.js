"use strict";

const KeyboardObj = {
  elements: {
    main: null,
    keyContainer: [],
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
},

  properties: {
    value:"",
    capsLock: false
  },
  
   init() {
    let body = document.body; //this.elements.body
    let wrapper = document.createElement('div');
    let textarea = document.createElement('textarea');
    let keyboard = document.createElement('div');// main
    let keyboardKeys = document.createElement('div');//keysContainer

    wrapper.classList.add('wrapper');
    textarea.classList.add('textarea');
    keyboard.classList.add('keyboard');
    keyboardKeys.classList.add('keyboard__keys');

    body.append(wrapper);
    wrapper.append(textarea);
    wrapper.append(keyboard);
    keyboard.append(keyboardKeys);
    this._createKeys();
   },

   _createKeys() {
     let self = this;
      let keyboardKeys = document.querySelector('.keyboard__keys');
      
      let keysArrayEng = [
        "`","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del",
        "Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l",  ";", "'","Enter",
        "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "up", "ShiftRight", "Ctrl",  "Lang", "Alt",  "Space",  "left", "down",
        "right", "Ctrl"
    ];

    let keysArrayEngShift = [
      "~","!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace", "Tab",
      "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|", "Del",
      "Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L",  ":", "\"","Enter",
      "Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "up", "ShiftRight", "Ctrl",  "Lang", "Alt",  "Space",  "left", "down",
      "right", "Ctrl"  
  ];

    let keysArrayRus = [
      "ё","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab",
      "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "Del",
      "Caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д",  "ж", "э","Enter",
      "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "up", "ShiftRight", "Ctrl",  "Lang", "Alt",  "Space",  "left", "down",
      "right", "Ctrl"
  ]; 

  let keysArrayRusshift = [
    "Ё","!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "Backspace", "Tab",
    "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "/", "Del",
    "Caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д",  "Ж", "Э","Enter",
    "Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "up", "ShiftRight", "Ctrl",  "Lang", "Alt",  "Space",  "left", "down",
    "right", "Ctrl"
]; 

let letters = [ "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", 
"a", "s", "d", "f", "g", "h", "j", "k", "l",  "z", "x", "c", "v", "b", "n", "m", "ё", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "ф", "ы", "в", "а", "п", "р", "о", "л", "д",  "ж", "э", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю" ];


    function createKeysHTML() {
      keysArrayEng.forEach(key=> {
        let keyboardKey = document.createElement('div');
        keyboardKey.classList.add('keyboard__key');

        switch(key) {
          case 'Backspace':
            keyboardKey.classList.add('keyboard__key_bigger');
            keyboardKey.classList.add('keyboard__key_dark');
            keyboardKey.textContent = key;
            keyboardKey.addEventListener('click',()=>{
              self.properties.value = self.properties.value.substring(0, self.properties.value.length-1);
              self._triggerEvent('oninput');
            });
            keyboardKeys.append(keyboardKey);
            insertBreak();
            break;

            case 'Tab':
              keyboardKey.classList.add('keyboard__key_dark');
              keyboardKey.textContent = key;
              keyboardKey.addEventListener('click',()=>{
                self.properties.value += "    ";
                self._triggerEvent('oninput');
              });
              keyboardKeys.append(keyboardKey);
              break;

              case 'Del':
              keyboardKey.classList.add('keyboard__key_dark');
              keyboardKey.textContent = key;
              keyboardKey.addEventListener('click',()=>{
                self.properties.value += " ";// переделать!
                self._triggerEvent('oninput');
              });
              keyboardKeys.append(keyboardKey);
              insertBreak();
              break;

              case 'Shift':
            keyboardKey.classList.add('keyboard__key_bigger');
            keyboardKey.classList.add('keyboard__key_dark');
            keyboardKey.textContent = key;
            keyboardKey.addEventListener('click',()=>{
              self.properties.value += ' ';
              self._triggerEvent('oninput');
            });
            keyboardKeys.append(keyboardKey);
            break;

            case 'ShiftRight':
            keyboardKey.classList.add('keyboard__key_bigger');
            keyboardKey.classList.add('keyboard__key_dark');
            keyboardKey.textContent = 'Shift';
            keyboardKey.addEventListener('click',()=>{
              self.properties.value += ' ';
              self._triggerEvent('oninput');
            });
            keyboardKeys.append(keyboardKey);
            insertBreak();
            break;
          
          case 'Caps':
            keyboardKey.classList.add('keyboard__key_bigger');
            keyboardKey.classList.add('keyboard__key_dark');
            keyboardKey.classList.add('keyboard__key_activatable');
            keyboardKey.textContent = key;
            keyboardKey.addEventListener('click',()=>{
              self._togleCapsLock();
              keyboardKey.classList.toggle('keyboard__key_active', self.properties.capsLock);
            });
            keyboardKeys.append(keyboardKey);
            break; 

            case 'Enter':
              keyboardKey.classList.add('keyboard__key_bigger');
              keyboardKey.classList.add('keyboard__key_dark');
              keyboardKey.textContent = key;
              keyboardKey.addEventListener('click',()=>{
                self.properties.value += "\n";
                self._triggerEvent('oninput');
              });
              keyboardKeys.append(keyboardKey);
              insertBreak();
              break;

              case 'Space':
                keyboardKey.classList.add('keyboard__key_the-biggest');
                keyboardKey.classList.add('keyboard__key_dark');
                keyboardKey.textContent = key;
                keyboardKey.addEventListener('click',()=>{
                  self.properties.value += " ";
                  self._triggerEvent('oninput');
                });
                keyboardKeys.append(keyboardKey);
                break;

                case 'up':
                  keyboardKey.classList.add('keyboard__key_dark');
                  keyboardKey.innerHTML = "&#9650;";
                  keyboardKey.addEventListener('click',()=>{
                    self.properties.value += "&#9650;";
                    self._triggerEvent('oninput');
                  });
                  keyboardKeys.append(keyboardKey);
                  break;

                  case 'down':
                  keyboardKey.classList.add('keyboard__key_dark');
                  keyboardKey.innerHTML = "&#9660;";
                  keyboardKey.addEventListener('click',()=>{
                    self.properties.value += "&#9660;";
                    self._triggerEvent('oninput');
                  });
                  keyboardKeys.append(keyboardKey);
                  break;

                  case 'left':
                  keyboardKey.classList.add('keyboard__key_dark');
                  keyboardKey.innerHTML = "&#9664;";
                  keyboardKey.addEventListener('click',()=>{
                    self.properties.value += "&#9664;";
                    self._triggerEvent('oninput');
                  });
                  keyboardKeys.append(keyboardKey);
                  break;

                  case 'right':
                  keyboardKey.classList.add('keyboard__key_dark');
                  keyboardKey.innerHTML = "&#9654;";
                  keyboardKey.addEventListener('click',()=>{
                    self.properties.value += "&#9654;";
                    self._triggerEvent('oninput');
                  });
                  keyboardKeys.append(keyboardKey);
                  break;

                default:
                  keyboardKey.textContent = key;
                  keyboardKey.addEventListener('click',()=>{
                    self.properties.value += self.properties.capsLock? key.toUpperCase():key.toLowerCase();
                    self._triggerEvent('oninput');
                  });
                  keyboardKeys.append(keyboardKey);
                  if (letters.includes(key)) {
                    self.elements.keys.push(keyboardKey);
                  }
                  break;     
        }self.elements.keyContainer.push(keyboardKey); 
      });
    }
    console.log(this.elements.keyContainer);
    createKeysHTML();

    function keyEventsHandker() {
      let textarea = document.querySelector('.textarea');
      //textarea.addEventListener('keydown',keyDown, false);
      textarea.addEventListener('keyup',keyUp, false);

      function keyUp(e) {
        e = e||window.event;
        console.log(e.key);
      }
    }
    keyEventsHandker();

    function insertBreak() {
      keyboardKeys.append(document.createElement('br'));
    }
   },

   _triggerEvent(handlerName) {
     let textarea = document.querySelector('.textarea');
     textarea.innerHTML = this.properties.value;
   },

   _togleCapsLock() {
     this.properties.capsLock=!this.properties.capsLock;
     if (this.properties.capsLock) {
       for (let key of this.elements.keys) {
        key.textContent = key.textContent.toUpperCase();
       } 
     }else for (let key of this.elements.keys) {
      key.textContent = key.textContent.toLowerCase();
     } 
   },


}

KeyboardObj.init();
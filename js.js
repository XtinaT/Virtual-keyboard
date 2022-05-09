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
        "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "ArrowUp", "Smile", "Ctrl",  "Lang", "Alt",  "Space",  "ArrowLeft", "ArrowDown",
        "ArrowRight",
    ];

    let keysArrayEngShift = [
      "~","!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace", "Tab",
      "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|", "Del",
      "Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L",  ":", "\"","Enter",
      "Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "ArrowUp", "Smile", "Ctrl",  "Lang", "Alt",  "Space",  "ArrowLeft", "ArrowDown",
      "ArrowRight", 
  ];

    let keysArrayRus = [
      "ё","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab",
      "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "Del",
      "Caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д",  "ж", "э","Enter",
      "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "ArrowUp", "Smile", "Ctrl",  "Lang", "Alt",  "Space",  "ArrowLeft", "ArrowDown",
      "ArrowRight",
  ]; 

  let keysArrayRusshift = [
    "Ё","!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "Backspace", "Tab",
    "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "/", "Del",
    "Caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д",  "Ж", "Э","Enter",
    "Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "ArrowUp", "Smile", "Ctrl",  "Lang", "Alt",  "Space",  "ArrowLeft", "ArrowDown",
    "ArrowRight", 
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

            case 'Ctrl':
            keyboardKey.classList.add('keyboard__key_dark');
            keyboardKey.textContent = 'Ctrl';
            keyboardKey.addEventListener('click',()=>{
              self.properties.value += ' ';
              self._triggerEvent('oninput');
            });
            keyboardKeys.append(keyboardKey);
            break;
          
          case 'Caps':
            keyboardKey.classList.add('keyboard__key_bigger');
            keyboardKey.classList.add('keyboard__key_dark');
            keyboardKey.classList.add('keyboard__key_activatable');
            keyboardKey.setAttribute('data-name',`${key}`);
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
	
                case 'ArrowUp':
                  keyboardKey.classList.add('keyboard__key_dark');
                  keyboardKey.innerHTML = "&#9650;";
                  keyboardKey.addEventListener('click',()=>{
                    self.properties.value += "&#9650;";
                    self._triggerEvent('oninput');
                  });
                  keyboardKeys.append(keyboardKey);
                  break;

                  case 'Smile':
                  keyboardKey.classList.add('keyboard__key_dark');
                  keyboardKey.classList.add('keyboard__key_bigger');
                  keyboardKey.innerHTML = "&#128522;";
                  keyboardKey.addEventListener('click',()=>{
                    self.properties.value += "&#128522;";
                    self._triggerEvent('oninput');
                  });
                  keyboardKeys.append(keyboardKey);
                  insertBreak();
                  break;

                  case 'ArrowDown':
                  keyboardKey.classList.add('keyboard__key_dark');
                  keyboardKey.innerHTML = "&#9660;";
                  keyboardKey.addEventListener('click',()=>{
                    self.properties.value += "&#9660;";
                    self._triggerEvent('oninput');
                  });
                  keyboardKeys.append(keyboardKey);
                  break;

                  case 'ArrowLeft':
                  keyboardKey.classList.add('keyboard__key_dark');
                  keyboardKey.innerHTML = "&#9664;";
                  keyboardKey.addEventListener('click',()=>{
                    self.properties.value += "&#9664;";
                    self._triggerEvent('oninput');
                  });
                  keyboardKeys.append(keyboardKey);
                  break;

                  case 'ArrowRight':
                  keyboardKey.classList.add('keyboard__key_dark');
                  keyboardKey.setAttribute('data-name',`${key}`);
                  keyboardKey.innerHTML = "&#9654;";
                  keyboardKey.addEventListener('click',()=>{
                    self.properties.value += "&#9654;";
                    self._triggerEvent('oninput');
                  });
                  keyboardKeys.append(keyboardKey);
                  break;

                default:
                  keyboardKey.textContent = key;
                  keyboardKey.setAttribute('data-name',`${key}`);
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
    createKeysHTML();

    function keyEventsHandler() {
      document.addEventListener('keydown',keyDown, false);
      document.addEventListener('keyup',keyUp, false);

      function keyDown(e) {
        e = e||window.event;
        e.preventDefault();
        console.log(e.code);
      for (let elem of self.elements.keyContainer) {
          //console.log(`e.key:${e.key} inner:${elem.innerHTML} text:${elem.textContent}`);
        if (e.key.toLowerCase()===elem.innerHTML.toLowerCase()||e.key.toLowerCase()===elem.textContent.toLowerCase()||(e.code==='Space'&&elem.textContent==='Space')||(e.code==='Delete'&&elem.textContent==='Del')||(e.code==='CapsLock'&&elem.textContent==='Caps')||(e.code==='ControlLeft'&&elem.textContent==='Ctrl')) {
            elem.classList.add("keyboard__key_pressed");
            switch(e.code) {
              case 'Backspace':
                  self.properties.value = self.properties.value.substring(0, self.properties.value.length-1);
                  self._triggerEvent('oninput');
                  break;
    
                case 'Tab':
                  self.properties.value += "    ";
                  self._triggerEvent('oninput');
                  break;
    
                  case 'Delete':
                  self.properties.value += " ";// переделать!
                  self._triggerEvent('oninput');
                  break;
    
                  case 'ShiftLeft':
                    case 'ShiftRight':
                  self.properties.value += ' ';// переделать!
                  self._triggerEvent('oninput');
                break;
    

                case 'ControlLeft':
                case 'ControlRight':
                  self.properties.value += ' ';// переделать!
                  self._triggerEvent('oninput');
                break;

              case 'CapsLock':
                  self._togleCapsLock(e.getModifierState("CapsLock"));
                break; 
    
                case 'Enter':
                    self.properties.value += "\n";
                    self._triggerEvent('oninput');
                  break;
    
                  case 'Space':
                      self.properties.value += " ";
                      self._triggerEvent('oninput');
                    break;
    
                    case 'ArrowUp':
                    case 'ArrowDown':
                    case 'ArrowLeft':
                    case 'ArrowRight':
                      console.log('arrow');
                      break;
    
                    default:
                        self.properties.value += self.properties.capsLock? e.key.toUpperCase():e.key.toLowerCase();
                        self._triggerEvent('oninput');
                      break;     
            }

            /*self.properties.value += self.properties.capsLock? e.key.toUpperCase():e.key.toLowerCase();
            self._triggerEvent('oninput');*/
          }
        }
        /*if (e.code==='CapsLock') {
          self._togleCapsLock(e.getModifierState("CapsLock"));
        }*/
      }
      function keyUp(e) {
        e = e||window.event;
        e.preventDefault();
        //console.log('keyup');
        let pressedKey = document.querySelector('.keyboard__key_pressed');
        if (pressedKey) pressedKey.classList.remove("keyboard__key_pressed");
      }
    }
    keyEventsHandler();

    function insertBreak() {
      keyboardKeys.append(document.createElement('br'));
    }
   },

   _triggerEvent(handlerName) {
     let textarea = document.querySelector('.textarea');
     textarea.innerHTML = this.properties.value;
     console.log(textarea.innerHTML);
   },

   _togleCapsLock(isCaps) {
    if (isCaps!==undefined) {
      this.properties.capsLock = isCaps;
      let capsKey = document.querySelector("[data-name=Caps]");
      capsKey.classList.toggle('keyboard__key_active', this.properties.capsLock);
    }else {
      this.properties.capsLock=!this.properties.capsLock;
    }
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
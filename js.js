"use strict";
let lang;
if (localStorage['language']) {
  lang = localStorage['language'];
} else lang = 'eng';
console.log(lang);
let isShift = false;
let keyboardLayout;
let keyLayout;

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

let keysArrayRusShift = [
"Ё","!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "Backspace", "Tab",
"Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "/", "Del",
"Caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д",  "Ж", "Э","Enter",
"Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "ArrowUp", "Smile", "Ctrl",  "Lang", "Alt",  "Space",  "ArrowLeft", "ArrowDown",
"ArrowRight", 
]; 

let letters = [ "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", 
"a", "s", "d", "f", "g", "h", "j", "k", "l",  "z", "x", "c", "v", "b", "n", "m", "ё", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "ф", "ы", "в", "а", "п", "р", "о", "л", "д",  "ж", "э", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю" ];

function setLang() {
 if (lang == 'eng') {
  if (isShift) {
    keyboardLayout = keysArrayEngShift;
    keyLayout = 'engShift';
} else {
    keyboardLayout = keysArrayEng;
    keyLayout = 'eng';
}
} else {
if (isShift) {
    keyboardLayout = keysArrayRusShift;
    keyLayout = 'rusShift';
} else {
    keyboardLayout = keysArrayRus;
    keyLayout = 'rus';
}
} 
console.log(keyboardLayout, keyLayout);
}
setLang();


function changeLang() {
  lang=='eng'?lang='ru':lang="eng";
  localStorage['language'] = `${lang}`;
  console.log(lang);
  setLang();
  KeyboardObj.createKeysHTML(keyboardLayout, keyLayout);
  console.log('new Lang:'+lang);
}

function insertBreak() {
  let keyboardKeys = document.querySelector('.keyboard__keys');
  keyboardKeys.append(document.createElement('br'));
}

let lettersArray = [];
class Letter {
  constructor (rus, rusShift, eng, engShift) {
    this.rus = rus;
    this.rusShift = rusShift;
    this.eng = eng;
    this.engShift = engShift;
  }
}

function createLetters() {
  for (let i=0; i<keysArrayEng.length;i++) {
  let oneLetter = new Letter(keysArrayRus[i], keysArrayRusShift[i], keysArrayEng[i], keysArrayEngShift[i]); 
  lettersArray.push(oneLetter);
}
}


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
    let shortcut = document.createElement('div');
    let keyboard = document.createElement('div');// main
    let keyboardKeys = document.createElement('div');//keysContainer

    wrapper.classList.add('wrapper');
    textarea.classList.add('textarea');
    keyboard.classList.add('keyboard');
    keyboardKeys.classList.add('keyboard__keys');
    shortcut.textContent = 'Press Ctrl+Alt or Lang to change language';

    body.append(wrapper);
    wrapper.append(textarea);
    wrapper.append(shortcut);
    wrapper.append(keyboard);
    keyboard.append(keyboardKeys);
    this._createKeys();
    createLetters();
   },

   createKeysHTML(keyboardLayout, keyLayout) {
    
    let keyboardKeys = document.querySelector('.keyboard__keys');
    keyboardKeys.innerHTML = '';
    keyboardLayout.forEach(key=> {
      let keyboardKey = document.createElement('div');
      keyboardKey.classList.add('keyboard__key');

      switch(key) {
        case 'Backspace':
          keyboardKey.classList.add('keyboard__key_bigger');
          keyboardKey.classList.add('keyboard__key_dark');
          keyboardKey.textContent = key;
          keyboardKey.addEventListener('click',()=>{
            this.properties.value = this.properties.value.substring(0,this.properties.value.length-1);
            this._triggerEvent('oninput');
          });
          keyboardKeys.append(keyboardKey);
          insertBreak();
          break;

          case 'Tab':
            keyboardKey.classList.add('keyboard__key_dark');
            keyboardKey.textContent = key;
            keyboardKey.addEventListener('click',()=>{
              this.properties.value += "    ";
              this._triggerEvent('oninput');
            });
            keyboardKeys.append(keyboardKey);
            break;

            case 'Lang':
            keyboardKey.classList.add('keyboard__key_dark');
            keyboardKey.textContent = key;
            keyboardKey.addEventListener('click',()=>{
              changeLang();
            });
            keyboardKeys.append(keyboardKey);
            break;

            case 'Del':
            keyboardKey.classList.add('keyboard__key_dark');
            keyboardKey.textContent = key;
            keyboardKey.addEventListener('click',()=>{
              /*let i = textarea.selectionStart;
              let newValue = '';
              for (let j=0;j<this.properties.value.length; j++) {
                if (j!=i) newValue += this.properties.value[i]; 
              }
              this.properties.value = newValue;*/
              this._triggerEvent('oninput');
            });
            keyboardKeys.append(keyboardKey);
            insertBreak();
            break;

            case 'Shift':
          keyboardKey.classList.add('keyboard__key_bigger');
          keyboardKey.classList.add('keyboard__key_dark');
          keyboardKey.textContent = key;
          keyboardKey.addEventListener('click',()=>{
            this.properties.value += ' ';
            this._triggerEvent('oninput');
          });
          keyboardKeys.append(keyboardKey);
          break;

          case 'Ctrl':
          keyboardKey.classList.add('keyboard__key_dark');
          keyboardKey.textContent = 'Ctrl';
          keyboardKey.addEventListener('click',()=>{
          });
          keyboardKeys.append(keyboardKey);
          break;

          case 'Alt':
          keyboardKey.classList.add('keyboard__key_dark');
          keyboardKey.textContent = 'Alt';
          keyboardKey.addEventListener('click',()=>{
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
            this._togleCapsLock();
            keyboardKey.classList.toggle('keyboard__key_active', this.properties.capsLock);
          });
          keyboardKeys.append(keyboardKey);
          break; 

          case 'Enter':
            keyboardKey.classList.add('keyboard__key_bigger');
            keyboardKey.classList.add('keyboard__key_dark');
            keyboardKey.textContent = key;
            keyboardKey.addEventListener('click',()=>{
              this.properties.value += "\n";
              this._triggerEvent('oninput');
            });
            keyboardKeys.append(keyboardKey);
            insertBreak();
            break;

            case 'Space':
              keyboardKey.classList.add('keyboard__key_the-biggest');
              keyboardKey.classList.add('keyboard__key_dark');
              keyboardKey.textContent = key;
              keyboardKey.addEventListener('click',()=>{
                this.properties.value += " ";
                this._triggerEvent('oninput');
              });
              keyboardKeys.append(keyboardKey);
              break;

              case 'ArrowUp':
                keyboardKey.classList.add('keyboard__key_dark');
                keyboardKey.setAttribute('data-name',key);
                keyboardKey.innerHTML = "&#9650;";
                keyboardKey.addEventListener('click',()=>{
                  this.properties.value += "&#9650;";
                  this._triggerEvent('oninput');
                });
                keyboardKeys.append(keyboardKey);
                break;

                case 'Smile':
                keyboardKey.classList.add('keyboard__key_dark');
                keyboardKey.classList.add('keyboard__key_bigger');
                keyboardKey.innerHTML = "&#128522;";
                keyboardKey.addEventListener('click',()=>{
                  this.properties.value += "&#128522;";
                  this._triggerEvent('oninput');
                });
                keyboardKeys.append(keyboardKey);
                insertBreak();
                break;

                case 'ArrowDown':
                keyboardKey.classList.add('keyboard__key_dark');
                keyboardKey.setAttribute('data-name',key);
                keyboardKey.innerHTML = "&#9660;";
                keyboardKey.addEventListener('click',()=>{
                  this.properties.value += "&#9660;";
                  this._triggerEvent('oninput');
                });
                keyboardKeys.append(keyboardKey);
                break;

                case 'ArrowLeft':
                keyboardKey.classList.add('keyboard__key_dark');
                keyboardKey.setAttribute('data-name',key);
                keyboardKey.innerHTML = "&#9664;";
                keyboardKey.addEventListener('click',()=>{
                  this.properties.value += "&#9664;";
                  this._triggerEvent('oninput');
                });
                keyboardKeys.append(keyboardKey);
                break;

                case 'ArrowRight':
                keyboardKey.classList.add('keyboard__key_dark');
                keyboardKey.setAttribute('data-name',key);
                keyboardKey.innerHTML = "&#9654;";
                keyboardKey.addEventListener('click',()=>{
                  this.properties.value += "&#9654;";
                  this._triggerEvent('oninput');
                });
                keyboardKeys.append(keyboardKey);
                break;

              default:
                keyboardKey.textContent = key;
                keyboardKey.setAttribute('data-name',key);
                keyboardKey.addEventListener('click',()=>{
                  this.properties.value += this.properties.capsLock? key.toUpperCase():key.toLowerCase();
                  this._triggerEvent('oninput');
                });
                keyboardKeys.append(keyboardKey);
                if (letters.includes(key)) {
                  this.elements.keys.push(keyboardKey);
                }
                break;     
      }this.elements.keyContainer.push(keyboardKey); 
    });
  },

   _createKeys() {
     let self = this;
      
    this. createKeysHTML(keyboardLayout, keyLayout);

    function keyEventsHandler() {
      document.addEventListener('keydown',keyDown, false);
      document.addEventListener('keyup',keyUp, false);

      function keyDown(e) {
        e = e||window.event;
        e.preventDefault();
      for (let elem of self.elements.keyContainer) {
          //console.log(`e.key:${e.key} inner:${elem.innerHTML} text:${elem.textContent}`);
        if (e.key.toLowerCase()===elem.innerHTML.toLowerCase()||e.key.toLowerCase()===elem.textContent.toLowerCase()||(e.code==='Space'&&elem.textContent==='Space')||(e.code==='Delete'&&elem.textContent==='Del')||(e.code==='CapsLock'&&elem.textContent==='Caps')||(e.code==='ControlLeft'&&elem.textContent==='Ctrl')||(e.code==='ControlRight'&&elem.textContent==='Ctrl')||(e.code==='ArrowUp'&&elem.dataset.name==='ArrowUp'||(e.code==='ArrowDown'&&elem.dataset.name==='ArrowDown'))||(e.code==='ArrowRight'&&elem.dataset.name==='ArrowRight')||(e.code==='ArrowLeft'&&elem.dataset.name==='ArrowLeft')) {
            elem.classList.add("keyboard__key_pressed");
            let textarea = document.querySelector('.textarea');
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
                  isShift = true;
                break;
    

                case 'ControlLeft':
                case 'ControlRight':
                break;

                case 'AltLeft':
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
                    case 'ArrowLeft':
                      textarea.focus();
                      if(textarea.selectionStart==0) {
                        textarea.selectionStart = textarea.selectionEnd = self.properties.value.length;
                      } else {
                        textarea.selectionStart--;
                        textarea.selectionEnd = textarea.selectionStart;
                      }
                      break;

                    case 'ArrowDown':
                    case 'ArrowRight':
                      textarea.focus();
                      if(textarea.selectionStart==0) {
                        textarea.selectionStart = textarea.selectionEnd = self.properties.value.length;
                      } else {
                        textarea.selectionStart++;
                        textarea.selectionEnd = textarea.selectionStart;
                      }
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
        
         // setLang();
        //self.createKeysHTML(keyboardLayout, keyLayout);
        
        
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
        //isShift = false;
        //setLang();
        //self.createKeysHTML(keyboardLayout, keyLayout);
      }
    }
    keyEventsHandler();


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

   _togleShift() {
     
   }


}

KeyboardObj.init();

// Константы и переменные




let wrapper = document.createElement('section');
wrapper.className = 'wrapper';

let textArea = document.createElement('textarea');
textArea.id = 'text-area';

textArea.rows = 5;
textArea.cols = 50;

wrapper.appendChild(textArea);

document.body.appendChild(wrapper);

const keyboard = [
  ['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
  ['Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\','Del'],
  ['CapsLock','a','s','d','f','g','h','j','k','l',';','\'','Enter'],
  ['ShiftL','z','x','c','v','b','n','m',',','.','/','▲','ShiftR'],
  ['Ctrl','Win','Alt','Space','Alt','◀','▼','▶','Ctrl']
];

keyboard.forEach(row => {
  let rowArea = document.createElement('div');
  rowArea.className = 'keyboard__row';
  wrapper.appendChild(rowArea);
  row.forEach(elem => rowArea.appendChild(createButton(elem)));
});

function createButton(key) {
  let button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.setAttribute('data-key', key);
  button.classList.add('keyboard__key');
  button.classList.add('key-regular');

    document.addEventListener('keydown', function(event) {
      let pressedKey = event.key.toLowerCase();
      let screenButton = document.querySelector(`button[data-key="${pressedKey}"]`);
      if (screenButton) {
        screenButton.style.backgroundColor = '#ccc';
      }
    });
  
    document.addEventListener('keyup', function(event) {
       let releasedKey = event.key.toLowerCase();
      let screenButton = document.querySelector(`button[data-key="${releasedKey}"]`);
      if (screenButton) {
        screenButton.style.backgroundColor = '';
      }
    });

  switch(key) {
    case 'Backspace':
      button.classList.add('key-wide');
      button.innerHTML = 'Backspace';
      button.addEventListener('click', function() {
        deleteCharBeforeCursor();

        function deleteCharBeforeCursor() {
          let input = document.querySelector('#text-area');
          let startPos = input.selectionStart;
          let endPos = input.selectionEnd;
          if (startPos !== endPos) {
            input.value = input.value.substring(0, startPos) + input.value.substring(endPos);
            input.selectionStart = input.selectionEnd = startPos;
          } else if (startPos > 0) {
            input.value = input.value.substring(0, startPos - 1) + input.value.substring(endPos);
            input.selectionStart = input.selectionEnd = startPos - 1;
          }
        }
        
       

      });  
      break;

    case 'CapsLock':
      button.classList.add('key-wide');
      button.innerHTML = 'CapsLock';
      button.addEventListener('click', function() {
        let input = document.querySelector('#text-area');
        let value = input.value;
        input.value = value.substr(0, value.length - 1);
      });
      break;

    case 'Del':
      button.classList.add('key-wide', 'keyboard__key--activatable');
      button.innerHTML = 'Del';
      button.addEventListener('click', function() {
        let capsLockOn = !button.classList.toggle('keyboard__key--active');
        let letterKeys = document.querySelectorAll('.keyboard__key:not(.key-wide)');
        letterKeys.forEach(function(letterKey) {
          let letter = letterKey.innerHTML.toLowerCase();
          letterKey.innerHTML = capsLockOn ? letter.toUpperCase() : letter.toLowerCase();
        });
      });
      break;

    case 'Enter':
      button.classList.add('key-wide-r');
      button.innerHTML = 'Enter';
      button.addEventListener('click', function() {
        let input = document.querySelector('#text-area');
        input.value += '\n';
      });
      break;

    case 'ShiftL':
      button.classList.add('key-wide', 'keyboard__key--activatable');
      button.innerHTML = 'Shift';
      button.addEventListener('click', function() {
        let shiftOn = !button.classList.toggle('keyboard__key--active');
        let letterKeys = document.querySelectorAll('.keyboard__key:not(.key-wide)');
        letterKeys.forEach(function(letterKey) {
          let letter = letterKey.innerHTML.toLowerCase();
          letterKey.innerHTML = shiftOn ? letter.toUpperCase() : letter.toLowerCase();
        });
      });
      break;

    case 'ShiftR':
      button.classList.add('key-wide-r', 'keyboard__key--activatable');
      button.innerHTML = 'Shift';
      button.addEventListener('click', function() {
        let shiftOn = !button.classList.toggle('keyboard__key--active');
        let letterKeys = document.querySelectorAll('.keyboard__key:not(.key-wide)');
        letterKeys.forEach(function(letterKey) {
          let letter = letterKey.innerHTML.toLowerCase();
          letterKey.innerHTML = shiftOn ? letter.toUpperCase() : letter.toLowerCase();
        });
      });
      break;

    case 'Tab':
      button.classList.add('key-wide');
      button.innerHTML = 'Tab';
      button.addEventListener('click', function() {
        let input = document.querySelector('#text-area');
        input.value += ' ';
      });
      break;

    case 'Space':
      button.classList.add('key-extra-wide');
      button.innerHTML = ' ';
      button.addEventListener('click', function() {
        let input = document.querySelector('#text-area');
        input.value += ' ';
      });
      break;

    default:
      button.innerHTML = key;
      button.addEventListener('click', function() {
        let input = document.querySelector('#text-area');
        input.value += key;
      });
      break;
  }

  return button;
}
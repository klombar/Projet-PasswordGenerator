const screen = document.querySelector('.passwordGenerator-screen-screen');
const lengthInput = document.querySelector('.passwordGenerator-modal-charactereLength-range-input');
const generateButton = document.querySelector('.passwordGenerator-modal-buttons-generate');
const clipBoard = document.querySelector('.passwordGenerator-copyIcon');

lengthInput.addEventListener('input', () => {
   const length = document.querySelector('.passwordGenerator-modal-charactereLength-number');
   length.textContent = lengthInput.value; 
});

generateButton.addEventListener('click', () => {
   const randomPassword = Math.random().toString(36).slice(2, parseInt(lengthInput.value) + 2);
   screen.textContent = randomPassword; 
});

clipBoard.addEventListener("click", () => {
   const copy = navigator.clipboard.writeText(screen.textContent);
})

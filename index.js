/* Récupération des élements */

const screen = document.querySelector('.passwordGenerator-screen-screen');
const lengthInput = document.querySelector('.passwordGenerator-modal-charactereLength-range-input');
const generateButton = document.querySelector('.passwordGenerator-modal-buttons-generate');
const clipBoard = document.querySelector('.passwordGenerator-copyIcon');
const lengthNumber = document.querySelector('.passwordGenerator-modal-charactereLength-number');
const strengthIndicator = document.querySelector('.passwordGenerator-modal-strengthIndicator-bar-title');
const clearScreen = document.querySelector('.passwordGenerator-modal-buttons-clear')

/* Récupération des inputs checkbox */

const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');

/* Déclaration des variables des inputs */

const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

/* Mets à jour l'indicateur de la valeur de range  */

function displayRangeValue() {
   lengthInput.addEventListener('input', () => {
      const length = document.querySelector('.passwordGenerator-modal-charactereLength-number');
      length.textContent = lengthInput.value; 
   });
}
displayRangeValue();

/* Récupère les types de caractères sélectionnés */

function getSelectedTypes() {
   const selectedTypes = [];
   if (uppercaseCheckbox.checked) selectedTypes.push(uppercaseChars);
   if (lowercaseCheckbox.checked) selectedTypes.push(lowercaseChars);
   if (numbersCheckbox.checked) selectedTypes.push(numberChars);
   if (symbolsCheckbox.checked) selectedTypes.push(symbolChars);

   if (selectedTypes.length === 0) {
      alert('Veuillez sélectionner au moins un type de caractères');
      return null;
   }
   return selectedTypes;
}

/* Génère un mot de passe initial */
function generateInitialPassword(selectedTypes) {
   let password = '';
   selectedTypes.forEach(type => {
      password += type[Math.floor(Math.random() * type.length)];
   });
   return password;
}

/* Complète le mot de passe à la longueur souhaitée */
function completePassword(password, selectedTypes, length) {
   while (password.length < length) {
      const randomType = selectedTypes[Math.floor(Math.random() * selectedTypes.length)];
      password += randomType[Math.floor(Math.random() * randomType.length)];
   }
   return password;
}

/* Mélange les caractères du mot de passe */
function shufflePassword(password) {
   return password.split('').sort(() => Math.random() - 0.5).join('');
}

/* Évalue la force du mot de passe */
function evaluatePasswordStrength(password, selectedTypesCount) {
   const length = password.length;

   if (length <= 6 || (selectedTypesCount <= 1 && length < 8)) {
      strengthIndicator.textContent = 'Weak';
      strengthIndicator.style.backgroundColor = '#ff0000';
   } else if (
      (length >= 7 && length <= 8 && selectedTypesCount === 2) ||
      (length >= 8 && length <= 10 && selectedTypesCount === 1)
   ) {
      strengthIndicator.textContent = 'Medium';
      strengthIndicator.style.backgroundColor = '#ffcc00';
   } else if (length >= 9 && selectedTypesCount >= 3) {
      strengthIndicator.textContent = 'Strong';
      strengthIndicator.style.backgroundColor = '#00ff00';
   }
}

/* Fonction principale appelée au clic sur "Générer" */
function handleGeneratePassword() {
   const length = lengthInput.value;
   const selectedTypes = getSelectedTypes();
   if (!selectedTypes) return;

   let password = generateInitialPassword(selectedTypes);
   password = completePassword(password, selectedTypes, length);
   const finalPassword = shufflePassword(password);

   screen.textContent = finalPassword;
   evaluatePasswordStrength(finalPassword, selectedTypes.length); 
}


/* Attachement de l'événement au bouton */
generateButton.addEventListener('click', handleGeneratePassword);



/*  Fonction Copy to clipboard  */


clipBoard.addEventListener("click", () => {
   if (screen.textContent.trim() === "") {
      alert("Aucun mot de passe à copier !");
      return;
   }

   navigator.clipboard.writeText(screen.textContent)
      .then(() => {
         alert("Mot de passe copié dans le presse-papiers !");
      })
      .catch(err => {
         console.error("Erreur lors de la copie : ", err);
         alert("Impossible de copier le mot de passe.");
      });
});


/* Clear des champs */
function handleClearFields() {
      screen.textContent = '';
      lengthInput.value = 5;
      length.textContent = 5;
      lengthNumber.textContent = 5;
      strengthIndicator.textContent = '';
      strengthIndicator.style.backgroundColor = '';
      uppercaseCheckbox.checked = false;
      lowercaseCheckbox.checked = false;
      numbersCheckbox.checked = false;
      symbolsCheckbox.checked = false;
}

clearScreen.addEventListener('click', handleClearFields);


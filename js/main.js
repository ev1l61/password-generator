let pass = document.getElementById("output")

// --------------Checkboxen----------------
const checkUppercase = document.querySelector("#uppercase");
const checkLowercase = document.querySelector("#lowercase");
const checkNumbers = document.querySelector("#numbers");
const checkSpecial = document.querySelector("#special");

let uppercaseChecked = false;
let lowercaseChecked = false;
let numbersChecked = false;
let specialChecked = false;

// zustand ändern, wenn checkboxen sich ändern
checkUppercase.addEventListener("change", () => {
    uppercaseChecked = checkUppercase.checked;
});

checkLowercase.addEventListener("change", () => {
    lowercaseChecked = checkLowercase.checked;
});

checkNumbers.addEventListener("change", () => {
    numbersChecked = checkNumbers.checked;
});

checkSpecial.addEventListener("change", () => {
    specialChecked = checkSpecial.checked;
});

// --------------Slider----------------
const output = document.querySelector("#sliderout");
const input = document.querySelector("#slider");
output.innerHTML = input.value;
input.addEventListener ("input", () => {
    output.innerHTML = input.value;
});

// random ein element der jeweiligen optionen erzeugen
const uppercase = () => {
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

const lowercase = () => {
    let alphabet = "abcdefghijklmnopqrstuvwxyz"
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}
const numbers = () => {
    let number = Math.floor(Math.random()*10);
    return number;
};

const special = () => {
    let char = '!"#$%' + "&'()*+,-./:;<=>?@[\\]^_{|}~`"
    return char[Math.floor(Math.random() * char.length)];
}

// erzeugen der einzelnen zeichen, je nachdem was ausgewählt wurde und wieviele zeichen
const generate = () => {
    
    let options = 0;

    if (uppercaseChecked){
        options += 1;
    }
    if (lowercaseChecked){
        options += 1;
    };
    if (numbersChecked) {
        options += 1;
    };
    if (specialChecked){
        options += 1;
    }
    
    let output = "";
    let totalChars = 0;

    for (let i=0; i<(input.value); i++ ) {
        if(options === 0) {
            break;
        }
        if (totalChars === input.value) {
            break;
        }
        if (uppercaseChecked && totalChars < input.value){
            output += uppercase();
            totalChars += 1;
        }
        if (lowercaseChecked && totalChars < input.value){
            output += lowercase();
            totalChars += 1;
        };
        if (numbersChecked && totalChars < input.value) {
            output += numbers().toString();
            totalChars += 1;
        };
        if (specialChecked && totalChars < input.value){
            output += special();
            totalChars += 1;
        }
    }
    return output;
};

// das ergebnis aus generate() vermischen
const shuffle = (str) => {
    const arr = str.split("");
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join("");
};

// passwort erzeugen wenn button geklickt wird
document.getElementById("submit").addEventListener("click", () => {
    const result = generate();
    password = shuffle(result);
    console.log(password)
    pass.value = password;
});

// password kopieren
document.getElementById("copy").addEventListener("click", () => {
    pass.select();
    navigator.clipboard.writeText(pass.value);
});
// CS4220 Spring 2018
// Homework 1
// Alvin Quach, 300793745


// Question 1 - String Manipulation

/** 
 * This function takes a single string and returns a copy of the
 * string with all alphabets converted to uppercase characters.
 */
let upperCase = (str) => {

    // Assumes input is a valid string.

    let result = "";
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        if (charCode >= 97 && charCode <= 122) {
            result += String.fromCharCode(charCode - 32);
        }
        else {
            result += str.charAt(i);
        }
    }
    return result;
};

/** 
 * This function takes a single string and returns a copy of the
 * string with all alphabets converted to lowercase characters.
 */
let lowerCase  = (str) => {

    // Assumes input is a valid string.

    let result = "";
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            result += String.fromCharCode(charCode + 32);
        }
        else {
            result += str.charAt(i);
        }
    }
    return result;
};

/**
 * This function takes two arguments: a single string (str) and an array of
 * strings (unconditionallyCapitalized[]). This function returns a copy of
 * str with the first letter of the first word capitalized, and all other
 * words lower case, except for words that are unconditionally capitalized,
 * such as proper nouns and "I". The unconditionallyCapitalized array
 * contains all words that should be unconditionally capitalized.
 */
let sentenceCase = (str, unconditionallyCapitalized) => {

    // Assumes all inputs are valid

    // First convert the string into sentence case, regardless of unconditionally capitalized words.
    str = upperCase(str.charAt(0)) + lowerCase(str.substring(1));

    // If unconditionally capitalized words are not provided, then just stop here.
    if (!unconditionallyCapitalized) {
        return str;
    }

    // Split words by spaces.
    let words = str.split(" ");

    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        for (let uc of unconditionallyCapitalized) {
            let lowerCaseUC = lowerCase(uc);
            let index = word.indexOf(lowerCaseUC);
            if (index > -1) {
                if (index > 0 && isAlphabet(word.charAt(index - 1))) {
                    continue;
                }
                let nextChar = word.charAt(index + lowerCaseUC.length);
                if (nextChar && isAlphabet(nextChar)) {
                    continue;
                }
                words[i] = word.replace(lowerCaseUC, uc);
                break;
            }
        }
    }

    return words.join(" ");
};



// TODO Move this inside sentenceCase() if its not used anywhere else.
let isAlphabet = (char) => {
    let charCode = char.charCodeAt(0);
    return charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122;
};


function runStringFunctions(){
	let str = 'I watched the storm, so beautiful yet terrific. The face of the moon was in shadow.'
	
	let unconditionallyCapitalized = ['I', 'Moon', 'Shadow']
	let lowercaseWords = ['the', 'of', 'in', 'an']
	
	console.log( 'upperCase: ', upperCase(str) )
	console.log( 'lowerCase: ', lowerCase(str) )
	console.log( 'sentenceCase: ', sentenceCase(str, unconditionallyCapitalized) )
	// console.log( 'capitalizedCase: ', capitalizedCase(str) )
	// console.log( 'alternatingCase: ', alternatingCase(str) )
	// console.log( 'titleCase: ', titleCase(str, lowercaseWords) )
	// console.log( 'inverseCase: ', inverseCase(str) )
} 

runStringFunctions();
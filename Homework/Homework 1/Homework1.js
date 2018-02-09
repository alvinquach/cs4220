// CS4220 Spring 2018
// Homework 1
// Alvin Quach, 300793745


// Question 1 - String Manipulation

/** 
 * This function takes a single string and returns a copy of the
 * string with all alphabets converted to uppercase characters.
 */
let upperCase = (str) => {
    if (str == null) {
        return null;
    }
    let result = "";
    for (let i = 0, len = str.length; i < len; i++) {
        let char = str.charAt(i);
        result += charToUpper(char);
    }
    return result;
};

/** 
 * This function takes a single string and returns a copy of the
 * string with all alphabets converted to lowercase characters.
 */
let lowerCase  = (str) => {
    if (str == null) {
        return null;
    }
    let result = "";
    for (let i = 0, len = str.length; i < len; i++) {
        let char = str.charAt(i);
        result += charToLower(char);

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
    if (str == null) {
        return null;
    }

    // First convert the string into sentence case, regardless of unconditionally capitalized words.
    str = upperCase(str.charAt(0)) + lowerCase(str.substring(1));

    // Split words by spaces.
    // NOTE: Does not check for other whitespace characters.
    let words = str.split(" ");

    // Declare unconditionallyCapitalizedMap here for performance reasons.
    // This maps each unconditionally capitalized word to its lower case version.
    let unconditionallyCapitalizedMap = {};

    for (let i = 0, len = words.length; i < len; i++) {

        let word = words[i];

        // Check if previous word ended with a period.
        // If it did, then unconditionally capitailize this word.
        if (i > 0) {
            let prev = words[i - 1];

            // Use indexOf() here since its more efficient then charAt()
            if (prev.indexOf(".") == prev.length - 1) {
                words[i] = sentenceCase(word);
                continue;
            }
        }
        
        // If unconditionally capitalized words are not provided,
        // move on to next iteration of the loop.
        if (!unconditionallyCapitalized) {
            continue;
        }

        for (let uc of unconditionallyCapitalized) {

            // Compute the lower case version of the unconditionally capitalized word,
            // if it does not exist in the unconditionallyCapitalizedMap yet.
            // These are stored in the map so that they are only computed once.
            let lowerCaseUC = unconditionallyCapitalizedMap[uc];
            if (lowerCaseUC === undefined) {
                lowerCaseUC = lowerCase(uc);
                unconditionallyCapitalizedMap[uc] = lowerCaseUC;
            }

            // Check if any part of the word matches the unconditionally capitalized word.
            let index = word.indexOf(lowerCaseUC);

            // If there is a match, make sure the whole word excluding special characters match.
            // If the match is preceeded or proceeded by another alphabet characer, then it's not a valid match.
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

/**
 * This function takes a single string and returns a copy of the string
 * with the first character of each word converted to uppercase.
 */
let capitalizedCase = (str) => {
    if (str == null) {
        return null;
    }

    // Split words by spaces.
    // NOTE: Does not check for other whitespace characters.
    let words = str.split(" ");

    for (let i = 0, len = words.length; i < len; i++) {
        
        // Reuse sentenceCase() here.
        words[i] = sentenceCase(words[i]);
    }

    return words.join(" ");
};

/**
 * This function takes a single string and returns a copy of the string
 * comprised of characters that alternate between lower and uppercase.
 */
let alternatingCase = (str) => {
    if (str == null) {
        return null;
    }
    let result = "";
    for (let i = 0, len = str.length; i < len; i++) {
        let char = str.charAt(i);
        result += i % 2 ? charToUpper(char) : charToLower(char);
    }
    return result;
};

/**
 * This function takes two arguments: a single string (str) and an array of
 * strings (lowercaseWords[]). It returns a copy of str with the initial
 * letter of each word capitalized. After the first word in the string,
 * however, articles, conjunctions, and prepositions not more than five
 * letters long should all be lower case. The lowercaseWords array contains
 * all words that should be lowercased.
 */
let titleCase = (str, lowercaseWords) => {
    if (str == null) {
        return null;
    }

    // Convert the input to all lower case and then split words by spaces.
    // NOTE: Does not check for other whitespace characters.
    let words = lowerCase(str).split(" ");

    // Convert each word to its title case version.
    for (let i = 0, len = words.length; i < len; i++) {
        let word = words[i];

        let forcedLowerCase;

        // Check if previous word ended with a period.
        // If it did, then unconditionally capitailize this word.
        if (i > 0) {
            let prev = words[i - 1];

            // Use indexOf() here since its more efficient then charAt()
            if (prev.indexOf(".") == prev.length - 1) {
                forcedLowerCase = false;
            }
        }

        if (forcedLowerCase !== false && lowercaseWords) {

            for (let lc of lowercaseWords) {
                
                // Check if any part of the word matches the unconditionally capitalized word.
                let index = word.indexOf(lc);
                
                // If there is a match, make sure the whole word excluding special characters match.
                // If the match is preceeded or proceeded by another alphabet characer, then it's not a valid match.
                if (index > -1) {
                    if (index > 0 && isAlphabet(word.charAt(index - 1))) {
                        continue;
                    }
                    let nextChar = word.charAt(index + lc.length);
                    if (nextChar && isAlphabet(nextChar)) {
                        continue;
                    }
                    forcedLowerCase = true;
                    break;
                }
            }
        }

        // If the word is not marked to be forced to lower case, then capitalize its first letter.
        // If it is marked to be lower case, then do nothing here since it is already in lower case.
        if (!forcedLowerCase) {
            words[i] = sentenceCase(word);
        }
    }

    return words.join(" ");
};

/**
 * This function takes a single string and returns a copy of the string
 * with the first letter of each word lowercased, and all other letters
 * in the word uppercased.
 */
let inverseCase = (str) => {
    if (str == null) {
        return null;
    }

    // Just do the inverse of capitalizedCase()
    let capitailized = capitalizedCase(str);
    let result = "";
    for (let i = 0, len = capitailized.length; i < len; i++) {
        let char = capitailized.charAt(i);
        result += isLowerCase(char) ? charToUpper(char) : isUpperCase(char) ? charToLower(char) : char;
    }
    return result;
};


// Question 2 - Objects

/**
 * This function takes a single string (str) argument and returns an object.
 * The object's properties will be the unique letters present in str.
 * The value of each property will be the frequency of each character present in the string.
 */
let getCharacterFrequency = (str) => {
    let result = {};
    for (let i = 0, len = str.length; i < len; i++) {
        let char = str.charAt(i);
        if (result[char] === undefined) {
            // Try to use the alternate form of the character.
            let alternate = isLowerCase(char) ? charToUpper(char) : isUpperCase(char) ? charToLower(char) : char; 
            if (alternate == char || result[alternate] === undefined) {
                result[char] = 1;
                continue;
            }
            result[alternate] += 1;
            continue;
        }
        result[char] += 1;
    }
    return result;
};

/**
 * This function will take a single object. The object should be of the type returned by getCharacterFrequency.
 * This function will display each character and it's corresponding frequency.
 * Each character is be surrounded by quotation marks in your output.
 * The output accounts for singular and plural values.
 */
let printCharacterFrequency = (frequencyObj) => {
    for (let char in frequencyObj) {
        let count = frequencyObj[char];
        console.log("'" + char + "'" + " occurs " + count + (count > 1 ? " times." : " time."));
    }
};


// Utility functions

/** Checks if the input is an alphabet character. */
let isAlphabet = (char) => {
    let charCode = char.charCodeAt(0);
    return charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122;
};

/** Checks if the input is a lower case alphabet character. */
let isLowerCase = (char) => {
    let charCode = char.charCodeAt(0);
    return charCode >= 97 && charCode <= 122;
};

/** Checks if the input is an uppser case alphabet character. */
let isUpperCase = (char) => {
    let charCode = char.charCodeAt(0);
    return charCode >= 65 && charCode <= 90;
};

/** Converts a character to upper case. */
let charToUpper = (char) => {
    if (isLowerCase(char)) {
        return String.fromCharCode(char.charCodeAt(0) - 32);
    }
    else {
        return char;
    }
}

/** Converts a character to lower case. */
let charToLower = (char) => {
    if (isUpperCase(char)) {
        return String.fromCharCode(char.charCodeAt(0) + 32);
    }
    else {
        return char;
    }
}


/*
function runStringFunctions(){
	let str = 'I watched the storm, so beautiful yet terrific. The face of the moon was in shadow.'
	
	let unconditionallyCapitalized = ['I', 'Moon', 'Shadow']
	let lowercaseWords = ['the', 'of', 'in', 'an']
	
	console.log( 'upperCase: ', upperCase(str) )
	console.log( 'lowerCase: ', lowerCase(str) )
	console.log( 'sentenceCase: ', sentenceCase(str, unconditionallyCapitalized) )
	console.log( 'capitalizedCase: ', capitalizedCase(str) )
	console.log( 'alternatingCase: ', alternatingCase(str) )
	console.log( 'titleCase: ', titleCase(str, lowercaseWords) )
	console.log( 'inverseCase: ', inverseCase(str) )
} 

function runCharacterFunctions(){

	let str = 'Hello, World!'
	
    let frequencyObj = getCharacterFrequency( str )
    
	printCharacterFrequency( frequencyObj )

}

runStringFunctions();
runCharacterFunctions();
*/
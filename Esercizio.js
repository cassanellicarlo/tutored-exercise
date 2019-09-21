/*

Scrivere un algoritmo che, ricevuto un array di parole, stampa su ogni linea le parole che contengono esattamente le stesse lettere.
Per esempio per:

L'output dovrebbe essere:

dog,god,gdo,god
godd
good
paternal,parental
yellow
 
*/
var words = ["dog", "gdo", "god", "god", "godd", "good", "paternal", "yellow", "parental", "parentale"];
// array of words. Each word is sorted alphabetically
var sortedWords = [];
// indexes of words that contains same letters
var equalWordsIndexes = [];
// main function 
function containsSameLetters(words) {
    sortedWords = sortArrayAndToString(words, sortedWords);
    for (var count = 0; count < sortedWords.length; count++) {
        var indexes = checkEqualIndexes(count);
        indexes.sort(function (a, b) { return a - b; });
        equalWordsIndexes.push(indexes);
    }
    equalWordsIndexes = multiDimensionalUnique(equalWordsIndexes);
    printWordsWithEqualLetters();
}
// sort each word alphabetically and returns the sorted array
function sortArrayAndToString(arrayToSort, sortedArray) {
    arrayToSort.forEach(function (element) {
        var singleArray;
        singleArray = element.split('');
        singleArray.sort();
        sortedArray.push(singleArray.join(''));
    });
    return sortedArray;
}
// check equals words and returns the indexes of the original array
function checkEqualIndexes(i) {
    var indexes = [];
    indexes.push(i);
    sortedWords.reduce(function (previousValue, element, index) {
        if (element === sortedWords[i] && i != index)
            indexes.push(index);
        return previousValue;
    }, 0);
    return indexes;
}
// returns the multidimensional array without duplicates
function multiDimensionalUnique(arr) {
    var uniques = [];
    var itemsFound = {};
    for (var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if (itemsFound[stringified]) {
            continue;
        }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}
// print in the console the words with same letters
function printWordsWithEqualLetters() {
    console.log("Words with same letters");
    equalWordsIndexes.forEach(function (el, i) {
        el.forEach(function (e) {
            console.log(words[e]);
        });
        console.log("----------------");
    });
}
containsSameLetters(words);

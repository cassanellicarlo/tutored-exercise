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

let words = ["dog", "gdo", "god", "god", "godd", "good", "paternal", "yellow","parental","parentale"];

// array of words. Each word is sorted alphabetically
let sortedWords: string[] = [];

// indexes of words that contains same letters
let equalWordsIndexes : number[][] = []; 

// main function 
function containsSameLetters (words: string[]){
    
    sortedWords=sortArrayAndToString(words, sortedWords);

    for(let count=0;count<sortedWords.length;count++){
        let indexes:number[] = checkEqualIndexes(count);     
        indexes.sort( (a, b) => a-b );
        equalWordsIndexes.push(indexes);      
    }

    equalWordsIndexes = multiDimensionalUnique(equalWordsIndexes);

    printWordsWithEqualLetters();
}

// sort each word alphabetically and returns the sorted array
function sortArrayAndToString (arrayToSort: string[], sortedArray:string[]): string[]{
    arrayToSort.forEach(element => {
        let singleArray: string[];
        singleArray = element.split('');
        singleArray.sort();
        sortedArray.push(singleArray.join(''));
    });

    return sortedArray;
}

// check equals words and returns the indexes of the original array
function checkEqualIndexes(i: number):number[]{
    let indexes:number[]=[];
    indexes.push(i);
    sortedWords.reduce( (previousValue,element,index) => {
        if(element === sortedWords[i] && i!=index)
            indexes.push(index);
        return previousValue;
    },0);

    return indexes;
}

// returns the multidimensional array without duplicates
function multiDimensionalUnique(arr):number[][] {
    let uniques = [];
    let itemsFound = {};
    for(let i = 0, l = arr.length; i < l; i++) {
        let stringified = JSON.stringify(arr[i]);
        if(itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}

// print in the console the words with same letters
function printWordsWithEqualLetters(){
    console.log("Words with same letters");
    equalWordsIndexes.forEach((el,i) =>{     
        el.forEach(e => {
            console.log(words[e]);
        });      
        console.log("----------------");
    });
}

containsSameLetters(words);


const HashMap = require('./hashmap');

const main = () => {
	const MAX_LOAD_RATIO = 0.5; // 50%
	const SIZE_RATIO = 3;
	const LOTR = new HashMap(SIZE_RATIO, MAX_LOAD_RATIO);

	LOTR.set('hobbit', `Frodo`);
	LOTR.set('hobbit', `Bilbo`);
	LOTR.set(`wizard`, `Gandalf`);
	LOTR.set(`human`, `Aragorn`);
	LOTR.set(`elf`, `Legolas`);
	LOTR.set(`maiar`, `The Necromancer`);
	LOTR.set(`maiar`, `Sauron`);
	LOTR.set(`ring bearer`, `Gollum`);
	LOTR.set(`lady of light`, `Galadrial`);
	LOTR.set(`half elf`, `Arwen`);
	LOTR.set(`ent`, `Tree Beard`);

	return LOTR;
};
const { _hashTable } = main();
console.log(_hashTable);
console.log(main());

const WhatDoesThisDo = function () {
	let str1 = 'Hello World.';
	let str2 = 'Hello World.';
	let map1 = new HashMap();
	map1.set(str1, 10); // 'Hello World.'
	map1.set(str2, 20); // 'Hello World.'
	let map2 = new HashMap();
	let str3 = str1; // 'Hello World.'
	let str4 = str2; //'Hello World.'
	map2.set(str3, 20);
	map2.set(str4, 10);

	console.log(map1.get(str1));
	console.log(map2.get(str3));
};

/**
 *
 * 2. WhatDoesThisDo
 */
WhatDoesThisDo();
/**
 * 
 * 4. Remove duplicates
Implement a function to delete all duplicated characters in a string and keep only the first occurrence of each character. 
 */
const noPair = (string) => {
	let map = {};
	let newWord = '';
	for (let i = 0; i < string.length; i++) {
		map[string[i]] = string[i];
	}
	for (let [key, value] of Object.entries(map)) {
		newWord += value;
	}
	return newWord;
};

console.log(noPair(`google all that you think can think of`));
/**
 * 5. Any permutation a palindrome
 * Write an algorithm to check whether any anagram of some string is a palindrome.
 *Given some string, "acecarr", the algorithm should return true, because the letters in "acecarr" can be rearranged to the anagram "racecar", which itself is a palindrome. 
 In contrast, given the word "north", the algorithm should return false, because there's no anagram for "north" that would be a palindrome.

 * if there are no pairs - false
 *    if there are all pairs - true
 * if there are all pairs but one other remaining - true
 *    if there are all pairs but more than 1 other character - false
 */
const anyPermutation = (string) => {
	let chars = {};

	string.split('').forEach((char) => {
		if (chars[char]) {
			delete chars[char];
		} else {
			chars[char] = `not a pair`;
		}
	});

	return Object.keys(chars).length <= 1;
};

console.log(anyPermutation('acecarr'));
anyPermutation('dad');
anyPermutation('darra');
anyPermutation('darraas');

/**
 * 6. Anagram grouping
Write an algorithm to group a list of words into anagrams. For example, if the input was ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'], the output should be: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']].
 */
/**
 *
 * {0: 'east'} // if string[i]
 * [[east, teas, eats] [cars, arcs] [acre, race]]
 *         aest             acrs        acer
 *          0                1           2
 *
 */
const anagramGrouper = (arr) => {
	let map = {}; // { 'aest', 'acrs', 'acer'}

	for (let word of arr) {
		let sorted = word.split('').sort().join('');

		if (map[sorted]) {
			map[sorted].push(word);
		} else {
			map[sorted] = [word];
		}
	}
	console.log(Object.values(map));
};
anagramGrouper(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']);

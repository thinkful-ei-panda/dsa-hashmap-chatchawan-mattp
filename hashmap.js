class HashMap {
	constructor(SIZE_RATIO, MAX_LOAD_RATIO, intCapacity = 8) {
		this.length = 0;
		this._hashTable = [];
		this._capacity = intCapacity;
		this._deleted = 0;
		this.SIZE_RATIO = SIZE_RATIO;
		this.MAX_LOAD_RATIO = MAX_LOAD_RATIO;
	}

	static _hashString(string) {
		let hash = 5381;
		for (let i = 0; i < string; i++) {
			//Bitwise left shift with 5 0s - this would be similar to
			//hash*31, 31 being the decent prime number
			//but bit shifting is a faster way to do this
			//tradeoff is understandability
			hash = (hash << 5) + hash + string.charCode(i);
			//converting hash to a 32 bit integer
			hash = hash & hash;
		}
		//making sure hash is unsigned - meaning non-negtive number.
		return hash >>> 0;
	}
	// ...
	set(key, value) {
		const loadRatio = (this.length + this._deleted + 1) / this._capacity;
		if (loadRatio > this.MAX_LOAD_RATIO) {
			this._resize(this._capacity * this.SIZE_RATIO);
		}
		const index = this._findSlot(key);
		if (!this._hashTable[index]) {
			this.length++;
		}
		this._hashTable[index] = { key, value, DELETED: false };
	}
	_findSlot(key) {
		const hash = HashMap._hashString(key);
		const start = hash % this._capacity;
		for (let i = start; i < start + this._capacity; i++) {
			const index = i % this._capacity;
			const slot = this._hashTable[index];
			// if the slot is open
			if (slot === undefined || (slot.key === key && !slot.DELETED)) {
				return index;
			}
		}
	}
	_resize(size) {
		const oldSlots = this._hashTable;
		this._capacity = size;
		this.length = 0;
		this._hashTable = [];

		for (const slot of oldSlots) {
			if (slot !== undefined && !slot.DELETED) {
				this.set(slot.key, slot.value);
			}
		}
	}
	get(key) {
		const index = this._findSlot(key);
		if (this._hashTable[index] === undefined) {
			throw new Error(`Key Error`);
		}
		return this._hashTable[index].value;
	}
	delete(key) {
		const index = this._findSlot(key);
		const slot = this._hashTable[index];
		if (slot === undefined) {
			throw new Error(`Key Error`);
		}
		slot.DELETED = true;
		this.length--;
		this._deleted++;
	}
}

module.exports = HashMap;

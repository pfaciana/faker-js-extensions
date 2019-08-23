module.exports = function (faker) {
	faker.address = faker.address || {};

	faker.address.buildingNumber = function (numbers, letters) {
		numbers = parseInt(typeof numbers !== 'undefined' && numbers !== null ? numbers : 3, 10);
		letters = parseInt(typeof letters !== 'undefined' && letters !== null ? letters :
			numbers > 0 ? faker.random.numberBetween(0, 1) : 1, 10);
		var number = numbers > 0 ? faker.random.numberSize(numbers, false) : '';
		return faker.helpers.replaceSymbols(number + "?".repeat(letters));
	};

	faker.address.postCode = faker.address.zipCode || function () {
	};

	faker.address.address = function () {
		return faker.address.streetAddress(faker.random.boolean()) + ', ' +
			faker.address.city() + ', ' + faker.address.stateAbbr() + ' ' + faker.address.zipCode();
	};

	return faker;
};
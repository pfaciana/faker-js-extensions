module.exports = function (faker) {
	faker.random = faker.random || {};

	faker.random.arrayElement = faker.random.arrayElement || function (array) {
		array = array || ["a", "b", "c"];
		var r = faker.random.numberBetween(0, array.length - 1);
		return array[r];
	};

	faker.random.digit = function () {
		return faker.random.numberBetween(0, 9);
	};

	faker.random.digitNotNull = function () {
		return faker.random.numberBetween(1, 9);
	};

	faker.random.numberBetween = function (min, max) {
		min = parseInt(typeof min !== 'undefined' && min !== null ? min : 0, 10);
		max = parseInt(typeof max !== 'undefined' && max !== null ? max : 2147483647, 10);

		if (min < -2147483647) {
			min = -2147483647;
		}

		if (max > 2147483647) {
			max = 2147483647;
		}

		if (min > max) {
			min = [max, max = min][0];
		}

		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	faker.random.numberSize = function (precision, strict) {
		precision = parseInt(typeof precision !== 'undefined' ? precision : faker.random.digitNotNull(), 10);
		strict = typeof strict !== 'undefined' ? strict : true;

		if (precision > 10) {
			precision = 10;
		} else if (precision < 1) {
			precision = 1;
		}

		var max = Number(Math.pow(10, precision).toPrecision(15)) - 1;

		if (strict) {
			var min = Number(Math.pow(10, precision - 1).toPrecision(15));
			return faker.random.numberBetween(min, max);
		}

		return faker.random.numberBetween(0, max);
	};

	faker.random.float = function (precision, max, min) {
		precision = parseInt(typeof precision !== 'undefined' ? precision : faker.random.digit(), 10);
		var multiplier = Math.pow(10, precision);
		var value = faker.random.numberBetween(min, max) * multiplier + faker.random.numberSize(precision);
		return Math.round(value) / multiplier;
	};

	faker.random.letter = function () {
		return String.fromCharCode(faker.random.numberBetween(97, 122));
	};

	return faker;
};
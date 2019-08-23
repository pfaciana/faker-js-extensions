(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var faker = faker || {};

faker.definitions = faker.definitions || {};

faker.locales = faker.locales || {};

faker.locale = faker.locale || "en";

faker.locales[faker.locale] = faker.locales[faker.locale] || {};

/* stub dependencies */

faker.name = faker.name || {};

faker.commerce = faker.commerce || {};

faker.internet = faker.internet || {};

/* include new methods */

faker = require('./src/address')(faker);
faker = require('./src/color')(faker);
faker = require('./src/company')(faker);
faker = require('./src/internet')(faker);
faker = require('./src/name')(faker);
faker = require('./src/payment')(faker);
faker = require('./src/random')(faker);

if (typeof window !== 'undefined') {
	window.faker = window.faker || faker;
}

module.exports = faker;
},{"./src/address":2,"./src/color":3,"./src/company":4,"./src/internet":5,"./src/name":6,"./src/payment":7,"./src/random":8}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
module.exports = function (faker) {
	faker.color = faker.color || {};

	faker.color.name = faker.commerce.color || function () {
	};

	faker.color.hex = faker.internet.color || function () {
	};

	faker.color.rgb = function () {
		var o = Math.round, r = Math.random, s = 255;
		return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
	};

	faker.color.rgba = function () {
		var o = Math.round, r = Math.random, s = 255;
		return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
	};

	return faker;
};
},{}],4:[function(require,module,exports){
module.exports = function (faker) {
	faker.company = faker.company || {};

	faker.company.jobTitle = faker.name.jobTitle || function () {
	};

	return faker;
};
},{}],5:[function(require,module,exports){
module.exports = function (faker) {
	faker.internet = faker.internet || {};

	faker.internet.slug = function (wordCount) {
		wordCount = typeof wordCount !== 'undefined' ? wordCount : faker.random.digitNotNull();
		return faker.helpers.slugify(faker.lorem.words(wordCount));
	};

	return faker;
};
},{}],6:[function(require,module,exports){
module.exports = function (faker) {
	faker.name = faker.name || {};

	faker.definitions.name = faker.definitions.name || {};

	faker.locales[faker.locale].name = faker.locales[faker.locale].name || {};

	faker.locales[faker.locale].name.male_prefix = ['Mr.', 'Mr.', 'Mr.', 'Dr.', 'Mr.'];
	faker.locales[faker.locale].name.female_prefix = ['Mrs.', 'Ms.', 'Miss', 'Dr.', 'Mrs.'];
	faker.definitions.name.male_prefix = faker.locales[faker.locale].name.male_prefix;
	faker.definitions.name.female_prefix = faker.locales[faker.locale].name.female_prefix;

	faker.locales[faker.locale].name.male_first_name = ['John'];
	faker.locales[faker.locale].name.female_first_name = ['Jane'];

	faker.name.title = function (gender) {
		if (gender === 'male') {
			gender = 0;
		} else if (gender === 'female') {
			gender = 1;
		}
		return faker.name.prefix(gender);
	};

	faker.name.titleMale = function () {
		return faker.name.title('male');
	};

	faker.name.titleFemale = function () {
		return faker.name.title('female');
	};

	faker.name.name = function (gender) {
		if (gender === 'male') {
			gender = 0;
		} else if (gender === 'female') {
			gender = 1;
		}
		return faker.name.findName(undefined, undefined, gender);
	};

	return faker;
};
},{}],7:[function(require,module,exports){
module.exports = function (faker) {
	faker.payment = faker.payment || {};

	faker.definitions.payment = faker.definitions.payment || {};

	faker.definitions.payment.creditCardTypes = ['Visa', 'Visa', 'Visa', 'Visa', 'Visa',
		'MasterCard', 'MasterCard', 'MasterCard', 'MasterCard', 'MasterCard',
		'American Express', 'Discover Card', 'Visa Retired'];

	faker.definitions.payment.cardParams = {
		'Visa': [
			"4539###########",
			"4556###########",
			"4916###########",
			"4532###########",
			"4929###########",
			"40240071#######",
			"4485###########",
			"4716###########",
			"4##############",
		],
		'Visa Retired': [
			"4539########",
			"4556########",
			"4916########",
			"4532########",
			"4929########",
			"40240071####",
			"4485########",
			"4716########",
			"4###########",
		],
		'MasterCard': [
			"2221###########",
			"23#############",
			"24#############",
			"25#############",
			"26#############",
			"2720###########",
			"51#############",
			"52#############",
			"53#############",
			"54#############",
			"55#############"
		],
		'American Express': [
			"34############",
			"37############",
		],
		'Discover Card': [
			"6011###########",
		],
	};

	faker.payment.creditCardType = function () {
		return faker.random.arrayElement(faker.definitions.payment.creditCardTypes);
	};

	faker.payment.creditCardNumber = function (type, formatted, separator) {
		type = typeof type !== 'undefined' && type !== null ? type : faker.random.arrayElement(faker.definitions.payment.creditCardTypes);
		formatted = typeof formatted !== 'undefined' ? formatted : false;
		separator = typeof separator !== 'undefined' ? separator : '-';
		var mask = faker.random.arrayElement(faker.definitions.payment.cardParams[type]);
		var number = faker.helpers.replaceSymbolWithNumber(mask);

		function sumUp(string) {
			string = String(string).split('');
			var sum = 0;

			for (var i = 0; i < string.length; i++) {
				sum += parseInt(string[i], 10);
			}

			return sum;
		}

		function checksum(number) {
			number = String(number);
			var length = number.length;
			var sum = 0;

			for (var i = length - 1; i >= 0; i -= 2) {
				sum += number[i];
			}

			for (i = length - 2; i >= 0; i -= 2) {
				sum += sumUp(number[i] * 2);
			}

			return sum % 10;
		}

		function computeCheckDigit(partialNumber) {
			var checkDigit = checksum(partialNumber + '0');
			return checkDigit === 0 ? 0 : String(10 - checkDigit);
		}

		number += computeCheckDigit(number);

		if (formatted) {
			number = number.substr(0, 4) + separator + number.substr(4, 4) + separator + number.substr(8, 4) + separator + number.substr(12);
		}

		return number;
	};

	return faker;
};
},{}],8:[function(require,module,exports){
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
},{}]},{},[1]);

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
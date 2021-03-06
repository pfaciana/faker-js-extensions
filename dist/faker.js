(function () {
	function r(e, n, t) {
		function o(i, f) {
			if (!n[i]) {
				if (!e[i]) {
					var c = "function" == typeof require && require;
					if (!f && c) return c(i, !0);
					if (u) return u(i, !0);
					var a = new Error("Cannot find module '" + i + "'");
					throw a.code = "MODULE_NOT_FOUND", a
				}
				var p = n[i] = {exports: {}};
				e[i][0].call(p.exports, function (r) {
					var n = e[i][1][r];
					return o(n || r)
				}, p, p.exports, r, e, n, t)
			}
			return n[i].exports
		}

		for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
		return o
	}

	return r
})()({
	1: [function (require, module, exports) {
		var faker = faker || {};

		if (typeof window === 'object') {
			faker = window.faker = window.hasOwnProperty('faker') ? window.faker : {};
		}

		faker.definitions = faker.definitions || {};

		faker.locales = faker.locales || {};

		faker.locale = faker.locale || "en";

		faker.locales[faker.locale] = faker.locales[faker.locale] || {};

		/* stub dependencies */

		faker.name = faker.name || {};

		faker.commerce = faker.commerce || {};

		faker.internet = faker.internet || {};

		faker.random = faker.random || {};

		faker.random.number = faker.random.number || function () {
			return Math.random() * 100;
		};

		/* include new methods */

		faker = require('./src/address')(faker);
		faker = require('./src/color')(faker);
		faker = require('./src/company')(faker);
		faker = require('./src/internet')(faker);
		faker = require('./src/name')(faker);
		faker = require('./src/payment')(faker);
		faker = require('./src/random')(faker);

		module.exports = function (userFaker) {
			userFaker = typeof userFaker === 'object' ? userFaker : {};

			for (var namespace in faker) {
				if (faker.hasOwnProperty(namespace)) {
					for (var method in faker[namespace]) {
						if (faker[namespace].hasOwnProperty(method)) {
							userFaker[namespace] = userFaker[namespace] || {};
							userFaker[namespace][method] = faker[namespace][method];
						}
					}
				}
			}

			return userFaker;
		};

		module.exports.fake = require('./src/fake')(faker);
	}, {"./src/address": 2, "./src/color": 3, "./src/company": 4, "./src/fake": 5, "./src/internet": 6, "./src/name": 7, "./src/payment": 8, "./src/random": 9}], 2: [function (require, module, exports) {
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
	}, {}], 3: [function (require, module, exports) {
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

			faker.color.rgba = function (minAlpha, maxAlpha) {
				var o = Math.round, r = Math.random, s = 255;
				minAlpha = minAlpha != null ? minAlpha : 0;
				maxAlpha = maxAlpha != null ? maxAlpha : 1;
				var a = faker.random.number({min: minAlpha * 100, max: maxAlpha * 100}) / 100;
				return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + a.toFixed(2) + ')';
			};

			return faker;
		};
	}, {}], 4: [function (require, module, exports) {
		module.exports = function (faker) {
			faker.company = faker.company || {};

			faker.company.jobTitle = faker.name.jobTitle || function () {
			};

			return faker;
		};
	}, {}], 5: [function (require, module, exports) {
		module.exports = function (faker) {
			if (faker == null) {
				if (typeof window !== 'object' || window.hasOwnProperty('faker')) {
					return console.log('faker is not defined.');
				}
				faker = window.faker;
			}

			var explode = function (delimiter, string, limit) {
				delimiter = (delimiter != null ? delimiter : ',') + '';
				var s = String(string).split(delimiter);

				limit |= 0;
				if (limit < 2) {
					return s;
				}

				return s.slice(0, limit - 1).concat([s.slice(limit - 1).join(delimiter)])
			};

			// http://locutus.io/php/strings/trim/
			var trim = function (str, charlist) {
				var l,
					whitespace = [' ', '\n', '\r', '\t', '\f', '\x0b', '\xa0', '\u2000', '\u2001', '\u2002', '\u2003', '\u2004', '\u2005', '\u2006', '\u2007', '\u2008', '\u2009', '\u200A', '\u200B', '\u2028', '\u2029', '\u3000'].join('');
				str += '';

				if (charlist) {
					whitespace = (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1');
				}

				l = str.length;
				for (i = 0; i < l; i++) {
					if (whitespace.indexOf(str.charAt(i)) === -1) {
						str = str.substring(i);
						break;
					}
				}

				l = str.length;
				for (i = l - 1; i >= 0; i--) {
					if (whitespace.indexOf(str.charAt(i)) === -1) {
						str = str.substring(0, i + 1);
						break;
					}
				}

				return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
			};

			var safeParse = function (data) {
				if (typeof data !== "string" || typeof data === "undefined") {
					return data;
				}

				try {
					data = data.replace(/(\r\n|\n|\r|\t)/gm, "");
					return JSON.parse(data.replace(/(\r\n|\n|\r|\t)/gm, ""));
				} catch (e) {
					return data;
				}
			};

			var fake = function (input, argsDelimiter, useFnParens, methodDelimiter) {
				argsDelimiter = argsDelimiter != null ? argsDelimiter : "|";
				useFnParens = useFnParens != null ? useFnParens : false;
				methodDelimiter = methodDelimiter != null ? methodDelimiter : '.';

				var specialChars = ['*', '(', ')', '|', '[', '?'];
				var escapeChar = argsDelimiter !== "%" ? "%" : "_";
				var argsDelimiterUnicode = argsDelimiter.split('').map(function (char) {
					return char.charCodeAt();
				}).join(escapeChar);
				var escapedArgs = escapeChar + 'escape' + escapeChar + argsDelimiterUnicode + escapeChar;
				var methods, args;

				input = input.replace(new RegExp((specialChars.indexOf(argsDelimiter) > -1 ? "\\\\\\" : "\\\\") + argsDelimiter, "g"), escapedArgs);

				if (useFnParens) {
					input = explode('(', input, 2);

					methods = input[0];
					args = input.length > 1 ? input[1] : '';

					if (args.slice(-1) === ')') {
						args = args.slice(0, -1);
					}

					args = args.trim() === '' ? [] : args.split(argsDelimiter);
				} else {
					args = input.split(argsDelimiter);
					methods = args.shift();
				}

				args = args.map(function (arg) {
					return safeParse(trim(arg.replace(new RegExp(escapedArgs, "g"), argsDelimiter)));
				});

				var caller = faker;

				methods.split(methodDelimiter).forEach(function (method) {
					caller = caller[method];
				});

				return caller.apply(null, args);
			};

			if (typeof window === 'object') {
				window.fake = fake;
			}

			return fake;
		};

		/*
		 * argsDelimiter = ":", useFnParens = false, methodDelimiter = '.'
		 * input = random.words
		 * input = random.words:3
		 * input = random.float:3:10
		 * input = random.objectElement:{"key1"\\:"value1","key2"\\:"value2 with special \\",()[]{}.\\:; chars"}
		 * input = random.objectElement:{"key1"\\:"value1","key2"\\:"value2 with special \\",()[]{}.\\:; chars"}:key
		 */

		/*
		 * argsDelimiter = ",", useFnParens = true, methodDelimiter = '.'
		 * input = random.words
		 * input = random.words()
		 * input = random.words(3)
		 * input = random.float(3,10)
		 * input = random.objectElement({"key1":"value1"\\,"key2":"value2 with special \\"\\,()[]{}.:; chars"})
		 * input = random.objectElement({"key1":"value1"\\,"key2":"value2 with special \\"\\,()[]{}.:; chars"}, key)
		 */

		/*
		 * argsDelimiter = "|", useFnParens = false, methodDelimiter = '.'
		 * input = random.objectElement|{"key1":"value1","key2":"value2 with special \\",()[]{}.:; chars"}|key
		 */
	}, {}], 6: [function (require, module, exports) {
		module.exports = function (faker) {
			faker.internet = faker.internet || {};

			faker.internet.slug = function (wordCount) {
				wordCount = typeof wordCount !== 'undefined' ? wordCount : faker.random.digitNotNull();
				return faker.helpers.slugify(faker.lorem.words(wordCount));
			};

			return faker;
		};
	}, {}], 7: [function (require, module, exports) {
		module.exports = function (faker) {
			faker.name = faker.name || {};

			faker.locales[faker.locale].name = faker.locales[faker.locale].name || {};
			faker.locales[faker.locale].name.male_prefix = faker.locales[faker.locale].name.male_prefix || ['Mr.', 'Mr.', 'Mr.', 'Dr.', 'Mr.'];
			faker.locales[faker.locale].name.female_prefix = faker.locales[faker.locale].name.female_prefix || ['Mrs.', 'Ms.', 'Miss', 'Dr.', 'Mrs.'];
			faker.locales[faker.locale].name.male_first_name = faker.locales[faker.locale].name.male_first_name || ['John'];
			faker.locales[faker.locale].name.female_first_name = faker.locales[faker.locale].name.female_first_name || ['Jane'];

			faker.definitions.name = faker.definitions.name || {};
			faker.definitions.name.male_prefix = faker.definitions.name.male_prefix || faker.locales[faker.locale].name.male_prefix;
			faker.definitions.name.female_prefix = faker.definitions.name.female_prefix || faker.locales[faker.locale].name.female_prefix;
			faker.definitions.name.male_first_name = faker.definitions.name.male_first_name || faker.locales[faker.locale].name.male_first_name;
			faker.definitions.name.female_first_name = faker.definitions.name.female_first_name || faker.locales[faker.locale].name.female_first_name;

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

			faker.prefix = function (gender) {
				if (typeof gender !== 'undefined' && gender !== null && typeof faker.definitions.name.male_prefix !== "undefined" && typeof faker.definitions.name.female_prefix !== "undefined") {
					if (typeof gender !== 'number') {
						gender = faker.random.number(1);
					}
					if (gender === 0) {
						return faker.random.arrayElement(faker.locales[faker.locale].name.male_prefix);
					} else {
						return faker.random.arrayElement(faker.locales[faker.locale].name.female_prefix);
					}
				}
				return faker.random.arrayElement(faker.definitions.name.prefix);
			};

			faker.name.firstName = function (gender) {
				if (typeof gender !== 'undefined' && gender !== null && typeof faker.definitions.name.male_first_name !== "undefined" && typeof faker.definitions.name.female_first_name !== "undefined") {
					// some locale datasets ( like ru ) have first_name split by gender. since the name.first_name field does not exist in these datasets,
					// we must randomly pick a name from either gender array so faker.name.firstName will return the correct locale data ( and not fallback )
					if (typeof gender !== 'number') {
						gender = faker.random.number(1);
					}
					if (gender === 0) {
						return faker.random.arrayElement(faker.locales[faker.locale].name.male_first_name)
					} else {
						return faker.random.arrayElement(faker.locales[faker.locale].name.female_first_name);
					}
				}
				return faker.random.arrayElement(faker.definitions.name.first_name);
			};

			faker.name.findName = function (firstName, lastName, gender) {
				var r = faker.random.number(8);
				var prefix, suffix;
				// in particular locales first and last names split by gender,
				// thus we keep consistency by passing 0 as male and 1 as female
				if (typeof gender !== 'undefined' && gender !== null && typeof gender !== 'number') {
					gender = faker.random.number(1);
				}
				firstName = firstName || faker.name.firstName(gender);
				lastName = lastName || faker.name.lastName(gender);
				switch (r) {
					case 0:
						prefix = faker.name.prefix(gender);
						if (prefix) {
							return prefix + " " + firstName + " " + lastName;
						}
					case 1:
						suffix = faker.name.suffix(gender);
						if (suffix) {
							return firstName + " " + lastName + " " + suffix;
						}
				}

				return firstName + " " + lastName;
			};

			return faker;
		};
	}, {}], 8: [function (require, module, exports) {
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
	}, {}], 9: [function (require, module, exports) {
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
	}, {}]
}, {}, [1]);

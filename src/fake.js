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
		var l, whitespace = [' ', '\n', '\r', '\t', '\f', '\x0b', '\xa0', '\u2000', '\u2001', '\u2002', '\u2003', '\u2004', '\u2005', '\u2006', '\u2007', '\u2008', '\u2009', '\u200A', '\u200B', '\u2028', '\u2029', '\u3000'].join('');
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
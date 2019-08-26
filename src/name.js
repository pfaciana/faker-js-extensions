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
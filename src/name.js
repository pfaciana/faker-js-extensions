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
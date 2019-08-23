module.exports = function (faker) {
	faker.company = faker.company || {};

	faker.company.jobTitle = faker.name.jobTitle || function () {
	};

	return faker;
};
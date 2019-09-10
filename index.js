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
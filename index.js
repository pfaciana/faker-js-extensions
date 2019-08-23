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
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
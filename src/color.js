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
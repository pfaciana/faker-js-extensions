module.exports = function (faker) {
	faker.internet = faker.internet || {};

	faker.internet.slug = function (wordCount) {
		wordCount = typeof wordCount !== 'undefined' ? wordCount : faker.random.digitNotNull();
		return faker.helpers.slugify(faker.lorem.words(wordCount));
	};

	return faker;
};
# Faker.js Extensions
This adds additional methods to faker.js to generate massive amounts of realistic fake data in Node.js and the browser. Inspired by the PHP Faker (https://github.com/fzaninotto/Faker). There were a few methods available in the PHP Faker that I was looking for and not in JS variant. So this package bridges that gap. This package can be used without faker.js (https://github.com/marak/Faker.js/) but if there is a dependency it will return undefined, or in some instances, throw an error. So it's best to have Faker.js already loaded on the page before using these additional methods.  This can be used with Node.js or in any ES5 browser or later.

### Added API Methods

* address
  * buildingNumber (PHP's Address\buildingNumber)
  * postCode (JS's address.zipCode)
  * address (PHP's Address\address)
* color
  * name (JS's commerce.color)
  * hex (JS's internet.color)
  * rgb (PHP's Color\rgbCssColor)
  * rgba (new)
* company
  * jobTitle (JS's name.jobTitle)
* internet
  * slug (PHP's Internet\slug)
* name
  * title (PHP's Person\title)
  * titleMale (PHP's Person\titleMale)
  * titleFemale (PHP's Person\titleFemale)
  * name (PHP's Person\name)
* payment
  * creditCardType (PHP's Payment\creditCardType)
  * creditCardNumber (PHP's Payment\creditCardNumber)
* random
  * digit (PHP's Base\randomDigit)
  * digitNotNull (PHP's Base\randomDigitNotNull)
  * numberBetween (PHP's Base\numberBetween)
  * numberSize (PHP's Base\randomNumber)
  * float (PHP's Base\randomFloat)
  * letter (PHP's Base\randomLetter)

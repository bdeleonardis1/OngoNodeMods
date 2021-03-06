# flesch-kincaid [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Formula to detect the grade level of text according to the
[Flesch–Kincaid Grade Level][formula].

See [syllable][] for detecting syllables.

## Installation

[npm][npm-install]:

```bash
npm install flesch-kincaid
```

## Usage

```js
var fleschKincaid = require('flesch-kincaid');

/* For “The Australian platypus is seemingly a hybrid of
 * a mammal and reptilian creature.” (1 sentence, 13 words,
 * 26 syllables). */
fleschKincaid({
  sentence: 1,
  word: 13,
  syllable: 26
});
// 13.08
```

## API

### `fleschKincaid(counts)`

Given an object containing the number of words (`word`), the number of
sentences (`sentence`), and the number of syllables  (`syllable`) in a
document, returns the U.S. grade level associated with the document.

Values can theoretically start at -3.40 and end at Infinity.

## Related

*   [`automated-readability`](https://github.com/wooorm/automated-readability)
    — Uses character count instead of error-prone syllable parser;
*   [`coleman-liau`](https://github.com/wooorm/coleman-liau)
    — Uses letter count instead of an error-prone syllable parser;
*   [dale-chall-formula](https://github.com/wooorm/dale-chall-formula)
    — Uses a dictionary; suited for higher reading levels;
*   [`flesch`](https://github.com/wooorm/flesch)
    — Uses syllable count;
*   [`gunning-fog`](https://github.com/wooorm/gunning-fog)
    — Uses syllable count; needs POS-tagging and NER;
*   [`smog-formula`](https://github.com/wooorm/smog-formula)
    — Like `gunning-fog-index`; without needing advanced NLP;
*   [`spache-formula`](https://github.com/wooorm/spache-formula)
    — Uses a dictionary; suited for lower reading levels.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/flesch-kincaid.svg

[travis]: https://travis-ci.org/wooorm/flesch-kincaid

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/flesch-kincaid.svg

[codecov]: https://codecov.io/github/wooorm/flesch-kincaid

[npm-install]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[formula]: http://en.wikipedia.org/wiki/Flesch–Kincaid_readability_tests#Flesch.E2.80.93Kincaid_Grade_Level

[syllable]: https://github.com/wooorm/syllable

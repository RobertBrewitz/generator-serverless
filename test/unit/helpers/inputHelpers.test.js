const inputHelpers = require('./../../../generators/helpers/inputHelpers');

describe('test/unit/helpers/inputHelpers.test.js', () => {
  describe('upcaseFirstLetter', () => {
    const upcaseFirstLetter = inputHelpers.upcaseFirstLetter;

    it('upcases first letter', () => {
      const input = 'fooBar';
      const expected = 'FooBar';

      const result = upcaseFirstLetter(input);

      expect(result).to.eq(expected);
    });
  });

  describe('downcaseFirstLetter', () => {
    const downcaseFirstLetter = inputHelpers.downcaseFirstLetter;

    it('downcases first letter', () => {
      const input = 'FooBar';
      const expected = 'fooBar';

      const result = downcaseFirstLetter(input);

      expect(result).to.eq(expected);
    });
  });

  describe('kebabCase', () => {
    const kebabCase = inputHelpers.kebabCase;

    it('kebabcases camelcased input', () => {
      const input = 'fooBar';
      const expected = 'foo-bar';

      const result = kebabCase(input);

      expect(result).to.eq(expected);
    });

    it('does not prepend dash before first letter', () => {
      const input = 'FooBar';
      const expected = 'foo-bar';

      const result = kebabCase(input);

      expect(result).to.eq(expected);
    });
  });
});

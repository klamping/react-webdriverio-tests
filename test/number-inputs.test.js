const TestCase = require('./pages/TestCase.page');

describe('Number Inputs', function() {
  beforeEach(function() {
    browser.url('/number-inputs');
    $('.container').waitForDisplayed();
  });

  describe('Backspacing', function() {
    it('should not lose decimal place !firefox', function() {
      const testCase = new TestCase(1);

      // Type "3.1"
      testCase.controlledInput.setValue('3.1');
      // Press backspace, eliminating the "1"
      testCase.controlledInput.addValue('Backspace');

      // The field should read "3.", preserving the decimal place
      // TODO but it doesn't because the browser is returning an interpreted value, not the actual value in the field
      // replace with visual regression testing?
      expect(testCase.getControlledInputValue()).toEqual('3.');
    });
  });

  describe('Decimal Precision', function() {
    it('Supports decimal precision greater than 2 places', function() {
      const testCase = new TestCase(2);

      testCase.controlledInput.setValue('0.01');

      expect(testCase.controlledInput.getValue()).toEqual('0.01');
    });
  });

  describe('Exponent form', function() {
    it('Supports exponent form ("2e4")', function() {
      const testCase = new TestCase(3);
      testCase.scrollTo();

      testCase.controlledInput.setValue('2e');
      testCase.controlledInput.addValue('4');

      expect(testCase.controlledInput.getValue()).toEqual('2e4');
      expect(testCase.getHintValue()).toEqual('20000');
    });

    it('Pressing "e" at the end !firefox', function() {
      const testCase = new TestCase(4);
      testCase.scrollTo();

      testCase.controlledInput.setValue('3.14');
      expect(testCase.getHintValue()).toEqual('3.14');

      testCase.controlledInput.addValue('e');

      expect(testCase.getControlledInputValue()).toEqual('3.14e');
      expect(testCase.getHintValue()).toEqual('""');
    });

    it('Supports pressing "ee" in the middle of a number !firefox', function() {
      const testCase = new TestCase(5);
      testCase.scrollTo();

      testCase.controlledInput.setValue('3.14');
      expect(testCase.getHintValue()).toEqual('3.14');

      // Move the text cursor to after the decimal place
      browser.keys(['Left arrow', 'Left arrow']);

      // Press "e" twice, so that the value reads "3.ee14"
      browser.keys(['e', 'e']);

      // The field should read "3.ee14"
      expect(testCase.getControlledInputValue()).toEqual('3.ee14');
      expect(testCase.getHintValue()).toEqual('""');
    });
  });
});

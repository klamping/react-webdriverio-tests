const TestCase = require('./pages/TestCase.page');

describe('Text Inputs', function() {
  beforeEach(function() {
    browser.url('/text-inputs');
    browser.waitForText('.container');
  });

  describe('Numbers in a controlled text field with no handler', function() {
    it('should not update with a decimal value', function() {
      const testCase = new TestCase(1);

      // Type ".2" into the text input
      testCase.controlledInput.addValue('.2');

      expect(testCase.controlledInput.getValue()).toEqual('2');
    });
  });

  describe('Required Inputs @firefox', function() {
    it('should not show a red outline', function() {
      const testCase = new TestCase(2);

      // get the computed box shadow
      const boxShadow = testCase.controlledInput.getCssProperty('box-shadow')
        .value;

      // assert it's equal to 'none'
      expect(boxShadow).toEqual('none');
    });
  });

  // setSelectionRange is not supported in modern browsers on 'email' input types
  xdescribe('Cursor when editing email inputs', function() {
    it('should not jump to the end', function() {
      const testCase = new TestCase(3);

      // Type "user@example.com"
      testCase.controlledInput.setValue('user@example.com');

      // Select "@"
      testCase.controlledInput.selectorExecute(function() {
        // use Web API to select the @

        testCase.controlledInput.setSelectionRange(4, 5);
      });

      // Type ".", to replace "@" with a period

      expect(testCase.controlledInput.getValue()).toEqual('user.example.com');

      // get position of input cursor and assert not at end
    });
  });

  describe('Cursor when editing url inputs', function() {
    it('should not jump to the end', function() {
      const testCase = new TestCase(4);

      testCase.controlledInput.setValue('http://www.example.com');

      // Select "www."
      browser.selectorExecute(testCase.controlledInputSelector, function(
        input
      ) {
        input[0].setSelectionRange(7, 11);
      });

      // Press backspace/delete
      testCase.controlledInput.addValue('Backspace');

      // get position of input cursor and assert not at end
      const cursorPosition = browser.selectorExecute(
        testCase.controlledInputSelector,
        function(input) {
          return input[0].selectionStart;
        }
      );

      expect(cursorPosition).toEqual(7);

      // assert field value is correct
      expect(testCase.controlledInput.getValue()).toEqual('http://example.com');
    });
  });
});

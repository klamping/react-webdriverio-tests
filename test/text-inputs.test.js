const TestCase = require('./pages/TestCase.page');

describe('Text Inputs', function() {
  beforeEach(function() {
    browser.url('/text-inputs');
    browser.waitForText('.container');
  });

  describe('Numbers in a controlled text field with no handler', function() {
    it('should not update with a decimal value', function() {
      const testCase = new TestCase(1);

      const input = testCase.getInput(1);

      // Type ".2" into the text input
      input.addValue('.2');

      expect(input.getValue()).toEqual('2');
    });
  });

  describe('Required Inputs @firefox', function() {
    it('should not show a red outline', function() {
      const testCase = new TestCase(2);

      const input = testCase.getInput(1);

      // get the computed box shadow
      const boxShadow = input.getCssProperty('box-shadow').value;

      // assert it's equal to 'none'
      expect(boxShadow).toEqual('none');
    });
  });

  // setSelectionRange is not supported in modern browsers on 'email' input types
  describe.skip('Cursor when editing email inputs', function() {
    it('should not jump to the end', function() {
      const testCase = new TestCase(3);

      const input = testCase.getInput(1);

      // Type "user@example.com"
      input.setValue('user@example.com');

      // Select "@"
      input.selectorExecute(function() {
        // use Web API to select the @

        input.setSelectionRange(4, 5);
      });

      // Type ".", to replace "@" with a period

      expect(input.getValue()).toEqual('user.example.com');

      // get position of input cursor and assert not at end
    });
  });

  describe('Cursor when editing url inputs', function() {
    it('should not jump to the end !@firefox', function() {
      // Temp workaround to skip this test in Firefox
      if (browser.options.desiredCapabilities.browserName === 'firefox') {
        this.skip();
      }

      const testCase = new TestCase(4);

      const input = testCase.getInput(1);

      input.setValue('http://www.example.com');

      // Select "www."
      const inputSelector = `${testCase.container.selector} ${input.selector}`;
      browser.selectorExecute(inputSelector, function(input) {
        input[0].setSelectionRange(7, 11);
      });

      // Press backspace/delete
      // TODO Firefox no longer supports 'keys' webdriver endpoint and so this command fails
      // SO we should switch to using actions instead
      // browser.actions([{
      //     "type": "key",
      //     "id": "keys",
      //     "actions": [
      //         {"type": "keyDown", "value":"Backspace"},
      //         {"type": "keyUp", "value":"Backspace"},
      //     ]
      // }])
      browser.keys('Backspace');

      // get position of input cursor and assert not at end
      const cursorPosition = browser.selectorExecute(inputSelector, function(
        input
      ) {
        return input[0].selectionStart;
      });

      expect(cursorPosition).toEqual(7);

      // assert field value is correct
      expect(input.getValue()).toEqual('http://example.com');
    });
  });
});

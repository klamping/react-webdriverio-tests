class TestCase {
  constructor(index) {
    this.selector = `.test-case:nth-of-type(${index})`;
  }

  get container() {
    return $(this.selector);
  }

  get controlledInput() {
    return $(this.controlledInputSelector);
  }

  get controlledInputSelector() {
    return `${this.selector} .test-fixture fieldset:nth-of-type(1) input`;
  }

  get uncontrolledInput() {
    return this.container.$(`.test-fixture fieldset:nth-of-type(2) input`);
  }

  getControlledInputValue() {
    return browser.execute(function(input) {
      input.focus();
      document.execCommand('SelectAll');
      return window.getSelection().toString();
    }, this.controlledInput);
  }

  scrollTo() {
    this.container.scrollIntoView();
  }

  getInput(index) {
    return this.container.$(
      `.test-fixture fieldset:nth-of-type(${index}) input`
    );
  }

  getHintValue() {
    let hint = this.container.$(`.test-fixture fieldset:nth-of-type(1) .hint`);

    // remove 'Value: ' from text
    return hint.getText().substring(7);
  }
}

module.exports = TestCase;

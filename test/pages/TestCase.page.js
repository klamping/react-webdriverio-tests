class TestCase {
  constructor(index) {
    this.selector = `.test-case:nth-of-type(${index})`;
  }

  get container() {
    return $(this.selector);
  }

  getInput(index) {
    return this.container.$(
      `.test-fixture fieldset:nth-of-type(${index}) input`
    );
  }
}

module.exports = TestCase;

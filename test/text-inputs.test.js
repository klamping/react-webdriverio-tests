class TestCase {
    constructor(index) {
        this.selector = `.test-case:nth-of-type(${index})`;
    }

    get container() {
        return $(this.selector);
    }

    getInput(index) {
        return this.container.$(`.test-fixture fieldset:nth-of-type(${index}) input`);
    }
}

describe("Text Inputs", function () {
    beforeEach(function () {
        browser.url("/text-inputs");
        browser.waitForText(".container");
    });

    describe("Numbers in a controlled text field with no handler", function () {
        it("should not update with a decimal value", function () {
            const testCase = new TestCase(1);

            const input = testCase.getInput(1);

            // Type ".2" into the text input
            input.addValue(".2");

            expect(input.getValue()).to.equal('2');
        })
    })

    describe("Required Inputs @firefox", function () {
        it("should not show a red outline", function () {
            const testCase = new TestCase(2);

            const input = testCase.getInput(1);

            // get the computed box shadow
            const boxShadow = input.getCssProperty('box-shadow').value;

            // assert it's equal to 'none'
            expect(boxShadow).to.equal('none');
        })
    })
});

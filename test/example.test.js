describe("Input change events", function () {
    it("When a radio value and name changes at once", function() {
        browser.url("/input-change-events");
        browser.waitForVisible(".container");

        // Save the button that has text of 'toggle'
        const toggleButton = $("button*=Toggle");

        // Save the radio buttons by their text using Xpath
        const firstRadio = $("//label[text()='First Radio']/input");
        const secondRadio = $("//label[text()='Second Radio']/input");

        toggleButton.click();
        expect(firstRadio.isSelected()).to.be.true;
        expect(secondRadio.isSelected()).to.be.false;

        toggleButton.click();
        expect(firstRadio.isSelected()).to.be.false;
        expect(secondRadio.isSelected()).to.be.true;

        toggleButton.click();
        expect(firstRadio.isSelected()).to.be.true;
        expect(secondRadio.isSelected()).to.be.false;
    });
});

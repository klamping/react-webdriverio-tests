describe('Input change events', function() {
  beforeEach(function() {
    browser.url('/input-change-events');
    $('.container').waitForDisplayed();
  });

  describe('Radio button groups with name changes', function() {
    it('should switch between the first and second radio button', function() {
      // Save the button that has text of 'toggle'
      const toggleButton = $('button*=Toggle');

      // Save the radio buttons by their text using Xpath
      const firstRadio = $("//label[text()='First Radio']/input");
      const secondRadio = $("//label[text()='Second Radio']/input");

      toggleButton.click();
      expect(firstRadio.isSelected()).toBe(true);
      expect(secondRadio.isSelected()).toBe(false);

      toggleButton.click();
      expect(firstRadio.isSelected()).toBe(false);
      expect(secondRadio.isSelected()).toBe(true);

      toggleButton.click();
      expect(firstRadio.isSelected()).toBe(true);
      expect(secondRadio.isSelected()).toBe(false);
    });
  });
});

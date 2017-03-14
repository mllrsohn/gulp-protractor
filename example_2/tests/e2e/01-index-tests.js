describe('WebApp', function() {

	describe('index page', function() {

		browser.get('/');

		it('should show the page', function() {
			expect(element.all(by.css('h1')).
				first().getText()).toBe("Headline 2");
		});

	});

});

$(function($, kendo) {
	var assert = chai.assert;

	var foobar = {
		sayHello: function() {
			return 'Hello World!';
		}
	};

	describe('Foobar', function() {
		describe('#sayHello()', function() {
			it('should return some text', function() {
				assert.equal(foobar.sayHello(), 'Hello World!');
			});
		});
	});
}(jQuery, kendo));
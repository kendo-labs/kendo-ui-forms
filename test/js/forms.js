$(function($, kendo) {
	var assert = chai.assert;

	var foobar = {
		sayHello: function() {
			return 'Hello World!';
		}
	};

	describe('Form Widget initialization', function() {
		describe('#sayHello()', function() {
			it('should exist in the kendo.ui namespace', function() {
				assert.ok(kendo.ui.Form, 'Form object is not available on the kendo.ui namespace');
			});

			it('should be able to perform imperative initialization with JavaScript', function() {
				assert.ok($('<input></input>').kendoForm, 'widget kendoForm is not available on the Kendo object');
			});
		});
	});
}(jQuery, kendo));
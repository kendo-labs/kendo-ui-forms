(function($, kendo) {
	var ui = kendo.ui,
		Widget = ui.Widget,
		formWidget;

	Form = Widget.extend({
		init: function(element, options) {
			$(element).find('input').each(function(index, val) {
				// Add the k-input class to each form element, which provides Kendo UI styling
				// to all elements, not just those the widget will transform.
				$(val).addClass('k-input');
			});

			// base call to initialize the widget
			Widget.fn.init.call(this, element, options);
		},

		options: {
			// the name is what it will appear in the kendo namespace (kendo.ui.Form).
			// The jQuery plugin would be jQuery.fn.kendoForm.
			name: "Form"
		}
	});

	ui.plugin(Form);
} (jQuery, kendo));
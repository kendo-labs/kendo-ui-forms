(function($, kendo) {
	kendo.forms = kendo.forms || {};

	function detectFormTypeSupport(type) {
		var i = document.createElement("input");
		i.setAttribute("type", "color");
		return i.type !== "text";
	}

	var featureDetects = {
		color: detectFormTypeSupport("color")
	};

	kendo.forms.features = featureDetects;
} (jQuery, kendo));;(function($, kendo) {
	var ui = kendo.ui,
		Widget = ui.Widget,
		formWidget;

	Form = Widget.extend({
		init: function(element, options) {
			var form = $(element);

			form.find('input').each(function(index, val) {
				// Add the k-input class to each form element, which provides Kendo UI styling
				// to all elements, not just those the widget will transform.
				$(val).addClass('k-input');
			});

			if (!kendo.forms.features.color) {
				//Add a ColorPicker for type='color'
				form.find('input[type=color]').each(function(index, val) {
					$(val).kendoColorPicker({ palette: "basic" });
				});	
			}
			
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
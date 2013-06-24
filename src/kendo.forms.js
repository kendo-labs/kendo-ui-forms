(function($, kendo) {
	var ui = kendo.ui,
		Widget = ui.Widget,
		formWidget,
		typeUpgrades = kendo.forms.types;

	Form = Widget.extend({
		init: function(element, options) {
			var that = this;
			var form = $(element);
			var i, len;

			var upgradeFormType = function(type, callback) {
				// replace dash with underscore for features object lookup
				var modType = type.replace(/-/g,'_');

				if (!kendo.forms.features[modType] || that.options.alwaysUseWidgets) {
					form.find('input[type=' + type + ']').each(callback);	
				}
			};
			
			// base call to widget initialization
			Widget.fn.init.call(this, element, options);

			if (that.options.styleInputs) {
				form.find('input').each(function(index, val) {
					// Add the k-input class to each form element, which provides Kendo UI styling
					// to all elements, not just those the widget will transform.
					$(val).addClass('k-input');
				});
			}

			// Add basic support for form types defined in the typeUpgrades array
			for (i = 0, len = typeUpgrades.length; i < len; i++) {
				var typeObj = typeUpgrades[i];
				upgradeFormType(typeObj.type, typeObj.upgrade);
			}
		},

		options: {
			// the name is what it will appear in the kendo namespace (kendo.ui.Form).
			// The jQuery plugin would be jQuery.fn.kendoForm.
			name: "Form",
			alwaysUseWidgets: false,
			styleInputs: true
		}
	});

	ui.plugin(Form);
} (jQuery, kendo));
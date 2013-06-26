(function (kendo) {
	kendo.forms = kendo.forms || {};

	var typeUpgrades = [
		{
			type: 'color',
			upgrade: function(index, val) {
				$(val).kendoColorPicker({ palette: "basic" });
			}
		},
		{
			type: 'number',
			upgrade: function(index, val) {
				$(val).kendoNumericTextBox();
			}
		},
		{
			type: 'range',
			upgrade: function(index, val) {
				$(val).kendoSlider({
					showButtons: false,
					tickPlacement: 'none'
				});
			}
		},
		{
			type: 'file',
			upgrade: function(index, val) {
				$(val).kendoUpload();
			}
		},
		{
			type: 'datetime',
			upgrade: dateTimeUpgrade
		},
		{
			type: 'datetime-local',
			upgrade: dateTimeUpgrade
		},
		{
			type: 'time',
			upgrade: function(index, val) {
				var input = $(val),
					dummyDate = "2013-10-04T";

				input.kendoTimePicker({
					value: input.val().length > 0 ? new Date(dummyDate + input.val()) : null,
					min: input.attr('min') ? new Date(dummyDate + input.attr('min')) : new Date(2049, 0, 1, 0, 0, 0),
					max: input.attr('max') ? new Date(dummyDate + input.attr('max')) : new Date(2099, 11, 31, 0, 0, 0),
					// Step attribute is seconds, interval in minute
					interval: input.attr('step') ? Math.round(parseInt(input.attr('step'), 10)/60) : 30
				});
			}
		},
		{
			type: 'month',
			upgrade: function(index, val) {
				monthWeekUpgrade(val, "year");
			}
		},
		{
			type: 'week',
			upgrade: function(index, val) {
				monthWeekUpgrade(val, "month");
			}
		}
	];

	function monthWeekUpgrade(val, depth) {
		var input = $(val);

		// Change the input type to 'text'. This
		// preserves it's attributes, while working around some known issues 
		// in certain browsers (eg. Chrome) that render attributes
		// like value, min, max and step un-readable/writable when the 
		// datetime and datetime-local fields are used.
		if (!input.val()) {
			input.attr('type', 'text');
		}

		var defaults = getDateTimeDefaults(input);
		// Set the start and depth properties to month, which means that only day/week 
		// values are displayed.
		defaults.start = depth;
		defaults.depth = depth;

		input.kendoDatePicker(defaults);
	}

	function dateTimeUpgrade(index, val) {
		var input = $(val);

		// Change the input type to 'text'. This
		// preserves it's attributes, while working around some known issues 
		// in certain browsers (eg. Chrome) that render attributes
		// like value, min, max and step un-readable/writable when the 
		// datetime and datetime-local fields are used.
		if (!input.val()) {
			input.attr('type', 'text');
		}
		// Step attribute is seconds, interval in minute
		var defaults = getDateTimeDefaults(input);
		defaults.interval = input.attr('step') ? Math.round(parseInt(input.attr('step'), 10)/60) : 30;
		input.kendoDateTimePicker(defaults);
	}

	function getDateTimeDefaults(input) {
		return {
			value: input.val().length > 0 ? new Date(input.val().trim().replace(/ /g, "T")) : null,
			min: input.attr('min') ? new Date(input.attr('min').trim().replace(/ /g, "T")) : new Date(1900, 0, 1),
			max: input.attr('max') ? new Date(input.attr('max').trim().replace(/ /g, "T")) : new Date(2099, 11, 31)
		};
	}

	kendo.forms.types = typeUpgrades;
} (kendo));;(function (kendo) {
	kendo.forms = kendo.forms || {};

	function detectFormTypeSupport(type) {
		var i = document.createElement("input");
		i.setAttribute("type", type);
		return i.type !== "text";
	}

	function detectDateTimeFields(type) {
		var dummyVal = ":(";

		var i = document.createElement("input");
		i.setAttribute("type", type);
		i.value = dummyVal; // Credit to Mike Taylor https://gist.github.com/miketaylr/310734
		return (i.value !== dummyVal);
	}

	var featureDetects = {
		color: detectFormTypeSupport("color"),
		number: detectFormTypeSupport("number"),
		range: detectFormTypeSupport("range"),
		file: detectFormTypeSupport("file"),
		datetime: detectDateTimeFields("datetime"),
		datetime_local: detectFormTypeSupport("datetime-local"),
		time: detectFormTypeSupport("time"),
		month: detectFormTypeSupport("month"),
		week: detectFormTypeSupport("week")
	};

	kendo.forms.features = featureDetects;
} (kendo));;(function($, kendo) {
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
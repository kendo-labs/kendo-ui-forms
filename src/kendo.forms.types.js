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
				dateUpgrade(val, "year");
			}
		},
		{
			type: 'week',
			upgrade: function(index, val) {
				dateUpgrade(val, "month");
			}
		},
		{
			type: 'date',
			upgrade: function(index, val) {
				dateUpgrade(val);
			}
		}
	];

	function dateUpgrade(val, depth) {
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
		if (depth) {
			defaults.start = depth;
			defaults.depth = depth;
		}

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
} (kendo));
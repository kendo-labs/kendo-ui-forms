(function (kendo) {
	kendo.forms = kendo.forms || {};

	var typeUpgrades = {
    text: function(val) {
      $(val).addClass('k-input');
    },
    button: upgradeButton,
    submit: upgradeButton,
    reset: upgradeButton,
    color: function(val) {
      $(val).kendoColorPicker({ palette: 'basic' });
    },
    number: function(val) {
      $(val).kendoNumericTextBox();
    },
    range: function(val) {
      $(val).kendoSlider({
        showButtons: false,
        tickPlacement: 'none'
      });
    },
    file: function(val) {
      $(val).kendoUpload();
    },
    datetime: dateTimeUpgrade,
    'datetime-local': dateTimeUpgrade,
    time: function(val) {
      var input = $(val),
        dummyDate = '2013-10-04T';

      input.kendoTimePicker({
        value: input.val().length > 0 ? new Date(dummyDate + input.val())
          : null,
        min: input.attr('min') ? new Date(dummyDate + input.attr('min'))
          : new Date(2049, 0, 1, 0, 0, 0),
        max: input.attr('max') ? new Date(dummyDate + input.attr('max'))
          : new Date(2099, 11, 31, 0, 0, 0),
        // Step attribute is seconds, interval in minute
        interval: input.attr('step') ?
          Math.round(parseInt(input.attr('step'), 10)/60) : 30
      });
    },
    month: function(val) {
      var input = $(val),
        value = convertMonthPartToDate(input.val()),
        min = convertMonthPartToDate(input.attr('min')),
        max = convertMonthPartToDate(input.attr('max'));

      input.kendoDatePicker({
        // Set the start and depth properties to year, which means
        // that only month values are displayed.
        start: 'year',
        depth: 'year',
        // If the conversion returned a NaN, use the default values
        value: isNaN(value) ? null : new Date(value),
        min: isNaN(min) ? new Date(1900, 0, 1) : new Date(min),
        max: isNaN(max) ? new Date(2099, 11, 31) : new Date(max)
      });
    },
    week: function(val) {
      var input = $(val),
        value = getDateFromWeekString(input.val()),
        min = getDateFromWeekString(input.attr('min')),
        max = getDateFromWeekString(input.attr('max'));

      input.kendoDatePicker({
        // Set the start and depth properties to month, which means
        // that only day/week values are displayed.
        depth: 'month',
        // If the conversion returned a null date, use the default values
        value: value,
        min: min === null ? new Date(1900, 0, 1) : min,
        max: max === null ? new Date(2099, 11, 31) : max
      });
    },
    date: function(val) {
      var input = $(val);
      var defaults = getDateTimeDefaults(input);
      input.kendoDatePicker(defaults);
    }
  };

	function convertMonthPartToDate(val) {
		// Add dummy day of month for valid date parsing
		val = val + '-' + new Date().getDate();
		return Date.parse(val);
	}

	function getDateFromWeekString(weekString) {
    var week, year, dateParts;

    if (!weekString) {
      return null;
    }

    dateParts = weekString.split('-');

		if (dateParts.length < 2) {
			return null;
		}

		year = dateParts[0];
		week = dateParts[1].replace(/w/gi, '');

		if (isNaN(parseInt(week, 10)) || isNaN(parseInt(year, 10))) {
			return null;
		}

		// Jan 1 + 7 days per week
    var day = (1 + (week - 1) * 7);
    return new Date(year, 0, day);
	}

	function dateTimeUpgrade(val) {
		var input = $(val);

		// Step attribute is seconds, interval in minute
		var defaults = getDateTimeDefaults(input);
		defaults.interval = input.attr('step') ?
			Math.round(parseInt(input.attr('step'), 10)/60) : 30;
		input.kendoDateTimePicker(defaults);
	}

	function getDateTimeDefaults(input) {
		return {
			value: input.val().length > 0 ? new Date(input.val()) : null,
			min: input.attr('min') ? new Date(input.attr('min'))
				: new Date(1900, 0, 1),
			max: input.attr('max') ? new Date(input.attr('max'))
				: new Date(2099, 11, 31)
		};
	}

  function upgradeButton(val) {
    $(val).addClass('k-button');
  }

	kendo.forms.types = typeUpgrades;
} (kendo));
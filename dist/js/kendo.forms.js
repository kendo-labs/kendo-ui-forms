/*
 * kendo-ui-forms v0.2.0 (2013-09-05)
 * Copyright © 2013 Telerik
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function() {
	if(!String.prototype.trim) {
		String.prototype.trim = function () {
			return this.replace(/^\s+|\s+$/g,'');
		};
	}
}());;(function (kendo) {
	kendo.forms = kendo.forms || {};

	function detectFormTypeSupport(type) {
		var input = document.createElement('input');
		
		//Wrap this in a try/catch b/c IE8 doesn't allow one to set
		//the type of input elements with setAttribute
		try {
			input.setAttribute('type', type);
		} catch(e) {
			input.type = type;
		}

		return input.type !== 'text';
	}

	function detectDateTimeFields(type) {
		var dummyVal = ':(';

		var i = document.createElement('input');
		i.setAttribute('type', type);
		// Credit to Mike Taylor //gist.github.com/miketaylr/310734
		i.value = dummyVal;
		return (i.value !== dummyVal);
	}

	var featureDetects = {
		color: detectFormTypeSupport('color'),
		number: detectFormTypeSupport('number'),
		range: detectFormTypeSupport('range'),
		file: detectFormTypeSupport('file'),
		datetime: detectDateTimeFields('datetime'),
		'datetime-local': detectFormTypeSupport('datetime-local'),
		time: detectFormTypeSupport('time'),
		month: detectFormTypeSupport('month'),
		week: detectFormTypeSupport('week'),
		date: detectFormTypeSupport('date'),
		placeholder: (function() {
			return 'placeholder' in document.createElement('input') &&
				'placeholder' in document.createElement('textarea');
		}())
	};

	kendo.forms.features = featureDetects;
} (kendo));;(function (kendo) {
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
			value: createDateFromInput(input.val(), null),
			min: createDateFromInput(input.attr('min'), new Date(1900, 0, 1)),
			max: createDateFromInput(input.attr('max'), new Date(2099, 11, 31))
		};
	}

  function createDateFromInput(val, defaultDate) {
    if (!val) {
      return defaultDate;
    }

    if (!Date.parse(val)) {
      var altDate = new Date(val.replace(/-/g, '/'));

      if (!altDate) {
        return altDate;
      }

      return defaultDate;
    }

    return new Date(val);
  }

  function upgradeButton(val) {
    $(val).addClass('k-button');
  }

	kendo.forms.types = typeUpgrades;
} (kendo));;(function($, kendo) {
	var ui = kendo.ui,
		Widget = ui.Widget,
		typeUpgrades = kendo.forms.types,
    features = kendo.forms.features,
    vanillaInputRegEx = /text|button|submit|reset/i;

	var Form = Widget.extend({
		init: function(element, options) {
			var that = this;
			var inputs = $(element).find('input, button');

			Widget.fn.init.call(this, element, options);

			inputs.each(function(index, el) {
        that.upgradeInputType(that, el);

        if (el.getAttribute('placeholder') &&
            !kendo.forms.features.placeholder) {
          that.upgradePlaceholder(el);
        }
      });
		},
    shouldUpgradeType: function(type) {
      var that = this;
      return (that.options.alwaysUseWidgets ||
             !features[type]) &&
             type in typeUpgrades &&
             !vanillaInputRegEx.test(type);
    },
    upgradeInputType: function(that, el) {
      var type = el.getAttribute('type');

      if (!type && el.nodeName === 'BUTTON') {
        type = 'button';
      }

      if(vanillaInputRegEx.test(type) && that.options.styleInputs) {
        typeUpgrades[type](el);
      }

      if (that.shouldUpgradeType(type)) {
        typeUpgrades[type](el);
      }

    },
    upgradePlaceholder: function(el) {
      el = $(el);
      // Strip CR and LF from attribute vales, as specified in
      // www.w3.org/TR/html5/forms.html#the-placeholder-attribute
      var placeholderText = el.attr('placeholder')
        .replace(/(\\r\\n|\\n|\\r)/gm,'');

      // When the field loses focus, clear out the placeholder if
      // the input contains a value.
      el.on('blur', function() {
        var $el = $(this);
        var labelNode = this.previousSibling;
        if (this.value) {
          labelNode.nodeValue = '';
          $el.addClass('relPlaceholder');
        } else if (labelNode.nodeValue !== placeholderText) {
          labelNode.nodeValue = placeholderText;
          $el.removeClass('relPlaceholder');
        }
      });
      el.wrap('<label class="placeholder">' + placeholderText + '</label>');
      el.addClass('placeholder');
    },
		options: {
			// the name is what it will appear in the kendo namespace (kendo.ui.Form).
			// The jQuery plugin would be jQuery.fn.kendoForm.
			name: 'Form',
			alwaysUseWidgets: false,
			styleInputs: true
		}
	});

	ui.plugin(Form);
} (jQuery, kendo));
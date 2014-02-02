describe('Kendo Forms Widget Test Suite', function() {
  describe('Form initialization tests', function() {
		var fixtures = jasmine.getFixtures(),
			env = 'headless';

		if (document.location.pathname === '/context.html') {
			// Karma is running the test, so change the base
			fixtures.fixturesPath = 'base/spec/javascripts/fixtures';
			env = 'karma';
		} else if (document.location.pathname.indexOf('runner.html') > 0) {
			// We're running jasmine in the browser
			fixtures.fixturesPath = '../spec/javascripts/fixtures';
			env = 'browser';
		}

		describe('Form Widget initialization', function() {
			it('should exist in the kendo.ui namespace', function() {
				expect(kendo.ui.Form).toBeDefined();
			});

			it('should be able to perform imperative initialization with JavaScript',
				function() {
				expect($('#imperative-form').kendoForm).toBeDefined();
			});

			it('should be able to perform declarative initialization with data' +
				' attributes', function() {
				fixtures.load('declarative-form.html');

				kendo.init(document.body);

				expect($('#declarative-form').data('kendoForm')).not.toBe(null);
			});
		});

		describe('Input transformation', function() {
			it('should add the k-input class to all inputs inside of the form',
				function() {
				fixtures.load('input-transformation.html');

				$('#imperative-form').kendoForm();
				expect($('#imperative-form').find('#vanillaInput')
					.hasClass('k-input')).toBe(true);
			});

			it('should add the k-input class to inputs inside of the form' +
				' if the styleInputs option is true', function() {
				fixtures.load('input-transformation.html');

				$('#imperative-form').kendoForm({ styleInputs: true });
				expect($('#imperative-form').find('#vanillaInput')
					.hasClass('k-input')).toBe(true);
			});

			it('should NOT add the k-input class to inputs inside of the' +
				' form if the styleInputs option is false', function() {
				fixtures.load('input-transformation.html');

				$('#imperative-form').kendoForm({ styleInputs: false });
				expect($('#imperative-form').find('#vanillaInput')
					.hasClass('k-input')).toBe(false);
			});

			it('should NOT add the k-input class to button inputs', function() {
				fixtures.load('input-transformation.html');

				$('#imperative-form').kendoForm();
				expect($('#imperative-form').find('#submit')
					.hasClass('k-input')).toBe(false);
				expect($('#imperative-form').find('#button')
					.hasClass('k-input')).toBe(false);
				expect($('#imperative-form').find('#reset')
					.hasClass('k-input')).toBe(false);
				expect($('#imperative-form').find('#button')
					.hasClass('k-input')).toBe(false);
			});

			it('should add the k-button class to button inputs', function() {
				fixtures.load('input-transformation.html');

				$('#imperative-form').kendoForm();
				expect($('#imperative-form').find('#submit')
					.hasClass('k-button')).toBe(true);
				expect($('#imperative-form').find('#button')
					.hasClass('k-button')).toBe(true);
				expect($('#imperative-form').find('#reset')
					.hasClass('k-button')).toBe(true);
				expect($('#imperative-form').find('#buttonEl')
					.hasClass('k-button')).toBe(true);
			});
		});

		describe('Color type support', function() {
			if (!kendo.forms.features.color) {
				it('should create a kendoColorPicker from the color input type',
					function() {
					fixtures.load('color-type.html');

					$('#color-form').kendoForm();
					expect($('#color').data('role')).toEqual('colorpicker');
				});
			} else {
				it('should NOT create a kendoColorPicker if the color type is' +
					' already supported by the browser', function() {
					fixtures.load('color-type.html');

					$('#color-form').kendoForm();
					expect($('#color').data('role')).not.toBeDefined();
				});

				it('should create a colorpicker on ALL browsers if the' +
					' alwaysUseWidgets option is passed-in', function() {
					fixtures.load('color-type.html');

					$('#color-form').kendoForm({ alwaysUseWidgets: true });
					expect($('#color').data('role')).toEqual('colorpicker');
				});
			}
		});

		describe('Number type support', function() {
			if (!kendo.forms.features.number) {
				it('should create a kendoNumericTextBox from the number input' +
					' type', function() {
					fixtures.load('number-type.html');

					$('#number-form').kendoForm();
					expect($('#numeric').data('role')).toEqual('numerictextbox');
				});
			} else {
				it('should NOT create a kendoNumericTextBox if the number type' +
					' is already supported by the browser', function() {
					fixtures.load('number-type.html');

					$('#number-form').kendoForm();
					expect($('#numeric').data('role')).not.toBeDefined();
				});

				it('should create a colorpicker on ALL browsers if the' +
					' alwaysUseWidgets option is passed-in', function() {
					fixtures.load('number-type.html');

					$('#number-form').kendoForm({ alwaysUseWidgets: true });
					expect($('#numeric').data('role')).toEqual('numerictextbox');
				});
			}

			it('should expose number type attributes as values in the' +
				' kendoNumericTextBox widget', function() {
				fixtures.load('number-type.html');

				$('#number-form').kendoForm({ alwaysUseWidgets: true });

				var numericInput = $('#numeric');
				var ntbObject = numericInput.data('kendoNumericTextBox');

				// Test each value we set via attribute and make sure the value was 
				// preserved in the NumericTextBox
				expect(ntbObject.value().toString()).toEqual(numericInput.val());
				expect(ntbObject.min().toString()).toEqual(numericInput.attr('min'));
				expect(ntbObject.max().toString()).toEqual(numericInput.attr('max'));
				expect(ntbObject.step().toString()).toEqual(numericInput.attr('step'));
			});
		});

		describe('Range type support', function() {
			if (!kendo.forms.features.range) {
				it('should create a kendoSlider from the range input type', function() {
					fixtures.load('range-type.html');

					$('#range-form').kendoForm();
					expect($('#slider').data('role')).toEqual('slider');
				});
			} else {
				it('should NOT create a kendoSlider if the range type is already' +
					' supported by the browser', function() {
					fixtures.load('range-type.html');

					$('#range-form').kendoForm();
					expect($('#slider').data('role')).not.toBeDefined();
				});

				it('should create a slider on ALL browsers if the alwaysUseWidgets' +
					' option is passed-in', function() {
					fixtures.load('range-type.html');

					$('#range-form').kendoForm({ alwaysUseWidgets: true });
					expect($('#slider').data('role')).toEqual('slider');
				});
			}

			it('should expose range type attributes as values in the kendoSlider' +
				' widget', function() {
				fixtures.load('range-type.html');

				$('#range-form').kendoForm({ alwaysUseWidgets: true });

				var rangeInput = $('#slider');
				var sliderObject = rangeInput.data('kendoSlider');

				// Test each value we set via attribute and make sure the value was 
				// preserved in the Slider. Only value is public, 
				// though the others can be tested via some trickery.
				var vals = sliderObject._values;
				expect(sliderObject.value().toString()).toEqual(rangeInput.val());
				expect(vals[0].toString()).toEqual(rangeInput.attr('min'));
				expect(vals[vals.length-1].toString()).toEqual(rangeInput.attr('max'));
				expect((vals[1] - vals[0]).toString()).toEqual(rangeInput.attr('step'));
			});
		});

		describe('File type support', function() {
			if (!kendo.forms.features.file) {
				it('should create a kendoUpload from the file input type', function() {
					fixtures.load('file-type.html');

					$('#file-form').kendoForm();
					expect($('input[type=file]').data('role')).toEqual('upload');
				});
			} else {
				it('should NOT create a kendoUpload if the file type is already' +
					' supported by the browser', function() {
					fixtures.load('file-type.html');

					$('#file-form').kendoForm();
					expect($('#photos').data('role')).not.toBeDefined();
				});

				it('should create a slider on ALL browsers if the alwaysUseWidgets' +
					' option is passed-in', function() {
					fixtures.load('file-type.html');

					$('#file-form').kendoForm({ alwaysUseWidgets: true });
					expect($('#photos').data('role')).toEqual('upload');
				});
			}

			it('should preserve the accept attribute on the upload widget',
				function() {
				fixtures.load('file-type.html');

				$('#file-form').kendoForm({ alwaysUseWidgets: true });

				expect($('#photos').attr('accept')).toEqual('.doc,.docx,.xml');
			});
		});

		describe('DateTime and datetime-local type Support', function() {
			if (!kendo.forms.features.datetime) {
				it('should create a kendoDateTime from the datetime input type',
					function() {
					fixtures.load('datetime-type.html');

					$('#datetime-form').kendoForm();
					expect($('#datetime').data('role')).toEqual('datetimepicker');
				});

				// DateTime Tests appear to be quirky when running under 
				// grunt-contrib-jasmine They run run fine in the browser
				// and via Karma, so don't exclude from those environments.
				if (env !== 'headless') {
					it('should apply the datetime attributes (val, min, max, step)' +
						' to the widget', function() {
						fixtures.load('datetime-type.html');

						$('#datetime-form').kendoForm();

						var datetimeInput = $('#datetime');
						var datetimeObject = datetimeInput.data('kendoDateTimePicker');

						var dateRegex = /\/|-| /g;
						var valParts = datetimeInput.val().split(dateRegex);
						var minParts = datetimeInput.attr('min').split(dateRegex);
						var maxParts = datetimeInput.attr('max').split(dateRegex);

						expect(datetimeObject.value()).not.toBeNull();
						expect(datetimeObject.value().getMonth()+1).toEqual(
							parseInt(valParts[0], 10));
						expect(datetimeObject.value().getDate()).toEqual(
							parseInt(valParts[1], 10));
						expect(datetimeObject.value().getFullYear()).toEqual(
							parseInt(valParts[2], 10));

						expect(datetimeObject.min().getMonth()+1).toEqual(
							parseInt(minParts[1], 10));
						expect(datetimeObject.min().getDate()).toEqual(
							parseInt(minParts[2], 10));
						expect(datetimeObject.min().getFullYear()).toEqual(
							parseInt(minParts[0], 10));

						expect(datetimeObject.max().getMonth()+1).toEqual(
							parseInt(maxParts[1], 10));
						expect(datetimeObject.max().getDate()).toEqual(
							parseInt(maxParts[2], 10));
						expect(datetimeObject.max().getFullYear()).toEqual(
							parseInt(maxParts[0], 10));

						expect(datetimeObject.options.interval).toEqual(
							Math.round(parseInt(datetimeInput.attr('step'), 10)/60));
					});

					it('should apply default values when attrs are null', function() {
						fixtures.load('datetime-type.html');

						$('#datetime-form').kendoForm();

						var datetimeInput = $('#datetimeWithNoAttrs');
						var datetimeObject = datetimeInput.data('kendoDateTimePicker');

						expect(datetimeObject.value()).toBeNull();
						expect(datetimeObject.min() instanceof Date).toBe(true);
						expect(datetimeObject.max() instanceof Date).toBe(true);
						expect(datetimeObject.options.interval).toEqual(30);
					});
				}
			} else {
				it('should NOT create a kendoUpload if the file type is already' +
						' supported by the browser', function() {
					fixtures.load('datetime-type.html');

					$('#datetime-form').kendoForm();
					expect($('#datetime').data('role')).not.toBeDefined();
				});

				it('should create a datetimepicker on ALL browsers if the' +
					' alwaysUseWidgets option is passed-in', function() {
					fixtures.load('datetime-type.html');

					$('#datetime-form').kendoForm({ alwaysUseWidgets: true });
					expect($('#datetime').data('role')).toEqual('datetimepicker');
				});
			}

			if (!kendo.forms.features['datetime-local']) {
				it('should create a kendoDateTime from the datetime-local input' +
					' type', function() {
					fixtures.load('datetime-type.html');

					$('#datetime-form').kendoForm();
					expect($('#local').data('role')).toEqual('datetimepicker');
				});
			} else {
				it('should NOT create a kendoDateTimePicker from datetime-local' +
					' if the file type is already supported by the browser', function() {
					fixtures.load('datetime-type.html');

					$('#datetime-form').kendoForm();
					expect($('#local').data('role')).not.toBeDefined();
				});
			}

			if (env !== 'headless') {
				// Get/Set values on datetime-local is currently not supported in 
				// Chrome: https://code.google.com/p/chromium/issues/detail?id=162022
				// https://code.google.com/p/chromium/issues/detail?id=164539
				// The library works around this by changing the type of 
				// 'datetime-local' to 'text'
				it('should apply the datetime-local value attrbiute to the widget',
					function() {
					fixtures.load('datetime-type.html');

					$('#datetime-form').kendoForm({ alwaysUseWidgets: true });

					var datetimeInput = $('#local');
					var datetimeObject = datetimeInput.data('kendoDateTimePicker');

					expect(datetimeObject.value()).not.toBeNull();
					expect(datetimeObject.value()).toEqual(new Date(datetimeInput.val()));
				});
			}
		});

		describe('Time type support', function() {
			if(!kendo.forms.features.time) {
				it('should create a kendoTimePicker from the time input type',
					function() {
					fixtures.load('time-type.html');

					$('#time-form').kendoForm();
					expect($('#time').data('role')).toEqual('timepicker');
				});
			} else {
				it('should NOT create a kendoTimePocker if the time type is' +
					' already supported by the browser', function() {
					fixtures.load('time-type.html');

					$('#time-form').kendoForm();
					expect($('#time').data('role')).not.toBeDefined();
				});

				it('should create a timepicker on ALL browsers if the ' +
					' alwaysUseWidgets option is passed-in', function() {
					fixtures.load('time-type.html');

					$('#time-form').kendoForm({ alwaysUseWidgets: true });
					expect($('#time').data('role')).toEqual('timepicker');
				});
			}

			if (env !== 'headless') {
				it('should apply the time attributes (val, min, max, step) to' +
					' the widget', function() {
					fixtures.load('time-type.html');
					var dummyDate = '2013-10-04T';

					$('#time-form').kendoForm({ alwaysUseWidgets: true });

					var timeInput = $('#time');
					var timeObject = timeInput.data('kendoTimePicker');
					var timeParts = timeInput.val().replace(/AM|PM/g, '').trim()
						.split(':');
          expect(timeObject.value()).not.toBeNull();
					expect(timeObject.value().getHours().toString())
						.toMatch(new RegExp(timeParts[0] + '|' + (+timeParts[0]+12), 'g'));
					expect(timeObject.value().getMinutes().toString())
						.toEqual(timeParts[1]);
					expect(timeObject.min().toString()).toEqual(
						createDateFromInput(timeInput.attr('min'),
              null, dummyDate).toString());
					expect(timeObject.max().toString()).toEqual(
            createDateFromInput(timeInput.attr('max'),
              null, dummyDate).toString());
					expect(timeObject.options.interval).toEqual(
						Math.round(parseInt(timeInput.attr('step'), 10)/60));
				});
			}
		});

		describe('Month type support', function() {
			if(!kendo.forms.features.month) {
				it('should create a kendoDatePicker from the month input type',
					function() {
					fixtures.load('month-type.html');

					$('#month-form').kendoForm();
					expect($('#month').data('role')).toEqual('datepicker');
				});
			} else {
				it('should NOT create a kendoDatePicker if the time type is' +
					' already supported by the browser', function() {
					fixtures.load('month-type.html');

					$('#month-form').kendoForm();
					expect($('#month').data('role')).not.toBeDefined();
				});

				it('should create a kendoDatePicker on ALL browsers if the' +
					' alwaysUseWidgets option is passed-in', function() {
					fixtures.load('month-type.html');

					$('#month-form').kendoForm({ alwaysUseWidgets: true });
					expect($('#month').data('role')).toEqual('datepicker');
				});
			}

			if (env !== 'headless') {
				it('should apply the month attributes (val, min, max, step)' +
					' to the widget', function() {
					fixtures.load('month-type.html');
					$('#month-form').kendoForm({ alwaysUseWidgets: true });

					var dateInput = $('#month');
					var dateObject = dateInput.data('kendoDatePicker');
					var dateRegex = /\/|-| /g;
					var valParts = dateInput.val().split(dateRegex);
					var minParts = dateInput.attr('min').split(dateRegex);
					var maxParts = dateInput.attr('max').split(dateRegex);

					expect(dateObject.value()).not.toBeNull();
					expect(dateObject.value().getMonth()+1).toEqual(
						parseInt(valParts[0], 10));
					expect(dateObject.min().getMonth()+1).toEqual(
						parseInt(minParts[1], 10));
					expect(dateObject.max().getMonth()+1).toEqual(
						parseInt(maxParts[1], 10));
				});
			}
		});

		describe('Week type support', function() {
			if(!kendo.forms.features.week) {
				it('should create a kendoDatePicker from the week input type',
					function() {
					fixtures.load('week-type.html');

					$('#week-form').kendoForm();
					expect($('#week').data('role')).toEqual('datepicker');
				});
			} else {
				it('should NOT create a kendoDatePicker if the time type is' +
					' already supported by the browser', function() {
					fixtures.load('week-type.html');

					$('#week-form').kendoForm();
					expect($('#week').data('role')).not.toBeDefined();
				});

				it('should create a kendoDatePicker on ALL browsers if' +
					' the alwaysUseWidgets option is passed-in', function() {
					fixtures.load('week-type.html');

					$('#week-form').kendoForm({ alwaysUseWidgets: true });
					expect($('#week').data('role')).toEqual('datepicker');
				});
			}

			if (env !== 'headless') {
				it('should apply the week attributes (val, min, max, step)' +
					' to the widget', function() {
					fixtures.load('week-type.html');
					$('#week-form').kendoForm({ alwaysUseWidgets: true });

					var dateInput = $('#week');
					var dateObject = dateInput.data('kendoDatePicker');
					var dateRegex = /\/|-| /g;
					var valParts = dateInput.val().split(dateRegex);
					var minParts = dateInput.attr('min').split(dateRegex);
					var maxParts = dateInput.attr('max').split(dateRegex);

					expect(dateObject.value()).not.toBeNull();
					expect(dateObject.value().getFullYear()).toEqual(
						parseInt(valParts[2], 10));
					expect(dateObject.min().getFullYear()).toEqual(
						parseInt(minParts[0], 10));
					expect(dateObject.max().getFullYear()).toEqual(
						parseInt(maxParts[0], 10));
				});
			}
		});

		describe('Date type support', function() {
			if(!kendo.forms.features.date) {
				it('should create a kendoDatePicker from the date input type',
					function() {
					fixtures.load('date-type.html');

					$('#date-form').kendoForm();
					expect($('#date').data('role')).toEqual('datepicker');
				});
			} else {
				it('should NOT create a kendoDatePicker if the time type is' +
					' already supported by the browser', function() {
					fixtures.load('date-type.html');

					$('#date-form').kendoForm();
					expect($('#date').data('role')).not.toBeDefined();
				});

				it('should create a kendoDatePicker on ALL browsers if the' +
					' alwaysUseWidgets option is passed-in', function() {
					fixtures.load('date-type.html');

					$('#date-form').kendoForm({ alwaysUseWidgets: true });
					expect($('#date').data('role')).toEqual('datepicker');
				});
			}

			if (env !== 'headless') {
				it('should apply the date attributes (val, min, max, step) to' +
					' the widget', function() {
					fixtures.load('date-type.html');
					$('#date-form').kendoForm({ alwaysUseWidgets: true });

					var dateInput = $('#date');
					var dateObject = dateInput.data('kendoDatePicker');
					var dateRegex = /\/|-| /g;
					var valParts = dateInput.val().split(dateRegex);
					var minParts = dateInput.attr('min').split(dateRegex);
					var maxParts = dateInput.attr('max').split(dateRegex);

					expect(dateObject.value()).not.toBeNull();
					expect(dateObject.value().getMonth()+1).toEqual(
						parseInt(valParts[0], 10));
					expect(dateObject.min().getMonth()+1).toEqual(
						parseInt(minParts[1], 10));
					expect(dateObject.max().getMonth()+1).toEqual(
						parseInt(maxParts[1], 10));
				});
			}
		});

    describe('Button support', function() {
      it('should create kendoButtons from buttons and submit/reset inputs',
        function() {
        fixtures.load('button.html');
        $('#button-form').kendoForm();

        $('button,input[type=submit],input[type=reset]')
          .each(function(index, element) {
          expect($(element).hasClass('k-button')).toBe(true);
          expect($(element).data('role')).toBe('button');
        });
      });
    });

    describe('Progress element support', function() {
      it('should provide a feature text for progress support', function() {
        expect(kendo.forms.features.progress).toBeDefined();
      });

      if(!kendo.forms.features.progress) {
        it('should create a kendoProgressBar from the progress type',
          function() {
            fixtures.load('progress.html');

            $('#progress-form').kendoForm();
            expect($('#completionPct').data('role')).toEqual('progressbar');
          });
      } else {
        it('should NOT create a kendoProgressBar if progress is' +
          ' already supported by the browser', function() {
          fixtures.load('progress.html');

          $('#progress-form').kendoForm();
          expect($('#completionPct').data('role')).not.toBeDefined();
        });

        it('should create a kendoProgressBar on ALL browsers if the' +
          ' alwaysUseWidgets option is passed-in', function() {
          fixtures.load('progress.html');

          $('#progress-form').kendoForm({ alwaysUseWidgets: true });
          expect($('#completionPct').data('role')).toEqual('progressbar');
        });
      }
    });

		describe('Placeholder support', function() {
			it('should provide a feature test for placeholder support', function() {
				expect(kendo.forms.features.placeholder).toBeDefined();
			});

			if(!kendo.forms.features.placeholder) {
				it('should add a placeholder class to elements with the' +
					' placeholder attribute', function() {
					fixtures.load('placeholder.html');
					$('#placeholder-form').kendoForm();

					var placeholder = $('#placeholder');
					expect(placeholder.hasClass('placeholder')).toBe(true);
				});

				it('should add a label element to serve as the pseudo placeholder',
					function() {
					fixtures.load('placeholder.html');
					$('#placeholder-form').kendoForm();

					var placeholder = $('label.placeholder');
					expect(placeholder.length >= 1).toBe(true);
				});

				it('should hide the label when input text is entered', function() {
					fixtures.load('placeholder.html');
					$('#placeholder-form').kendoForm();

					var placeholder = $('label.placeholder');
					var input = $('#placeholder');

					input.val('foo');
					input.blur();
					expect(input[0].previousSibling.nodeValue).toEqual('');
				});

        it('should remove CR and LF chars from the placeholder value',
        function() {
          fixtures.load('placeholder.html');
          $('#placeholder-form').kendoForm();

          var placeholder = $('label.placeholder');
          var input = $('#break-placeholder');

          expect(input[0].previousSibling.nodeValue).toEqual('Text me!');
        });
      }
		});

		describe('Mobile support', function() {
			it('should use native inputs on mobile if the input is supported, ' +
				'alwaysUseWidgets is true and the mobile is true', function() {

					fixtures.load('mobile.html');

					// force kendo into a mobile state
					kendo.support.mobileOS = true;

					$('#mobile-form').kendoForm({
						alwaysUseWidgets: true,
						mobile: true
					});

					// undo the forced mobile state for later tests
					kendo.support.mobileOS = false;

					expect($('#mobile-date').data('role')).not.toBeDefined();
				});

      it('should use widgets on desktop if the input is supported, ' +
        'alwaysUseWidgets is true and mobile is true', function() {

        fixtures.load('mobile.html');

        $('#mobile-form').kendoForm({
          alwaysUseWidgets: true,
          mobile: true
        });

        expect($('#mobile-date').data('role')).toEqual('datepicker');

      });
		});

    function createDateFromInput(val, defaultDate, prefix) {
      if (!val) {
        return defaultDate;
      }

      if (prefix) {
        val = prefix + val;
      }

      if (!Date.parse(val)) {
        // Valid ISO Dates may not parse on some browsers (IE7,8)
        var altDate = new Date(val.replace(/-/g, '/'));

        if (altDate) {
          // If this alternate value is valid, add a day
          // to account for UA parsing
          return new Date(altDate.setDate(altDate.getDate() + 1));
        }

        return defaultDate;
      }

      return new Date(val);
    }

		fixtures.cleanUp();
		fixtures.clearCache();
	});
});
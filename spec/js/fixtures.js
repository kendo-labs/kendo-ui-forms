describe('Kendo Forms Widget Test Suite', function() {
  describe('Form initialization tests', function() {
		var fixtures = jasmine.getFixtures(),
			env = 'headless';

		if (document.location.pathname === "/context.html") {
			// Karma is running the test, so change the base
			fixtures.fixturesPath = 'base/spec/javascripts/fixtures';
			env = 'karma';
		} else if (document.location.pathname.indexOf("runner.html") > 0) {
			// We're running jasmine in the browser
			fixtures.fixturesPath = '../spec/javascripts/fixtures';
			env = 'browser';
		}
				
		describe('Form Widget initialization', function() {
			it('should exist in the kendo.ui namespace', function() {
				expect(kendo.ui.Form).toBeDefined();
			});

			it('should be able to perform imperative initialization with JavaScript', function() {
				expect($('#imperative-form').kendoForm).toBeDefined();
			});

			it('should be able to perform declarative initialization with data attributes', function() {
				fixtures.load('form-init.html');
			
				kendo.init(document.body);

				expect(typeof $('#declarative-form').data('kendoForm')).toEqual("object");
			});
		});
		
		describe('Input transformation', function() {
			it('should add the k-input class to all inputs inside of the form', function() {
				fixtures.load('form-init.html');
			
				$('#imperative-form').kendoForm();
				expect($('#imperative-form').find('#vanillaInput').hasClass('k-input')).toBe(true);
			});

			it('should add the k-input class to inputs inside of the form if the styleInputs option is true', function() {
				fixtures.load('form-init.html');
			
				$('#imperative-form').kendoForm({ styleInputs: true });
				expect($('#imperative-form').find('#vanillaInput').hasClass('k-input')).toBe(true);
			});

			it('should NOT add the k-input class to inputs inside of the form if the styleInputs option is false', function() {
				fixtures.load('form-init.html');
			
				$('#imperative-form').kendoForm({ styleInputs: false });
				expect($('#imperative-form').find('#vanillaInput').hasClass('k-input')).toBe(false);
			});
		});

		describe('Color type support', function() {
			if (!kendo.forms.features.color) {
				it('should create a kendoColorPicker from the color input type', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm();
					expect($('#color').data('role')).toEqual('colorpicker');
				});
			} else {
				it('should NOT create a kendoColorPicker if the color type is already supported by the browser', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm();
					expect($('#color').data('role')).not.toBeDefined();
				});

				it('should create a colorpicker on ALL browsers if the alwaysUseWidgets option is passed-in', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm({ alwaysUseWidgets: true });
					expect($('#color').data('role')).toEqual("colorpicker");
				});
			}			
		});

		describe('Number type support', function() {
			if (!kendo.forms.features.number) {
				it('should create a kendoNumericTextBox from the number input type', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm();
					expect($('#numeric').data('role')).toEqual('numerictextbox');
				});
			} else {
				it('should NOT create a kendoNumericTextBox if the number type is already supported by the browser', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm();
					expect($('#numeric').data('role')).not.toBeDefined();
				});

				it('should create a colorpicker on ALL browsers if the alwaysUseWidgets option is passed-in', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm({ alwaysUseWidgets: true });
					expect($('#numeric').data('role')).toEqual('numerictextbox');
				});
			}

			it('should expose number type attributes as values in the kendoNumericTextBox widget', function() {
				fixtures.load('form-init.html');

				$('#imperative-form').kendoForm({ alwaysUseWidgets: true });

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
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm();
					expect($('#slider').data('role')).toEqual('slider');
				});
			} else {
				it('should NOT create a kendoSlider if the range type is already supported by the browser', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm();
					expect($('#slider').data('role')).not.toBeDefined();
				});

				it('should create a slider on ALL browsers if the alwaysUseWidgets option is passed-in', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm({ alwaysUseWidgets: true });
					expect($('#slider').data('role')).toEqual('slider');
				});
			}
			
			it('should expose range type attributes as values in the kendoSlider widget', function() {
				fixtures.load('form-init.html');

				$('#imperative-form').kendoForm({ alwaysUseWidgets: true });

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
			if (!kendo.forms.features.range) {
				// TODO: Resolve File Picker issue in Firefox
				it('should create a kendoUpload from the file input type', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm();
					expect($('input[type=file]').data('role')).toEqual('upload');
				});
			} else {
				it('should NOT create a kendoUpload if the file type is already supported by the browser', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm();
					expect($('#photos').data('role')).not.toBeDefined();
				});

				it('should create a slider on ALL browsers if the alwaysUseWidgets option is passed-in', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm({ alwaysUseWidgets: true });
					expect($('#photos').data('role')).toEqual('upload');
				});
			}

			it('should preserve the accept attribute on the upload widget', function() {
				fixtures.load('form-init.html');

				$('#imperative-form').kendoForm({ alwaysUseWidgets: true });

				expect($('#photos').attr('accept')).toEqual('.doc,.docx,.xml');
			});
		});

		describe('DateTime and datetime-local type Support', function() {
			if (!kendo.forms.features.datetime) {
				it('should create a kendoDateTime from the datetime input type', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm();
					expect($('#datetime').data('role')).toEqual('datetimepicker');
				});

				// DateTime Tests appear to be quirky when running under grunt-contrib-jasmine
				// They run run fine in the browser and via Karma, so don't exclude from those
				// environments.
				if (env !== 'headless') {
					it('should apply the datetime attributes (val, min, max, step) to the widget', function() {
						fixtures.load('form-init.html');

						$('#imperative-form').kendoForm();

						var datetimeInput = $('#datetime');
						var datetimeObject = datetimeInput.data('kendoDateTimePicker');

						expect(datetimeObject.value()).not.toBeNull();
						expect(datetimeObject.value()).toEqual(new Date(datetimeInput.val()));
						expect(datetimeObject.min()).toEqual(new Date(datetimeInput.attr('min')));
						expect(datetimeObject.max()).toEqual(new Date(datetimeInput.attr('max')));
						expect(datetimeObject.options.interval).toEqual(Math.round(parseInt(datetimeInput.attr('step'), 10)/60));
					});

					it('should apply default values when attribures are null', function() {
						fixtures.load('form-init.html');

						$('#imperative-form').kendoForm();

						var datetimeInput = $('#datetimeWithNoAttrs');
						var datetimeObject = datetimeInput.data('kendoDateTimePicker');

						expect(datetimeObject.value()).toBeNull();
						expect(datetimeObject.min() instanceof Date).toBe(true);
						expect(datetimeObject.max() instanceof Date).toBe(true);
						expect(datetimeObject.options.interval).toEqual(30);
					});
				}
			} else {
				it('should NOT create a kendoUpload if the file type is already supported by the browser', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm();
					expect($('#datetime').data('role')).not.toBeDefined();
				});

				it('should create a datetimepicker on ALL browsers if the alwaysUseWidgets option is passed-in', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm({ alwaysUseWidgets: true });
					expect($('#datetime').data('role')).toEqual('datetimepicker');
				});
			}			

			if (!kendo.forms.features.datetime_local) {
				it('should create a kendoDateTime from the datetime-local input type', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm();
					expect($('#datetime-local').data('role')).toEqual('datetimepicker');
				});
			} else {
				it('should NOT create a kendoDateTimePicker from datetime-local if the file type is already supported by the browser', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm();
					expect($('#local').data('role')).not.toBeDefined();
				});
			}

			// Get/Set values on datetime-local is currently not supported in Chrome
			// https://code.google.com/p/chromium/issues/detail?id=162022
			// https://code.google.com/p/chromium/issues/detail?id=164539
			/*it('should apply the datetime-local value attrbiute to the widget', function() {
				fixtures.load('form-init.html');

				$('#imperative-form').kendoForm({ alwaysUseWidgets: true });

				var datetimeInput = $('#datetime-local');
				var datetimeObject = datetimeInput.data('kendoDateTimePicker');

				expect(datetimeObject.value()).not.toBeNull();
				expect(datetimeObject.value()).toEqual(new Date(datetimeInput.val()));
			});*/
		});
		
		fixtures.cleanUp();
		fixtures.clearCache();
	});
});
(function($, kendo) {
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

      var inputSupported = features[type];

      // don't upgrade mobile inputs if they are supported
      // and the user has requested they always be used
      if (that.options.mobile && kendo.support.mobileOS && inputSupported) {
        return false;
      }
      
      return (that.options.alwaysUseWidgets ||
             !inputSupported) &&
             type in typeUpgrades && !vanillaInputRegEx.test(type);
             
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
      mobile: false,
			styleInputs: true
		}
	});

	ui.plugin(Form);
} (jQuery, kendo));
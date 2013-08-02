(function (kendo) {
	kendo.forms = kendo.forms || {};

	function detectFormTypeSupport(type) {
		var i = document.createElement('input');
		i.setAttribute('type', type);
		return i.type !== 'text';
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
		datetime_local: detectFormTypeSupport('datetime-local'),
		time: detectFormTypeSupport('time'),
		month: detectFormTypeSupport('month'),
		week: detectFormTypeSupport('week'),
		date: detectFormTypeSupport('date'),
		placeholder: function() {
			return 'placeholder' in document.createElement('input') &&
				'placeholder' in document.createElement('textarea');
		}
	};

	kendo.forms.features = featureDetects;
} (kendo));
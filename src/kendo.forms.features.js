(function (kendo) {
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
		week: detectFormTypeSupport("week"),
		date: detectFormTypeSupport("date")
	};

	kendo.forms.features = featureDetects;
} (kendo));
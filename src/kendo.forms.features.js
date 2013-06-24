(function (kendo) {
	kendo.forms = kendo.forms || {};

	function detectFormTypeSupport(type) {
		var i = document.createElement("input");
		i.setAttribute("type", "color");
		return i.type !== "text";
	}

	var featureDetects = {
		color: detectFormTypeSupport("color"),
		number: detectFormTypeSupport("number"),
		range: detectFormTypeSupport("range")
	};

	kendo.forms.features = featureDetects;
} (kendo));
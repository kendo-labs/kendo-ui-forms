(function($, kendo) {
	kendo.forms = kendo.forms || {};

	function detectFormTypeSupport(type) {
		var i = document.createElement("input");
		i.setAttribute("type", "color");
		return i.type !== "text";
	}

	var featureDetects = {
		color: detectFormTypeSupport("color")
	};

	kendo.forms.features = featureDetects;
} (jQuery, kendo));
(function($, kendo) {
	$("#activatePolyfill").on("click", function() {
    $("#sampleForm").kendoForm();
  });
  
  $("#useWidgets").on("click", function() {
    $("#sampleForm").kendoForm({ alwaysUseWidgets: true });
  });
}(jQuery, kendo));
kendo-ui-forms
==============

Full-Featured HTML5 Forms Polyfill that leverages Kendo UI Widgets and Framework Validation

## Purpose & Scope

The purpose of this project is to serve as a complete polyfill for [HTML5 forms](http://www.w3.org/TR/2011/WD-html5-20110525/forms.html) functionality, including new input types (color, datetime, etc.), attributes (placeholder) and validation. This project includes built-in feature detection and, by-default, will only polyfill those forms features *not* present in the user's browser. Alternatively, users can configure the polyfill to *always* use Kendo UI widgets and features like validation, even in cases where the browser supports these.

To use this polyfill, the developer need only add `kendo.forms.js` to his or her project and then call the following:

	$('form').kendoForm();

The polyfill will then scan the form at runtime and will "upgrade" each UI element to use a Kendo UI widget equivalent. Attribute support and validation will also be added, when used in the form's markup.

## Features

1. Ability to initialize a `kendoForm` custom widget from a Form in the DOM
2. Ability to interrogate types on a form and upgrade visual elements (Date, Color, etc.)
3. Ability to give all inputs a kendo look and feel ('k-input')
4. Ability to upgrade visual form types only when not present in the current browser.
5. Ability to add Kendo UI Validation to a form
6. Ability to support forms attributes (placeholder, to be specific)
7. Ability to swap-in the Kendo UI File Upload control
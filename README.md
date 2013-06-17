kendo-ui-forms
==============

Full-Featured HTML5 Forms Polyfill that leverages Kendo UI Widgets and Framework Validation

## Purpose & Goals

The purpose of this project is to serve as a complete polyfill for [HTML5 Forms](http://www.w3.org/TR/2011/WD-html5-20110525/forms.html) functionality, including support for new input types--like color and datetime--new attributes--like placeholder and pattern--and validation. This project includes built-in feature detection and, by-default, will only polyfill those forms features not present in the user's browser. To polyfill forms features, Kendo UI widgets and framework features will be used.

If developers prefer not to use the default behavior, they will be able to configure the polyfill to always use Kendo UI widgets and features, even in cases where the browser natively supports these.

This library will function as an opt-in polyfill, meaning that the developer will need to initialize a form using Kendo UI's imperative, plugin syntax (eg. `$('form').kendoForm();`) or with declarative syntax on an HTML form element (eg. `<form data-role="form">`). 

**Goals**

- **Provide a complete HTML5 Forms solution that leverages Kendo UI for visual widgets and features like validation**.
- **Enable developers to mark up forms using HTML5 Forms semantics and automatically gain support for these in non-supporting browsers**. Anecdotally, in a future world where all browser fully support the forms spec, a developer should be able to remove the script reference for this library and the single attribute or line of code that initializes it and have a non-broken, fully-functional experience.
- **Ensure that performance is a feature**. This library should tax the developer and end user as little as possible, making the benefit of use far higher than the cost of development, maintenance or performance.

**Non-Goals**

- This library will not support configurable or drop-in replacement for another UI/Widget library.
- This library will not diverge from the [HTML5 Forms spec](http://www.w3.org/TR/2011/WD-html5-20110525/forms.html) in order to add convenience features or non-standard behaviors.

## Intended Use

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

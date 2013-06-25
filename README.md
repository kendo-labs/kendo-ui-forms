kendo-ui-forms
==============

Full-Featured HTML5 Forms Polyfill that leverages Kendo UI Widgets and Framework Validation

[![Build Status](https://travis-ci.org/kendo-labs/kendo-ui-forms.png)](https://travis-ci.org/kendo-labs/kendo-ui-forms)

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

## Downloading and Installing

Once you clone the repo, run

	npm install

to grab all of the essential dependencies for dev, build and test. The repo uses grunt for all of these, so run

	grunt

to make sure everyhing is working. If you see text indicating that the jshint, concat and uglify tasks have run without errors, you're golden!

## Running the Tests

Tests are written in [jasmine](http://pivotal.github.io/jasmine/) and can be found in the spec/ directory. The Kendo UI Forms Project uses the [Karma](http://karma-runner.github.io/0.8/index.html) test runner to ensure cross-browser coverage of all tests. Browsers tested include:

- Google Chrome
- Google Chrome Canary
- Firefox
- Opera
- Safari [OSX Only]
- IE [Windows Only]

If you don't have any of these browsers, Karma will fail. But hey, this is cross-browser polyfill development here, so just install them all!

To run Karma, you can call

	grunt test

and Karma will take care of launching each browser, running the specs and shutting them down again (except for Safari, for some reason, so that's awesome).

If you want to run the jasmine tests in your browser, as opposed to running the multi-browser tests every time, you can spin up a local webserver and navigate to spec/runner.html, or navigate directly via the filesystem

	file://localhost/Users/brandon/Dropbox/Development/kendo-ui-forms/spec/runner.html

NOTE: If you're using Chrome and taking the latter approach, some of the tests will fail because of cross-domain features in Chrome. To work around this, run Chrome with the `--allow-file-access-from-files` terminal command. 

For OSX:

	open -a /Applications/Google\ Chrome.app --args --allow-file-access-from-files

And Windows:

	C:\Users\[UserName]\AppData\Local\Google\Chrome[ SxS]\Application\chrome.exe --allow-file-access-from-files
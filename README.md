gulp-nittro
===========

Nittro builder plugin for Gulp

### Installation

```
npm install --save-dev gulp-nittro
```

### Usage

#### Shared builder

This has the benefit of only building the internal dependency tree once,
but it's not that big of a deal anyway..

```js
var gulp = require('gulp'),
    nittro = require('gulp-nittro');
    
var builder = new nittro.Builder({
    // (options)
});

gulp.task('js', function() {
    return nittro('js', builder)
        .pipe(/* ... */);
});

gulp.task('css', function() {
    return nittro('css', builder)
        .pipe(/* ... */);
});

```

#### Separate builder

Alternatively, you can pass the options object directly to the
plugin; the options object will then internally be converted to a
Builder instance anyway, so this may just be a nicer way of writing
things when your options between tasks vary wildly.

```js
var gulp = require('gulp'),
    nittro = require('gulp-nittro');
    
gulp.task('js', function() {
    return nittro('js', { /* (options) */ })
        .pipe(/* ... */);
});

gulp.task('css', function() {
    return nittro('css', { /* (options) */ })
        .pipe(/* ... */);
});

```

#### Options

```js
var options = {
    vendor: {
        js: [
            // libraries from other vendors, such as jQuery...
        ],
        css: [
            // ... or Twitter Bootstrap etc.
        ]
    },
    
    // Nittro components to include. Note that dependencies are
    // added automatically, so if you ask for e.g. the "page"
    // component, the "core" and "ajax" packages will be added
    // automatically.
    base: {
        core: true,
        datetime: true,
        neon: true,
        di: true,
        ajax: true,
        forms: true, // note that including the forms component
            // will automatically include the netteForms.js asset
        page: true,
        flashes: true,
        routing: true
    },
    extras: {
        checklist: true,
        dialogs: true,
        confirm: true,
        dropzone: true,
        paginator: true,
        keymap: true,
        storage: true
    },
    
    // other libraries to include after Nittro, e.g. your site's
    // proprietary libraries and styles
    libraries: {
        js: [
        
        ],
        css: [
        
        ]
    },
    bootstrap: true, // true or object = generated bootstrap, otherwise
                    // provide a path to your custom bootstrap script
    stack: true // include the _stack library
}
```

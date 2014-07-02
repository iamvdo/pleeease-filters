Pleeease: filters
=================

Convert CSS shorthand filters to SVG ones.

Use by [Pleeease](https://github.com/iamvdo/pleeease), a CSS post-processor.

##Example

You write `foo.css`:

```css
.blur {
	filter: blur(4px);
}
```

You get `bar.css`:

```css
.blur {
	filter: url('data:image/svg+xml;utf8,&lt;svg xmlns="http://www.w3.org/2000/svg">&lt;filter id="filter">&lt;feGaussianBlur stdDeviation="4" />&lt;/filter>&lt;/svg>#filter');
	filter: blur(4px);
}
```

##Usage

	$ npm install pleeease-filters

```javascript
var filters = require('pleeease-filters'),
	fs      = require('fs');

var css = fs.readFileSync('app.css', 'utf8');

// define options here
var options = {};

var fixed = filters.process(css, options);

fs.writeFile('app.min.css', fixed, function (err) {
  if (err) {
    throw err;
  }
  console.log('File saved!');
});
```
##Options

You can also add IE filters with an option:

```javascript
// set options
var options = {
	oldIE: true
}
```

Using the first example, you'll get:

```css
.ie {
	filter: url('data:image/svg+xml;utf8,&lt;svg xmlns="http://www.w3.org/2000/svg">&lt;filter id="filter">&lt;feGaussianBlur stdDeviation="4" />&lt;/filter>&lt;/svg>#filter');
	filter: blur(4px);
	filter: progid:DXImageTransform.Microsoft.Blur(pixelradius=4);
}
```

##Note

**Be careful**, not all browsers support CSS or SVG filters. For your information, latest WebKit browsers support CSS shorthand, Firefox support SVG filters and IE9- support IE filters (limited and slightly degraded). **It means that IE10+, Opera Mini and Android browsers have no support at all.** Moreover, IE filters shouldn't be used.

##Licence

MIT © 2014 [Vincent De Oliveira - iamvdo](https://github.com/iamvdo)

pleeease-filters is an adaptation of [CSS-Filters-Polyfill](https://github.com/Schepp/CSS-Filters-Polyfill)
Copyright (c) 2012 - 2013 Christian Schepp Schaefer
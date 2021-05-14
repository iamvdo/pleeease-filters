/* eslint-disable prefer-destructuring */
const oneColor = require('onecolor');

// SVG
function createSVG(filterElements) {
  const xmlns = 'http://www.w3.org/2000/svg';
  let svg = `<svg xmlns="${xmlns}">`;

  svg += '<filter id="filter">';
  svg += filterElements.join('');
  svg += '</filter>';
  svg += '</svg>';

  return svg;
}

function createSVGElement(tagname, attributes, subElements) {
  let elem = `<${tagname}`;
  Object.entries(attributes).forEach((attribute) => {
    elem += ` ${attribute[0]}="${attribute[1]}"`;
  });
  if (subElements !== undefined) {
    elem += '>';
    elem += subElements.join('');
    elem += `</${tagname}>`;
  } else {
    elem += ' />';
  }
  return elem;
}

const helpers = {
  length(amount, unit) {
    switch (unit) {
      case 'em':
      case 'rem':
        return amount * 16;
      case 'px':
      default:
        return amount;
    }
  },
  angle(amount, unit) {
    switch (unit) {
      case 'grad':
        return (180 * amount) / 200;
      case 'rad':
        return (180 * amount) / Math.PI;
      case 'turn':
        return 360 * amount;
      case 'deg':
      default:
        return amount;
    }
  },
};

// Filter object
const filters = {

  // None
  none() {
    const properties = {};

    // CSS
    properties.filtersCSS = ['none'];

    // SVG
    properties.filtersSVG = ['none'];

    // IE
    // properties.filtersIE = ['none'];

    return properties;
  },

  // Grayscale
  grayscale(inputAmount, unit) {
    let amount = inputAmount || 0;

    if (typeof unit !== 'undefined') {
      amount /= 100;
    }

    const properties = {};

    // CSS
    properties.filtersCSS = [`grayscale(${amount})`];

    // SVG
    const svg = createSVGElement('feColorMatrix', {
      type: 'matrix',
      'color-interpolation-filters': 'sRGB',
      values: `${0.2126 + 0.7874 * (1 - amount)} ${
        0.7152 - 0.7152 * (1 - amount)} ${
        0.0722 - 0.0722 * (1 - amount)} 0 0 ${
        0.2126 - 0.2126 * (1 - amount)} ${
        0.7152 + 0.2848 * (1 - amount)} ${
        0.0722 - 0.0722 * (1 - amount)} 0 0 ${
        0.2126 - 0.2126 * (1 - amount)} ${
        0.7152 - 0.7152 * (1 - amount)} ${
        0.0722 + 0.9278 * (1 - amount)} 0 0 0 0 0 1 0`,
    });
    properties.filtersSVG = [svg];

    // IE
    properties.filtersIE = amount >= 0.5 ? ['gray'] : [];

    return properties;
  },

  // Sepia
  sepia(inputAmount, unit) {
    let amount = inputAmount || 0;

    if (typeof unit !== 'undefined') {
      amount /= 100;
    }

    const properties = {};

    // CSS
    properties.filtersCSS = [`sepia(${amount})`];

    // SVG
    const svg = createSVGElement('feColorMatrix', {
      type: 'matrix',
      'color-interpolation-filters': 'sRGB',
      values: `${0.393 + 0.607 * (1 - amount)} ${
        0.769 - 0.769 * (1 - amount)} ${
        0.189 - 0.189 * (1 - amount)} 0 0 ${
        0.349 - 0.349 * (1 - amount)} ${
        0.686 + 0.314 * (1 - amount)} ${
        0.168 - 0.168 * (1 - amount)} 0 0 ${
        0.272 - 0.272 * (1 - amount)} ${
        0.534 - 0.534 * (1 - amount)} ${
        0.131 + 0.869 * (1 - amount)} 0 0 0 0 0 1 0`,
    });
    properties.filtersSVG = [svg];

    // IE
    properties.filtersIE = amount >= 0.5 ? ['gray', 'progid:DXImageTransform.Microsoft.Light()'] : [];

    return properties;
  },

  // Saturate
  saturate(inputAmount, unit) {
    let amount = inputAmount || 1;

    const properties = {};

    if (typeof unit !== 'undefined') {
      amount /= 100;
    }

    // CSS
    properties.filtersCSS = [`saturate(${amount})`];

    // SVG
    const svg = createSVGElement('feColorMatrix', {
      type: 'matrix',
      'color-interpolation-filters': 'sRGB',
      values: `${0.213 + 0.787 * (amount)} ${
        0.715 - 0.715 * (amount)} ${
        0.072 - 0.072 * (amount)} 0 0 ${
        0.213 - 0.213 * (amount)} ${
        0.715 + 0.295 * (amount)} ${
        0.072 - 0.072 * (amount)} 0 0 ${
        0.213 - 0.213 * (amount)} ${
        0.715 - 0.715 * (amount)} ${
        0.072 + 0.928 * (amount)} 0 0 0 0 0 1 0`,
    });
    properties.filtersSVG = [svg];

    // IE
    // no filter

    return properties;
  },

  // Hue-rotate
  hueRotate(inputAngle, unit) {
    let angle = inputAngle || 0;

    angle = helpers.angle(angle, unit);

    const properties = {};

    // CSS
    properties.filtersCSS = [`hue-rotate(${angle}deg)`];

    // SVG
    const svg = createSVGElement('feColorMatrix', {
      type: 'hueRotate',
      'color-interpolation-filters': 'sRGB',
      values: angle,
    });
    properties.filtersSVG = [svg];

    // IE
    // no filter

    return properties;
  },

  // Invert
  invert(inputAmount, unit) {
    let amount = inputAmount || 0;

    if (typeof unit !== 'undefined') {
      amount /= 100;
    }

    const properties = {};

    // CSS
    properties.filtersCSS = [`invert(${amount})`];

    // SVG
    const svgSub1 = createSVGElement('feFuncR', {
      type: 'table',
      tableValues: `${amount} ${1 - amount}`,
    });
    const svgSub2 = createSVGElement('feFuncG', {
      type: 'table',
      tableValues: `${amount} ${1 - amount}`,
    });
    const svgSub3 = createSVGElement('feFuncB', {
      type: 'table',
      tableValues: `${amount} ${1 - amount}`,
    });
    const svg = createSVGElement('feComponentTransfer', {
      'color-interpolation-filters': 'sRGB',
    }, [svgSub1, svgSub2, svgSub3]);
    properties.filtersSVG = [svg];

    // IE
    properties.filtersIE = amount >= 0.5 ? ['invert'] : [];

    return properties;
  },

  // Opacity
  opacity(inputAmount, unit) {
    let amount = inputAmount || 1;

    if (typeof unit !== 'undefined') {
      amount /= 100;
    }

    const properties = {};

    // CSS
    properties.filtersCSS = [`opacity(${amount})`];

    // SVG
    const svgSub1 = createSVGElement('feFuncA', {
      type: 'table',
      tableValues: `0 ${amount}`,
    });
    const svg = createSVGElement('feComponentTransfer', {
      'color-interpolation-filters': 'sRGB',
    }, [svgSub1]);
    properties.filtersSVG = [svg];

    // IE
    // no filter

    return properties;
  },

  // Brightness
  brightness(inputAmount, unit) {
    let amount = inputAmount || 1;

    if (typeof unit !== 'undefined') {
      amount /= 100;
    }

    const properties = {};

    // CSS
    properties.filtersCSS = [`brightness(${amount})`];

    // SVG
    const svgSub1 = createSVGElement('feFuncR', {
      type: 'linear',
      slope: amount,
    });
    const svgSub2 = createSVGElement('feFuncG', {
      type: 'linear',
      slope: amount,
    });
    const svgSub3 = createSVGElement('feFuncB', {
      type: 'linear',
      slope: amount,
    });
    const svg = createSVGElement('feComponentTransfer', {
      'color-interpolation-filters': 'sRGB',
    }, [svgSub1, svgSub2, svgSub3]);
    properties.filtersSVG = [svg];

    // IE
    properties.filtersIE = ['progid:DXImageTransform.Microsoft.Light()'];

    return properties;
  },

  // Contrast
  contrast(inputAmount, unit) {
    let amount = inputAmount || 1;

    if (typeof unit !== 'undefined') {
      amount /= 100;
    }

    const properties = {};

    // CSS
    properties.filtersCSS = [`contrast(${amount})`];

    // SVG
    const svgSub1 = createSVGElement('feFuncR', {
      type: 'linear',
      slope: amount,
      intercept: -(0.5 * amount) + 0.5,
    });
    const svgSub2 = createSVGElement('feFuncG', {
      type: 'linear',
      slope: amount,
      intercept: -(0.5 * amount) + 0.5,
    });
    const svgSub3 = createSVGElement('feFuncB', {
      type: 'linear',
      slope: amount,
      intercept: -(0.5 * amount) + 0.5,
    });
    const svg = createSVGElement('feComponentTransfer', {
      'color-interpolation-filters': 'sRGB',
    }, [svgSub1, svgSub2, svgSub3]);
    properties.filtersSVG = [svg];

    // IE
    // no filter

    return properties;
  },

  // Blur
  blur(inputAmount, unit) {
    let amount = inputAmount || 0;

    const properties = {};

    if (unit === '' && amount !== 0) {
      return properties;
    }

    amount = helpers.length(amount, unit);

    // CSS
    properties.filtersCSS = [`blur(${amount}px)`];

    // SVG
    const svg = createSVGElement('feGaussianBlur', {
      stdDeviation: amount,
    });
    properties.filtersSVG = [svg];

    // IE
    properties.filtersIE = [`progid:DXImageTransform.Microsoft.Blur(pixelradius=${amount})`];

    return properties;
  },

  // Drop Shadow
  dropShadow(
    inputOffsetX, unitX, inputOffsetY, unitY,
    inputRadius, unitRadius, spread, unitSpread, inputColor,
  ) {
    let offsetX = Math.round(inputOffsetX) || 0;
    let offsetY = Math.round(inputOffsetY) || 0;
    let radius = Math.round(inputRadius) || 0;
    const color = inputColor || '#000000';

    const properties = {};

    if ((unitX === ' ' && offsetX !== 0) || (unitY === ' ' && offsetY !== 0) || (unitRadius === ' ' && radius !== 0) || spread) {
      return properties;
    }

    offsetX = helpers.length(offsetX, unitX);
    offsetY = helpers.length(offsetY, unitY);
    radius = helpers.length(radius, unitRadius);

    // CSS
    properties.filtersCSS = [`drop-shadow(${offsetX}px ${offsetY}px ${radius}px ${color})`];

    // SVG
    const svg1 = createSVGElement('feGaussianBlur', {
      in: 'SourceAlpha',
      stdDeviation: radius,
    });
    const svg2 = createSVGElement('feOffset', {
      dx: offsetX + 1,
      dy: offsetY + 1,
      result: 'offsetblur',
    });
    const svg3 = createSVGElement('feFlood', {
      'flood-color': oneColor(color).cssa(),
    });
    const svg4 = createSVGElement('feComposite', {
      in2: 'offsetblur',
      operator: 'in',
    });
    const svg5Sub1 = createSVGElement('feMergeNode', {});
    const svg5Sub2 = createSVGElement('feMergeNode', {
      in: 'SourceGraphic',
    });
    const svg5 = createSVGElement('feMerge', {}, [svg5Sub1, svg5Sub2]);
    properties.filtersSVG = [svg1, svg2, svg3, svg4, svg5];

    // IE
    properties.filtersIE = [`progid:DXImageTransform.Microsoft.Glow(color=${color},strength=0)`, `progid:DXImageTransform.Microsoft.Shadow(color=${color},strength=0)`];

    return properties;
  },
};

function convert(value) {
  let fmatch;
  let amount;
  let unit;
  let properties;

  // None
  fmatch = value.match(/none/i);
  if (fmatch !== null) {
    properties = filters.none();
  }
  // Grayscale
  fmatch = value.match(/(grayscale)\(\s*([0-9.]+)(%)*\s*\)/i);
  if (fmatch !== null) {
    amount = parseFloat(fmatch[2], 10);
    unit = fmatch[3];
    properties = filters.grayscale(amount, unit);
  }
  // Sepia
  fmatch = value.match(/(sepia)\(\s*([0-9.]+)(%)*\s*\)/i);
  if (fmatch !== null) {
    amount = parseFloat(fmatch[2], 10);
    unit = fmatch[3];
    properties = filters.sepia(amount, unit);
  }
  // Saturate
  fmatch = value.match(/(saturate)\(\s*([0-9.]+)(%)*\s*\)/i);
  if (fmatch !== null) {
    amount = parseFloat(fmatch[2], 10);
    unit = fmatch[3];
    properties = filters.saturate(amount, unit);
  }
  // Hue-rotate
  fmatch = value.match(/(hue-rotate)\((\s*[0-9.]+)(deg|grad|rad|turn)\s*\)/i);
  if (fmatch !== null) {
    const angle = parseFloat(fmatch[2], 10);
    unit = fmatch[3];
    properties = filters.hueRotate(angle, unit);
  }
  // Invert
  fmatch = value.match(/(invert)\((\s*[0-9.]+)(%)*\s*\)/i);
  if (fmatch !== null) {
    amount = parseFloat(fmatch[2], 10);
    unit = fmatch[3];
    properties = filters.invert(amount, unit);
  }
  // Opacity
  fmatch = value.match(/(opacity)\((\s*[0-9.]+)(%)*\s*\)/i);
  if (fmatch !== null) {
    amount = parseFloat(fmatch[2], 10);
    unit = fmatch[3];
    properties = filters.opacity(amount, unit);
  }
  // Brightness
  fmatch = value.match(/(brightness)\((\s*[0-9.]+)(%)*\s*\)/i);
  if (fmatch !== null) {
    amount = parseFloat(fmatch[2], 10);
    unit = fmatch[3];
    properties = filters.brightness(amount, unit);
  }
  // Contrast
  fmatch = value.match(/(contrast)\((\s*[0-9.]+)(%)*\s*\)/i);
  if (fmatch !== null) {
    amount = parseFloat(fmatch[2], 10);
    unit = fmatch[3];
    properties = filters.contrast(amount, unit);
  }
  // Blur
  fmatch = value.match(/(blur)\((\s*[0-9.]+)(px|em|rem|)\s*\)/i);
  if (fmatch !== null) {
    amount = parseFloat(fmatch[2], 10);
    unit = fmatch[3];
    properties = filters.blur(amount, unit);
  }
  // Drop Shadow
  fmatch = value.match(/(drop-shadow)\((\s*[0-9.]+)(px|em|rem| )\s*([0-9.]+)(px|em|rem| )\s*([0-9.]+)(px|em|rem| )(\s*([0-9.]+)(px|em|rem| ))?\s*([a-z0-9#%,.\s()]*)(?=\s*\))/i);
  if (fmatch !== null) {
    const offsetX = parseFloat(fmatch[2], 10);
    const unitX = fmatch[3];
    const offsetY = parseFloat(fmatch[4], 10);
    const unitY = fmatch[5];
    const radius = parseFloat(fmatch[6], 10);
    const unitRadius = fmatch[7];
    const spread = parseFloat(fmatch[9], 10);
    const unitSpread = fmatch[10];
    const color = fmatch[11].trim();
    properties = filters.dropShadow(
      offsetX, unitX, offsetY, unitY, radius,
      unitRadius, spread, unitSpread, color,
    );
  }

  return properties;
}

module.exports = (opts = {}) => {
  const options = {
    oldIE: opts.oldIE || false,
  };

  return {
    postcssPlugin: 'pleeease-filters',
    Declaration: {
      filter(decl) {
        // get values
        const values = decl.value.split(/\)\s+(?!\))/);
        const properties = {
          filtersCSS: [],
          filtersSVG: [],
          filtersIE: [],
        };

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < values.length; i++) {
          let value = values[i];
          // when splitting values, re-add closing parenthesis
          if (i !== values.length - 1) {
            value += ')';
          }
          const currentProperties = convert(value);
          // eslint-disable-next-line no-restricted-syntax
          for (const j in currentProperties) {
            if (typeof properties[j] !== 'undefined') {
              properties[j] = properties[j].concat(currentProperties[j]);
            }
          }
        }

        if (options.oldIE && properties.filtersIE.length > 0) {
          const filtersIE = properties.filtersIE.join(' ');

          // insert IE filters, only if it's not already present
          const newDecl = { prop: 'filter', value: filtersIE };
          let add = true;
          decl.parent.walkDecls((d) => {
            if (newDecl.value === d.value) {
              add = false;
              return false;
            }
            return true;
          });
          if (add) {
            decl.parent.insertAfter(decl, newDecl);
          }
        }

        if (properties.filtersSVG.length > 0 && !properties.filtersSVG.includes('none')) {
          const svgString = createSVG(properties.filtersSVG);
          const filtersSVG = `url('data:image/svg+xml;charset=utf-8,${svgString}#filter')`;

          // insert SVG filters, only if it's not already present
          const newDecl = { prop: 'filter', value: filtersSVG };
          let add = true;
          decl.parent.walkDecls((d) => {
            if (newDecl.value === d.value) {
              add = false;
              return false;
            }
            return true;
          });
          if (add) {
            decl.parent.insertBefore(decl, newDecl);
          }
        }
      },
    },
  };
};

module.exports.postcss = true;

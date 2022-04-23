export const serializeFormQuery = (searchParams, newParam) => {
  const data = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const pair of searchParams.entries()) {
    data[pair[0]] = pair[1];
  }
  if (newParam) {
    return { ...data, ...newParam };
  }
  return data;
};

/**
 * Merges class names, whatever the format. Can be a single class, a string with multiple classes
 * separated with space, an array of classes.
 *
 * @param {String|Array<String>} classNames
 */
export const mergeClassNames = (...classNames) => {
  const flatArray = inputArray =>
    inputArray.reduce((arr, item) => {
      if (Array.isArray(item)) {
        return arr.concat(flatArray(item));
      }
      if (typeof item === 'string') {
        const splitItem = item.split(' ');
        if (splitItem.length > 1) {
          return arr.concat(splitItem);
        }
        return arr.concat(item);
      }
      return [...arr];
    }, []);
  const flatten = classNames.reduce((names, name) => {
    if (typeof name === 'string') {
      return names.concat(name);
    }
    if (Array.isArray(name)) {
      return names.concat(flatArray(name));
    }
    return [...names];
  }, []);
  return Array.from(new Set(flatten.filter(x => typeof x === 'string')))
    .join(' ')
    .trim();
};

export function converObjectToProxy(obj, fn) {
  return new Proxy(obj, {
    hasOwnProperty(name) {
      // eslint-disable-next-line no-prototype-builtins
      return Reflect.hasOwnProperty(name);
    },
    get(target, name, receiver) {
      if (!(name in target)) {
        if (fn) {
          return fn(target, name, receiver);
        }
        return undefined;
      }
      return Reflect.get(target, name, receiver);
    },
  });
}

/**
 * Converts camelCase string to a form of separated strings with given separator.
 * @param {String} string - input string in camelCase
 * @param {String} separator - separator that will join separated strings
 *
 * e.g. input: helloWorld, output: hello_world
 */
export function revertCamelCase(string, separator = '_') {
  if (!string || typeof string !== 'string') {
    return string;
  }
  return string.replace(/([A-Z]+)/g, `${separator}$1`).toLowerCase();
}

const alwaysLowercase = ['of', 'the'];
const alwaysUppercase = ['UK', 'US', 'USA'];

/**
 * Makes first letter in a string uppercased.
 *
 * @param {string} string Source string.
 * @returns {String} Uppercased string.
 */
export function upperCaseFirstLetter(string) {
  if (!string || typeof string !== 'string') {
    return string;
  }
  if (alwaysLowercase.includes(string.toLowerCase())) return string.toLowerCase();
  if (alwaysUppercase.includes(string.toUpperCase())) return string.toUpperCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}

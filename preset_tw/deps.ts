const minMaxWidth =
  /(!?\(\s*min(-device-)?-width)(.|\n)+\(\s*max(-device)?-width/i;
const minWidth = /\(\s*min(-device)?-width/i;
const maxMinWidth =
  /(!?\(\s*max(-device)?-width)(.|\n)+\(\s*min(-device)?-width/i;
const maxWidth = /\(\s*max(-device)?-width/i;

const minMaxHeight =
  /(!?\(\s*min(-device)?-height)(.|\n)+\(\s*max(-device)?-height/i;
const minHeight = /\(\s*min(-device)?-height/i;
const maxMinHeight =
  /(!?\(\s*max(-device)?-height)(.|\n)+\(\s*min(-device)?-height/i;
const maxHeight = /\(\s*max(-device)?-height/i;

const isPrint = /print/i;
const isPrintOnly = /^print$/i;

const maxValue = Number.MAX_VALUE;

/**
 * Obtain the length of the media request in pixels.
 * Copy from original source `function inspectLength (length)`
 */
function _getQueryLength(length: string): number {
  const regExpExecResult = /(-?\d*\.?\d+)(ch|em|ex|px|rem)/.exec(length);

  if (regExpExecResult === null) {
    return maxValue;
  }

  const number = parseFloat(regExpExecResult[1]);
  const unit = regExpExecResult[2];

  switch (unit) {
    case "ch":
      return number * 8.8984375;

    case "em":
    case "rem":
      return number * 16;

    case "ex":
      return number * 8.296875;

    case "px":
      return number;
  }

  return number;
}

/**
 * Wrapper for creating test functions
 */
function _testQuery(
  doubleTestTrue: RegExp,
  doubleTestFalse: RegExp,
  singleTest: RegExp,
) {
  return (query: string): boolean => {
    if (doubleTestTrue.test(query)) {
      return true;
    } else if (doubleTestFalse.test(query)) {
      return false;
    }
    return singleTest.test(query);
  };
}

function _testIsPrint(a: string, b: string): number | null {
  const isPrintA = isPrint.test(a);
  const isPrintOnlyA = isPrintOnly.test(a);

  const isPrintB = isPrint.test(b);
  const isPrintOnlyB = isPrintOnly.test(b);

  if (isPrintA && isPrintB) {
    if (!isPrintOnlyA && isPrintOnlyB) {
      return 1;
    }
    if (isPrintOnlyA && !isPrintOnlyB) {
      return -1;
    }
    return a.localeCompare(b);
  }
  if (isPrintA) {
    return 1;
  }
  if (isPrintB) {
    return -1;
  }

  return null;
}

/**
 * Sorting an array with media queries
 * according to the mobile-first methodology.
 */
export function orderMediaQuery(a: string, b: string): number {
  const testIsPrint = _testIsPrint(a, b);
  if (testIsPrint !== null) {
    return testIsPrint;
  }
  const isMinWidth = _testQuery(minMaxWidth, maxMinWidth, minWidth);
  const isMaxWidth = _testQuery(maxMinWidth, minMaxWidth, maxWidth);
  const isMinHeight = _testQuery(minMaxHeight, maxMinHeight, minHeight);
  const isMaxHeight = _testQuery(maxMinHeight, minMaxHeight, maxHeight);

  const minA = isMinWidth(a) || isMinHeight(a);
  const maxA = isMaxWidth(a) || isMaxHeight(a);

  const minB = isMinWidth(b) || isMinHeight(b);
  const maxB = isMaxWidth(b) || isMaxHeight(b);

  if (minA && maxB) {
    return -1;
  }
  if (maxA && minB) {
    return 1;
  }

  const lengthA = _getQueryLength(a);
  const lengthB = _getQueryLength(b);

  if (lengthA === maxValue && lengthB === maxValue) {
    return a.localeCompare(b);
  } else if (lengthA === maxValue) {
    return 1;
  } else if (lengthB === maxValue) {
    return -1;
  }

  if (lengthA > lengthB) {
    if (maxA) {
      return -1;
    }
    return 1;
  }

  if (lengthA < lengthB) {
    if (maxA) {
      return 1;
    }
    return -1;
  }

  return a.localeCompare(b);
}

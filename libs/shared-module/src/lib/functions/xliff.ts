import {
  IXliffInterpolation,
  IXliffPlural,
  IXliffTag,
  XliffTagName,
} from '@vtabary/xliff2js';

export function isXliffString(
  value: string | IXliffInterpolation | IXliffPlural | undefined
): value is string {
  return typeof value === 'string';
}

export function isXliffPlural(
  value: string | IXliffInterpolation | IXliffPlural | undefined
): value is IXliffPlural {
  return isXliffTagName(value, 'plural');
}

export function isXliffInterpolation(
  value: string | IXliffInterpolation | IXliffPlural | undefined
): value is IXliffInterpolation {
  return isXliffTagName(value, 'x');
}

export function isXliffTagName(
  value: string | IXliffInterpolation | IXliffPlural | IXliffTag | undefined,
  name: XliffTagName
): value is IXliffTag {
  return isXliffTag(value) && value.name === name;
}

export function isXliffTag(
  value: string | IXliffInterpolation | IXliffPlural | IXliffTag | undefined
): value is IXliffTag {
  return typeof value !== 'string' && value !== undefined && 'name' in value;
}

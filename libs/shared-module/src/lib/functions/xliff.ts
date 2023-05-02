import { IXliffInterpolation, IXliffPlural } from '@vtabary/xliff2js';

export function isXliffPlural(
  value: string | IXliffInterpolation | IXliffPlural | undefined
): value is IXliffPlural {
  return (
    typeof value !== 'string' &&
    value !== undefined &&
    'name' in value &&
    value.name === 'plural'
  );
}

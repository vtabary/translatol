import { Injectable } from '@angular/core';

export interface ITreeNode {
  currentPath: string;
  currentId: string;
  children: ITreeNode[];
}

export interface TreeAccumulator {
  [result: symbol]: ITreeNode[];
  [key: string]: TreeAccumulator | ITreeNode[];
}

@Injectable({
  providedIn: 'root',
})
export class TreeBuilderService {
  public build(items: string[], separator: string = '/'): ITreeNode[] {
    let result: ITreeNode[] = [];
    let resultSymbol = Symbol('resultKey');
    let level: TreeAccumulator = {
      [resultSymbol]: result,
    };

    items
      .sort((a, b) => a.localeCompare(b))
      .forEach((path) => {
        path.split(separator).reduce((accumulator, part, idx, parts) => {
          if (!accumulator[part]) {
            const accumulatedPart: TreeAccumulator = { [resultSymbol]: [] };
            accumulator[part] = accumulatedPart;
            accumulator[resultSymbol].push({
              currentId: part,
              currentPath: parts.slice(0, idx + 1).join(separator),
              children: accumulatedPart[resultSymbol],
            });
          }

          return accumulator[part] as TreeAccumulator;
        }, level);
      });

    return result;
  }
}

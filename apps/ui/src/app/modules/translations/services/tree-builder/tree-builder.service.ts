import { Injectable } from '@angular/core';

export interface ITreeNode {
  currentPath: string;
  currentId: string;
  children: ITreeNode[];
}

@Injectable({
  providedIn: 'root',
})
export class TreeBuilderService {
  public build(items: string[], separator: string = '/'): ITreeNode[] {
    let result: ITreeNode[] = [];
    let level: any = { result };

    items
      .sort((a, b) => a.localeCompare(b))
      .forEach((path) => {
        path.split(separator).reduce((acc, name, idx, parts) => {
          if (!acc[name]) {
            acc[name] = { result: [] };
            acc.result.push({
              currentId: name,
              currentPath: parts.slice(0, idx + 1).join(separator),
              children: acc[name].result,
            });
          }

          return acc[name];
        }, level);
      });

    return result;
  }
}

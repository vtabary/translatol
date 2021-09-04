import { Injectable } from '@angular/core';

export interface ITreeNode {
  currentPath: string;
  currentId: string;
  children: ITreeNode[];
}

@Injectable({
  providedIn: 'root'
})
export class TreeBuilderService {
  public build(items: string[], separator: string = '/'): ITreeNode[] {
    let result: ITreeNode[] = [];
    let level = {result};

    items.forEach(path => {
      path.split(separator)
        .reduce((r, name, idx, parts) => {
          if(!r[name]) {
            r[name] = {result: []};
            r.result.push({currentId: name, currentPath: parts.slice(0, idx + 1).join(separator), children: r[name].result})
          }

          return r[name];
        }, level)
    })

    return result;
  }
}

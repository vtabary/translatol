import { Injectable } from '@angular/core';
import { uniq } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  public list(): string[] {
    try {
      return uniq(JSON.parse(localStorage.getItem('translation-history'))) || [];
    } catch (e) {
      return [];
    }
  }

  public add(filePath: string) {
    const list = this.list();
    list.unshift(filePath);
    localStorage.setItem('translation-history', JSON.stringify(list.slice(0, 9)));
  }

  public clear() {
    localStorage.remove('translation-history');
  }
}

import { Injectable } from '@angular/core';
import uniqBy from 'lodash/uniqBy';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  public list(): { path: string; type: 'file' | 'folder' }[] {
    try {
      let list: { path: string; type: 'file' | 'folder' }[] = JSON.parse(localStorage.getItem('translation-history')) || [];

      // Clear history list in order to keep retrocompatibility
      list = list.map(item => {
        if (typeof item !== 'string') {
          return item;
        }

        return { path: item, type: 'file' };
      });

      return uniqBy(list, 'path');
    } catch (e) {
      return [];
    }
  }

  public add(item: { path: string; type: 'file' | 'folder' }) {
    const list = this.list();
    list.unshift(item);
    localStorage.setItem('translation-history', JSON.stringify(list.slice(0, 9)));
  }

  public clear() {
    localStorage.remove('translation-history');
  }
}

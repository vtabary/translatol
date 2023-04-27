import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITreeNode, TreeBuilderService } from 'translatol-shared-module';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
})
export class FileListComponent implements OnChanges {
  @Input()
  public filePaths: string[] = [];

  public folderPath$: Observable<string>;
  public treeItems: ITreeNode[] = [];

  constructor(activatedRoute: ActivatedRoute, private treeBuilder: TreeBuilderService) {
    this.folderPath$ = activatedRoute.params.pipe(map(params => atob(params['folder'] || '')));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['filePaths']) {
      return;
    }

    this.treeItems = this.treeBuilder.build(this.filePaths, '/');
  }

  public getChildren(nodes: ITreeNode): ITreeNode[] {
    return nodes.children;
  }
}

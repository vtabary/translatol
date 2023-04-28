import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IXliffTransUnit } from '@vtabary/xliff2js';
import { ITreeNode, TreeBuilderService } from '../../services/tree-builder/tree-builder.service';

@Component({
  selector: 'app-translation-navigation',
  templateUrl: './translation-navigation.component.html',
  styleUrls: ['./translation-navigation.component.scss'],
})
export class TranslationNavigationComponent implements OnChanges {
  @Input()
  public toTranslate: IXliffTransUnit[] = [];

  @Input()
  public translated: IXliffTransUnit[] = [];

  @Input()
  public duplicated: IXliffTransUnit[] = [];

  public toTranslateTree: ITreeNode[] = [];
  public translatedTree: ITreeNode[] = [];
  public duplicatedTree: ITreeNode[] = [];

  constructor(private treeBuilder: TreeBuilderService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.toTranslate) {
      this.toTranslateTree = this.treeBuilder.build(
        this.toTranslate.map(item => item.$.id),
        '.'
      );
    }

    if (changes.translated) {
      this.translatedTree = this.treeBuilder.build(
        this.translated.map(item => item.$.id),
        '.'
      );
    }

    if (changes.duplicated) {
      this.duplicatedTree = this.treeBuilder.build(
        this.duplicated.map(item => item.$.id),
        '.'
      );
    }
  }

  public getChildren(nodes: ITreeNode): ITreeNode[] {
    return nodes.children;
  }
}

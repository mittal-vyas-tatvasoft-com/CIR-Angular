import { FlatTreeControl } from '@angular/cdk/tree';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { TreeNode } from 'src/app/modules/users/roles/interfaces/role-section.interface';

export interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id: number | undefined;
}

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
})
export class TreeViewComponent implements OnChanges {
  @Input() data: TreeNode[] | null = [];
  @Input() expand: string;
  @Input() collapse: string;
  @Input() visibility: boolean;
  @Output() btnClick = new EventEmitter<FlatNode>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.dataSource.data = [];
      if (this.data) {
        this.dataSource.data = [...this.data];
      }
    }
  }

  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      id: node.id,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: FlatNode) => node.expandable;

  getId(event: FlatNode) {
    this.btnClick.emit(event);
  }
}

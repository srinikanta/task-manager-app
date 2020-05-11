import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Output() openTaskDialog = new EventEmitter<boolean>();

  handleOpenTaskDialog() {
    this.openTaskDialog.emit(true);
  }
}

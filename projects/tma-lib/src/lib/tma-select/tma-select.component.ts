import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface ISelecteItem {
  name: string;
  value: string;
}

@Component({
  selector: 'tma-select',
  templateUrl: './tma-select.component.html',
  styleUrls: ['./tma-select.component.scss']
})
export class TmaSelectComponent implements OnInit {
  @Input() items: ISelecteItem[];
  @Input() selectedValue: string;
  @Output() selectedValueChange = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }

  updatedSelectedValue(selectedValue) {
    this.selectedValue = selectedValue;
    this.selectedValueChange.emit(this.selectedValue);
  }

}

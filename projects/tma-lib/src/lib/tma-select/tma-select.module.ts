import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TmaSelectComponent } from './tma-select.component';



@NgModule({
  declarations: [TmaSelectComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [TmaSelectComponent]
})
export class TmaSelectModule { }

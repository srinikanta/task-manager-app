import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  EventEmitter,
  Directive,
  ViewContainerRef,
  ViewChildren,
  QueryList,
  ComponentFactoryResolver,
  AfterContentInit
} from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() postComment: Array<object> = [];
  @Output() countComments = new EventEmitter();

  removeComment(no) {
    this.postComment.splice(no, 1);
    console.log('After remove array====>', this.postComment);
    this.countComments.emit(this.postComment);
  }
}

import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
@Component({
  selector: 'isol-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  constructor() { }

  @Input() size: 'small' | 'medium' | 'large' = 'small';

  private _show = false;
  @Input() set show(val: boolean) {
    this._show = val;
    this.stateChange.next(val);
  }
  get show() {
    return this._show;
  }

  @Output() backdropClick = new EventEmitter();

  @ViewChild('popup') popup: ElementRef;

  stateChange = new Subject<boolean>();

  get popupClasses(): string {
    return this.size;
  }

  open(): void {
    this.show = true;
  }

  close(): void {
    this.show = false;
  }

  toggle(): void {
    this.show = !this.show;
  }

  click(event: MouseEvent): void {
    if (!this.popup.nativeElement.contains(event.target)) {
      this.backdropClick.emit();
    }
  }
}

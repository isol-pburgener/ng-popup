import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(private ref: ChangeDetectorRef) { }
  title = 'isol-ng-popup';

  countOpened1 = 0;
  countClosed1 = 0;
  countOpened2 = 0;
  countClosed2 = 0;

  @ViewChild('popup1') popup1: PopupComponent;
  @ViewChild('popup2') popup2: PopupComponent;

  show1 = false;
  open1(): void {
    this.show1 = true;
  }
  close1(): void {
    this.show1 = false;
  }
  open2(): void {
    this.popup2.open();
  }
  close2(): void {
    this.popup2.close();
  }

  ngAfterViewInit(): void {
    this.popup1.stateChange.subscribe(open => {
      if (open) {
        this.countOpened1++;

      } else {
        this.countClosed1++;
        this.ref.detectChanges();
      }
    });

    this.popup2.stateChange.subscribe(open => {
      if (open) {
        this.countOpened2++;
      } else {
        this.countClosed2++;
      }
    });
  }
}

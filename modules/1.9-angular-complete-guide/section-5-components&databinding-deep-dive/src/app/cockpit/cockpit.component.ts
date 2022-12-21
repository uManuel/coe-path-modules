import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>;
  @Output() bluePrintCreated = new EventEmitter<{ serverName: string, serverContent: string }>;

  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;

  serverElements = [];

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(serverName: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: serverName.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(serverName: HTMLInputElement) {
    this.bluePrintCreated.emit({
      serverName: serverName.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }
}

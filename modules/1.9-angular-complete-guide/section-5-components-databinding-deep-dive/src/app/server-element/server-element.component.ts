import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation, OnDestroy, ViewChild, ElementRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() element: { type: string, name: string, content: string };
  @Input() name: string;
  @ViewChild('heading', { static: true }) heading: ElementRef;
  @ContentChild('contentParagraph', { static: true }) contentParagraph: ElementRef;

  constructor() {
    console.log('Constructor called!');
  }

  ngOnInit(): void {
    console.log('ngOnInit called!');
    console.log('Text content:' + this.heading.nativeElement.textContent);
    console.log('Text content of Paragraph:' + this.contentParagraph.nativeElement.textContent);
  }
  ngDoCheck(): void {
    console.log('ngDoCheck called!');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called!');
    console.log(changes);
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called!');
    console.log('Text content  of Paragraph:' + this.contentParagraph.nativeElement.textContent);
  }
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called!');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called!');
    console.log('Text content:' + this.heading.nativeElement.textContent);
  }
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called!');
  }
  ngOnDestroy() {
    console.log('ngOnDestroy called!');
  }
}

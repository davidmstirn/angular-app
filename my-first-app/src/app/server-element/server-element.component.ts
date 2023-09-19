import {
  Component,
  Input,
  ViewEncapsulation,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ContentChild,
  AfterContentInit,
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated, // this is the default
})
export class ServerElementComponent
  implements OnInit, OnChanges, AfterViewInit, AfterContentInit
{
  @Input('srvElement') element: { type: string; name: string; content: string };
  @Input() name: string;
  @ViewChild('heading', { static: true })
  header: ElementRef<HTMLHeadingElement>;
  @ContentChild('contentParagraph', { static: true })
  contentParagraph: ElementRef<HTMLParagraphElement>;

  constructor() {
    console.log('constructor called!');
  }

  ngOnInit(): void {
    console.log('ngOnInit called!');
    console.log(this.header.nativeElement.textContent);
    console.log(this.contentParagraph.nativeElement.textContent);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Demo of the SimpleChanges data structure
    if (changes.name) {
      if (changes.name.firstChange) {
        console.log('Name initialized to "' + changes.name.currentValue + '"');
      } else {
        console.log(
          'Name changed from "' +
            changes.name.previousValue +
            '" to "' +
            changes.name.currentValue +
            '"'
        );
      }
    }
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called!');
    console.log(this.header.nativeElement.textContent);
    console.log(this.contentParagraph.nativeElement.textContent);
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called!');
    console.log(this.contentParagraph.nativeElement.textContent);
  }
}

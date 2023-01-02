# Angular Course

There are differences between **AngularJS** and **Angular 2** AKA **Angular**.
Releases of Angular are released every 6 months.

## Section 2: The basics

In angular applications the most important parts are components that are reusable parts of code that can be used in different places in your web app.

To create an app we need to have installed the CLI of Angular and execute.

```BASH
npm install -g @angular/cli
```

And then create a new workspace `ng new my-app`.

We can create components using the cli `ng generate component server`;

A component It's compound of the following files

-   name.component.html (required but if you want)
-   name.component.css (not required)
-   name.component.ts (required)
-   name.component.spec.ts (not required, testing)
-   name.module.ts (not required)

### Selectors

We can have three types of selectors. (There are more!)

```typescript
import { Component } from '@angular/core';

@Component({
    // selector: '.app-servers', // class selector
    // selector: '[app-servers]', // attribute selector
    selector: 'app-servers', //element name
    template: `
        <app-server></app-server>
        <app-server></app-server>
    `,
    styleUrls: ['./servers.component.css'],
})
export class ServersComponent {}
```

### Databinding

The databinding is the communication between the **Html template** and the **Typescript Code(Business logic)**

we have:

-   Output data: Ts to html template
    -   String interpolation ({{data}})
    -   Property binding ([property]="data")
-   React user Event: Html template to ts
    -   (event)="expression"
-   Two way binding: html to ts and ts to html.
    -   [(ngModel)]="data"

### Directories

Directives are instructions in the DOM, for instance the components are instructions in the DOM.

Example using the attribute to change color:

```typescript
<p appTurnGreen> Receives a green background</p>;

@Directive({
    selector: [appTurnGreen],
})
export class TurnGreenDirective {}
```

Built in directive:

-   ngIf (Structural directive): to render some component by condition if, and also can be used with else.
-   ngStyle (Attribute directive): To render an style by condition.
-   ngClass (Attribute directive): To render a class by condition, pass an object {key(name of the class):value(true or false)}
-   ngFor (Structural directive): Render a list of components

## Section 3: Course project: the basics

We created a app with only component, without any business logic.

-   Header
-   Shopping List
    -   Shopping Edit
-   Recipes
    -   Recipe detail
    -   Recipe list
        -   Recipe item

## Section 4: Debug

To Debug we have the developer tools of chrome.

And we can check in webpack section to debug it easily our typescript code.

## Section 5: Component && Data binding

### Binding to custom properties

We can set custom properties to our components to pass data to into our component from the parent. In a component we have to implement a decorator that will be accessible by parents components.

-   @Input('alias') by default alias name it's the name of the attribute of the class.

```typescript
export class ServerElementComponent implements OnInit {
    @Input() element: { type: string; name: string; content: string };

    constructor() {}

    ngOnInit(): void {}
}
```

and implementing in the HTML parent component `app.component.html`

```html
<app-server-element
    *ngFor="let serverElement of serverElements"
    [element]="serverElement"
    [name]="serverElement.name"
>
    <p #contentParagraph>
        <strong *ngIf="serverElement.type === 'server'" style="color: red">
            {{serverElement.content}}
        </strong>
        <em *ngIf="serverElement.type === 'blueprint'"
            >{{ serverElement.content }}</em
        >
    </p>
</app-server-element>
```

### Binding to custom events

There are times in which you need to bind an event to your component to pass data up to your parent component, todo that you have to use:

-   @Output('alias'): by default alias name it's the name of the attribute of the class. We have to later emit this event on a function like:

```typescript
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-cockpit',
    templateUrl: './cockpit.component.html',
    styleUrls: ['./cockpit.component.css'],
})
export class CockpitComponent implements OnInit {
    @Output() serverCreated = new EventEmitter<{
        serverName: string;
        serverContent: string;
    }>(); // Output Event on the component
    @Output() bluePrintCreated = new EventEmitter<{
        serverName: string;
        serverContent: string;
    }>(); // BluePrint Event on the component

    newServerName = '';
    newServerContent = '';

    serverElements = [];

    constructor() {}

    ngOnInit(): void {}

    // Emitting the event
    onAddServer() {
        this.serverCreated.emit({
            serverName: this.newServerName,
            serverContent: this.newServerContent,
        });
    }
    // Emitting the event
    onAddBlueprint() {
        this.bluePrintCreated.emit({
            serverName: this.newServerName,
            serverContent: this.newServerContent,
        });
    }
}
```

And implementing in the parent html component

```html
<app-cockpit
    (serverCreated)="addServerHandler($event)"
    (bluePrintCreated)="addBluePrintHandler($event)"
></app-cockpit>
```

### Encapsulation

Every component It's forced to have their own css template, emulates the shadow dom that has the feature of has every element his own style but it's not supported by all browsers.

We can update the encapsulation

```typescript
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-server-element',
    templateUrl: './server-element.component.html',
    styleUrls: ['./server-element.component.css'],
    encapsulation: ViewEncapsulation.None, // can be None, ShadowDom, Emulated
})
export class ServerElementComponent implements OnInit {
    @Input() element: { type: string; name: string; content: string };

    constructor() {}

    ngOnInit(): void {}
}
```

If we set as **none** all css applied to that component will be global, if we set **ShadowDom** will be applied encapsulation natively in browsers that support it.

### Using Local References

Using Local references allow us to access to the element with all their attributes.

Example

```html
<input #serverNameInput type="text" class="form-control" />
<!-- #serverContentInput It's the reference -->
<button class="btn btn-primary" (click)="onAddServer(serverNameInput)"></button>
```

```typescript
// Add a function with the reference input
onAddServer(serverName: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: serverName.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

```

### ViewChild

Setting a ViewChild we can access to an element with ELementRef, It's almost the same but the type of element its **ElementRef**.
!!!NOTE It's not a good idea to access to the DOM using ViewChild

```html
<input type="text" class="form-control" #serverContentInput />
```

```typescript

  @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef; //we have to import ElementRef
  serverElements = [];

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(serverName: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: serverName.value,
      serverContent: this.serverContentInput.nativeElement.value //Using ElementRef
    });
  }
```

### Passing HTML data in a component

By default any html you pass trough a component It's lost like `<myComponent><lostElement></lostElement></myComponent>`, to make it available you have to use this hook `<ng-content></ng-content>` inside of that html component.

### Lifecycle

-   ngOnChanges: Called after a bound input property changes.
-   ngOnInit: Called once the component It's initialized.
-   ngDoCheck: Called during every change detection rule.
-   ngAfterContentInit: Called after content ng-content has been projected into view.
-   ngAfterContentChecked: Called every time the project content has been checked.
-   ngAfterViewInit: Called after the component's view (and child views) has been initialized.
-   ngAfterViewChecked: Called every time the view (and child views) have been checked.
-   ngOnDestroy: Called once the component it's about to be destroyed.

### Getting access to ng-content with @ContentChild

To get access to a reference that it's in ng-content we have to use the @ContentChild that it's similar with @Child.

## Section 7: Directives Deep dive

Attribute Directive vs Structural Directive.

-   **Attribute directive** are similar to html attribute (property binding and event binding).
-   **Attribute directive** Only affect to the element that it's added
-   **Structural directives**looks similar to html but leading with \*
-   **Structural directives** Affects a whole area of the DOM, remove or add (\*ngIf)
-   **Structural directives** We only can have 1 structural directive in an element.

### Create a directive

Create a directive to update the color of the background.

```typescript
import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
    constructor(private elRef: ElementRef, private renderer: Renderer2) {}
    ngOnInit(): void {
        this.renderer.setStyle(
            this.elRef.nativeElement,
            'background-color',
            'blue'
        );
    }
}
```

Then import it and use it.

```html
<p appBetterHighlight>Style me with better directive</p>
```

NOTE!! To access to the DOM and change it It's a good practice to use renderer2

### Host Listeners

To listen events in directives and execute some change we can use host listeners.

```typescript
import {
    Directive,
    ElementRef,
    HostListener,
    OnInit,
    Renderer2,
} from '@angular/core';

@Directive({
    selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
    constructor(private elRef: ElementRef, private renderer: Renderer2) {}
    ngOnInit(): void {
        // this.renderer.setStyle(this.elRef.nativeElement,"background-color","blue");
    }

    @HostListener('mouseenter') mouseover(eventData: Event) {
        this.renderer.setStyle(
            this.elRef.nativeElement,
            'background-color',
            'blue'
        );
    }

    @HostListener('mouseleave') mouseleave(eventData: Event) {
        this.renderer.setStyle(
            this.elRef.nativeElement,
            'background-color',
            'transparent'
        );
    }
}
```

### HostBinding to bind host properties

We can bind a property in our directive using @HostBinding decorator.

```typescript
import {
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Renderer2,
} from '@angular/core';

@Directive({
    selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
    @Input() defaultColor: string = 'transparent';
    //setting a property binding and using the property name the same as the directive.
    @Input('appBetterHighlight') highlightColor: string = 'blue';
    @HostBinding('style.backgroundColor') backgroundColor: string;

    constructor(private elRef: ElementRef, private renderer: Renderer2) {}

    ngOnInit(): void {
        this.backgroundColor = this.defaultColor;
        // this.renderer.setStyle(this.elRef.nativeElement,"background-color","blue");
    }

    @HostListener('mouseenter') mouseover(eventData: Event) {
        // this.renderer.setStyle(this.elRef.nativeElement,"background-color","blue");
        this.backgroundColor = this.highlightColor;
    }

    @HostListener('mouseleave') mouseleave(eventData: Event) {
        // this.renderer.setStyle(this.elRef.nativeElement,"background-color","transparent");
        this.backgroundColor = this.defaultColor;
    }
}
```

### Structural directives using \* leading

Sometimes we see \* in structural directives but they are not necessary, we can implement it like

```html
<div *ngIf="!onlyOdd">
    <li
        class="list-group-item"
        *ngFor="let even of evenNumbers"
        [ngClass]="{odd:even%2!=0}"
        [ngStyle]="{backgroundColor:even%2!=0?'yellow':'transparent'}"
    >
        {{ even }}
    </li>
</div>
```

Is similar than this

```html
<ng-template [ngIf]="!onlyOdd">
    <div>
        <li
            class="list-group-item"
            *ngFor="let even of evenNumbers"
            [ngClass]="{odd:even%2!=0}"
            [ngStyle]="{backgroundColor:even%2!=0?'yellow':'transparent'}"
        >
            {{ even }}
        </li>
    </div>
</ng-template>
```

We can create our own structural directive like: `unless.directive.ts`

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})

export class UnlessDirective {
    // binds the property with appUnless as the selector.
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }
  // we net to set the ng-template and the view container 
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }
}
```
## Section 8: Course project directives

In this project we implemented directive to show a dropdown when click the button, to do that we added a dropdown directive using a hostBinding and host listener


## Section 9: Using services & dependency injection

Services allow us to avoid rewrite functionalities in different components, creating different classes services for that purpose.

**Dependency injector** allow us to inject to our components other services to be used by itself automatically.

Todo that we need to create a service

```typescript
export class LoggingService{
    logStatusChange(status: string){
        console.log('A server status changed, new status: ' + status);
    }
}
```

and use dependency injector.
```typescript
import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers:[LoggingService]
})
export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  constructor(private loggingService: LoggingService){}

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountAdded.emit({
      name: accountName,
      status: accountStatus
    });
    this.loggingService.logStatusChange(accountStatus);
  }
}

```
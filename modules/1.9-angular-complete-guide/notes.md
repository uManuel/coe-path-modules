# Angular Course

There are between **AngularJS** and **Angular 2** AKA **Angular**.
Releases of Angular are released every 6 months.

## Section 2: The basics

In angular applications the most important parts are components that are reusable parts of code that can be used in different places in your web app.

To create an app we need to have installed the CLI of Angular and execute.

```BASH
npm install -g @angular/cli
```

And then create a new workspace `ng new my-app`.

We can create `ng generate component server`;

A component It's compound of the following files

-   name.component.html (required)
-   name.component.css (not required)
-   name.component.ts (required)
-   name.component.spec.ts (not required)
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

We can set custom properties to our components to set it in a component we have to implement a decorator.

- @Input('alias') by default alias name it's the name of the attribute of the class.

### Binding to custom events

There are times in which you need to bind an event to your component to pass data, todo that you have to use:

- @Output('alias'): by default alias name it's the name of the attribute of the class. We have to later emit this event on a function like:

```typescript
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>; // Output Event on the component
  @Output() bluePrintCreated = new EventEmitter<{ serverName: string, serverContent: string }>; // BluePrint Event on the component
  
  newServerName = '';
  newServerContent = '';

  serverElements = [];

  constructor() { }

  ngOnInit(): void {
  }

  // Emitting the event
  onAddServer() {
    this.serverCreated.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent
    });
  }
  // Emitting the event
  onAddBlueprint() {
    this.bluePrintCreated.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent
    });
  }
}
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
  encapsulation: ViewEncapsulation.None // can be None, ShadowDom, Emulated
})
export class ServerElementComponent implements OnInit {
  @Input() element: { type: string, name: string, content: string };
  
  constructor() { }

  ngOnInit(): void {
  }

}
```
If we set as **none** all css applied to that component will be global, if we set **ShadowDom** will be applied encapsulation natively in browsers that support it.



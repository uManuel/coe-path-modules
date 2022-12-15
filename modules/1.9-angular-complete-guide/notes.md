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
- name.component.html (required)
- name.component.css (not required)
- name.component.ts (required)
- name.component.spec.ts (not required)
- name.module.ts (not required)

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
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {

}

```

### Databinding

The databinding is the communication between the **Html template** and the **Typescript Code(Business logic)**  

we have:

- Output data: Ts to html template
    - String interpolation ({{data}})
    - Property binding ([property]="data")
- React user Event: Html template to ts
    - (event)="expression"
- Two way binding: html to ts and ts to html.
    - [(ngModel)]="data"

### Directories

Directives are instructions in the DOM, for instance the components are instructions in the DOM.

Example using the attribute to change color:
```typescript
<p appTurnGreen> Receives a green background</p>

@Directive({
    selector: [appTurnGreen]
})
export class TurnGreenDirective{

}
```

Built in directive:

- ngIf (Structural directive): to render some component by condition if, and also can be used with else.
- ngStyle (Attribute directive): To render an style by condition.
- ngClass (Attribute directive): To render a class by condition, pass an object {key(name of the class):value(true or false)}
- ngFor (Structural directive): Render a list of components

## Section 3: Course project: the basics

We created a app with only component, without any business logic.

- Header
- Shopping List
    - Shopping Edit
- Recipes
    - Recipe detail
    - Recipe list
        - Recipe item

## Section 4: Debug

To Debug we have the developer tools of chrome.

And we can check in webpack section to debug it easily our typescript code.

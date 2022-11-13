# Notes

## Options for splitting code into multiple files

- Use different files and manually import to html files (Typescript doesn't know about the file connection between files).
- Namespaces & File Bundling: Use a shared namespace to group code and file or bundled compilation is possible.
- ES6 Imports/Exports: Use ES6 import/export syntax, per file compilation but just one script.(Modern browsers).

 ### Namespaces

Before using namespaces we have to update our `tsconfig.json` with:

```json
{
    "module":"amd",
    "outFile": "./dist/bundle.js"// to bundle all our namespaces as one
}
```

 Using namespaces we need to have a different file with the splitting code like:

`drag-drop-interfaces.ts`
```typescript
// Interfaces that are going to be exported
namespace app{
    export interface Draggable {
        dragStartHandler(event: DragEvent): void;
        dragEndHandler(event: DragEvent): void;
    }

    export interface DragTarget {
        dragOverHandler(event: DragEvent): void;
        dropHandler(event: DragEvent): void;
        dragLeaveHandler(event: DragEvent): void;
    }
}
 ```
`app.ts` who it is going to import namespace.
 ```typescript
 // With the line code below we're importing the namespace drag-drop-interfaces
 /// <reference path="drag-drop-interfaces.ts"/>
 
namespace App{
    // All code here can use the App namespace exported interface.
}
 ```
#### IMPORTANT!!!

Something interesting with namespaces is that we can also import in the main file all the files that use our application so all inner files doesn't necessarily need to import other files. But this is not a good pattern because can cause a lot of misunderstandings and bugs, it's better to import in every single-file all the typescript files that need that file.

### ES6

ES6 are supported by modern web browsers also used in javascript and typescript, and in contrast with namespaces it's necessarily to import in all the files that you need to use it, you can't import just in the main file.

Before to use this way we have to add some configurations in `tsconfig.json`

```json
{
    "target":"es6",
    "module": "es2015",
    //"outfile":"./dist/bundle.js"
}
```

Also we have to add to our html files script a `type="module"`

```html
<script type="module" src="dist/app.js" ></script>
```



To use it is very simple, in every single file use export:

`drag-drop-interfaces.ts`
```typescript
// Interfaces that are going to be exported
export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}
 ```
To import

```typescript
import {Draggable, DragTarget} from './drag-drop.interfaces.ts'
```

#### Various Import & Export Syntaxes

We can group imports into a single variable

```typescript
//import {Validatable, validate} from 'validation.js';
import * as Validation from 'validation.js';
```

We can use an alias to change the imported variable

```typescript
import {autobind as Autobind} from 'autobind.js'; // autobind is renamed to Autobind
```

To have a default export. we only are available to use just one.

```typescript
export default class Component{}
```

Importing

```typescript
import Cmp from './base-component' // Imported the default component without curly braces.
```

#### IMPORTANT!!!

When we use ES6 the browser needs to do http request for every file, so at the end becomes slower, so to solve this problem we can use a bundler called webpack!.
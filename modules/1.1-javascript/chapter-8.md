# Chapter 8: The Module Pattern

We're going to see the modules in this chapter.

## Encapsulation and Least Exposure (POLE)

Encapsulation is not jus for OOP, but for something broadly we bundle code that serve in a common service with different mechanism or syntax, for example using search-list.js to bundle and encapsulate that part of our code.
Benefits
- Better code organization
- Easier maintain code
- Less bugs

## What is a Module?

Collection of related data and functions and has public and private details

### Namespaces (Stateless Grouping)

If you just group functions without data then you have a namespace

```JAVASCRIPT
// namespace, not module
var Utils = {
    cancelEvt(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
    },
    wait(ms) {
        return new Promise(function c(res){
            setTimeout(res,ms);
        });
    },
    isValidEmail(email) {
        return /[^@]+@[^@.]+\.[^@.]+/.test(email);
    }
};
```
This is not a module but just a namespace

### Data Structures (Stateful Grouping)

If all your data are visible then you don't have a module, 

```JAVASCRIPT
// data structure, not module
var Student = {
    records: [
        { id: 14, name: "Kyle", grade: 86 },
        { id: 73, name: "Suzy", grade: 87 },
        { id: 112, name: "Frank", grade: 75 },
        { id: 6, name: "Sarah", grade: 91 }
    ],
    getName(studentID) {
        var student = this.records.find(
            student => student.id == studentID
        );
        return student.name;
    }
};
Student.getName(73);
// Suzy
```
This example is a data structure.

### Modules (Stateful Access Control)

A module needs to control access trough public and private.

```JAVASCRIPT
var Student = (function defineStudent(){
    var records = [
        { id: 14, name: "Kyle", grade: 86 },
        { id: 73, name: "Suzy", grade: 87 },
        { id: 112, name: "Frank", grade: 75 },
        { id: 6, name: "Sarah", grade: 91 }
    ];
    var publicAPI = {
        getName
    };
    return publicAPI;
    // ************************
    function getName(studentID) {
        var student = records.find(
        student => student.id == studentID
        );
        return student.name;
    }
})();
Student.getName(73); // Suzy
```
This example is a module and just publicApi are public and the remainder are private. ALso this example using IIEE implies that is going to be singleton.

### Module Factory (Multiple instances)

If we want to support multiple instance we can:

```JAVASCRIPT
// factory function, not singleton IIFE
function defineStudent() {
    var records = [
        { id: 14, name: "Kyle", grade: 86 },
        { id: 73, name: "Suzy", grade: 87 },
        { id: 112, name: "Frank", grade: 75 },
        { id: 6, name: "Sarah", grade: 91 }
    ];
    var publicAPI = {
        getName
    };
    return publicAPI;
    // ************************
    function getName(studentID) {
        var student = records.find(
            student => student.id == studentID
        );
        return student.name;
    }
}
var fullTime = defineStudent();
fullTime.getName(73); // Suzy
```
Rather than specifying defineStudent(), as an IIFE we just define it as a normal standalone function and is going to be a module factory function.

### Classic Module Definition

- Must be an outer scope
- Must have a hidden information
- Must return a public api and has reference to the hidden information via closure.


## Node CommonJS Modules

CommonJS are file-based, one module per file.

```JAVASCRIPT
module.exports.getName = getName;
// ************************
var records = [
    { id: 14, name: "Kyle", grade: 86 },
    { id: 73, name: "Suzy", grade: 87 },
    { id: 112, name: "Frank", grade: 75 },
    { id: 6, name: "Sarah", grade: 91 }
];
function getName(studentID) {
    var student = records.find(
        student => student.id == studentID
    );
    return student.name;
}
```
Default object for the api

```javascript
// defining a new object for the API
module.exports = {
// ..exports..
};
```

But there are some quirks with this approach. So to avoid that we can use this:

```JAVASCRIPT
Object.assign(module.exports,{
// .. exports ..
});
```

With this we are going to make a shallow copy of all those properties into modules.exports instead of replacing it(safer).

To import a module(file) you can:

```JAVASCRIPT
var Student = require("/path/to/student.js");
Student.getName(73);
// Suzy
```

When using CommonJS always is singleton because CommonJS module's API hold closures over the internal module details.

To access only part of the api we can:

```JAVASCRIPT
var getName = require("/path/to/student.js").getName;
// or alternately:
var { getName } = require("/path/to/student.js");
```

## Modern ES Modules (ESM)

ES modules are similar that CommonJS so is file-based, singleton, everything private by default and also always use `use strict` and instead of `module.exports` use `export` and for `require` use `import`.

```JAVASCRIPT
export getName;
// ************************
var records = [
    { id: 14, name: "Kyle", grade: 86 },
    { id: 73, name: "Suzy", grade: 87 },
    { id: 112, name: "Frank", grade: 75 },
    { id: 6, name: "Sarah", grade: 91 }
];

function getName(studentID) {
    var student = records.find(
        student => student.id == studentID
    );
    return student.name;
}
```

`export` must be at the top of the scope.

Another way to export:

```JAVASCRIPT
export function getName(studentID) {
// ..
}
```

Another variation:

```JAVASCRIPT
export default function getName(studentID) {
// ..
}
```

Non-default export are defined as named exports.

The `import` keyword always have to be at the top of the scope.

```JAVASCRIPT
import { getName } from "/path/to/students.js";
getName(73); // Suzy
```

If we have some problems with the name variables we can change it.

```JAVASCRIPT
import { getName as getStudentName }
    from "/path/to/students.js";
getStudentName(73); // Suzy
```

If you want to import a default value

```JAVASCRIPT
import getName from "/path/to/students.js";
getName(73); // Suzy
```

If you want to mix a default import with other named imports so:

```JAVASCRIPT
import { default as getName, /* .. others .. */ }
    from "/path/to/students.js";
getName(73); // Suzy
```

There are also the namespace import where you import everything default and named and stores into one single variable..

```JAVASCRIPT
import * as Student from "/path/to/students.js";
Student.getName(73); // Suzy
```


## Exit Scope

Whether you use classic, commonJS or ESM you have to use them.

We know how to use Scope and Closures and aply POLE(Principle of least exposure) to improve security in our code.

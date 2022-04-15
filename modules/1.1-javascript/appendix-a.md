# Appendix A: Exploring Further

This are nuanced corner cases of what we learned about scope and closures.

Also this is influenced by Kyle Simpson though

## Implied Scopes

### Parameter Scope

We see that there are two scopes in a function

```JAVASCRIPT
// outer/global scope: RED(1)
function getStudentName(studentID) {// a simple parameter
    // function scope: BLUE(2)
    // ..
}
```

But that's not always the true, so if we add a default parameter It's going to become a different scope.

```JAVASCRIPT
// outer/global scope: RED(1)
function getStudentName(/*BLUE(2)*/ studentID = 0) { // non simple parameter list
    // function scope: GREEN(3)
    // ..
}
```

We can work as they were a normal scope.
```JAVASCRIPT
function getStudentName(studentID = maxID, maxID) { // Here the TDZ occurs 
    // ..
}
```

If we change the order there is no TDZ

```JAVASCRIPT
function getStudentName(maxID,studentID = maxID) {
    // ..
}
```

We can also add functions.

```JAVASCRIPT
function whatsTheDealHere(id,defaultID = () => id) {
    id = 5;
    console.log( defaultID() );
}
```
The result makes sense makes sense over the id parameter/variable.
But adding shadowing?

```JAVASCRIPT
function whatsTheDealHere(id,defaultID = () => id) {
    var id = 5;
    console.log( defaultID() );
}
whatsTheDealHere(3);
// 3
```

Here the `var id=5` is shadowing but defaultID() It has their own scope, so there's a bubble scope. But it's crazier than that.

```JAVASCRIPT
function whatsTheDealHere(id,defaultID = () => id) {
    var id;
    console.log(`local variable 'id': ${ id }`);
    console.log(
        `parameter 'id' (closure): ${ defaultID() }`
    );
    console.log("reassigning 'id' to 5");
    id = 5;
    console.log(`local variable 'id': ${ id }`);
    console.log(
        `parameter 'id' (closure): ${ defaultID() }`
    );
}
whatsTheDealHere(3);
// local variable 'id': 3 <--- Huh!? Weird!
// parameter 'id' (closure): 3
// reassigning 'id' to 5
// local variable 'id': 5
// parameter 'id' (closure): 3
```
Why id `var id;` is not initialized to undefined?, this is a corner case for legacy compat reason JS doesn't auto-initialize id to undefined.


Advices to avoid this kind of nuances:
- Never shadow parameters with local variables
- Avoid using a default parameter function that closes over any of the parameters.

### Function Name Scope

When we create a function expression, the name of the function expression is added to the function's own scope, but it's outside the main, example:

```JAVASCRIPT
var askQuestion = function ofTheTeacher(){
    // why is this not a duplicate declaration error?
    let ofTheTeacher = "Confused, yet?";
};
```

## Anonymous vs Named Functions

### Explicit or Inferred Names

If we use anonymous function is not going to help to debug.

```JAVASCRIPT
btn.addEventListener("click",function(){
    setTimeout(function(){
        ["a",42].map(function(v){
            console.log(v.toUpperCase());
        });
    },100);
});
// Uncaught TypeError: Cannot read property
// 'toUpperCase' of null
// at myProgram.js:4
// at Array.map (<anonymous>)
// at myProgram.js:3
```

```javascript
btn.addEventListener("click",function onClick(){
    setTimeout(function waitAMoment(){
        ["a",42].map(function allUpper(v){
            console.log(v.toUpperCase());
        });
    },100);
});
// Uncaught TypeError: v.toUpperCase is not a function
// at allUpper (myProgram.js:4)
// at Array.map (<anonymous>)
// at waitAMoment (myProgram.js:3)
```

We have to known what is a named function.
```JAVASCRIPT
function thisIsNamed() {
    // ..
}
ajax("some.url",function thisIsAlsoNamed(){
    // ..
});
var notNamed = function(){
    // ..
};
makeRequest({
    data: 42,
    cb /* also not a name */: function(){
        // ..
    }
});

var stillNotNamed = function butThisIs(){
// ..
};
```

You may think that these are named but indeed are inferred names

```javascript
var notNamed = function(){
    // ..
};
var config = {
    cb: function(){
        // ..
    }
};
notNamed.name;
// notNamed
config.cb.name;
// cb
```

### Missing names

Well inferred names are show up in stack traces. But not all of them, for instance:

```JAVASCRIPT
function ajax(url,cb) {
    console.log(cb.name);
}
ajax("some.url",function(){
    // ..
});
    // ""
```
cb.name there is no name, so in callbacks there is no names. But not just with callbacks, example:

```JAVASCRIPT
var config = {};
config.cb = function(){
    // ..
};
config.cb.name;
// ""
var [ noName ] = [ function(){} ];
noName.name
// ""
```

### Who am I?

Without a lexical name is not possible to refer to himself. Example.

```JAVASCRIPT
// broken
runOperation(function(num){
    if (num <= 1) return 1;
    return num * oopsNoNameToCall(num - 1);
});
// also broken
btn.addEventListener("click",function(){
    console.log("should only respond to one click!");
    btn.removeEventListener("click",oopsNoNameHere);
});
```

### Names are descriptors

The most important thing of a function name is that is going to describe what it does the function.

```javascript
[ 1, 2, 3, 4, 5 ].filter(function(v){
    return v % 2 == 1;
});
// [ 1, 3, 5 ]
[ 1, 2, 3, 4, 5 ].filter(function keepOnlyOdds(v){
    return v % 2 == 1;
});
// [ 1, 3, 5 ]
```

We always have to name our functions this will make easier to read, easier to debug and easier to extend or maintain later.

### Arrow functions

Something very important to know is that arrow functions are always anonymous and inferred name.

Also arrow function does't define a this identifier key, is going to consult to find a function scope.

If you want to inherit a this from an outer function scope you may use arrow functions instead.

### IIFE (Immediately Invoked Function Expressions ) Variations

We always should use IIFEs
```javascript
(function(){
    // don't do this!
})();
(function doThisInstead(){
    // ..
})();
```

Others ways to declare a IIFE

```javascript
!function thisIsAnIIFE(){
    // ..
}();
+function soIsThisOne(){
    // ..
}();
~function andThisOneToo(){
    // ..
}();
void function yepItsAnIIFE() {
// ..
}();
```

## Hoisting: Functions and Variables

Someones says that hoisting is a mistake of design in JS but Kyle Simpson isn't agree.

### Function Hoisting

This code works thanks of hoisting

```JAVASCRIPT
getStudents();
    // ..
function getStudents() {
    // ..
}
```

So it's going to be very helpful for developers to read, and write, if you need how execute the code you go to the function and check it.

### Variable Hoisting

let and const cannot be used in TDZ and var is the only who can be and variable hoisting is a bad idea in almost all cases.

```javascript
pleaseDontDoThis = "bad idea";
// much later
var pleaseDontDoThis;
```
This code is harder to read.

This is how Kyle structure his code.
```javascript
// dependencies
var aModuleINeed = require("very-helpful");
var anotherModule = require("kinda-helpful");
// public API
var publicAPI = Object.assign(module.exports,{
getStudents,
addStudents,
// ..
});
// ********************************
// private implementation
var cache = { };
var otherData = [ ];
function getStudents() {
// ..
}
function addStudents() {
// ..
}
```

The only help use case of variable hoisting

```javascript
cache = {}; // used here, but declared below
// public API
var publicAPI = Object.assign(module.exports,{
getStudents,
addStudents,
refreshData: refreshData.bind(null,cache)
});
// ********************************
// private implementation
var cache /* = {}*/;
```

## The Case for var

### Don't Throw Out var

Var is helpful even though let are used a lot.

### const-Antly Confused

Kile doesn't like to use const but is useful in someways.

- Const are assignment immutable but value mutable if they are object or arrays.
- Const are used just when used string or number that are immutable.
- Const is not very helpful to avoid bugs
- Just give you information that never is on the left-hand side of an =; can't be reassigned.

### var AND let

We should use var and let in different circumstances.

- Use `var` when you use function scope
- Use `let` for blocking scope.

Example
```JAVASCRIPT
function getStudents(data) {
    var studentRecords = [];
    for (let record of data.records) {
        let id = `student-${ record.id }`;
        studentRecords.push({
            id,
            record.name
        });
    }
    return studentRecords;
}
```

Var is going to be used widely in the function, and let is going to be used inside for and block scope.

```JAVASCRIPT
function commitAction() {
    do {
        let result = commit();
        var done = result && result.code == 1;
    } while (!done);
}
```

Here for example, we can't use `let done` in while clause .

Another example of var is when we want to use Unintended blocks, unintended blocks means that the syntax requires a blocks but the developer don't really want to create a block scope.

```JAVASCRIPT
function getStudents() {
    try {
        // not really a block scope
        var records = fromCache("students");
    }
    catch (err) {
        // oops, fall back to a default
        var records = [];
    }
        // ..
}
```

Here for example we don't want to use block scope but the function scope to make re-declarations with var, also we want to say to the developer no matter the way try-catch goes always redeclare var.(Just opinion of Kyle Simpsons).

But there are also others examples

```JAVASCRIPT
function getStudents() {
    var data = [];
    // do something with data
    // .. 50 more lines of code ..
    // purely an annotation to remind us
    var data;
    // use data again
    // ..
}
```

Also we can re-declare to tell the developer that is a var for example, to give more information.

## What's the Deal with TDZ?

### Where it all started

This happened in ES6 TC39 decided to have hoist const and let.

They had a question

```JAVASCRIPT
let greeting = "Hi!";
{
    // what should print here?
    console.log(greeting);
    // .. a bunch of lines of code ..
    // now shadowing the `greeting` variable
    let greeting = "Hello, friends!";
    // ..
}
```

What print? undefined or what? First const should never re-assigned, so reassign to undefined and later to their value had no sense, that's why they decided that should hoist to the top of the block, but is not going to be set to undefined, and the time that between the declaration and the initialization.

### Who let the TDZ Out?

That's just const, but about let?

They decided to add let TDZ because of const and for social engineering to shift developer's behavior. However let are more similar with `var` than with const.

## Are Synchronous Callbacks Still Closures?

Closures are
- Is when a function remember outer variables in other scopes.
- Scope environment of a function that is preserved, so when is invoked in other scopes can access to their principal scope.

### What is a Callback?

A callback can be synchronous and asynchronous. So a function will be executed after some time.

```JAVASCRIPT
setTimeout(function waitForASecond(){
    // this is where JS should call back into
    // the program when the timer has elapsed
},1000);
    // this is where the current program finishes
    // or suspends
```

No problem here is async callback.

### Synchronous callback

```JAVASCRIPT
function getLabels(studentIDs) {
    return studentIDs.map(
        function formatIDLabel(id){
            return `Student ID: ${
            String(id).padStart(6)
            }`;
        }
    );
}
getLabels([ 14, 73, 112, 6 ]);
// [
// "Student ID: 000014",
// "Student ID: 000073",
// "Student ID: 000112",
// "Student ID: 000006"
// ]
```

FormatIdLabel should be a callback? there's nothing to call back into perse because is going to be executed automatically.

Kyle Simpson prefer to name synchronous callback with Inter Invoked Functions (IIFs) Because describe better what a async callback does.

### Synchronous Closure

Are IIFs an example of Closure?

```JAVASCRIPT
function printLabels(labels) {
    var list = document.getElementByID("labelsList");
    labels.forEach(
        function renderLabel(label){
            var li = document.createELement("li");
            li.innerText = label;
            list.appendChild(li);
        }
    );
}
```

This can be an example of closure, but renderLabel is not declared outside, to later be executed.

```javascript
function printLabels(labels) {
    var list = document.getElementByID("labelsList");
    for (let label of labels) {
        // just a normal function call in its own
        // scope, right? That's not really closure!
        renderLabel(label);
    }
    // **************
    function renderLabel(label) {
        var li = document.createELement("li");
        li.innerText = label;
        list.appendChild(li);
    }
}
```

This is definitely not an example of closure.

### Defer to Closure

We can use currying to apply closure.

```JAVASCRIPT
function printLabels(labels) {
    var list = document.getElementByID("labelsList");
    var renderLabel = renderTo(list);
    // definitely closure this time!
    labels.forEach( renderLabel(label) );
    // **************
    function renderTo(list) {
        return function createLabel(label){
            var li = document.createELement("li");
            li.innerText = label;
            list.appendChild(li);
        };
    }
}
```

## Classic Module Variations.

The classic module, can have some variation

Classic module variation
```JAVASCRIPT
var StudentList = (function defineModule(Student){
    var elems = [];
    var publicAPI = {
        renderList() {
        // ..
        }
    };
    return publicAPI;
})(Student);
```

### Where is my api?

However they don't have a publicAPI like the last example, they are like:

```JAVASCRIPT
var StudentList = (function defineModule(Student){
    var elems = [];
    return {
        renderList() {
        // ..
        }
    };
})(Student);
```

They just send an object, but Kyle Simpson prefer to declare a variable publicAPI.

### Asynchronous Module Definition (AMD).

Use the RequireJS
```JAVASCRIPT
define([ "./Student" ],function StudentList(Student){
    var elems = [];
    return {
        renderList() {
            // ..
        }
    };
});
```

`define` is provided by RequireJS and the object that return is going to be public api.

### Universal Modules (UMD)

Less specific and more a collection of very similar formats.

```JAVASCRIPT
(function UMD(name,context,definition){
    // loaded by an AMD-style loader?
    if (
        typeof define === "function" &&
        define.amd
    ) {
        define(definition);
    }
    // in Node?
    else if (
        typeof module !== "undefined" &&
        module.exports
    ) {
        module.exports = definition(name,context);
    }
    // assume standalone browser script
    else {
        context[name] = definition(name,context);
    }
})("StudentList",this,function DEF(name,context){
    var elems = [];
    return {
        renderList() {
        // ..
        }
    };
});
```

First has if else to detect which of the three supported environments the module is being loaded in, and the last `()` that invokes an IIFE is being passed
three arguments.
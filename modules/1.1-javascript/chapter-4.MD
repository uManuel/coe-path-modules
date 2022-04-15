# Chapter 4: Around the Global Scope

Global scope is important to know even that today everything we bundle into files.

## Why Global Scope?

When we develop an JS application we use different js files and all work in the next three ways:
1. Using **ES modules** directly.
All those files are loaded individually by the JS environment, each module import and all the modules that need it.
2. Using a **bundler** 
They are collocated in a single file wrapped in a universal module (UMD). The wrapping module works as a global scope.
Example
```JAVASCRIPT
(function wrappingOuterScope(){
    var moduleOne = (function one(){
        // ..
    })();
    var moduleTwo = (function two(){
        // ..
    function callModuleOne() {
        moduleOne.someMethod();
    }
        // ..
    })();
})();
```
3. Using **global scope**
This global scope is used if is not using es modules or a bundler.
EXAMPLE
```JAVASCRIPT
var moduleOne = (function one(){
    // ..
})();
module2.js:
var moduleTwo = (function two(){
    // ..
    function callModuleOne() {
        moduleOne.someMethod();
    }
    // ..
})();
```
The global scope is also used to:
- JS expose its built-ins
    * primitives: undefined, null, Infinity, NaN
    * natives: Date(), Object(), String(), etc.
    * global functions: eval(), parseInt(), etc.
    * namespaces: Math, Atomics, JSON
    * friends of JS: Intl, WebAssembly
- The environment hosting the JS engine expose its own built-in:
    * console (and its methods)
    * the DOM (window, document, etc)
    * timers (setTimeout(..), etc)
    * web platform APIs: navigator, history, geolocation, WebRTC etc.

Node also expose other, of course depend of your JS engine.

## Where Exactly is this Global Scope?

Located in the outermost portion of a file. But different JS environments handle different the scope specially the global scope.

### Browser "Window"

```JAVASCRIPT
var studentName = "Kyle";
function hello() {
    console.log(`Hello, ${ studentName }!`);
}
hello();
// Hello, Kyle!
```
Is the same as, because is going to be added to the browser with `\<script>\</script>`
```JAVASCRIPT

var studentName = "Kyle";
function hello() {
    console.log(`Hello, ${ window.studentName }!`);
}
window.hello();
// Hello, Kyle!
```

### Globals Shadowing Globals

A global object property can be shadowed by a global variable if using a let:
```JAVASCRIPT
window.something = 42;
let something = "Kyle";
console.log(something);
// Kyle
console.log(window.something);
// 42
```

if we use `var` the window property will be changed as the variable 

NOTE: always use var in global and let and const in blocks.

### DOM Globals

Every time we create an id to an HTML, is created a lexical variable name that makes reference to that html
```JAVASCRIPT
<ul id="my-todo-list">
<li id="first">Write a book</li>
..
</ul>
// And the JS for that page could include:
first;
// <li id="first">..</li>
window["my-todo-list"];
// <ul id="my-todo-list">..</ul>
```

### What's a (Window) Name

```JAVASCRIPT
var name = 42;
console.log(name, typeof name);
// "42" string
```

A variable global name is predefined as getter and setter so its value is always going to be set as string.

Even though DOM element's ID and Windows.name Browser has some of the most pure global scope.

### Web Workers

Web workers are threads of the main program that execute code but has some limited access to some WEB APIS, and doesn't share the global scope.

In web worker Global scope can be accessed by self, example:

```JAVASCRIPT
var studentName = "Kyle";
let studentID = 42;
function hello() {
    console.log(`Hello, ${ self.studentName }!`);
}
self.hello();
// Hello, Kyle!
self.studentID;
// undefined
```

This global scope of Web workers are even cleaner

### Developer Tools Console/REPL

Tools that help you to make snipped code and improve your DX(developer experience) but is not 100% equal to work with real JS code. Some differences are:

- The behavior of the global scope (emulate a new one)
- Hoisting (see Chapter 5)
- Block-scoping declarators (let / const, see Chapter 6)
when used in the outermost scope

### ES Modules

ES6 added ES modules to support first-class and change slightly the behavior.

Example:
```JAVASCRIPT
var studentName = "Kyle";
function hello() {
    console.log(`Hello, ${ studentName }!`);
}
hello();
// Hello, Kyle!
export hello;
```

Despite being declared `studentName` and `hello` at the top of the module, `studentName` and `hello` are not global variables but module-wide variables.

ES modules encourages you to avoid the use of global scope.

### Node

When we're working in node every file are a module and their scope is module scope.

Are something like this when we create a module:
```JAVASCRIPT
function Module(module,require,__dirname,...) {
    var studentName = "Kyle";
    function hello() {
        console.log(`Hello, ${ studentName }!`);
    }
    hello();
    // Hello, Kyle!
    module.exports.hello = hello;
}
```
So if we want to access to the global scope we can do it using global.global

```JAVASCRIPT
global.studentName = "Kyle";
function hello() {
    console.log(`Hello, ${ studentName }!`);
}
hello();
// Hello, Kyle!
module.exports.hello = hello;
```
Remember global is not defined by JS but by node

## Global This

We can also access to the global by A function that returns this.

```JAVASCRIPT
const theGlobalScopeObject = (new Function("return this"))();
```

In ES2020 there a way to access to global called globalThis


## Globally Aware

Now that we have learned about global and how work in different JS environments. 

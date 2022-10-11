# Chapter 5: The (Not So) Secret Lifecycle of Variables

## When Can I use a Variable?

```JAVASCRIPT
greeting();
// Hello!
function greeting() {
    console.log("Hello!");
}
```

we can use greeting because of hoisting
- var and function are attached to the nearest enclosing function scope
- function declaration are hoisted and auto initialized to that function reference(Function Hoisting).
- let and const still hoist but to the nearest block-scope

### Hoisting: Declaration vs. Expression

Function Hoisting only applies to formal function declarations.

```JAVASCRIPT
greeting();
// TypeError
var greeting = function greeting() {
    console.log("Hello!");
};
```
Doesn't work, `‘undefined’ is not a function` or `‘greeting’ is not a function` because is undefined because is var.

### Variable Hoisting

```JAVASCRIPT
greeting = "Hello!";
console.log(greeting);
// Hello!
var greeting = "Howdy!";
```
This happens because:
- The identifier is hoisted and initialized as undefined;
- The greeting receives the 'Hello'
- Prints the greeting

## Hoisting: Yet Another Metaphor

Hoist is like lifting variables as if they were put at the beginning of our code.

Hoisting is referred to the compiled time operation that generate runtime instructions.

## Re-declaration?


```JAVASCRIPT
var studentName = "Frank";
console.log(studentName);
// Frank
var studentName;
console.log(studentName); // ???
```
The code above iss the same as 

```JAVASCRIPT
var studentName;
var studentName; // clearly a pointless no-op!
studentName = "Frank";
console.log(studentName);
// Frank
console.log(studentName);
// Frank
```

Because of hoisting.

`var student` doesn't mean `var studentName = undefined;`

```JAVASCRIPT
var studentName = "Frank";
console.log(studentName); // Frank
var studentName;
console.log(studentName); // Frank <--- still!
// let's add the initialization explicitly
var studentName = undefined;
console.log(studentName); // undefined <--- see!?
```

A repeated var declaration of the same identifier name in a scope is effectively a do-nothing operation.

```JAVASCRIPT
var greeting;
function greeting() {
console.log("Hello!");
}
// basically, a no-op
var greeting;
typeof greeting; // "function"

var greeting = "Hello!";
typeof greeting; // "string"
```

What if we use

```JAVASCRIPT
var studentName = "Frank";
let studentName = "Suzy";
and:
let studentName = "Frank";
var studentName = "Suzy";
```
Will thrown a SyntaxError because let doesn't allow re-declarations.


### Constants

Const cannot be reassigned and have to be initialized.

```JAVASCRIPT
const empty; // SyntaxError
//OR
const studentName = "Frank";
console.log(studentName);
// Frank
studentName = "Suzy"; // TypeError
```
- SyntaxErrors are compiling time errors
- Type errors are runtime error.

### Loops

In loops the scope always is reset and let is re-declared
```JAVASCRIPT
var keepGoing = true;
while (keepGoing) {
    let value = Math.random();
    if (value > 0.5) {
        keepGoing = false;
    }
}
```
However here var is not blocked scope so is not going to be re-declared but is going to be global.
```JAVASCRIPT
var keepGoing = true;
while (keepGoing) {
    var value = Math.random();
    if (value > 0.5) {
        keepGoing = false;
    }
}
```

What about fors?
```JAVASCRIPT
for (let i = 0; i < 3; i++) {
    let value = i * 10;
    console.log(`${ i }: ${ value }`);
}
// 0: 0
// 1: 10
// 2: 20
```
Is the same as 
```JAVASCRIPT
{
    // a fictional variable for illustration
    let $$i = 0;
    for ( /* nothing */; $$i < 3; $$i++) {
        // here's our actual loop `i`!
        let i = $$i;
        let value = i * 10;
        console.log(`${ i }: ${ value }`);
    }
    // 0: 0
    // 1: 10
    // 2: 20
}
```
So here is no re-declaration.

The same here:

```JAVASCRIPT
for (let index in students) {
    // this is fine
}
for (let student of students) {
    // so is this
}
```
What about constants in loops?

```JAVASCRIPT
var keepGoing = true;
while (keepGoing) {
    // ooo, a shiny constant!
    const value = Math.random();
    if (value > 0.5) {
        keepGoing = false;
    }
}
// This code is safe.
```

But it's complicated when we're working with fors

```JAVASCRIPT
for (const index in students) {
    // this is fine
}
for (const student of students) {
    // this is also fine
}
```
But not the general for-loop

```JAVASCRIPT
for (const i = 0; i < 3; i++) {
    // oops, this is going to fail with
    // a Type Error after the first iteration
}
```
The problem is that $$i must be increment in every loop

```JAVASCRIPT
var keepGoing = true;
for (const i = 0; keepGoing; /* nothing here */ ) {
keepGoing = (Math.random() > 0.5);
// ..
}
```
This is pointless no have sense.
## Uninitialized Variables (aka, TDZ)

Let is hoisted but is not initialized with undefined or with nothing.
```JAVASCRIPT
console.log(studentName);
// ReferenceError
let studentName = "Suzy";
```

```JAVASCRIPT
studentName = "Suzy"; // let's try to initialize it!
// ReferenceError
console.log(studentName);
let studentName;
```
Here we see an uninitialized so we have to assign and declare at the same time.

```JAVASCRIPT
let studentName = "Suzy";
console.log(studentName); // Suzy
//OR 
// ..
let studentName;
// or:
// let studentName = undefined;
// ..
studentName = "Suzy";
console.log(studentName);
//Suzy
```
Here `let studentName;` is equal as `let studentName=undefined` the difference with var is that var initializes at the top of the scope where let studentName not.

#### Temporal Dead Zone(TDZ)

Is the time in where a studentName can't be used until is declared. *`let and const`**;

The TDZ is the time window where a variable exists but is still uninitialized, and therefore cannot be accessed in any way
Consider

```JAVASCRIPT
askQuestion();
// ReferenceError
let studentName = "Suzy";
function askQuestion() {
    console.log(`${ studentName }, do you know?`);
}
```
let/const declarations do hoist their declarations to the top of their scopes, but unlike var, they defer the auto-initialization
## Finally Initialized

Now we know how is the life cycle of a variable. Thinking in compiling helps to understand whats the hoisting, TDX
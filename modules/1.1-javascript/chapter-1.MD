# Chapter 1: What's the scope?

We are going to check and see how Javascript manages internally.

## About this book

Will focus in the three pillars of javascript
- Scope
- Function closures
- Module design pattern

## Compiled vs interpreted

The difference is that **compiled** first will built the source code and then can be executed. On the other hand **interpreted** instead of built all the code at once is going to compile one line by one and then execute it.

Compiled and interpreted are not alway exclusive, for example there are other nuances of interpretation. However we have to say that Javascript it looks more than a compiled language than an interpreted one.

## Compiling Code

In classic compiler theory a program is processed by a compiler in three basic stages:

- **Tokenizing/Lexing:** Breaking string of character into chunks, called tokens Example:
    ```var a = 2;``` Is going to be transformed into ```var,a,=,;```. Lexing is going to verify if a token pertain to the same array of tokens.
- **Parsing:** Take a stream of tokens and turn into Abstract Syntax Tree (AST). For instance the first node is going to be a variable declaration 'var', then a node called 'a' then another node with '=' and then the '2' value.
- **Code Generation:** Take the AST and turn into an executable code. This is going to vary depend of the language.

These were explained just in broad strokes but what we already learned are relevant.

### Required: Two Phases

Javascript needs two phases first parsing/compilation, then execution. We can see parsing/compilation with syntax errors, early errors, and hoisting.

### Syntax from the start
Consider this
```JAVASCRIPT
var greeting = "Hello";
console.log(greeting);
greeting = ."Hi";
// SyntaxError: unexpected token .
```
Is not going to print console.log, if were interpreted should run one by one line, print 'Hello' and broke the code but isn't.

### Early Errors

Consider this
```JAVASCRIPT
console.log("Howdy");
saySomething("Hello","Hi");
// Uncaught SyntaxError: Duplicate parameter name not
// allowed in this context
function saySomething(greeting,greeting) {
    "use strict";
    console.log(greeting);
}
```
Is not going to print Howdy, but instead is going to trow a early error because saySomething is in strict mode and is not possible to duplicate parameters. This means that needs to be parsed before any execution

### Hoisting
Finally consider:

```JAVASCRIPT
function saySomething() {
    var greeting = "Hello";
    {
        greeting = "Howdy"; // error comes from here
        let greeting = "Hi";
        console.log(greeting);
    }
}
saySomething();
// ReferenceError: Cannot access 'greeting' before
// initialization
```

Here the problem is that greeting isn't initialized because is blocked scope. This means that JS engine has already processed this code in an earlier pass to set the scope and variable association.

Is it possible to interpret operations in AST without compiling the program? Yes it is, but is inefficient and bad.

## Compiler Speak

Variables/identifiers in a program has the rol of target(LHS) or source of value(RHS).

Example:
```JAVASCRIPT
var students = [
    { id: 14, name: "Kyle" },
    { id: 73, name: "Suzy" },
    { id: 112, name: "Frank" },
    { id: 6, name: "Sarah" }
];
function getStudentName(studentID) {
    for (let student of students) {
        if (student.id == studentID) {
            return student.name;
        }
    }
}
var nextStudent = getStudentName(73);
console.log(nextStudent);
// Suzy
```

### Targets

Targets are the variables that are assigned a value, if not the variable is a source.

In the example `students`, and `nextStudent` are obvious targets. However there are other ones less obvious like: 

- `for(let student of students)`
- `getStudentName(73)` the argument 73 ise assigned to the parameter studentID.
- `function getStudentName(studentID)` because a function is a special declaration is something like var getStudentName = function(studentID) but is not the same because `function myfun()` are initialized at the beginning of the scope, and `myfunc = function()` is going to wait until `=function()` assignment to be executed.

### Sources

The source are the left so
- In `for (let student of students)`, students.
- In `if (student.id == studentID)`, both student and studentID.
- In `return  student.name`, student
- In `getStudentName(73)`, the getStudentName.
- In `console.log(nextStudent)`, the console are a source reference.

student.id, console.log, student.name are properties not variable references.

## Cheating: Runtime Scope Modifications

Scope is determined in compiling/parsing and not in runtime. However is non-strict-mode there are technically two ways to cheat this rule.

**EVAL**
```JAVASCRIPT
function badIdea() {
    eval("var oops = 'Ugh!';");
    console.log(oops);
}
badIdea(); // Ugh!
```

Eval is going to execute code during the runtime, and change the scope. This is a bad idea because is very slow and not optimized.

**WITH**
```JAVASCRIPT
var badIdea = { oops: "Ugh!" };
with (badIdea) {
    console.log(oops); // Ugh!
}
```
badIdea was turned into a scope at runtime rather than compile time. Again this is bad for performance and readability reasons.

## Lexical Scope

Means that the scope is associated with the Lexing stage of compilation.

The lexical scope is controlled entirely by the placement of functions, blocks and variable declarations in relation to one another.

So references for a variable must be resolved from one of the scope that are lexically available going up to up until the global scope.

With compiling doesn't reserve memory for scope, this is done in the runtime, in compiling just create a map of all the lexical scopes.
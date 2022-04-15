# Chapter 6: Limiting Scope Exposure

We're going to study how to use function scope and blocked scope for our programs.

## Least Exposure

There are a principle of software engineering that improves the security called Principle of Last Privilege (POLP) and a variation Principle of Least Exposure (POLE) that says that a component of a function has to have least privilege, least access, least exposure

Use just a global scope is a bad idea that's why we have to use block, the result of exposing variables of one part to another are:
- **Naming collisions:** If we use for example for i global index in all of our code, we will have unexpected behaviors.
- **Unexpected Behavior:** If you expose variables/functions that are private for your program and other developers use them will have cause bugs and unexpected behaviors.
- **Unintended Dependency:** If you expose unnecessarily functions/variables and other developers use them is going to be harder to refactor the code.

## Hiding in Plain (Function) Scope

What if we do this
```JAVASCRIPT
var cache = {};
function factorial(x) {
    if (x < 2) return 1;
    if (!(x in cache)) {
        cache[x] = x * factorial(x - 1);
    }
    return cache[x];
}
factorial(6);
// 720
cache;
// {
// "2": 2,
// "3": 6,
// "4": 24,
// "5": 120,
// "6": 720
// }
factorial(7);
// 5040
```
We should hide cache, but how we do that?. We can use another function to hide that variable.

```JAVASCRIPT
// outer/global scope
function hideTheCache() {
    // "middle scope", where we hide `cache`
    var cache = {};
    return factorial;
    // **********************
    function factorial(x) {
        // inner scope
        if (x < 2) return 1;
        if (!(x in cache)) {
            cache[x] = x * factorial(x - 1);
        }
        return cache[x];
    }
}
var factorial = hideTheCache();
factorial(6);
// 720
factorial(7);
// 5040
```

### Invoking Function Expressions Immediately

Immediately Invoked Function Expression (IIFE) are useful to create a scope to hide function, and can be invoked in any part of our code.

### Function Boundaries

Be aware of using IIFE because can change the behavior of return and return the IIFE function instead. Also is going to change the binding of a `this` keyword and `break` and `continue` won't operate across an IIFE.
 
## Scoping with Blocks

We can create a scope with Block if we're using let, const.

```JAVASCRIPT
{
    // not necessarily a scope (yet)
    // ..
    // now we know the block needs to be a scope
    let thisIsNowAScope = true;
    for (let i = 0; i < 5; i++) {
        // this is also a scope, activated each
        // iteration
        if (i % 2 == 0) {
            // this is just a block, not a scope
            console.log(i);
        }
    }
}
// 0 2 4
```

NOT ALL `{..}` are eligible to become scopes.

- Object literals {..}
- Class uses {..}
- Function uses {..} but is a a function scope
- The switch{} for set case clauses.

We can use blocked scope for example

```JAVASCRIPT
if (somethingHappened) {
    // this is a block, but not a scope
    {
        // this is both a block and an
        // explicit scope
        let msg = somethingHappened.message();
        notifyOthers(msg);
    }
    // ..
    recoverFromSomething();
}
```

Another example

```JAVASCRIPT
function getNextMonthStart(dateStr) {
    var nextMonth, year;
    {
        let curMonth;
        [ , year, curMonth ] = dateStr.match(
                /(\d{4})-(\d{2})-\d{2}/
            ) || [];
        nextMonth = (Number(curMonth) % 12) + 1;
    }
    if (nextMonth == 1) {
        year++;
    }
    return `${ year }-${
            String(nextMonth).padStart(2,"0")
        }-01`;
}
getNextMonthStart("2019-12-25"); // 2020-01-01
```
Always try to use {..} for scopes to follow the principle (POLE)

Another example:

```JAVASCRIPT
function sortNamesByLength(names) {
    var buckets = [];
    for (let firstName of names) {
        if (buckets[firstName.length] == null) {
            buckets[firstName.length] = [];
        }
        buckets[firstName.length].push(firstName);
    }
    // a block to narrow the scope
    {
        let sortedNames = [];
        for (let bucket of buckets) {
            if (bucket) {
                // sort each bucket alphanumerically
                bucket.sort();
                // append the sorted names to our
                // running list
                sortedNames = [
                    ...sortedNames,
                    ...bucket
                ];
            }
        }
        return sortedNames;
    }
}
sortNamesByLength([
    "Sally",
    "Suzy",
    "Frank",
    "John",
    "Jennifer",
    "Scott"
    ]);
// [ "John", "Suzy", "Frank", "Sally",
// "Scott", "Jennifer" ]
```

Why do we use `var buckets` because semantic and technical reason, from the begining ofJS signaled that var belongs to the nearest function even if is inside a block.

### Where to let?

Kyle opining, use var for function scope, and let for other declarations.

Use POLE and ask your self what is the most minimal scope exposure that's sufficient for this variable?

```JAVASCRIPT
function diff(x,y) {
    if (x > y) {
        // `tmp` is still function-scoped, but
        // the placement here semantically
        // signals block-scoping
        var tmp = x;
        x = y;
        y = tmp;
    }
    return y-x;
}
```
Using var tmp we are saying that this variable owns to that block, even if in prior versions of ES6 weren't let available, but It's good for the reader.

In for example
```JAVASCRIPT
for (let i = 0; i < 5; i++) {
    // do something
}
```
We should always use `let`

if we use outside for.

```JAVASCRIPT
for (var i = 0; i < 5; i++) {
    if (checkValue(i)) {
        break;
    }
}
if (i < 5) {
    console.log("The loop stopped early!");
}
```
It works but is uncommon, we should always use let, so to solve this we have to:

```JAVASCRIPT
var lastI;
for (let i = 0; i < 5; i++) {
    lastI = i;
    if (checkValue(i)) {
        break;
    }
}
if (lastI < 5) {
    console.log("The loop stopped early!");
}
```

### What's the Catch?

```JAVASCRIPT
try {
    doesntExist();
}
catch (err) {
    console.log(err);
    // ReferenceError: 'doesntExist' is not defined
    // ^^^^ message printed from the caught exception
    let onlyHere = true;
    var outerVariable = true;
}
console.log(outerVariable); // true
console.log(err);
// ReferenceError: 'err' is not defined
// ^^^^ this is another thrown (uncaught) exception
```
In javascript a catch is blocked scope so var are outer an let are inner there, also `err` is inner, and from ES2019 are optional 
## Function Declarations in Blocks (FiB)

Function scope are like var, well No and yes.

```JAVASCRIPT
if (false) {
    function ask() {
        console.log("Does this run?");
    }
}
ask();
```
Can happen that:
1. Ask will fail with a `ReferenceError exception` because function ask is blocked scoped.
2. Ask will fail with a `TypeError exception` because the ask exist but it's undefined.
Depending in the JS environment, the JS specification says that is blocked scope, but browsers manage them outside scope because browser. Why browsers do this, because they use this kind of behavior before JS specification so if they change that, they're going to broke the web.

One use of use function inside block is to conditionally create different functions like:

```JAVASCRIPT
if (typeof Array.isArray != "undefined") {
    function isArray(a) {
        return Array.isArray(a);
    }
}
else {
    function isArray(a) {
        return Object.prototype.toString.call(a)
            == "[object Array]";
    }
}
```
There are some problems using this behavior because It's harder to debug. So better use this way, even if is less performant
```JAVASCRIPT
function isArray(a) {
    if (typeof Array.isArray != "undefined") {
        return Array.isArray(a);
    }
    else {
        return Object.prototype.toString.call(a)
            == "[object Array]";
    }
}
```
If the performance is a must try:

```JAVASCRIPT
var isArray = function isArray(a) {
    return Array.isArray(a);
};
// override the definition, if you must
if (typeof Array.isArray == "undefined") {
    isArray = function isArray(a) {
        return Object.prototype.toString.call(a)
            == "[object Array]";
    };
}
```
## Blocked Over

Now you know the rules of blocked scope and function scope and POLE.
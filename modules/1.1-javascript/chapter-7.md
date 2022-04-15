# Chapter 7: Using Closures

We learned about POLE and we can encapsulate in scopes using blocked scopes, but we're able to access to outer variables thanks to closure.

## See the Closure

Closure are just available in functions, and to show this behavior has to be in a different branch scope chain from where it was originally defined.

```JAVASCRIPT
// outer/global scope: RED(1)
function lookupStudent(studentID) {
    // function scope: BLUE(2)
    var students = [
        { id: 14, name: "Kyle" },
        { id: 73, name: "Suzy" },
        { id: 112, name: "Frank" },
        { id: 6, name: "Sarah" }
    ];
    return function greetStudent(greeting){
        // function scope: GREEN(3)
        var student = students.find(
            student => student.id == studentID
        );
        return `${ greeting }, ${ student.name }!`;
    };
}

var chosenStudents = [
    lookupStudent(6),
    lookupStudent(112)
];

// accessing the function's name:

chosenStudents[0].name;
// greetStudent

chosenStudents[0]("Hello");
// Hello, Sarah!

chosenStudents[1]("Howdy");
// Howdy, Frank!
```
ChosenStudents are still able to find in the blue scope the name of the students, this is Closure.


### Pointed Closure

We have forget about the 4 color scope.
```JAVASCRIPT
var student = students.find(
    student =>
        // function scope: ORANGE(4)
        student.id == studentID
);
```

### Adding Up Closures

Let's examine this example
```JAVASCRIPT
function adder(num1) {
    return function addTo(num2){
        return num1 + num2;
    };
}

var add10To = adder(10);
var add42To = adder(42);

add10To(15); // 25
add42To(9); // 51
```

Using `adder()` we create a new function and a new scope so when we execute `add10To()` It's going to be a new one and use closure.

### Live Link, Not a Snapshot

When we create a closure is a link not a snapshot, so we can update that reference.
Example

```JAVASCRIPT
function makeCounter() {
    var count = 0;
    return getCurrent(){
        count = count + 1;
        return count;
    };
}
var hits = makeCounter();
// later
hits(); // 1
// later
hits(); // 2
hits(); // 3
```

Is not mandatory to to use function, we can use just blocked scopes

```JAVASCRIPT
var hits;
{ // an outer scope (but not a function)
    let count = 0;
    hits = function getCurrent(){
        count = count + 1;
        return count;
    };
}
hits(); // 1
hits(); // 2
hits(); // 3
```
An mistake of believing that is a snapshot with for

```JAVASCRIPT
var keeps = [];
for (var i = 0; i < 3; i++) {
    keeps[i] = function keepI(){
        // closure over `i`
        return i;
    };
}
keeps[0](); // 3 -- WHY!?
keeps[1](); // 3
keeps[2](); // 3
```
This happen because `i` is a var and It's not a snapshot but a reference.
What if I want to get a snapshot?

```JAVASCRIPT
var keeps = [];
for (var i = 0; i < 3; i++) {
    // new `j` created each iteration, which gets
    // a copy of the value of `i` at this moment
    let j = i;
    // the `i` here isn't being closed over, so
    // it's fine to immediately use its current
    // value in each loop iteration
    keeps[i] = function keepEachJ(){
        // close over `j`, not `i`!
        return j;
    };
}
keeps[0](); // 0
keeps[1](); // 1
keeps[2](); // 2
```
Another way using `let`

```JAVASCRIPT
var keeps = [];
for (let i = 0; i < 3; i++) {
    // the `let i` gives us a new `i` for
    // each iteration, automatically!
    keeps[i] = function keepEachI(){
        return i;
    };
}
keeps[0](); // 0
keeps[1](); // 1
keeps[2](); // 2
```
Since we're using let, every time is created a new variable in each loop, check Chapter 5.

### Common Closures: Ajax and Events

Closure is most commonly encountered with callbacks:

```JAVASCRIPT
function lookupStudentRecord(studentID) {
    ajax(
        `https://some.api/student/${ studentID }`,
        function onRecord(record) {
            console.log(
                `${ record.name } (${ studentID })`
            );
        }
    );
}
lookupStudentRecord(114);
// Frank (114)
```
Here in onRecord still have access to the studentId that is going to be invoked in a future.

Also EventHandlers are another common usage of closure:

```JAVASCRIPT
function listenForClicks(btn,label) {
    btn.addEventListener("click",function onClick(){
        console.log(
            `The ${ label } button was clicked!`
        );
    });
}
var submitBtn = document.getElementById("submit-btn");
listenForClicks(submitBtn,"Checkout");
```
Here label is going to still be used in onClick.

### What If I Can't See It?

If a closure Exist but it cannot be observed in our program doesn't matter of course.
Using lexical scope
```JAVASCRIPT
function say(myName) {
    var greeting = "Hello";
    output();
    function output() {
        console.log(
            `${ greeting }, ${ myName }!`
        );
    }
}
say("Kyle");
// Hello, Kyle!
```

Global variables doesn't need to be closed over
Example
```JAVASCRIPT
var students = [
    { id: 14, name: "Kyle" },
    { id: 73, name: "Suzy" },
    { id: 112, name: "Frank" },
    { id: 6, name: "Sarah" }
];
function getFirstStudent() {
    return function firstStudent(){
        return students[0].name;
    };
}
var student = getFirstStudent();
student();
// Kyle
```
students It's outside of `firstStudent()` so is just lexical scope not closure.

Here is going to work the GC because studentID is not being used
```JAVASCRIPT
function lookupStudent(studentID) {
    return function nobody(){
        var msg = "Nobody's here yet.";
        console.log(msg);
    };
}
var student = lookupStudent(112);
student();
// Nobody's here yet.
```

If there is no function invocation, closure can't be observed

```JAVASCRIPT
function greetStudent(studentName) {
    return function greeting(){
        console.log(
            `Hello, ${ studentName }!`
        );
    };
}
greetStudent("Kyle");
// nothing else happens
```

### Observable Definition

Definition of closure:Closure is observed when a function uses variable(s) from outer scope(s) even while running in a scope where those variable(s) wouldn’t be accessible.

The key of that definition:
- Must be a function involved
- Must reference at least one variable from an outer scope
- Must be invoked in a different branch of the scope chain from the variable(s)

## THe Closure Lifecycle and Garbage Collection (GC)

If a function close over a variable then that variable is not going to be GC'd because It's used.

Consider
```JAVASCRIPT
function manageBtnClickEvents(btn) {
    var clickHandlers = [];
    return function listener(cb){
        if (cb) {
            let clickHandler =
            function onClick(evt){
                console.log("clicked!");
                cb(evt);
            };
            clickHandlers.push(clickHandler);
            btn.addEventListener(
                "click",
                clickHandler
            );
        }
        else {
            // passing no callback unsubscribes
            // all click handlers
            for (let handler of clickHandlers) {
                btn.removeEventListener(
                    "click",
                    handler
                );
            }
            clickHandlers = [];
        }
    };
}
// var mySubmitBtn = ..
var onSubmit = manageBtnClickEvents(mySubmitBtn);
onSubmit(function checkout(evt){
// handle checkout
});
onSubmit(function trackAction(evt){
// log action to analytics
});
// later, unsubscribe all handlers:
onSubmit();
```

When we 'are adding  new call back functions `cb` the reference makes impossible to GC'd but When unsubscribing all of them are going to be GC'd

### Per Variable or Per Scope

Conceptually closure is per variable so saves reference just per variable but is more complicated
Example
```JAVASCRIPT
function manageStudentGrades(studentRecords) {
    var grades = studentRecords.map(getGrade);
    return addGrade;
    // ************************
    function getGrade(record){
        return record.grade;
    }
    function sortAndTrimGradesList() {
        // sort by grades, descending
        grades.sort(function desc(g1,g2){
            return g2 - g1;
        });
        // only keep the top 10 grades
        grades = grades.slice(0,10);
    }
    function addGrade(newGrade) {
        grades.push(newGrade);
        sortAndTrimGradesList();
        return grades;
    }
}

var addNextGrade = manageStudentGrades([
    { id: 14, name: "Kyle", grade: 86 },
    { id: 73, name: "Suzy", grade: 87 },
    { id: 112, name: "Frank", grade: 75 },
    // ..many more records..
    { id: 6, name: "Sarah", grade: 91 }
]);
// later
addNextGrade(81);
addNextGrade(68);
// [ .., .., ... ]
```

For example here the variables `sortAndTrimGradesList(), grades` are references so isn't going to be GC'd but `getGrade, studentRecords` should be GC'd.

But consider
```JAVASCRIPT
function storeStudentInfo(id,name,grade) {
    return function getInfo(whichValue){
        // warning:
        // using `eval(..)` is a bad idea!
        var val = eval(whichValue);
        return val;
    };
}
var info = storeStudentInfo(73,"Suzy",87);
info("name");
// Suzy
info("grade");
// 87
```
Notice that here the id, name and grade are saved the references so GC'd isn't applied so that depends.
Many moderns JS engines do apply optimization that removes variables from a closure scope But not all of them just new but older not. So Even tough closure must be per scope, isn't reality. So sometimes is better to remove by yourself.

```JAVASCRIPT
function manageStudentGrades(studentRecords) {
    var grades = studentRecords.map(getGrade);
    // unset `studentRecords` to prevent unwanted
    // memory retention in the closure
    studentRecords = null;
    return addGrade;
    // ..
}
```

Here we're not removing `studentRecords` from the scope, we cannot control, but we're ensuring that is going to be free of that data so the array can be GC'd.

## An Alternative Perspective

```JAVASCRIPT
// outer/global scope: RED(1)
function adder(num1) {
    // function scope: BLUE(2)
    return function addTo(num2){
        // function scope: GREEN(3)
        return num1 + num2;
    };
}
var add10To = adder(10);
var add42To = adder(42);
add10To(15); // 25
add42To(9); // 51
```
We can say that closure instead describes the magic of keeping alive a function instance, along with its whole cope environment and chain, for as long as there’s at least one reference to that function instance floating around in any other part of the program.

## Why Closure?

Example without Closure using ajax

```JAVASCRIPT
var APIendpoints = {
    studentIDs:
    "https://some.api/register-students",
    // ..
};
var data = {
    studentIDs: [ 14, 73, 112, 6 ],
    // ..
};
function makeRequest(evt) {
    var btn = evt.target;
    var recordKind = btn.dataset.kind;
    ajax(
        APIendpoints[recordKind],
        data[recordKind]
    );
}
// <button data-kind="studentIDs">
// Register Students
// </button>
btn.addEventListener("click",makeRequest);
```
This is inefficient so we can

```JAVASCRIPT
var APIendpoints = {
    studentIDs:
    "https://some.api/register-students",
    // ..
};
var data = {
    studentIDs: [ 14, 73, 112, 6 ],
    // ..
};
function setupButtonHandler(btn) {
    var recordKind = btn.dataset.kind;
    btn.addEventListener(
        "click",
        function makeRequest(evt){
            ajax(
                APIendpoints[recordKind],
                data[recordKind]
            );
        }
    );
}
// <button data-kind="studentIDs">
// Register Students
// </button>
setupButtonHandler(btn);
```
We could have looked up both the url and data once at setup

```JAVASCRIPT
function setupButtonHandler(btn) {
    var recordKind = btn.dataset.kind;
    var requestURL = APIendpoints[recordKind];
    var requestData = data[recordKind];
    btn.addEventListener(
        "click",
        function makeRequest(evt){
            ajax(requestURL,requestData);
        }
    );
}
```

Adapting partial application we can further iprove the preceding code

```javascript
function defineHandler(requestURL,requestData) {
    return function makeRequest(evt){
        ajax(requestURL,requestData);
    };
}
function setupButtonHandler(btn) {
    var recordKind = btn.dataset.kind;
    var handler = defineHandler(
        APIendpoints[recordKind],
        data[recordKind]
    );
    btn.addEventListener("click",handler);
}
```
Moving defineHandler we are able to later reuse them.

## Closer to Closure

We can say that closure:
- **Observational:** closure is a function instance remembering its outer variables even as that function is passed to and invoked in other scopes.
- **Implementational:** closure is a function instance and its scope environment preserved in-place while any references to it are passed around and invoked from other scopes.

Benefits
- Readability, we can encapsulate variables in functions.
- Improve efficiency so we can access to previously determined information.


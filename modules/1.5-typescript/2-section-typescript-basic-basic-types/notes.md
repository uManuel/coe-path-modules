# Notes

## Core types

- number: No difference between integers and floats like javascript
- string: All text values like javascript
- boolean: `true` or `false`, difference with javascript because there is no truthy or falsy value.
- object: the same as javascript but can have more specific types, type of object.
- Array: Can be flexible or strict(just one type of element)
- Tuple: Array with a fixed length and types (typescript)
- Enum: Automatically enumerate global constant identifiers like an object (typescript) and set constant values
- Unknown: can be any type of data but unknown.
- Any: can save any kind type.

## Union types

We can be more flexible adding two or more types of a value
```JAVASCRIPT
function add(n1: number|string, n2: number|string) { // here we can have a number or string type
    let result;
    if (typeof n1==='number' && typeof n2==='number') {
        result = n1+n2;
    }else{
        result=n1.toString()+n2.toString();
    }

    return result;
  }
```

## Literal types

With this feature we are able to specify what kind of literals can have a variable
```JAVASCRIPT
function add(n1: number|string, n2: number|string, resultConversion: 'as-number'|'as-text') {
    let result;
    if (typeof n1==='number' && typeof n2==='number' || resultConversion==='as-number') {
        result = n1+n2;
    }else{
        result=n1.toString()+n2.toString();
    }

    return result;
  }
```

## Custom types

We can create a custom type with:

```JAVASCRIPT
type Combinable = number|string;
type ConversionDescriptor = 'as-number'|'as-text';
function add(n1: Combinable, n2: Combinable, resultConversion: ConversionDescriptor) {
    let result;
    if (typeof n1==='number' && typeof n2==='number' || resultConversion==='as-number') {
        result = n1+n2;
    }else{
        result=n1.toString()+n2.toString();
    }

    return result;
  }
```

Also we can setup more complex objects like
```JAVASCRIPT
type User = { name: string; age: number };
const u1: User = { name: 'Max', age: 30 };
```
Or simplify 

```JAVASCRIPT
function greet(user: { name: string; age: number }) {
  console.log('Hi, I am ' + user.name);
}
 
function isOlder(user: { name: string; age: number }, checkAge: number) {
  return checkAge > user.age;
}
```
To this

```JAVASCRIPT
type User = { name: string; age: number };
 
function greet(user: User) {
  console.log('Hi, I am ' + user.name);
}
 
function isOlder(user: User, checkAge: number) {
  return checkAge > user.age;
}
```

## Function return type and avoid

We can add a type return to a function or void

```JAVASCRIPT
function add (n1:number,n2:number):number{
    return n1+n2;
}

// We have to set type return as void not undefined.
function printResult(num:number):void{
    console.log('Result: '+ num)
}
```

## Function as type

We can set a variable with the type of function

```JAVASCRIPT

// It can be any kind of function
let combineValues: Function;

// It can be a function that return a number and has no parameters
let combineValuesArrow: ()=>number;

// combineValues = 5;

console.log()
```

## Function Type && Callbacks 

We can set function types in callbacks as example:

```JAVASCRIPT
// Can be void, but it's any in reality because doesn't really care about this.
function addAndHandle(n1:number,n2:number,cb:(num:number)=>void){
  const result = n1+n2;
  cb(result);
}
//calling
addAndHandle(10,20,(result)=>{
  console.log(result)
});
```

## Unknown type

`Unknown` is similar to `any` but is more restrictive for instance:

```JAVASCRIPT
let userInput: unknown;
let userName: string;

userInput = 5; //No error
userInput = 'Max'; //No error

//userName = userInput; //error if userInput is unknown because is not guaranteed to be a string..

if(typeof userInput ==='string'){
  userName=userInput;// No error here, because needs extra type check here with unknown type if it where any shouldn't need this checking.
}
```

## The never type 

The never type is when an error is thrown so is not going to return nothing, for instance:

```JAVASCRIPT
function generateError(message: string, code:number):never{// Never is similar to void
  throw {message:message, errorCode:code};
  // while (true) {}
}

const result = generateError('An error occurred',500);
console.log(result); // never is going to be show the result
```


# Notes

## Let and const

- Added in ES6.
- const and let are block scoped.
- const needs to be initialized
- const can't ve re assign a value.

## Arrow functions

Can be written:

```JAVASCRIPT
const add = (a: number, b: number) => a + b;

const printOutput: (a: number | string) => void = output => console.log(output);

const button = document.querySelector('button');

if (button) {
  button.addEventListener('click', event => console.log(event));
}

printOutput(add(5, 2));
```

## Default function parameter

We can add default function parameter for instance:

```JAVASCRIPT
const add= (a:number,b:number=1)=>a+b;// Adding default

add(10) // It works even if there are no second argument


```

## Spread operator

With spread operator we can copy an array, object into another with `...` three dots.

```javascript
const hobbies = ['Sports','Cooking'];
const activeHobbies = ['Hiking'];

activeHobbies.push(...hobbies);// activeHobbies.push(hobbies[0],hobbies[1]);

const person={
    name: 'Max',
    age: 30
};

const copiedPerson = {...person}; // An original copy not pointer
```

## Rest operator

If we want N number of parameters in a function we can use rest operator

```JAVASCRIPT
const add = (...numbers:number[])=>{ // we can also add exactly number of parameters with ...numbers:number[number,number,number]
    return numbers.reduce((curResult,curValue)=>{
        return curResult + curValue;
    },0);
}

const addedNumbers = add(5,10,2,3.7);

```

## Array and object destructuring

We can divide an array or object into their attributes, or arrays.

```JAVASCRIPT
const hobbies =['Play Waly','Play Dota 2'];

const [hobby1,hobby2, ...remainingHobbies]= hobbies; // Destructured by order of array

const {firstName:userName,age} = person; // Destructured by name attribute

```

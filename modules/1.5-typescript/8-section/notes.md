# Notes

**Meta programming**

You won't use decorator's that often to have a direct impact on the end users.

## Decorators

First you have to enable experimental Decorators in `tsconfig.json`.

```json
{
    "experimentalDecorators":true // Enables experimental support for ES7 decorators.
}
```

### Creating a first class decorator.

- Decorators are executed in the class definition, not when is instantiated an object.

```typescript
function Logger(constructor:Function){ // Generally decorators are named with uppercase
    console.log('Logging...');
    console.log(constructor);
}

@Logger
class Person {
    name='Manuel';
    constructor(){
        console.log('Creating manuel object');
    }
}
```

### Working with Decorator factories

Decorator factories give us more possibilities of configuring what the decorator then does internally.
- We can send parameters to the decorator

```typescript
function Logger(logString: string){
    return function(constructor:Function){
        console.log(logString);
        console.log(constructor);
    }
}

@Logger('LOGGING - PERSON')
class Person{
    name = 'Max';

    constructor(){
        console.log('Creating a new person object');
    }
}
```

### Building more useful decorators

We can create something useful like decorators in Angular.
```typescript
function WithTemplate(template: string, hookId: string) {
  return function(constructor: any) {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  }
}

@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}
```

### Adding multiple decorators

When we add multiple decorators they're going to be executed in the following order:

- Factory decorators are going to be executed from top to bottom.
- The decorators are going to be executed from bottom to top.

```typescript
function Logger(logString: string) {
    console.log('Factory decorator executed first');
  return function(constructor: Function) {
    console.log('Decorator executed second');
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
    console.log('Factory decorator executed second');
  return function(constructor: any) {
    console.log('Decorator executed first');
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  }
}

@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}
```

### Diving into decorators

**Property Decorators**

We are also able to add the decorator in a property of a class, so we can do somethings with their properties/

**Accessor Decorators**

We can also use them in accessor decorators

**Method Decorators**

We can also use them in methods

**Parameter Decorators** 

We can also use them in parameters

All of these decorators are executed when the class is defined, Example.

```typescript
function LogProperty(target: any, propertyName: string|Symbol ){
    console.log('Property decorator');
    console.log(target);
    console.log(propertyName);
}

function LogAccessor(target:any, name:string, descriptor: PropertyDescriptor){
    console.log("Access decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function LogMethod(target:any, name:string|Symbol, descriptor: PropertyDescriptor){
    console.log('Method decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function LogParameter(target:any, name:string|Symbol, position: number){
    console.log('Parameter decorator');
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product{
    @LogProperty
    title:string
    private _price:number;

    @LogAccessor
    set price(val:number){
        if(val>0){
            this._price=val;
        }
        throw new Error("Value below 0.");
    }

    constructor(t:string,p:number){
        this._price=p;
        this.title=t;
    }

    @LogMethod
    getPriceWithTax(@LogParameter tax:number){
        return this._price*(1+tax);
    }
}
```

### How to execute a decorator when It's instantiated

To execute a decorator when it's instantiated we have to modify the constructor of a class, for instance:

We have to return a new constructor that is going to modify the current class, for instance:

``` typescript
function WithTemplate(template: string, hookId: string) {
    console.log('TEMPLATE FACTORY');
    return function <T extends {new(...args:any[]):{name:string}}> (originalConstructor: T) {
        // Returning a new constructor that is going to replace the old one.
        return class extends originalConstructor { // Original constructor or class?
            constructor(...args:any[]){
                super(args);
                console.log('Rendering template');
                const hookEl = document.getElementById(hookId);
                
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    };
}

// @Logger('LOGGING - PERSON')
@Logger('LOGGING')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name:string;

    constructor(name:string) {
        this.name=name;
        console.log('Creating person object...');
    }
}

const pers = new Person('Claudia');

console.log(pers);
```

### Other decorator return types 

We are also able to return new types with :

- Methods: We can return the `Property Descriptors`.
- Accessors: We can also 

#### Adding autobindig in a method of an object.

We can add new functionalities before the execution of a method.

```typescript
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    console.log(descriptor);
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {// Before the execution of the function
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

class Printer {
    message = 'This works!';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();
p.showMessage();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);
```

### Decorator for validation

We can also add decorators for validation, like in many libraries.

```typescript
// This is going to be our configuration of our config.
// {
//     <propName>:['config1','config2']
// }
const config: { [propName: string]: string[] } = {}; // Applying index property.

const addValidator = (propName: string, type: string) => {
    // config[propName] = config[propName] ? [...config[propName], type]:[type];
    config[propName] = config[propName] ? [...config[propName], type]:[type];
}

const Required = (_: any, propName: string) => addValidator(propName, 'required');
const Maxlength = (_: any, propName: string) => addValidator(propName, 'maxlength');
const Positive = (_: any, propName: string) => addValidator(propName, 'positive');

console.log(Object.entries(config));


const validate = (course: any) =>
    Object.entries(config).every(([propName, types]) =>
        types.every(type =>
            type === 'required' && course[propName] ||
            type === 'positive' && course[propName] > 0 ||
            type === 'maxlength' && course[propName].length < 5
        )
    )

class Course {

    @Required @Maxlength title: string;
    @Required @Positive price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this.price = price;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);

    if (!validate(createdCourse)) {
        alert('Invalid input, please try again');
        return;
    }
    console.log(createdCourse);
}); 
```
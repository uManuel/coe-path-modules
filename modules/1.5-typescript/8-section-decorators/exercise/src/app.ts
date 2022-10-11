// function Logger(logString: string) {
//     console.log('LOGGER FACTORY');
//     return function (constructor: Function) {
//         console.log(logString);
//         console.log(constructor);
//     };
// }

// function WithTemplate(template: string, hookId: string) {
//     console.log('TEMPLATE FACTORY');
//     return function <T extends { new(...args: any[]): { name: string } }>(
//         originalConstructor: T
//     ) {
//         return class extends originalConstructor {
//             constructor(..._: any[]) {
//                 super();
//                 console.log('Rendering template');
//                 const hookEl = document.getElementById(hookId);
//                 if (hookEl) {
//                     hookEl.innerHTML = template;
//                     hookEl.querySelector('h1')!.textContent = this.name;
//                 }
//             }
//         };
//     };
// }

// // @Logger('LOGGING - PERSON')
// @Logger('LOGGING')
// @WithTemplate('<h1>My Person Object</h1>', 'app')
// class Person {
//     name = 'Max';

//     constructor() {
//         console.log('Creating person object...');
//     }
// }

// const pers = new Person();

// console.log(pers);

// // ---

// function Log(target: any, propertyName: string | Symbol) {
//     console.log('Property decorator!');
//     console.log(target, propertyName);
// }

// function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
//     console.log('Accessor decorator!');
//     console.log(target);
//     console.log(name);
//     console.log(descriptor);
// }

// function Log3(
//     target: any,
//     name: string | Symbol,
//     descriptor: PropertyDescriptor
// ) {
//     console.log('Method decorator!');
//     console.log(target);
//     console.log(name);
//     console.log(descriptor);
// }

// function Log4(target: any, name: string | Symbol, position: number) {
//     console.log('Parameter decorator!');
//     console.log(target);
//     console.log(name);
//     console.log(position);
// }

// class Product {
//     @Log
//     title: string;
//     private _price: number;

//     @Log2
//     set price(val: number) {
//         if (val > 0) {
//             this._price = val;
//         } else {
//             throw new Error('Invalid price - should be positive!');
//         }
//     }

//     constructor(t: string, p: number) {
//         this.title = t;
//         this._price = p;
//     }

//     @Log3
//     getPriceWithTax(@Log4 tax: number) {
//         return this._price * (1 + tax);
//     }
// }

// const p1 = new Product('Book', 19);
// const p2 = new Product('Book 2', 29);

// function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;
//     console.log(descriptor);
//     const adjDescriptor: PropertyDescriptor = {
//         configurable: true,
//         enumerable: false,
//         get() {// Before the execution of the function
//             const boundFn = originalMethod.bind(this);
//             return boundFn;
//         }
//     };
//     return adjDescriptor;
// }

// class Printer {
//     message = 'This works!';

//     @Autobind
//     showMessage() {
//         console.log(this.message);
//     }
// }

// const p = new Printer();
// p.showMessage();

// const button = document.querySelector('button')!;
// button.addEventListener('click', p.showMessage);


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
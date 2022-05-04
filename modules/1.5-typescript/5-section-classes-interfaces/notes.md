# Notes

## Create a Class, Constructor, the this keyword, private and public access modifiers.

To create a class we just have to use the keyword class.

```typescript
class Department{
    name: string; // by default It's defined as public.
    private employees: string[]; // It's not accessible for an employee.

    constructor(n:string){ // constructor
        this.name=n;
        this.employees=[]
    }

    describe(this:Department){ //It's saying that this methods needs to have a context with the attributes names as Department.
        console.log('Department: '+this.name)
    }

    addEmployee(employeeName:string){
        this.employees.push(employeeName);
    }

    printEmployeeInformation(){
        console.log(this.employees.length);
        console.log(this.employees)
    }
}

const accounting = new Department('Accounting');

accounting.describe(); 

//const accountingCopy = {describe:accounting.describe} // Error, because here the context doesn't has name

const accountingCopy = {name:'DUMMY', describe: accounting.describe};

accountingCopy.describe();
```


## Shorthand initialization

We can initialize in a constructor automatically and set public or private attributes, should look like:

```TYPESCRIPT
class Department{
    //private id:string; // we avoid this with the shorthand
    //public  name:string; // we avoid this with the shorthand.
    constructor(private id:string,public name:string){ // always use private or public for the shorthand
        // This have to be empty
    }
}
```

## Readonly properties

With readonly property we say that an attribute just can be initialized once, and can't be changed.

```typescript

class Department{
    //private id:string; // we avoid this with the shorthand
    //public  name:string; // we avoid this with the shorthand.
    constructor(private readonly id:string,public name:string){ // always use private or public for the shorthand
        // This have to be empty
    }
}
```

## Inheritance

We can inherit from a parent class to another one that is more specialized with `extend` keyword. Also something important It's that we can use the constructor of a parent class that is `super()`

```typescript
class parentClass{
    value1:string,
    value2:string,
    constructor(value1:string,value2:string){
        this.value1=value1;
        this.value2=value2;
    }
}

class childClass {
    value3:number,
    constructor(value3:number){
        super('defaultvalue','defaultvalue');
        this.value3=value3;
    }

    newMethod(){

    }
}
```

## Overriding Properties && The "protected" modifier.

We can override a method just adding a method with the same name
```typescript
class test1{
    myMethod(){
        console.log('test1 Method')
    }
}

const t1 = new test1();

t1.myMethod();

class test2{
    myMethod(){
        console.log('My override method in test2');
    }
}
const t2 = new test2();

t2.myMethod();
```

We can also use `protected` access modifier, this will tell that a property is accessible by the class and children classes, on the other hand `private` are just accessed by the parent class. 


## Getters and setters

We can also add getters or setters that are functions that return a value or set a value, for example:

```typescript
class Clients{
    private listOfClients:number[];

    get firstClient(){
        return listOfClients[0];
    }
    set firstClient(name){
        this.listOfClients[0]=name;
    }
}

const clients = new Clients();
clients.firstClient = 'Manuel'; // using set

console.log(clients.firstClient);// Using get
```

## Static Method & Properties

Static method and properties are values that doesn't need to be instantiated to be executed or used.

```typescript

Math.PI // static propertie
Math.pow() // static method

```

If you want to access a static property or method, you are only available using the `Class.staticPropertyMethod` not available using `this` that makes reference to the instantiation of the object.

## Abstract classes

Abstract classes are used for only extent a parent class to children class, also can be used abstract methods that are methods without implementation but has to be implemented by children classes. Also can be abstracts properties, that are going to be used by an abstract class and implemented.

## Singleton and private constructors

It's possible to use private constructors that won't let us to instantiate a class, so we can use a singleton structure.

```typescript
class Singleton{
    private static instance: Singleton;

    private constructor(){}
    }

    static getInstance(){
        if(Singleton.instance){
            return this.instance;
        }
        this.instance = new Singleton();
        return this.instance;
    }
}

```

## Interface

- Interfaces just exist in typescript and describes how to structure of an object.
- Interfaces can be implemented in many classes.
- A class can implement many interfaces.
- An interface doesn't implement methods or initialize properties.

```typescript
interface Person{
    name:string;
    age:number;

    greet(phrase:string):void;
}

let user1: Person;

user1={
    name:'Max',
    age:30,
    greet(phrase:string){
        console.log(phrase+' '+ this.name);
    }
};

user1.greet('Hi there, I\'m')
```

### Differences between interfaces and types

- Interfaces can be used in classes, types don't
- Types are more flexible we can use union types
- Interfaces are clearer and are more used in objects


### DIfferences between interfaces and classes

- Interfaces can be implemented more than 1 than inheritance.
- Interfaces just show how is the structure, but the user has to implement their functionalities.


### Readonly interface properties

we can't add public or private in an interface but we can use readonly. Using readonly doesn't allow to change the value of a property once is instantiated.

### Extending interfaces

We can use inheritance between interfaces, so an interface extend implementation of another interface.

### Optional parameters or properties

We can add optional properties with `?` at the end of the name of a property or parameter.


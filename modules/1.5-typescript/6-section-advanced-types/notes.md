# Notes

## Intersection types

With intersection types we're able to merge two types so they create a new one with their structure.

```typescript
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee // intersection of employee and admin

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date()
};

```

## Type guards

Type guards are a term used to check if an object is instantiated by a specific class, or if a value is a string or number for example.

```typescript
class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo ...' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) { // Using instantiateof for classes we can also use 'in' to check if a property is in an object.
    vehicle.loadCargo(1000);
  }
}

type Combinable = string | number;

function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') { //Using typeof 
    return a.toString() + b.toString();
  }
  return a + b;
}
```

## Discriminated Union

Very important when we're working with object and union types. We describe an object with the `type:'typeName'` property so 'discriminate' an object and help us with guards, for instance:

```typescript
interface Bird{
    type:'Bird',
    flyingSpeed: number
}
interface Horse{
    type:'Horse',
    runningSpeed:number
}

type Animal = Horse | Bird;

function moveAnimal(animal:Animal){
    let speed;
    switch (animal.type){
        case 'Bird':
            speed=flyingSpeed;
            break;
        case 'Horse':
            speed=runningSpeed;
            break;
    }
}

```

## Typecasting

We can cast one type of data into another for example:

```typescript
const userInputElement = document.getElementById('user-input');
//const userInputElement = <HTMLInputElement>document.getElementById('user-input');
//const userInputElement = document.getElementById('user-input') as HTMLInputElement;

if (userInputElement){
    (userInputElement as HTMLInputElement).value = 'Hi there!';//casting here
}
```

## Index properties

With index properties we are able to write flexible object properties. We can set an array of properties.


```typescript
interface ErrorContainer{// can have {email:'Not a valid email', userName:'must start with a character'}
    [prop:string]: string;
}

const errorBag: ErrorContainer={
    email: 'Not a valid email!',
    username: 'Must start with a capital character!',
    //1:'Number'  also okay because 1 is also a string, however if [prop:number] email:'not a valid email' is not correct.

};

```

## Function overloads

We can overload a function so can have the same name but different types of parameters like:

```typescript
type combinable=string||number;

function add(a:number,b:number):number
function add(a:string,b:string):string
function add(a:string,b:number):string
function add(a:number,b:string):string
function add(a:Combinable, b:Combinable){
    if (typeof a ==='string'||typeof b ==='string'){
        return a.toString() + b.toString();
    }
    return a+b;
}
const result = add('Manuel','Claudia');
result.split(' '); //does it know that is a string because the overloading.
```

## Optional Chaining

Optional chaining help us to avoid runtime errors when for example we have a fetched object, and we want to access to one of his properties, and access again to a nested property. If we access to a property of an undefined or null property our app is going to break.

```typescript
const fetchedUserData = {
    id:'ui1',
    name:'Manuel',
    job:{title:'CEO',description:'My own company'}
}

console.log(fetchedUserData?.job?.title); // if job does't exist the code still will run.
```

## Nullish coalescing 

Help us to mitigate some bugs with undefined or null.

```typescript
const userInput = undefined;

const storeData = userInput ?? 'DEFAULT'; // if userInput is undefined or null will be assigned 'DEFAULT'

console.log(storedData);

```
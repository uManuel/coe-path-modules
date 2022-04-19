# Notes

## What are generics, Built-in generics?

Generic is type that is connected to another type, for instance:

```TYPESCRIPT
const names : Array<string> = [];
//names[0].split() it works because generic Array is a string.

const promise : Promise<number> = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(10);
    }, 2000);
});

promise.then(data=>{
    data.split('')// doesn't work because returns a number
});
```

## Create an generic function and constraints

It's pretty simple.

```JAVASCRIPT
function merge<T extends object,U extends object>(objA:T,objB:U){ // Automatically knows that is going to return the intersection of T and U
    return Object.assign(objA,objB);
}

const mergedObj = merge({name:'Manuel'},{age:26}); // mergedObject has autocomplete in their properties.
// const mergedObj = merge<{name:string},{age:number}>({name:'Manuel'},{age:26}); // We can define the generic types also, but is not necessary here
const mergedObj = merge({name:'Manuel'},26); // error, because there are constraints.



console.log(mergedObj);
```

## Another generic function

In this example we create a function and the element `T` has the property length, that's why extends Lengthy.

```typescript
interface Lengthy{
    length:number;
}

function countAndDescribe<T extends Lengthy>(element: T):[T, string]{
    let descriptionText = 'Got no value';
    if (element.length===1){
        descriptionText = 'Go 1 element';
    } else if (element.length>1){
        descriptionText = 'Got'+element.length+' elements.'
    }
    return [element,descriptionText];
}

countAndDescribe(['Eat','food']); // The parameter has length.
```

## The keyof constraint

This constraints is used when you want a parameter is the key of another parameter, for example:

- It gives you flexibility and type safety.
```TYPESCRIPT

function extractAndConvert<T extends object,U extends keyof T >(obj:T, key:U){
    return 'Value' + obj[key];
}

extractAndConvert({name:'Max'},'name');// Here it works, because 'name' exist in the first parameter object.

```

## Generic classes

We can create generic classes to set different types of data in a class, for instance:

```typescript
class DataStorage<T extends string | number | boolean>{
    private data:T[]=[];
    
    addItem(item:T){
        this.data.push(item);
    }
    // This will work just with primitive values
    removeItem(item:T){
        this.data.splice(this.data.indexOf(item),1);
    }

    getItems(){
        return [...this.data]
    }
}
// This will work just with primitives values
const textStorage = new DataStorage<string>();
textStorage.addItem('Manuel');
textStorage.addItem('Claudia');
console.log(textStorage.getItems());
// This will work just with primitive values
const numberStorage = new DataStorage<number>();
numberStorage.addItem(0);
numberStorage.addItem(1);
console.log(textStorage.getItems());
```

## Generic utilities types

### Partial

Its a built in class `Partial` that can has Partial properties of an object, for instance:

```typescript
interface CourseGoal{
    title:string,
    description:string,
    date:date
}

function createCourseGoal(title:string,description:string,date:date): CourseGoal{
    let courseGoal: Partial<CourseGoal>={};// Here without partial doesn't allow to set an empty object
    courseGoal.title=title;
    courseGoal.description=description;
    courseGoal.date=date;
    return courseGoal as CourseGoal;
}
```
### Readonly

With readonly we're not able to add new values in an array or object.
```typescript
const names: Readonly<string[]> = ['Max','Anna'];
// names.push('Manuel') not allowed.
```

## Generic types vs Union types

- Generics types lock in a type.
- Union types can choose between the three.

```typescript
const dataStorage = new DataStorage<string>(); // we're saying that we want just string type.

```
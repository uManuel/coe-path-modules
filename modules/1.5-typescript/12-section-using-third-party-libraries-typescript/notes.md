# Notes

## Using javascript with typescript

Sometimes we would like to work with third party libraries like `lodash` but is only in javascript, so to work with them we have to install an extra library called @types, so at the end will be `npm i --save-dev lodash @types/lodash`.

`@types` is a translator of a lot of libraries that there are on npm into typescript.

### But what if there is no @types for our javascript library?

We can use `declare`, so we can say to typescript with that keyword, don't worry I know what is this, for instance:

```typescript
declare var GLOBAL:any; // This variable was set in index.html in a script
console.log(GLOBAL);
```

## What to do if I fetch data from a backend server?

If we fetch data we have to transform into a model that we have in typescript, thankfully there are libraries that can do this thing for us like [Class Transformer](https://github.com/typestack/class-transformer).

## We can validate typescript classes with decorators

We can validate classes attributes with [Class Validator](https://github.com/typestack/class-validator). So check it in the github repository.


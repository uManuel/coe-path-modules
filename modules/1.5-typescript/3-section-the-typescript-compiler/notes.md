# Notes

In section 2 and 3 we were using tsc command to compile every time we made a change, but we can make it faster with this command:

```BASH
tsc <my-file> -w --watch
```

We can also compile all our typescript files, but first we have to initialize a folder as a typescript project and also will be created a file `tsconfig.js`

```BASH
tsc --init
```
then we can use tsc watch mode:

```BASH
tsc --watch
```

## Including, excluding

If we want to **exclude** some files from compilation we can update `tsconfig.json`, adding

```JSON
{
    "exclude": [
        "node_modules", //this is by default
        // "analytics.ts"
    ]
}
```

If we want to **include** and compile just those files, we can:

```JSON
{
    "include":[
        "analytics.ts" //It's just going to be compiled analytics.ts
    ]
}
```

Or both of them, it will be include files, minus excluded files.

```JSON
{
    "exclude": [
        "node_modules", //this is by default
        // "analytics.ts"
    ],
    "include":[
        "analytics.ts" //It's just going to be compiled analytics.ts
    ]
}
```

If we want to compile just some files we can use this configuration:

```JSON
{
    "file": ["app.ts"]
}
```

## Adding libraries

We can add libraries to our typescript code, however, there are some defaults libraries added, like `dom`, `dom.iterator`.

```json
{
    "lib":[
        // All libraries
    ]
}
```

## Other configurations

We can also add compiling to javascript files, implementing the typescript compilator like `allowJs` and `checkJs`.

## Source maps (Improving debug with typescript)

We can also add debug for typescript, if we activate source map in our `tsconfig.json`


## Outdir and Rootdir

We can setup where all our js files are going to be send after compiling with `outDir`.

Furthermore we can add `rootDir` that is going to set our root where is going to compile all ts files there.

## Stop emitting Files on Compilation errors.

We can still emitting files even if there are some compilation errors, for example:

```json
{
    "noEmitOnError":true//by default it's true.
}
```

## Strict options

enabling strict enables all those one below it.
```json
{
     "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied `any` type.. */
    // "strictNullChecks": true,                         /* When type checking, take into account `null` and `undefined`. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for `bind`, `call`, and `apply` methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when `this` is given the type `any`. */
    // "useUnknownInCatchVariables": true,               /* Type catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when a local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Include 'undefined' in index signature results */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */
}
```

### Code quality

We can disable a lot of options like warnings if there is parameters that is not used or variables.


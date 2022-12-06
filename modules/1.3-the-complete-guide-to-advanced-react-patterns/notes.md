# Introduction

This is a course of advanced patterns in react in which we're going to use the medium clap to test it out what we learnt.

## The structure

We have the folder

1. `finished` -> the code that is finished we're going to check it if we have some hindrances in our process of learning.
2. `clean-slate` -> the code that I'm going to write through the course.
3. `clean-slate/showcase/src/patterns/` there are all the patterns that we're going to build in the course.

### Animation and styling

To use animation we have used mo-js and we gave them styling.

we have 3 different components in which we're going to add styling and animation

1. ClapIcon
2. ClapCount
3. CountTotal

## Custom Hooks: The first foundational pattern

-   Only call hooks at the top level.
-   Only call hooks from react functions.
-   Don't call hooks in loops, conditions or nested functions.
-   Every custom hook file name has to start with `use`.

It's used to separate some logic that can be reused in other components like what we did in `./clean-slate/showcase/src/patterns/02.js` the custom hook `useClapAnimation` .

### Important

We've learned a lot about refs and the DOM, especially about callback refs.

## Compound design patterns

Design compound patterns what let us is to have a more semantic code for example, instead of having:

```javascript
<Train carriage={('firstClass', 'secondClass')} window={'Big'} />
```

we can customize it and send child components to the father using other components.

```javascript
<Train>
    <Train.Carriage type='firstClass'>
        <Train.Carriage.Window type='Big'/>
        <Train.Carriage.Window type='Big'/>
    <Train.Carriage/>
    <Train.Carriage type='secondClass'>
        <Train.Carriage.Window type='Medium'/>
    <Train.Carriage/>
<Train/>
```

Benefits

-   Customizable: child components can be customized setting different props.
-   Understandable: Is more readable, because you expose the child components of the parent.
-   Props Overload: If you want to pass props from train to carriages and windows using the compound pattern you're going to avoid props overload.

How to implement it?

1. We first have to expose the child elements adding it in to a context object.
2. Use a Provider in the child elements.
3. Use a Consumer in the child elements.

This pattern its implemented in `./clean-slate/showcase/src/patterns/03.js`.

## Patterns for crafting reusable styles.



If we want to implement style to a Component create we can approach something similar like :

### Extending style via style props

```javascript
<MediumClap onClap={handleClap} style={{ border: '#896EAF solid 2px' }}>
    <MediumClap.Icon style={{}} />
    <MediumClap.Count style={{ background: '#8cacea' }} />
    <MediumClap.Total style={{ background: '#8cacea', color: 'black' }} />
</MediumClap>
```
We have to set the props of `MediumClap` and use it in the principal HTML element

```javascript
const MediumClap = ({style:userStyle={}})=>{
    return (<MainDiv style={userStyle}>
        </MainDiv>)
}
```

### Extending styles via className prop

```javascript
<MediumClap onClap={handleClap} style={{ border: '#896EAF solid 2px' }}>
    <MediumClap.Icon className = {style.icon} />
    <MediumClap.Count className = {style.count}  />
    <MediumClap.Total className = {style.total}  />
</MediumClap>
```

We have to implement the in everyone of the components similar like:

```javascript
const MediumClap = (className, styles)=>{
    // easier to manage and concatenate different classNames.
    const classNames = [classname,style.otherStyle].join(' ').trim();

    return <div className={classNames} style={styles}></div>
}
```
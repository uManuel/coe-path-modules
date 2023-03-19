# Accessibility

(Summary)[https://learn-a11y.netlify.app/tooling/index.html]

# What's web accessibility?

Web accessibility refers to websites that are designed to be also used by people with disabilities.

## Similar fields

- Web Performance: e.g. in some countries because of their slow internet connections doesn't allow to use some web app.
- Internationalization: Only available for some countries.
- UI Design: Have to be designed to some kind of blindness.

## Type of disabilities

- mobility and physical
- cognitive and neurological
- visual
- hearing

## Benefits

- Larger audience
- Human rights
- Legal issue
- Impactful
- Curb cut effect

## Amazing ways people use the web

- Keyboard only
- Head wand
- Mouth Stick
- Single switch
- screen reader

## Important resource to start applying webAIM

[Checklist of WebAIM](https://webaim.org/standards/wcag/checklist)

## Applying

### Images
Adding alt in img describing what's the image, so screen readers will read it.
```HTML
<img src="https://pbs.twimg.com/media/KSJHECKJH983er.jpg" alt="A puppy in the park" />
```

If you want to skip some decorative images you can by adding an empty alt attribute.
### Captions for audio

We have to add captions to our videos or audios, for deaf people.

### SEO vs Accessibility

There are some nuances between accessibility and SEO devs, example using attribute alt to describe

### Accessible HTML
Some elements have semantic meaning but no special functionality, example:
- Aside
- Footer
- Header
Other's provide a lot of built in functionality such as.
- Button
- Input
- textarea
We have to use proper tags for semantic information like
### Semantic markup
 <h>, <ul>,<ol>,<dl>,<strong>,<code>,<blockquote>

### Tables
use thei <th>, <tbody>, all of their 

### Labels
It's always better to use labels than paragraphs in forms like:
```
<form>
    <label for="first">First Name</label>
    <input id="first" type="text" />
    <label for="last">Last Name</label>
    <input id="last" type="text" />
    <label for="password">Password</label>
    <input id="password" type="password" />
    <input type="submit" value="Submit" />
</form>
```
Can also only work with:
- button
- input
- textarea
- select
- progress
- output
- meter
- keygen

If you never wanted to use a label you can use aria-label
```html
<div aria-label="Interactive div">Hello</div>
```
### Screenreader only content
we can use a class to hide a component and only be available for screenreaders.

### We could give it an ARIA role

with that we can say that this div is clickeable
```html
<div role="button" onclick="alert('hello')">Click me!</div>
```

We could give it a tabindex

For keyboard only users to tab to it
```html
<div tabindex="0" role="button" onclick="alert('hello')">Click me!</div>
```

### Don't forget about keyboard only users!

```
<div tabindex="0" role="button" onclick="alert('hello')" onkeyup="alert('hello')">Click me!</div>
```

### Don't forget about screen reader users either!

```
<div aria-label="Alert the word hello" tabindex="0" role="button" onclick="alert('hello')" onkeyup="alert('hello')">Click me!</div>
```
### Aria
provides good features for labeling and describing any element that we want.
- aria-label
- aria-labelledby
- aria-describedby

### Roles, States and Properties

ARIA also provides roles which can be applied to any element. Examples include:
- button
- checkbox
- tree
- banner
- aria-autocomplete
- aria-haspopup

### Live Regions

Say that this information can update
```
<div aria-live="assertive">Waiting for a ride</div>
```
some values that you can pass
- assertive - will interrupt whatever it's doing to announce.
- polite - will announce the live region update when it next idles.
- off - will not read the update.

### SkipLinks
Move to the main section, after pressing tab you can select to go to the main section to skip using more tabs.


### Visual Considerations

we have a contrast checker (Contrast checker)[https://webaim.org/resources/contrastchecker/]

we can also simulate some of the kind of blindness with noCoffee vision simulator in firefox.


### Chrome DevTools

Did you know the Chrome DevTools come with a built-in accessibility color checker?

### Colors and forms

An important consideration for colorblind users is making sure that color isn't the only way users can tell if there is an error with the form. For example, a red ring is not enough. Consider adding an icon or an error label.

### Prefers Color Scheme

dark or light

### Fixing markup, set language

We have to check if we use the correct html elements.
We have to give information of the language of our webpage or some parts that have different languages.

### Neurocognitive 

Prefers to Reduced Motion or remove some animations with code

## Accessibility Linters & Dev tools

### Linters

eslint-plugin-jsx-a11y
Angular Codelyzer
eslint-plugin-vuejs-accessibility

### Accessible Design Systems

Adobe's React Spectrum
Google's Material Design

### Accessibility Developer Tools

Deque's axe DevTools
Google's Lighthouse


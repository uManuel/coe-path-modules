# Notes

## Introduction

[Next JS Course ](https://hendrixer.github.io/nextjs-course)

### What is nextJS

It's a framework that uses react, conventions, dev building system, Routing, Api routes, Prerendering.

### What's Create React App

Create react app It's a boilerplate and have opinions, build system to get started faster.

### What about Gatsby?

Gatsby it's more similar to NextJs but is not a complete framework because don't have Api Route or server side rendering.
However Gatsby also have some other functionalities that Nextjs Don't have like:
- Content mesh.
- GraphQL support built-in.
- Image optimization.
- Others

### Questions 
**Do you only need a single page app?**
Use Create React App

**Do you need a static site, like a blog, that's also a SPA?**
Use Next.js or Gatsby.

**Need SSR, an API, and all the above?**
Use Next.js

## Routing with pages
NextJs has their own Convention to use routing, first of all all their routing are put in a folder called `pages` and every file that you put in there it's a route.

Example: 
pages
  index.jsx -> It's going to be home of the webpage `/`
  notes
    index.jsx -> I'ts going to show all the notes `/notes/`
    [id].jsx -> It's going to show all the notes by id dynamically `/notes/1`;

### Catch all routes

We can get all routes like `/notes/a/b/c/d` and take a, b, c, d, so instead of creating different pages for a,b,c,d we can only use one, **this is very helpful when you're working with documentation**.

To use this feature first we have to create a file and name it like `[...param].jsx` using ellipsis before the name of the param inside brackets.

```JAVASCRIPT
import React from 'react'
import { useRouter } from 'next/router'

// file => /docs/[...params].jsx
// route => /docs/a/b/c

export default () => {
  const router = useRouter()
  const { params }= router.query // getting the params

  // params === ['a', 'b', 'c']

  return (
    <h1>hello</h1>
  )
}
```

If you want to add the parent path in the params you have to change the name and add it inside other bracket like `[[...param]].jsx`.

### Non-pages

Well for that we can just use a folder convention like `components`.

## Routing - Navigation

For navigation we can use the `Link` component that is in `next/link`. 
we have to use in this way

```JAVASCRIPT
// pages/index.jsx
import React from 'react'
import Link from 'next/link'

export default () => (
  <div>
    <h1>Index page</h1>

    // <Link href="/notes">
    //   <a>Notes</a>
    // </Link>
    // to set dynamics routes we have to use the as
    <Link key={note.id} href="/notes/[id]" as={`/notes/${note.id}`}>
        <a>
            <strong>{note.title}</strong>
        </a>
    </Link>
  </div> 
)
```

### Programmatic routing

For when you need to route between pages programmatically you can use the `.push` method of useRouter hook.

```JAVASCRIPt
import React from 'react'
import { useRouter } from 'next/router'

export default () => {
  const router = useRouter()
  const id = 2

  return (
    <div>
      <button onClick={e => router.push('/')}>
        Go Home
      </button>

      <button onClick={e => router.push('/user/[id]', `/user/${id}`)}>
        Dashboard
      </button>
    </div>
  )
}
```

## Config

### Adding CSS & Modules

To add global css first you have to create a file at the root of your pages with `_pages.jsx`

```JAVASCRIPT
import 'flexbox.css'
import '../mystyles.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

The CSS modules by the other side It's possible to use it, NextJs It's able to work with it.

# Theme UI

This is a library that uses objects of javascript to set css

1. We created a file `theme.js` that will have an object that has the css
```javascript
import { roboto } from '@theme-ui/presets'

const theme = {
  ...roboto,
  containers: {
    card: {
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      border: '1px solid',
      borderColor: 'muted',
      borderRadius: '4px',
      p: 2,
    },
    page: {
      width: '100%',
      maxWidth: '960px',
      m: 0,
      mx: 'auto',
    }
  },
  styles: {
    ...roboto.styles
  }
}

export default theme
```

2. We have to add a provider


```javascript
import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "../theme";

export default function App({ Component, pageProps }){
    return <ThemeProvider theme={theme}>
        <Component {...pageProps}/>
    </ThemeProvider>
}
```

3. We can use it.

```javascript
// pages/index.jsx
/** @jsx jsx */
import { jsx } from 'theme-ui'
import Link from 'next/link'

export default () => (
  <div sx={{ height: `calc(100vh - 60px)`}}>
    <div sx={{variant: 'containers.page', display: 'flex', alignItems: 'center', height: '100%'}}>
      <h1 sx={{fontSize: 8, my: 0}}>This is a really dope note taking app.</h1>
    </div>
  </div> 
)
```

### Customizing Next-js config

We can basically use a file called `next-config.js` to add some configuration or extend features, we can't modify because this is a framework.

Example:
`next-config.js`
```JS
module.exports = {
  webpack: {
    // webpack config properties
  },
  env: {
    MY_ENV_VAR: process.env.SECRET
  }
}
```

Or we can add function, this is more powerful because we can set the vars in the different phases of development.
```JS
const { PHASE_PRODUCTION_SERVER } = require('next/constants')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {
      ...defaultConfig,
      webpack: {
        plugins: [new BundleAnalyzerPlugin()]
      }
    }
  }

  return defaultConfig
} 
```

### Adding Plugins

We can also add plugins (e.g. .env) to add new features. To do that we have to import it in `next-config.js` file.

Example
```JS
// next.config.js
const withOffline = require('next-offline')
const config = {
  // your next config
}

module.exports = withOffline(config)
```

### Typescript

We can use typescript with just installing an 

## Api

NextJs is able to create apis OOB so this is very helpful and straightforward.

### Creating API routes

We just have create folders as routes as what we see creating routes for the frontend
```
- pages
-- api
--- hello.js
```
We have to export an arrow function similar to serverless
Example `hello.js`

```JS
export default (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ message: 'hello' }))
}
```

But if we have something similar like express and add middle wares we have use a library called NC `next-connect`.

The syntax now should be: 
```JS
// pages/api/data
import nc from 'next-connect';
import cors from 'cors'

const handler = nc()
  // use connect based middleware
  .use(cors())
  // express like routing for methods
  .get((req, res) => {
    res.send('Hello world')
  })
  .post((req, res) => {
    res.json({ hello: 'world' })
  })
  .put(async (req, res) => {
    res.end('hello')
  })
  
export default handler;
```

### Fetching Data in the Browser

If we want to fetch data in the browser we can reach it using **fetch** or **axios** as we normal do in vanilla react.

#### Fetching Data Ahead of time

We can fetch data ahead of time using the following functions:
- getStaticProps
- getStaticPaths
- getServerSideProps

##### GetStaticProps

With this **getStaticProps** we're going to be able to send data in props at build time.

Syntax
```JS
const IndexPage = () => {// jsx }
export default IndexPage
// This function has the context that can be the params, but to manage them and send me we have to use GetStaticPaths
export async function getStaticProps(context) {
  return {
    props: {}
  }
}
```

##### GetStaticPaths

We use GetStaticPaths to send the context to getStaticProps when the page is dynamic `[id].jsx`.

```JS
// /pages/blog/:slug.js

const IndexPage = () => {// jsx }
export default IndexPage

export async function getStaticPaths() {
  // get all the paths for your posts from an API
  // or file system
  const results = await fetch('/api/posts')
  const posts = await results.json()
  const paths = posts.map(post => ({params: {slug: 
  post.slug}}))
  /*
  [
    {params: {slug: 'get-started-with-node'}},
    {params: {slug: 'top-frameworks'}}
  ]
  */
  return {paths}
}

export async function getStaticProps({ params }) {
  const res = await fetch(`/api/post/${params.slug}`)
  const post = await res.json()
  return {
    props: {post}
  }
}
```
##### getServerSideProps

And finally we have getServerSideProps That is called at runtime and have access to req and res.

One difference between GetServerSideProps and GetStaticProps is that getServerSideProps is executed in every request, and getStaticProps just one at build time.

```JS
export async function getServerSideProps({params,req,res}) {
  const response = await fetch(`https://somedata.com`)
  const data = await response.json()

  return { props: { data } }
}
```

Note!!: Don't use getServerSideProps if It's only need it.

**When to use what**

- Do you need data at runtime but don't need SSR? Use client-side data fetching.

- Do you need data at runtime but do need SSR? Use getServerSideProps

- Do you have pages that rely on data that is cachable and accessible at build time? Like from a CMS? Use getStaticProps

- Do you have the same as above but the pages have dynamic URL params? Use getStaticProps and getStaticPaths

#### Authentication

When we want to use authentication we can use it as the same way we do in the frontend, using a `customHook` to check their JWT, and for the backend we can use the same as using middle-wares.

We can't use auth in getStaticProps and getStaticPaths but we can in getServerSideProps.

### Render Modes

We have the next the different pre rendering modes
- Static Generation Pages built at build time into HTML. CDN cacheable. (Not dynamic, Blogs, Documentation, Data not changed by the user)
- Server-side Rendering Pages built at run time into HTML. Cached after the initial hit.
- Client-side Rendering Single-page app

### Working with SSR

There are some times when we want to skip rendering in some components on the server because:

- It depends on The DOM API.
- It depends on client-side data.
- Something else

```JS
import dynamic from 'next/dynamic'

const SponsoredAd = dynamic(
  () => import('../components/sponsoredAd'),
  { ssr: false }
)

const Page = () => (
  <div>
    <h1>This will be prerendered</h1>
    {/* this won't*/}
    <SponsoredAd />
  </div>
)

export default Page
```
## Deployment

Basically our NextJS It's going to need a NodeJS environment for everything even if you only use the frontend.

If you want to export pure Static Hosting services (No Need NodeJS) you can export with `next export`.

**Be sure to export your URL Apis in .env config**

One of the best ways to deploy It's to Vercel, They created Vercel.

```
vercel 
```
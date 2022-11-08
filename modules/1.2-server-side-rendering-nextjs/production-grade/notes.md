# Production Grade NextJS

This is a course in which we're going to make it ready for production with the MVP features read of "Known" that is the name of these app.

## Dynamic content

### Dynamic content & static routes

To get dynamic content we're going to make http-request to our headless cms in `./practice/pages/index.tsx` file using `getStaticProps` to set the props. Using getStaticProps It's going to work to get static data from a CMS like the title or the content of the home.


```Javascript
import { home } from '../content'

// at the bottom
//export function async getStaticProps() {
export function getStaticProps() {
  //return await cms.get();
  return { props: { content: home.published } }
}
```

### Dynamic content & dynamic routes

On the other side if we use dynamic content like from blogs of a CMS using an api, or get it from the filesystem, we can use the next code:


```JAVASCRIPT
export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = fs.readdirSync(postsDirectory)
  const paths = filenames.map((name) => ({ params: { slug: name.replace('.mdx', '') } }))
  // dont get paths for cms posts, instead, let fallback handle it
  return { paths, fallback: true }
}

export async function getStaticProps(ctx) {
  // read the posts dir from the fs
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = fs.readdirSync(postsDirectory)
  // get each post from the fs
  const filePosts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename)
    return fs.readFileSync(filePath, 'utf8')
  })
  
  // merge our posts from our CMS and fs then sort by pub date
  const posts = orderby(
    [...postsFromCMS.published, ...filePosts].map((content) => {
     // extract frontmatter from markdown content
      const { data } = matter(content)
      return data
    }),
    ['publishedOn'],
    ['desc'],
  )

  return { props: { posts } }
}
```

### Previewing the data

We have some interesting features that NextJS Gives us for previewing. To reach that we have to implement an api that sets a cookie

Code
```javascript
import { NextApiResponse } from 'next'

export default function handler(req, res: NextApiResponse) {
  // sets the preview cookie
  res.setPreviewData({})
  // redirects to the page you want to preview
  res.redirect(req.query.route)
}
```

And then we can use it in getStaticProps with the context aka `ctx`

```javascript
export async function getStaticProps(ctx) {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = fs.readdirSync(postsDirectory)
  // check that preview boolean
  const cmsPosts = ctx.preview ? postsFromCMS.draft : postsFromCMS.published
  const filePosts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename)
    return fs.readFileSync(filePath, 'utf8')
  })
  
  const posts = orderby(
    [...cmsPosts, ...filePosts].map((content) => {
      const { data } = matter(content)
      return data
    }),
    ['publishedOn'],
    ['desc'],
  )

  return { props: { posts } }
}
```

## Authentication with NextJS

NextJS provides you features of authentication, tu use them we have to install (nextJs-auth)[https://next-auth.js.org/].

First wee need to create a catchall api route, this means that will be executed before any request to `/api/auth/to/any/`.

Example
```javascript
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default (req, res) =>
  NextAuth(req, res, {
    session: {
        // use JWTs instead
      jwt: true,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      // ...add more providers here
    ],

    database: process.env.DATABASE_URL,

    // The page that we're going to use to sign in, we can also use the default
    pages: {
      signIn: '/signin',
    },
  })
```

Then we have to set our environments variables in `.env.local` file and create our identifications of those providers.

```
GITHUB_ID=046416413c0693590e53
GITHUB_SECRET=
DATABASE_URL=
JWT_SECRET=Pollita
NEXT_PUBLIC_API_HOST=http://localhost:3000
```

Then we can authenticate and use the session of `next-auth`

`./pages/signin.tsx`

```Javascript
// other imports
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

const Signin = () => {
  const [session, loading] = useSession()
  const router = useRouter()

 // if a user is logged it, never show them this page,
 // go straight to app
  useEffect(() => {
    if (session) {
      router.push('/app')
    }
  }, [session, router])
  
  // rest of component
  // using signIn to authorize and authenticate
  <SocialButton type="github" onClick={() => signIn('github')} />
}
```

Now if we want to use the session we have to use a provider so can be in our whole app.
`_app.tsx`
```javascript
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  return (
  // auth provider
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}
```

## Protecting pages

### Protecting page in server side props

We also have send the session to pageProps so we can protect our route and set in the provider that is in `__app.tsx`

In the page that we want to protect we have to add`[[...id]].tsx`
```javascript
export async function getServerSideProps(context) {
  
  const session = await getSession();

  return {
      props: {session}
  }
}
```

Then we can use it with `useSession()` in the component

### Create connection to the database

We can use the mongodb driver to reach this.

```javascript
import { Db, MongoClient } from 'mongodb'

/**
 * We have to cache the DB connection
 * when used in a serverless environment otherwise
 * we may encounter performance loss due to
 * time to connect. Also, depending on your DB,
 * you might night be able to have many concurrent
 * DB connections. Most traditional DBs were not made for a stateless
 * environment like serverless. A serverless DB (HTTP based DB) would work
 * better.
 */
global.mongo = global.mongo || {}

export const connectToDB = async () => {
  // checking the cache to be faster
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000,
    })

    console.log('connecting to DB')
    await global.mongo.client.connect()
    console.log('connected to DB')
  }

  const db: Db = global.mongo.client.db('known')

  return { db, dbClient: global.mongo.client }
}
```

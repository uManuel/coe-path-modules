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


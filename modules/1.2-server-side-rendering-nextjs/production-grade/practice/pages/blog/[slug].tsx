import React, { FC } from 'react'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import { majorScale, Pane, Heading, Spinner } from 'evergreen-ui'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Post } from '../../types'
import Container from '../../components/container'
import HomeNav from '../../components/homeNav'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {posts as postsFromCMS} from '../../content'

const BlogPost: FC<Post> = ({ source, frontMatter }) => {
  const content = hydrate(source)
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Pane width="100%" height="100%">
        <Spinner size={48} />
      </Pane>
    )
  }
  return (
    <Pane>
      <Head>
        <title>{`Known Blog | ${frontMatter.title}`}</title>
        <meta name="description" content={frontMatter.summary} />
      </Head>
      <header>
        <HomeNav />
      </header>
      <main>
        <Container>
          <Heading fontSize="clamp(2rem, 8vw, 6rem)" lineHeight="clamp(2rem, 8vw, 6rem)" marginY={majorScale(3)}>
            {frontMatter.title}
          </Heading>
          <Pane>{content}</Pane>
        </Container>
      </main>
    </Pane>
  )
}

BlogPost.defaultProps = {
  source: '',
  frontMatter: { title: 'default title', summary: 'summary', publishedOn: '' },
}

// at the bottom
export async function getStaticPaths() {
  const postDirectory = path.join(process.cwd(), 'posts')
  const filenames = fs.readdirSync(postDirectory)
  const slugs = filenames.map((name) => {
    const filePath = path.join(postDirectory,name)
    const file = fs.readFileSync(filePath,'utf-8')
    const {data} = matter(file);
    
    return data;
  });
  // dont get paths for cms posts, instead, let fallback handle it
  return { 
    paths: slugs.map((s) => ({params: { slug: s.slug } }))
    ,fallback: true 
  }
}

export async function getStaticProps({ params, preview }) {
  let postFile
  // is the slug for a file system post or cms post
  try {
    const postPath = path.join(process.cwd(), 'posts', `${params.slug}.mdx`)
    postFile = fs.readFileSync(postPath, 'utf-8')
  } catch {
    // check that cookie
    const collection = preview ? postsFromCMS.draft : postsFromCMS.published
    postFile = collection.find((p) => {
      const { data } = matter(p)
      return data.slug === params.slug
    })
  }

  if (!postFile) {
    throw new Error('no post')
  }

  const { content, data } = matter(postFile)
  const mdxSource = await renderToString(content, { scope: data })

  return { props: { source: mdxSource, frontMatter: data }, revalidate: 30 }
}

/**
 * Need to get the paths here
 * then the the correct post for the matching path
 * Posts can come from the fs or our CMS
 */
export default BlogPost

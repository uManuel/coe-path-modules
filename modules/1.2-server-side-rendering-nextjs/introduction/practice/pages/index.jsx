/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import Link from 'next/link'
import dynamic from 'next/dynamic';

const Browser = dynamic(
  () => import('../src/components/browser'),
  { ssr: false }
)

export default ({content}) => (
  <div sx={{ height: `calc(100vh - 60px)`}}>
    <div sx={{variant: 'containers.page', display: 'flex', alignItems: 'center', height: '100%'}}>
      <h1 sx={{fontSize: 8, my: 0}}>{content.title}</h1>
    </div>
    <Browser/>
  </div> 
)

export async function getStaticProps() {
  // Getting from CMS.
  return {
    props: {
      content:{
        title:'This is my really nice app.'
      }
    }
  }
}
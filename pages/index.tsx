import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import Layout, { siteTitle } from "../components/Layout"
import utilStyles from "../styles/utils.module.css"
import styles from "../styles/Home.module.css"
import { getPostsData } from "../lib/post"

const inter = Inter({ subsets: ['latin'] })

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData()

  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>mitsuru hashimoto</p>
      </section>
      <section>
        <h2>📃エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail}) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`} className={utilStyles.boldtext}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>{title}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}

import { Helmet } from 'react-helmet-async'

const Seo = ({ title, description, canonical }) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />

      <link rel="canonical" href={canonical} />
    </Helmet>
  )
}

export default Seo

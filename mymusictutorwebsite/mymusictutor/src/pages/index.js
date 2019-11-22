import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Index from "../components/index"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Downloads</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Download a version of My Music Tutor for ios or android</p>
    <Index />
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to errors page</Link>
  </Layout>
)

export default IndexPage

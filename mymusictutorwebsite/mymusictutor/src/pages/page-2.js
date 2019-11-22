import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="Errors" />
    <h1>Errors:</h1>
    <p>Below are errors</p>
    <Link to="/">Go back to download</Link>
  </Layout>
)

export default SecondPage

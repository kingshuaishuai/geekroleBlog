import React from "react"
// import { Link } from "gatsby"
import Nav from '../components/nav'
import Featured from '../components/featured'
import Home from '../components/home'
import ViewMore from '../components/viewmore'
import Footer from '../components/footer'

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import './index.css'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Nav />
    <Featured />
    <Home />
    <ViewMore />
    <Footer />
  </Layout>
)

export default IndexPage

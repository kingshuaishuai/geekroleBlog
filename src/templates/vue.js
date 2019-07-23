import React from 'react';
import { graphql, Link, navigate } from 'gatsby';
import { window } from 'browser-monads';
import Layout from '../components/layout';
import Nav from '../components/nav';
import SEO from '../components/seo';
import '../components/home/home.css';
import './archive.css';

import headerImage from '../images/header-list.jpg';

const VuePage = (props) => {
  const blogContent = props.data.allContentfulBlog;
  const { currentPage, numPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/category/vue' : `/category/vue/${currentPage - 1}`;
  const nextPage = `/category/vue/${currentPage + 1}`;

  return (
    <Layout>
      <SEO title="vue" keywords={['geekrole', 'geek', 'react', 'vue', 'gatsby', 'node', 'node.js', 'graphql']} />
      <Nav />
      
      <header>
        <div className="archive__section">
          <div className="archive__hero" style={{backgroundImage: `url(${headerImage})`}}></div>
          <div className="archive__nav">
            <Link to='/blog' className={window.location.href.indexOf('/blog') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>All</Link>
            <Link to='/category/react' className={window.location.href.indexOf('category/react') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>React</Link>
            <Link to='/category/vue' className={window.location.href.indexOf('category/vue') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>Vue</Link>
            <Link to='/category/javascript' className={window.location.href.indexOf('category/javascript') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>Javascript</Link>
            <Link to='/category/node-js' className={window.location.href.indexOf('category/node-js') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>Node.js</Link>
            <Link to='/category/others' className={window.location.href.indexOf('category/others') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>others</Link>
          </div>
        </div>
      </header>

      <div className="archive__feed feed">
        {
          blogContent.edges.length > 0 
          ? blogContent.edges.map( edge => (
            <div key={edge.node.id} className="card"
                 style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0) 50%, rgba(10,10,10,.7) 100%), url(${edge.node.featuredImage.fluid.src})`,
                 }}
                 onClick={() => navigate(`/blog/${edge.node.slug}`)}>
              {edge.node.category.map(cate => (
                <div key={cate.id} className="card__category">
                  {cate.title}
                </div>
              ))}
              <p className="card__title">{edge.node.title }</p>
            </div>
          ))
          : <div>此分类下暂未发表文章</div>
        }
      </div>

      <div className="pagination">
        <div className="pagination__item">
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              <div className="arrow__back"></div>
            </Link>
          )}
        </div>
        <div className="pagination__item">
          {!isLast && (
            <Link to={nextPage} rel="next">
              <div className="arrow__next"></div>
            </Link>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default VuePage;

export const pageQuery= graphql`
  query VueQuery($skip: Int!, $limit: Int!) {
    allContentfulBlog(
      sort: { fields: [createdAt], order: DESC }
      skip: $skip
      limit: $limit
      filter: {
        category: { elemMatch: {title: {eq: "Vue"}} }
      }
    ) {
      edges {
        node {
          id
          slug
          title
          createdAt
          category {
            title
            slug
            id
          }
          featuredImage {
            fluid {
              src
              ...GatsbyContentfulFluid 
            }
          }
        }
      }
    }
  }
`
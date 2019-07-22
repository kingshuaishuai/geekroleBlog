import React from 'react';
import { graphql, navigate, StaticQuery } from 'gatsby';
import './featured.css';

export default () => (
  <StaticQuery
    query={graphql`
      query FeaturedQuery {
        allContentfulSeries(limit: 1, sort: {fields: [createdAt], order: DESC}, filter: {featured: {eq: true}}) {
          edges {
            node {
              id
              slug
              title
              description
              featuredImage {
                fluid {
                  src
                  ...GatsbyContentfulFluid
                }
              }
            }
          }
        }
        allContentfulWebsiteConfig(limit: 1, filter: {property: {eq: "home_header"}}) {
          edges {
            node {
              id
              value {
                fluid {
                  src
                }
              }
            }
          }
        }
      }    
    `}

    render={
      data => (
        <header>
          {
            data.allContentfulSeries.edges.map(edge => (
              <div key={edge.node.id} className="header__section">
                {/* <div className="header__hero" style={{backgroundImage: `url(${edge.node.featuredImage.fluid.src})`}}></div> */}
                <div className="header__hero" style={{backgroundImage: `url(${data.allContentfulWebsiteConfig.edges[0].node.value.fluid.src})`}}></div>
                <div className="header__content">
                  <div className="header__info">
                    <h1 className="header__info">系列推荐：{edge.node.title}</h1>
                    <p className="header__subtitle">{edge.node.description}</p>
                    <button onClick={() => navigate(`/series/${edge.node.slug}`)} className="btn__med">Read More</button>
                  </div>
                </div>
              </div>
            ))
          }
        </header>
      )
    }
    >

  </StaticQuery>
)
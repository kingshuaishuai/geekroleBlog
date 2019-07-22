import React from 'react';
import { graphql, navigate, StaticQuery } from 'gatsby';
import './home.css';

export default () => (
  <StaticQuery
    query={graphql`
      query HomeQuery {
        allContentfulBlog(filter: {home: {eq: true}}) {
          edges {
            node {
              id
              title
              slug
              featuredImage {
                fluid {
                  src
                }
              }
              category {
                title
                slug
                id
              }
            }
          }
        }
        allContentfulSeries(filter: {home: {eq: true}}, limit: 3, sort: {fields: [createdAt], order: DESC}) {
          edges {
            node {
              id
              title
              description
              slug
              cover {
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
        <div className="feed">
          {
            data.allContentfulSeries.edges.map(edge => (
              <div key={edge.node.id} className="card"
                   style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0) 0%,rgba(10,10,10,0) 50%,rgba(10,10,10,0.7) 100%),  url(${edge.node.cover.fluid.src})`,
                   }}
                   onClick={() => navigate(`/series/${edge.node.slug}`)}>
                <p className="card__title">{edge.node.title}</p>
              </div>
            ))
          }
          {
            data.allContentfulBlog.edges.map(edge => (
              <div key={edge.node.id} className="card"
                   style={{
                     backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0) 0%,rgba(10,10,10,0) 50%,rgba(10,10,10,0.7) 100%),  url(${edge.node.featuredImage.fluid.src})`,
                   }}
                   onClick={() => navigate(`/blog/${edge.node.slug}`)}>
                {
                  edge.node.category.map(cate => (
                    <p key={cate.id} className="card__category">{cate.title}</p>
                  ))
                }
                <p className="card__title">{edge.node.title}</p>
              </div>
            ))
          }
        </div>
      )
    }
    >

  </StaticQuery>
)
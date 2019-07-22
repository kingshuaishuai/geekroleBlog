const path = require('path');

// 请求数据函数的封装
const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  resolve(
    graphql(request).then(result => {
      if(result.errors) {
        reject(result.errors);
      }

      return result;
    })
  )
})

// 实现gatsby的API "createPages", including pagination

exports.createPages = ({actions, graphql}) => {
  const {createPage} = actions;
  
  const getBlog = makeRequest(graphql, `{
    allContentfulBlog(sort: {fields: [createdAt], order: DESC}) {
      edges {
        node {
          id
          slug
        }
      }
    }
  }`).then(result=> {
    result.data.allContentfulBlog.edges.forEach(({node}) => {
      createPage({
        path: `/blog/${node.slug}`,
        component: path.resolve(__dirname, `src/templates/blog.js`),
        context: {
          id: node.id,
        },
      })
    })
  }) 

  // create archive page for all blogs
  const getArchive = makeRequest(graphql, `{
    allContentfulBlog(sort: {fields: [createdAt], order: DESC}) {
      edges {
        node {
          id
          slug
        }
      }
    }
  }`).then(result => {
    const blogs = result.data.allContentfulBlog.edges;
    const blogsPerPage = 9;
    const numPages = Math.ceil(blogs.length / blogsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? '/blog' : `/blog/${i + 1}`,
        component: path.resolve(__dirname, `src/templates/archive.js`),
        context: {
          limit: blogsPerPage,
          skip: i * blogsPerPage,
          numPages,
          currentPage: i + 1,
        }
      })
    })
  })


  return Promise.all([
    getBlog,
    getArchive
  ])
}
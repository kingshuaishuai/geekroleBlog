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

  // create category React page for blog,including pagination
  const getReact  = makeRequest(graphql, `{
    allContentfulBlog(
      sort: {fields: [createdAt], order: DESC}
      filter: {
        category: { elemMatch: {title: {eq: "React"}} }
      }
    ) {
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
        path: i === 0 ? '/category/react' : `/category/react/${i + 1}`,
        component: path.resolve(__dirname, `src/templates/react.js`),
        context: {
          limit: blogsPerPage,
          skip: i * blogsPerPage,
          numPages,
          currentPage: i + 1,
        }
      })
    })
  })

  // create category Vue page for ,including pagination
  const getVue  = makeRequest(graphql, `{
    allContentfulBlog(
      sort: {fields: [createdAt], order: DESC}
      filter: {
        category: { elemMatch: {title: {eq: "Vue"}} }
      }
    ) {
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
        path: i === 0 ? '/category/vue' : `/category/vue/${i + 1}`,
        component: path.resolve(__dirname, `src/templates/vue.js`),
        context: {
          limit: blogsPerPage,
          skip: i * blogsPerPage,
          numPages,
          currentPage: i + 1,
        }
      })
    })
  })
  
  // create category JavaScript page for ,including pagination
  const getJavascript  = makeRequest(graphql, `{
    allContentfulBlog(
      sort: {fields: [createdAt], order: DESC}
      filter: {
        category: { elemMatch: {title: {eq: "JavaScript"}} }
      }
    ) {
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
        path: i === 0 ? '/category/javascript' : `/category/javascript/${i + 1}`,
        component: path.resolve(__dirname, `src/templates/javascript.js`),
        context: {
          limit: blogsPerPage,
          skip: i * blogsPerPage,
          numPages,
          currentPage: i + 1,
        }
      })
    })
  })

  // create category Node.js page for ,including pagination
  const getNode  = makeRequest(graphql, `{
    allContentfulBlog(
      sort: {fields: [createdAt], order: DESC}
      filter: {
        category: { elemMatch: {title: {eq: "Node.js"}} }
      }
    ) {
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
        path: i === 0 ? '/category/node-js' : `/category/node-js/${i + 1}`,
        component: path.resolve(__dirname, `src/templates/node.js`),
        context: {
          limit: blogsPerPage,
          skip: i * blogsPerPage,
          numPages,
          currentPage: i + 1,
        }
      })
    })
  })

  // create category Others page for ,including pagination
  const getOthers  = makeRequest(graphql, `{
    allContentfulBlog(
      sort: {fields: [createdAt], order: DESC}
      filter: {
        category: { elemMatch: {title: {eq: "Others"}} }
      }
    ) {
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
        path: i === 0 ? '/category/others' : `/category/others/${i + 1}`,
        component: path.resolve(__dirname, `src/templates/others.js`),
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
    getArchive,
    getReact,
    getVue,
    getJavascript,
    getNode,
    getOthers
  ])
}
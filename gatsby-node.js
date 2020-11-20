const path = require(`path`)
const slugify = require("slugify")
const { paginate } = require("gatsby-awesome-pagination")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/layouts/post.js`)
  const categoriesTemplate = path.resolve(`src/layouts/category.js`)
  const indexPostsTemplate = path.resolve(`src/layouts/index.js`)
  const categoriesResult = await graphql(`
    query queryCategories {
      allDatoCmsCategory {
        nodes {
          name
        }
      }
    }
  `)

  const result = await graphql(`
    query queryCMSPage {
      allDatoCmsArticle(sort: { fields: date, order: DESC }) {
        nodes {
          id
          title
          category
        }
      }
    }
  `)

  categoriesResult.data.allDatoCmsCategory.nodes.forEach(
    ({ name}) => {
      const slugifiedTitle = slugify(name, {
        lower: true,
      })
      createPage({
        path: `${slugifiedTitle}`,
        component: categoriesTemplate,
        context: {
          category: name,
        },
      })
      paginate({
        createPage,
        items: result.data.allDatoCmsArticle.nodes.filter(
          ({ category }) => category === name
        ),
        itemsPerPage: 6,
        pathPrefix: `/${slugifiedTitle}`,
        component: categoriesTemplate,
        context: {
          category: name,
        },
      })
    }
  )

  paginate({
    createPage,
    items: result.data.allDatoCmsArticle.nodes,
    itemsPerPage: 6,
    itemsPerFirstPage: 5,
    pathPrefix: `/`,
    component: indexPostsTemplate,
  })

  result.data.allDatoCmsArticle.nodes.forEach(post => {
    let slugifiedTitle = slugify(post.title, {
      lower: true,
    })

    const slugifiedCategory = slugify(post.category, {
      lower: true,
    })
    slugifiedTitle.replace(":", "")
    slugifiedTitle = slugifiedTitle.replace(":", "")

    createPage({
      path: `${slugifiedCategory}/${slugifiedTitle}`,
      component: blogPostTemplate,
      context: {
        id: post.id,
        category: post.category,
      },
    })
  })
}

const path = require(`path`)
const slugify = require("slugify")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/layouts/post.js`)
  const categoriesTemplate = path.resolve(`src/layouts/category.js`)
  const categoriesResult = await graphql(`
    query queryCategories {
      allDatoCmsArticle {
        distinct(field: category)
      }
    }
  `)

  categoriesResult.data.allDatoCmsArticle.distinct.forEach(cat => {
    const slugifiedTitle = slugify(cat, {
      lower: true,
    })
    createPage({
      path: `${slugifiedTitle}`,
      component: categoriesTemplate,
      context: {
        category: cat,
      },
    })
  })

  const result = await graphql(`
    query queryCMSPage {
      allDatoCmsArticle {
        nodes {
          id
          title
          category
        }
      }
    }
  `)

  result.data.allDatoCmsArticle.nodes.forEach(post => {
    const slugifiedTitle = slugify(post.title, {
      lower: true,
    })

    const slugifiedCategory = slugify(post.category, {
      lower: true,
    })

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

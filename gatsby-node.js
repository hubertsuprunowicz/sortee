const path = require(`path`)

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  if (page.path.match(/^\/sort/)) {
    page.matchPath = "/sort/*"
    createPage(page)
  }
}

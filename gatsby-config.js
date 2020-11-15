module.exports = {
  siteMetadata: {
    title: `Sortee`,
    description: `Learn how the sort algorithm works`,
    author: `Hubert Suprunowicz`,
    menuLinks: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Bubble sort",
        link: "/bubble",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-leaflet`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `graveyard`,
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Lato",
              variants: ["400", "700"],
              subsets: ["latin-ext"],
            },
            {
              family: "Gaegu",
              variants: ["400", "700"],
              // subsets: ["latin-ext"],
            },
            {
              family: "Aubrey",
              variants: ["400", "700"],
              // subsets: ["latin-ext"],
            },
          ],
        },
      },
    },
  ],
}

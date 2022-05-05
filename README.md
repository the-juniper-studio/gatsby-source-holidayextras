<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
  +
  <a href="https://www.holidayextras.com">
  <img alt="Holiday Extras" src="https://dmy0b9oeprz0f.cloudfront.net/holidayextras.co.uk/brand-guidelines/logo-tags/svg/robot-2.svg" width="60px">
  </a>
</p>
<h1 align="center">
  Starter for a Gatsby Plugin
</h1>

A minimal boilerplate for the essential files Gatsby looks for in a plugin.

## What does this plugin do?

This plugin queries Information from Holiday Extras Product Library.
Details of the API can be found by visiting the [Holiday Extras API Docs](https://docs.holidayextras.co.uk/hxapi/productlibrary/)

## Why should you use it?

This Service is great for generating information about products and services Holiday Extras provides. You can use this data to generate your own informational pages using Gatsby. We recommend using this service with your own content for SEO.

## 🚀 Quick start

```shell
npm install gatsby-source-holidayextras
```

## Add environment variables

Environment variables allow you to safely store sensitive information about your projects, like your API Key or Access Tokem. At the root of your project, create two files:

.env.development
.env.production

Then, add the variables on each file to match your HX API information.
HX_API_KEY
HX_API_TOKEN

## Configure the plugin

Define the plugin configuration in the `gatsby-config.js` file. The following gives a basic example of the plugin.

```shell
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    // ...
    {
      resolve: gatsby-source-holidayextras,
      options: {
        products: [array of HX product codes]
        key: process.env.HX_API_KEY,
        token: process.env.HX_API_TOKEN`
      }
    },
  ]
}
```

Running this in your project will return the following basic values for Parking, and Hotel products only:

```
address
airport
latitude
logo
longitude
name
productCode
type
```

## How to Contribute

Whether you're helping us fix bugs, improve the docs, or spread the word, we'd love to have your help.

Asking a question or reporting a bug: please feel free to open an [issue](https://github.com/the-juniper-studio/gatsby-source-holidayextras/issues).

Suggesting an improvement: Open an issue explaining your improvement or feature so we can discuss and learn more. Please also check [our roadmap](roadmap) to see what ideas for improvements we already have

Submitting code changes: For small fixes, feel free to open a PR with a description of your changes. For large changes, please first open an issue so we can discuss if and how the changes should be implemented.

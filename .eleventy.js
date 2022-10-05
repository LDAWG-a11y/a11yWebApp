const markdownIt = require('markdown-it');
const markdownItEleventyImg = require("markdown-it-eleventy-img");
const Image = require("@11ty/eleventy-img");
const htmlmin = require("html-minifier");

module.exports = eleventyConfig => {
  const { DateTime } = require("luxon");
  const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

  eleventyConfig.addWatchTarget('./src/sass');
  eleventyConfig.addPassthroughCopy('./src/css');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/profileImg');
  eleventyConfig.addPassthroughCopy('src/guideImg');
  eleventyConfig.addPassthroughCopy('src/svg');
  eleventyConfig.addPassthroughCopy('src/fonts');
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  const markdownItEleventyImgConfig = {
    imgOptions: {
      widths: [1200, 900, 600, 300],
      urlPath: "/guideImg/",
      outputDir: "./public/guideImg/",
      formats: ["webp", "png"]
    },
    globalAttributes: {
      class: "guide__image",
      decoding: "async",
      loading: "lazy",
      sizes: "100vw"
    }
  }

  let mdLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItEleventyImg, markdownItEleventyImgConfig)

  eleventyConfig.setLibrary("md", mdLib);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
  });

  function filterTagList(tags) {
    return (tags || []).filter(tag => ["guide", "glossarySorted", "writers", "contributors", "guides", "faqs", "terms"].indexOf(tag) === -1);
  }

  eleventyConfig.addFilter("filterTagList", filterTagList)

  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });

    return filterTagList([...tagSet].sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'})));
  });

  eleventyConfig.addCollection("glossarySorted", (collectionApi) =>
  collectionApi.getFilteredByGlob("src/terms/*.md").sort((a, b) => {
      if (a.data.title < b.data.title) return -1;
      else if (a.data.title > b.data.title) return 1;
      else return 0;
    })
  );  

  eleventyConfig.addCollection("writers", author => Object.values(author.items[0].data.contributors));

  eleventyConfig.addCollection("latest", collection => {
    return collection
      .getFilteredByTag("guides")
      .reverse()
      .slice(0, 3);
  });

  eleventyConfig.addFilter("getAuthor", (authors,label) => {
    let author = authors.filter(a => a.key === label)[0];
    return author;
  });

  eleventyConfig.addFilter("getGuidesByAuthor", (guides, author) => {
    return guides.filter(a => a.data.author === author);
  });

  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath && outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  return {
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',

    dir: {
      input: 'src',
      output: 'public'
    }
  };
};
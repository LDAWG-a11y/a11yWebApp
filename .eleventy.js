const markdownIt = require('markdown-it');
const markdownItEleventyImg = require("markdown-it-eleventy-img");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");

module.exports = eleventyConfig => {
  const { DateTime } = require("luxon");
  const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

  eleventyConfig.addWatchTarget('./src/sass');
  eleventyConfig.addPassthroughCopy('./src/css');
  eleventyConfig.addPassthroughCopy('./src/js');
  eleventyConfig.addPassthroughCopy('./src/img');
  eleventyConfig.addPassthroughCopy('./src/fonts');
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`)

  const markdownItEleventyImgConfig = {
    imgOptions: {
      widths: [1200, 800, 400],
      outputDir: "./public/img/",
      formats: ["avif", "webp", "jpeg", "png"]
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

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
  });

  eleventyConfig.addPlugin(syntaxHighlight);

  function filterTagList(tags) {
    return (tags || []).filter(tag => ["guide", "guides", "faqs"].indexOf(tag) === -1);
  }

  eleventyConfig.addFilter("filterTagList", filterTagList)

  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });

    return filterTagList([...tagSet].sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'})));
  });

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

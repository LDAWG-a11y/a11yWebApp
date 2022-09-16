module.exports = eleventyConfig => {
  const postcss = require("postcss");
  const autoprefixer = require("autoprefixer");
  const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
  const { DateTime } = require("luxon");

  eleventyConfig.addWatchTarget('./src/sass');
  eleventyConfig.addPassthroughCopy('./src/css');
  eleventyConfig.addPassthroughCopy('./src/js');
  eleventyConfig.addPassthroughCopy('./src/img');
  eleventyConfig.addPassthroughCopy('./src/fonts');
  eleventyConfig.addPassthroughCopy('./src/svg');
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
  });

  function filterTagList(tags) {
    return (tags || []).filter(tag => ["guide", "guides"].indexOf(tag) === -1);
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

  eleventyConfig.addFilter("debugger", (...args) => {
    console.log(...args)
    debugger;
  })

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

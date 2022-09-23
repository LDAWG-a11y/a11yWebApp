module.exports = eleventyConfig => {
  const postcss = require("postcss");
  const autoprefixer = require("autoprefixer");
  const { DateTime } = require("luxon");
  const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
  const Image = require("@11ty/eleventy-img");

  eleventyConfig.addWatchTarget('./src/sass');
  eleventyConfig.addPassthroughCopy('./src/css');
  eleventyConfig.addPassthroughCopy('./src/js');
  eleventyConfig.addPassthroughCopy('./src/img');
  eleventyConfig.addPassthroughCopy('./src/fonts');
  eleventyConfig.addPassthroughCopy('./src/svg');
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
  });

  async function imageShortcode(src, alt, sizes) {
    let metadata = await Image(src, {
      widths: [300, 600],
      formats: ["avif", "jpeg"]
    });
  
    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };
  
    return Image.generateHTML(metadata, imageAttributes);
  }

  eleventyConfig.addPlugin(syntaxHighlight);

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

  eleventyConfig.addFilter("getAuthor", (authors,label) => {
    let author = authors.filter(a => a.key === label)[0];
    return author;
  });

eleventyConfig.addFilter("getGuidesByAuthor", (guides, author) => {
	return guides.filter(a => a.data.author === author);
});

eleventyConfig.addFilter('toJson', JSON.stringify);
eleventyConfig.addFilter('fromJson', JSON.parse);

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

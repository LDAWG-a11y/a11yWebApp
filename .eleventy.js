const markdownItEleventyImg = require('markdown-it-eleventy-img');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const Image = require('@11ty/eleventy-img');
const htmlmin = require('html-minifier');
const slugify = require('slugify');
const pluginTOC = require('eleventy-plugin-toc');
const path = require('path');

module.exports = eleventyConfig => {
  const { DateTime } = require('luxon');
  const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
  eleventyConfig.amendLibrary("md", mdLib => mdLib.enable("code"));

  eleventyConfig.addWatchTarget('./src/sass');
  eleventyConfig.addPassthroughCopy('./src/css');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/guideImg');
  eleventyConfig.addPassthroughCopy('src/profileImg');
  eleventyConfig.addPassthroughCopy('src/faqImg');
  eleventyConfig.addPassthroughCopy('src/aaaAssets');
  eleventyConfig.addPassthroughCopy('src/docs');
  eleventyConfig.addPassthroughCopy('src/aaaDocs');
  eleventyConfig.addPassthroughCopy('src/svg');
  eleventyConfig.addPassthroughCopy('src/fonts');
  eleventyConfig.addPassthroughCopy('src/admin');
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ['h2', 'h3'],
    wrapper: '',
  });
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  const markdownItEleventyImgConfig = {
    imgOptions: {
      widths: [1200, 900, 600, 300],
      urlPath: '/guideImg/',
      outputDir: './public/guideImg/',
      formats: ['webp', 'png'],
    },
    globalAttributes: {
      class: 'guide__image',
      decoding: 'async',
      loading: 'lazy',
      sizes: '100vw',
    },
  };

  function imageShortcode(src, alt, sizes = '(max-width: 28rem)') {
    let options = {
      widths: [380],
      formats: ['webp', 'jpeg'],
      urlPath: '/aaaAssets',
      outputDir: './public/aaaAssets',
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}w.${format}`;
      },
    };
    Image(src, options);

    let imageAttributes = {
      alt,
      sizes,
      loading: 'lazy',
      decoding: 'async',
    };
    let metadata = Image.statsSync(src, options);
    return Image.generateHTML(metadata, imageAttributes);
  }
  eleventyConfig.addShortcode('image', imageShortcode);

  const linkAfterHeader = markdownItAnchor.permalink.linkAfterHeader({
    class: 'cms__anchor',
    symbol: `<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="4 14 40 20"><path d="M22.5 34H14q-4.2 0-7-3t-3-7q0-4.2 3-7t7-3h8.5v3H14q-2.9 0-5 2-2 2.1-2 5t2 5q2.1 2 5 2h8.5Zm-6.3-8.5v-3h15.6v3Zm9.3 8.5v-3H34q2.9 0 5-2 2-2.1 2-5t-2-5q-2.1-2-5-2h-8.5v-3H34q4.2 0 7 3t3 7q0 4.2-3 7t-7 3Z"></path></svg>`,
    style: 'aria-labelledby',
  });

  const mdAnchorOpts = {
    level: [2],
    slugify: str =>
      slugify(str, {
        lower: true,
        strict: true,
        remove: /["]/g,
      }),
    permalink(slug, opts, state, idx) {
      state.tokens.splice(
        idx,
        0,
        Object.assign(new state.Token('div_open', 'div', 1), {
          attrs: [['class', 'cms__anchor-wrapper']],
          block: true,
        })
      );

      state.tokens.splice(
        idx + 4,
        0,
        Object.assign(new state.Token('div_close', 'div', -1), {
          block: true,
        })
      );
      linkAfterHeader(slug, opts, state, idx + 1);
    },
  };

  let mdLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  })
    .use(markdownItEleventyImg, markdownItEleventyImgConfig)
    .use(markdownItAnchor, mdAnchorOpts);

  eleventyConfig.setLibrary('md', mdLib);
  eleventyConfig.addFilter('markdownify', markdownString =>
    mdLib.render(markdownString)
  );
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj).toLocaleString(
      DateTime.DATE_MED
    );
  });

  function filterTagList(tags) {
    return (tags || []).filter(
      tag =>
        [
          'guide',
          'glossarySorted',
          'writers',
          'contributors',
          'guides',
          'faqs',
          'terms',
          'studentStoriesAAA',
        ].indexOf(tag) === -1
    );
  }

  eleventyConfig.addFilter('filterTagList', filterTagList);

  eleventyConfig.addCollection('tagList', function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });

    return filterTagList(
      [...tagSet].sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: 'base' })
      )
    );
  });

  eleventyConfig.addCollection('glossarySorted', collectionApi =>
    collectionApi.getFilteredByGlob('src/terms/*.md').sort((a, b) => {
      if (a.data.title < b.data.title) return -1;
      else if (a.data.title > b.data.title) return 1;
      else return 0;
    })
  );

  eleventyConfig.addCollection('writers', author =>
    Object.values(author.items[0].data.contributors)
  );

  eleventyConfig.addFilter('getAuthor', (authors, label) => {
    let author = authors.filter(a => a.key === label)[0];
    return author;
  });

  eleventyConfig.addFilter('getGuidesByAuthor', (guides, author) => {
    return guides.filter(a => a.data.author === author);
  });

  eleventyConfig.addCollection('aaaStories', collection => {
    return collection.getFilteredByTag('aaaStories');
  });

  eleventyConfig.addFilter('answer', faq => {
    const content = faq.replace(/(<([^>]+)>)/gi, '');
    return content.substr(0, content.lastIndexOf(' ', 300)) + '...';
  });

  eleventyConfig.addFilter('uppercase', function (string) {
    return string.toUpperCase();
  });

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath && outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  return {
    templateFormats: ['md', 'njk'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',

    dir: {
      input: 'src',
      output: 'public',
    },
  };
};

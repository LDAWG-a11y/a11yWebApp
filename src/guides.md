---
layout: base.njk
title: All Guides
summary: some description for google
templateEngineOverride: njk
pagination:
  size: 6
  data: collections.guides
  alias: helpGuides
  reverse: true
eleventyComputed:
  title: All guides Page {%- if page.url != pagination.href.first %} {{ pagination.pageNumber + 1 }} of {{ pagination.pageLinks.length }} {% endif%}
  summary: "All digital accessibility guides from our website tagged with “{{ tag }}”"
---

<div class="intro-panel">
  <h2 class="intro-panel__heading">Search by tag</h2>
  <a class="skip-tags" href="#h2">Skip {{ collections.tagList.length }} tags</a>
  <div class="tags">
    {%- for tag in collections.tagList %}
      <span class="tag__item">
      {%- set tagUrl %}/tags/{{ tag | slugify }}/{%- endset %}
      <a class="tag__link tag__link--has-count" href="{{ tagUrl | url }}" class="post-tag">{{ tag }}<span class="tag__count" aria-label="{{ collections[tag].length }} guide{%- if collections[tag].length > 1 %}s{%- endif %}">{{ collections[tag].length }}</span></a>
      </span>
    {%- endfor %}
  </div>
</div>

<h2 id="h2" tabindex="-1">Showing {{ (pagination.pageNumber * pagination.size) + 1 }} to {%- if pagination.nextPageLink %} {{ (pagination.pageNumber * pagination.size) + pagination.size }} {%- else %} {{ collections.guides.length }} {%- endif %} of {{ collections.guides.length }} results</h2>

<ul class="cards">
  {%- for guide in helpGuides %}
    <li class="card__item">
      <article>
        <h3 class="card__title"><a href="{{ guide.url }}" class="card__link">{{ guide.data.title }}</a></h3>
        <p class="card__summary">{{ guide.data.summary }}</p>
        <div class="tags">
          {%- for tag in guide.data.tags | filterTagList %}
            <span class="tag__item tag__item--inert">
             {{ tag }}
            </span>
          {%- endfor %}
         </div>
        <span class="card__author-name"><a href="#" class="card__author-link">Joe Bloggs</a></span>
        <span class="card__date">{{ guide.data.date | readableDate }}</span>
      </article>
    </li>
  {%- endfor %}
</ul>
{%- if pagination.pageLinks.length > 1 %}
  {%- include "_pagination.njk" %}
{%- endif %}
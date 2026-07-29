---
layout: default
title: Activities
heading: Algebraic Geometry in Taiwan
permalink: /
---

<div class="page-header">
  <h1>{{ page.heading }}</h1>
  <a href="https://github.com/taiwan-ag/taiwan-ag.github.io/issues/new?template=add-event.yml" class="button">Add Event</a>
</div>

## Upcoming Events

{% include events-list.html events=site.data.events mode="upcoming" %}

## Past Events

{% include events-list.html events=site.data.events mode="past" %}

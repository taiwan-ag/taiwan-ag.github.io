---
layout: default
title: Job Opportunities
permalink: /job-opportunities/
---

# Job Opportunities

## Open Positions

{% assign today = site.time | date: "%Y-%m-%d" %}
{% assign open = "" | split: "" %}
{% for job in site.data.jobs.open_positions %}
  {% assign deadline = job.deadline | date: "%Y-%m-%d" %}
  {% assign one = site.data.jobs.open_positions | slice: forloop.index0, 1 %}
  {% if deadline >= today %}
    {% assign open = open | concat: one %}
  {% endif %}
{% endfor %}
{% assign open = open | sort: "deadline" %}

<ul>
{% for job in open %}
  <li>
    {% if job.url %}<a href="{{ job.url }}" class="event-link">{{ job.title }}</a>{% else %}{{ job.title }}{% endif %},
    at {{ job.institution }}. Deadline: {{ job.deadline | date: "%-d %b %Y" }}.
    {% if job.description %}{{ job.description }}{% endif %}
  </li>
{% endfor %}
</ul>
{% if open.size == 0 %}
<p><em>No open positions currently listed.</em></p>
{% endif %}

## Institutions Regularly Accepting Applications

<ul>
{% for r in site.data.jobs.recurring_opportunities %}
  <li>
    {% if r.url %}<a href="{{ r.url }}" class="external-link">{{ r.name }}</a>{% else %}{{ r.name }}{% endif %},
    {{ r.institution }}. {{ r.description }}
  </li>
{% endfor %}
</ul>

---
layout: default
title: Working Groups
permalink: /working-groups/
---

# Working Groups

<ul>
{% for group in site.data.working_groups %}
  <li>
    {% if group.url %}<a href="{{ group.url }}" class="external-link">{{ group.name }}</a>{% else %}{{ group.name }}{% endif %}
    &mdash; {{ group.institution }}. {{ group.description }}
  </li>
{% endfor %}
</ul>

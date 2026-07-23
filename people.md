---
layout: default
title: People
permalink: /people/
---

# People

## Algebraic Geometers in Taiwan

<ul>
{% for person in site.data.people.algebraic_geometers %}
  <li>
    {% if person.url %}<a href="{{ person.url }}" class="external-link">{{ person.name }}</a>{% else %}{{ person.name }}{% endif %}
    &mdash; {{ person.position }}, {{ person.institution }}.
    {% if person.research_interests %}Research interests: {{ person.research_interests }}.{% endif %}
    {% if person.email %}<a href="mailto:{{ person.email }}" class="mailto-link">Email</a>{% endif %}
  </li>
{% endfor %}
</ul>

## Working Groups

<ul>
{% for group in site.data.people.working_groups %}
  <li>
    {% if group.url %}<a href="{{ group.url }}" class="external-link">{{ group.name }}</a>{% else %}{{ group.name }}{% endif %}
    &mdash; {{ group.institution }}. {{ group.description }}
  </li>
{% endfor %}
</ul>

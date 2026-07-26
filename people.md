---
layout: default
title: People
permalink: /people/
---

{% assign positions = "Professor,Postdoc,PhD Student" | split: "," %}
{% assign institutions = site.data.people.algebraic_geometers | map: "institution" | uniq | sort %}

<div class="people-heading">
  <h1>Algebraic Geometers in Taiwan</h1>
  <button type="button" id="people-search-toggle" class="icon-button" aria-label="Toggle search and filters" aria-expanded="false" aria-controls="people-filters">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  </button>
</div>

<div class="people-filters" id="people-filters" hidden>
  <div class="filter-group">
    <label for="people-search" class="filter-group-label">Search</label>
    <input type="text" id="people-search" class="people-search" placeholder="Search by name…" autocomplete="off">
  </div>

  <div class="filter-group">
    <span class="filter-group-label">Position</span>
    <div class="filter-options">
      {% for position in positions %}
      <span class="filter-checkbox">
        <input type="checkbox" id="filter-position-{{ position | slugify }}" data-filter-type="position" value="{{ position | escape }}">
        <label for="filter-position-{{ position | slugify }}">{{ position }}</label>
      </span>
      {% endfor %}
    </div>
  </div>

  <div class="filter-group">
    <span class="filter-group-label">Affiliation</span>
    <div class="filter-options">
      {% for institution in institutions %}
      <span class="filter-checkbox">
        <input type="checkbox" id="filter-institution-{{ institution | slugify }}" data-filter-type="institution" value="{{ institution | escape }}">
        <label for="filter-institution-{{ institution | slugify }}">{{ institution }}</label>
      </span>
      {% endfor %}
    </div>
  </div>

  <div class="filter-group">
    <span class="filter-group-label">Research interests</span>
    <div class="filter-options">
      {% for tag in site.data.research_areas %}
      <button type="button" class="tag-chip" data-filter-type="tag" data-filter-value="{{ tag.id }}" title="{{ tag.label }}">{{ tag.abbr }}</button>
      {% endfor %}
    </div>
  </div>

  <div class="filter-actions">
    <button type="button" id="people-filters-clear" class="button">Clear filters</button>
  </div>
</div>

<p id="people-empty-message" class="people-empty-message" hidden><em>No one matches the current filters.</em></p>

{% for position in positions %}
  {% assign group = site.data.people.algebraic_geometers | where: "position", position | sort: "surname" %}
  {% if group.size > 0 %}
  <section class="people-group">
    <h3>{{ position }}{% if position != "PhD Student" %}s{% endif %}</h3>
    <div class="people-cards">
      {% for person in group %}
        {% assign interests = person.research_interests | default: "" | join: " " %}
        <div class="person-card" data-position="{{ person.position | escape }}" data-institution="{{ person.institution | escape }}" data-interests="{{ interests | escape }}" data-name="{{ person.name | downcase | escape }}">
          <p class="person-line1">
            {% if person.url %}<a href="{{ person.url }}" class="external-link person-name">{{ person.name }}</a>{% else %}<span class="person-name">{{ person.name }}</span>{% endif %}
            <span class="person-sep">—</span> {{ person.position }}
            {% if person.email %}<a href="mailto:{{ person.email }}" class="mailto-link person-email-icon" aria-label="Email {{ person.name }}">✉</a>{% endif %}
          </p>
          <p class="person-affiliation">{{ person.institution }}</p>
          {% if person.research_interests and person.research_interests.size > 0 %}
          <p class="person-tags">
            {% for tag_id in person.research_interests %}
              {% assign tag = site.data.research_areas | where: "id", tag_id | first %}
              {% if tag %}<button type="button" class="tag-chip" data-filter-type="tag" data-filter-value="{{ tag.id }}" title="{{ tag.label }}">{{ tag.abbr }}</button>{% endif %}
            {% endfor %}
          </p>
          {% endif %}
        </div>
      {% endfor %}
    </div>
  </section>
  {% endif %}
{% endfor %}

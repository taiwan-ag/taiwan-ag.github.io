---
layout: default
title: Activities
heading: Algebraic Geometry in Taiwan
permalink: /
---

# {{ page.heading }}

<div class="events-actions">
  <a href="{{ '/add-event/' | relative_url }}" class="button">Add Event</a>
  <button type="button" id="events-search-toggle" class="button" aria-expanded="false" aria-controls="events-filters">Search</button>
</div>

<div class="events-filters" id="events-filters" hidden>
  <div class="filter-group">
    <label for="events-search" class="filter-group-label">Search</label>
    <input type="search" id="events-search" class="events-search" placeholder="Search events…" autocomplete="off">
  </div>

  <div class="filter-group" role="group" aria-labelledby="events-category-label">
    <span class="filter-group-label" id="events-category-label">Type of event</span>
    <div class="filter-options">
      <span class="filter-checkbox">
        <input type="checkbox" id="events-category-meeting" value="meeting" data-filter-type="category">
        <label for="events-category-meeting">Meeting (conference, workshop, etc.)</label>
      </span>
      <span class="filter-checkbox">
        <input type="checkbox" id="events-category-talk" value="talk" data-filter-type="category">
        <label for="events-category-talk">Talk (seminar talk, colloquium talk, etc.)</label>
      </span>
    </div>
  </div>

  <div class="filter-group" role="group" aria-labelledby="events-date-label">
    <span class="filter-group-label" id="events-date-label">Starting date</span>
    <div class="events-date-range">
      <div class="events-date-field">
        <label for="events-start-from">From</label>
        <input type="date" id="events-start-from" class="events-date-input" aria-describedby="events-date-hint">
      </div>
      <div class="events-date-field">
        <label for="events-start-to">To</label>
        <input type="date" id="events-start-to" class="events-date-input" aria-describedby="events-date-hint">
      </div>
    </div>
    <p class="events-filter-hint" id="events-date-hint">Includes both dates. Either date can be left blank.</p>
    <p class="events-date-error" id="events-date-error" role="status" hidden>Choose a “To” date on or after the “From” date.</p>
  </div>

  <div class="filter-actions">
    <button type="button" id="events-filters-clear" class="button">Clear filters</button>
  </div>
</div>

<p id="events-empty-message" class="events-empty-message" role="status" hidden><em>No events match the current filters.</em></p>

{% assign events = site.data.meetings | concat: site.data.talks %}

<section class="events-group" aria-labelledby="upcoming-events-heading">
  <h2 id="upcoming-events-heading">Upcoming Events</h2>
  {% include events-list.html events=events mode="upcoming" %}
</section>

<section class="events-group" aria-labelledby="past-events-heading">
  <h2 id="past-events-heading">Past Events</h2>
  {% include events-list.html events=events mode="past" %}
</section>

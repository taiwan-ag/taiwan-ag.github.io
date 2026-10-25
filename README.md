# Taiwan Algebraic Geometry

A website for the algebraic geometry community in Taiwan: who's active and
what events (upcoming and past) are happening.

Built with [Jekyll](https://jekyllrb.com/) and hosted on GitHub Pages.

## Local development

Requires Ruby and Bundler.

    bundle install
    bundle exec jekyll serve

Then open <http://127.0.0.1:4000>. The site rebuilds automatically as you
edit files.

## Content data files

Everything editable lives under `_data/*.yml`. Both content types
(events, people) accept public suggestions via a GitHub issue template,
reachable from buttons on the
[Contact](https://taiwan-ag.github.io/contact/) page
(`contact.md`); a maintainer then manually transcribes an accepted
suggestion into the data file and closes the issue — there's no
automation linking the two, so the data file is always the source of
truth.

## Events

### Suggesting an event

Visitors use the **Add Event** button on the homepage (Activities)
or the Contact page, which opens a pre-filled [issue form](https://github.com/taiwan-ag/taiwan-ag.github.io/issues/new?template=add-event.yml)
(defined in `.github/ISSUE_TEMPLATE/add-event.yml`) asking for the event
title, category (`meeting` or `talk`), organizing institution, whether
that institution organized the event without hosting it on its own
campus, start/end dates, and an optional homepage URL. The category is
a required single-choice dropdown. Submitting it opens an issue labeled
`add-event`.

### Adding an event

Whether you're transcribing a suggestion issue or adding one directly,
edit `_data/events.yml` and append an entry:

```yaml
- title: "NCTS Workshop on Birational Geometry"
  category: meeting   # required: meeting or talk (see below)
  institution: "National Center for Theoretical Sciences (NCTS)"
  organized_by: true   # omit unless the institution organized the event
                        # without hosting it on its own campus (e.g. a
                        # lab running a workshop at a resort) -- flips
                        # the display from "at [institution]" to
                        # "organized by [institution]"
  start: 2026-10-05
  end: 2026-10-09     # omit entirely for a single-day event
  url: "https://www.ncts.ntu.edu.tw/..."   # omit if there's no event homepage
```

Dates are `YYYY-MM-DD`. You don't need to place the entry in any
particular order in the file — `_includes/events-list.html` (included
twice on the homepage, once per section) automatically sorts events
into Upcoming vs. Past and orders them by date, based on `end` (or
`start`, if there's no `end`) versus the current date. If you're
closing out a suggestion issue, do that once the entry is merged.

### Event categories

Every event must explicitly include `category` with exactly one of these
two values:

- `meeting`: conferences, workshops, minicourses, summer schools, and
  similar programs.
- `talk`: individual seminar talks, colloquium talks, and other standalone
  presentations.

Classify what the entry represents, independently of duration. A one-day
workshop is a `meeting`; an individual talk listed separately within a
workshop is a `talk`.

When transcribing a suggestion issue, copy the selected category into
the event's `category` field. Keep the dropdown options in
`.github/ISSUE_TEMPLATE/add-event.yml` in sync with these two values.
Meeting cards have a light blue background. The category also controls
the Activities page's event-type filter.

### Searching events

The **Search** button on Activities opens filters for the text displayed
in each card (including the event title and institution), event type,
and a range for the event's starting date. Both date endpoints are
inclusive, and either can be left blank. Selecting no event types shows
both categories; selecting both does the same. Text, type, and date
filters work together and preserve the existing event order. **Clear
filters** restores the full list.

## People

### Suggesting a person

Visitors use the **Add Researcher** button on the People or Contact page,
which opens a pre-filled [issue form](https://github.com/taiwan-ag/taiwan-ag.github.io/issues/new?template=add-person.yml)
(`.github/ISSUE_TEMPLATE/add-person.yml`) asking for name, surname,
position, institution, an optional homepage/email, and research
interests: checkboxes drawn from the current tag taxonomy, plus a
free-text "Other" field for anything not yet covered.

### Adding a person

Edit `_data/people.yml` and append an entry under `algebraic_geometers`:

```yaml
- name: "Jane Doe"
  surname: "Doe"                 # see below -- not displayed
  position: "Professor"          # "Professor", "Postdoc", "Visitor", or "PhD Student"
  institution: "National Taiwan University"
  research_interests: ["birational-geometry", "moduli-spaces"]
  url: "https://example.org/~janedoe"    # optional
  email: "jane.doe@example.org"          # optional
```

`surname` is used only to alphabetize people within their position block
on the People page (Professors, then Postdocs, then Visitors, then PhD
Students) — it's never shown. For "Wen-Fong Ke", `surname` would be
`"Ke"`.

`research_interests` is a list of tag `id`s, not free text — see the next
section.

### Research interest tags

The People page's research-interest filter only works because every
person draws from the same fixed set of tags: `research_interests`
entries must reference an `id` from `_data/research_areas.yml`, not
arbitrary text. Each tag there looks like:

```yaml
- id: birational-geometry      # stable slug, referenced from people.yml
                                # and the issue template -- don't rename
                                # an id once it's in use, or existing
                                # references to it stop resolving
  label: "Birational Geometry" # full name, shown as a checkbox option
                                # in the "Add person" issue template
  abbr: "Bir. Geom."            # short form, shown on People page chips
```

**To add a tag**: append a new entry to `_data/research_areas.yml` with
a unique `id`, then also add its `label` as a new checkbox option under
`research-interests` in `.github/ISSUE_TEMPLATE/add-person.yml`, so
future suggestions can select it.

**When a suggestion lists "Other" interests**: decide whether the
free-text answer matches an existing tag (use that tag's `id` on the new
person) or genuinely needs a new one (add it as above, then reference
the new `id`).

**Removing a tag**: also remove it from every person's
`research_interests` — `people.md` guards the lookup, so a dangling `id`
just silently drops out of that person's chip list rather than breaking
the build, but it's best kept in sync.


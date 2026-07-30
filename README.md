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
title, organizing institution, whether that institution organized the
event without hosting it on its own campus, start/end dates, and an
optional homepage URL. Submitting it opens an issue labeled `add-event`.

### Adding an event

Whether you're transcribing a suggestion issue or adding one directly,
edit `_data/events.yml` and append an entry:

```yaml
- title: "NCTS Workshop on Birational Geometry"
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

## People

### Suggesting a person

Visitors use the **Add Researcher** button on the Contact page,
which opens a pre-filled [issue form](https://github.com/taiwan-ag/taiwan-ag.github.io/issues/new?template=add-person.yml)
(`.github/ISSUE_TEMPLATE/add-person.yml`) asking for name, surname,
position, institution, an optional homepage/email, and research
interests: checkboxes drawn from the current tag taxonomy, plus a
free-text "Other" field for anything not yet covered. Unlike events,
there's no such button on the People page itself, to keep it focused on
browsing the community rather than prompting entries.

### Adding a person

Edit `_data/people.yml` and append an entry under `algebraic_geometers`:

```yaml
- name: "Jane Doe"
  surname: "Doe"                 # see below -- not displayed
  position: "Professor"          # "Professor", "Postdoc", or "PhD Student"
  institution: "National Taiwan University"
  research_interests: ["birational-geometry", "moduli-spaces"]
  url: "https://example.org/~janedoe"    # optional
  email: "jane.doe@example.org"          # optional
```

`surname` is used only to alphabetize people within their position block
on the People page (Professors, then Postdocs, then PhD Students) — it's
never shown. For "Wen-Fong Ke", `surname` would be `"Ke"`.

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


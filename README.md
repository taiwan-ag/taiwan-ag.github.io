# Taiwan Algebraic Geometry

A website for the algebraic geometry community in Taiwan: who's active and
what working groups exist, upcoming and past events, and job opportunities.

Built with [Jekyll](https://jekyllrb.com/) and hosted on GitHub Pages.

## Local development

Requires Ruby and Bundler.

    bundle install
    bundle exec jekyll serve

Then open <http://127.0.0.1:4000>. The site rebuilds automatically as you
edit files.

## Content data files

Everything editable lives under `_data/*.yml`. All four content types
(events, people, working groups, jobs) accept public suggestions via a
GitHub issue template, reachable from buttons on the
[Get in Touch](https://taiwan-ag.github.io/get-in-touch/) page
(`get-in-touch.md`); a maintainer then manually transcribes an accepted
suggestion into the data file and closes the issue — there's no
automation linking the two, so the data file is always the source of
truth.

## Events

### Suggesting an event

Visitors use the **Add Event** button on the homepage (Upcoming Events)
or the Get in Touch page, which opens a pre-filled [issue form](https://github.com/taiwan-ag/taiwan-ag.github.io/issues/new?template=add-event.yml)
(defined in `.github/ISSUE_TEMPLATE/add-event.yml`) asking for the event
title, organizing institution, start/end dates, and an optional homepage
URL. Submitting it opens an issue labeled `add-event`.

### Adding an event

Whether you're transcribing a suggestion issue or adding one directly,
edit `_data/events.yml` and append an entry:

```yaml
- title: "NCTS Workshop on Birational Geometry"
  institution: "National Center for Theoretical Sciences (NCTS)"
  start: 2026-10-05
  end: 2026-10-09     # omit entirely for a single-day event
  url: "https://www.ncts.ntu.edu.tw/..."   # omit if there's no event homepage
```

Dates are `YYYY-MM-DD`. You don't need to place the entry in any
particular order in the file — `_includes/events-list.html` (used by
both the homepage and `/past-events/`) automatically sorts events into
Upcoming vs. Past and orders them by date, based on `end` (or `start`,
if there's no `end`) versus the current date. If you're closing out a
suggestion issue, do that once the entry is merged.

## People

### Suggesting a person

Visitors use the **Add Researcher** button on the Get in Touch page,
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

## Working Groups

### Suggesting a working group

Visitors use the **Add Working Group** button on the Get in Touch page,
which opens a pre-filled [issue form](https://github.com/taiwan-ag/taiwan-ag.github.io/issues/new?template=add-working-group.yml)
(`.github/ISSUE_TEMPLATE/add-working-group.yml`) asking for the group's
name, institution, description, and an optional homepage.

### Adding a working group

Whether you're transcribing a suggestion issue or adding one directly,
edit `_data/working_groups.yml` and append an entry:

```yaml
- name: "Example Algebraic Geometry Seminar"
  institution: "National Taiwan University"
  description: "Weekly seminar on current topics in algebraic geometry."
  url: "https://example.org/ag-seminar"   # optional
```

Shown on the `/working-groups/` page. Working groups aren't linked to
`_data/people.yml` entries — a person's membership in one, if any, isn't
tracked in the data.

## Job Opportunities

### Suggesting a job opportunity

Visitors use the **Add Job Opportunity** button on the Get in Touch
page, which opens a pre-filled [issue form](https://github.com/taiwan-ag/taiwan-ag.github.io/issues/new?template=add-job-opportunity.yml)
(`.github/ISSUE_TEMPLATE/add-job-opportunity.yml`) asking for the
position title, institution, an optional application deadline (left
blank for a recurring/rolling opportunity), an optional posting URL, and
an optional description.

### Adding a job opportunity

Whether you're transcribing a suggestion issue or adding one directly,
edit `_data/jobs.yml`, which has two lists:

```yaml
open_positions:
  - title: "Postdoctoral Fellow in Algebraic Geometry"
    institution: "National Taiwan University"
    deadline: 2026-12-01
    url: "https://example.org/jobs/postdoc"   # optional
    description: "Two-year position, algebraic geometry or related areas."

recurring_opportunities:
  - name: "NCTS Postdoctoral Fellowships"
    institution: "National Center for Theoretical Sciences (NCTS), Taiwan"
    url: "https://example.org/ncts-fellowships"   # optional
    description: "Accepts applications on a rolling basis; check their site for current calls."
```

Add a suggestion with a `deadline` to `open_positions`, and one without
a `deadline` (an ongoing/recurring opportunity) to
`recurring_opportunities` — note the second list uses `name` rather than
`title`. `deadline` is `YYYY-MM-DD`. `open_positions` entries
automatically stop appearing on the Job Opportunities page once their
`deadline` passes — you can delete the entry from the file at that point
too, but it's not required. `recurring_opportunities` are always shown
and have no `deadline` field.

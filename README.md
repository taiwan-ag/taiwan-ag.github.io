# Taiwan Algebraic Geometry

A website for the algebraic geometry community in Taiwan: who's active and
what events (upcoming and past) are happening.

Built with [Jekyll](https://jekyllrb.com/) and hosted on GitHub Pages.

## Local development

Requires Ruby and Bundler.

    bundle config set --local path vendor/bundle
    bundle install
    bundle exec jekyll serve

The first command configures this project's gems to install in
`vendor/bundle`, avoiding permissions errors from system gem directories.
Run it once per checkout. The local Bundler settings and installed gems
are ignored by Git.

Then open <http://127.0.0.1:4000>. The site rebuilds automatically as you
edit files.

## Content data files

Everything editable lives under `_data/*.yml`. Both content types
(events, people) accept public suggestions via GitHub issue forms,
reachable from buttons on the
[Contact](https://taiwan-ag.github.io/contact/) page
(`contact.md`); a maintainer then manually transcribes an accepted
suggestion into the data file and closes the issue — there's no
automation linking the two, so the data file is always the source of
truth.

## Events

Event listings live in `_data/meetings.yml` and `_data/talks.yml`.
The homepage (`index.md`) combines these files to build the Upcoming
and Past event lists. Add each event to the appropriate file.

### Suggesting an event

Visitors use the **Add Event** button on the homepage (Events)
or the Contact page to open the [event choice page](https://taiwan-ag.github.io/add-event/)
(`add-event.md`). They choose **Meeting** or **Talk**, then open the
corresponding GitHub issue form:

- `.github/ISSUE_TEMPLATE/add-meeting.yml` asks for a title, institution,
  and start date, with optional end date, location, homepage, and an
  organizer checkbox for meetings held away from the institution's campus.
- `.github/ISSUE_TEMPLATE/add-talk.yml` asks for a talk title, speaker,
  hosting institution, and date, with optional institution abbreviation,
  seminar name, seminar website, location, and talk homepage.

Both forms create issues labeled `add-event`; their titles identify
them as `[Meeting]` or `[Talk]`. A maintainer reviews the suggestion and
copies accepted details into the appropriate data file below. Set
`category` from the chosen form; visitors do not need to select it again.
Close the suggestion issue once the entry is merged.
For talks, copy the optional **Institution abbreviation** answer to
`institution_abbreviated`, keeping the full hosting name in `institution`.

### Adding a meeting

Append conferences, workshops, minicourses, summer schools, and similar
programs to `_data/meetings.yml`. Required fields are `title`,
`category: meeting`, `institution`, and `start`. For example:

```yaml
- title: "NCTS Workshop on Birational Geometry"
  category: meeting
  institution: "National Center for Theoretical Sciences (NCTS)"
  organized_by: true  # optional; only for meetings held away from its campus
  location: "Taipei"  # optional city or geographical region
  start: 2026-10-05
  end: 2026-10-09     # omit for a single-day meeting
  url: "https://example.org/workshop"  # optional meeting homepage
```

Meeting cards show the date and linked title on the first line. The
second line reads **At [institution]** or **Organized by [institution]**,
followed by **in [location]** when a location is supplied. Use
`organized_by: true` only when an institution organizes a meeting at a
different physical venue, such as a lab running a workshop at a resort.
Otherwise omit it.

Use `location` for the city or geographical region, separately from
the hosting or organizing institution. Examples include `Taipei`,
`Xitou`, and `Taiwan's East Coast`. The same field is available for talks.

### Adding a talk

Append individual seminar talks, colloquium talks, and other standalone
presentations to `_data/talks.yml`. Replace the initial `[]` with the
first entry; keep `[]` when there are no talks. Required fields are
`title` (the individual talk's title), `speaker`, `category: talk`,
`institution` (the host), and `start`. For example:

```yaml
- title: "Moduli spaces of sheaves"
  speaker: "Jane Doe"
  category: talk
  institution: "National Taiwan University"
  institution_abbreviated: "NTU"  # optional short name for the talk card
  start: 2026-11-05
  location: "Taipei"  # optional city or geographical region
  seminar: "NCTS Seminar in Algebraic Geometry"  # optional recurring series
  seminar_url: "https://example.org/seminar"    # optional series website
  url: "https://example.org/talk"               # optional individual talk page
```

Talk cards show **date: seminar (institution_abbreviated, location)** on
the first line when an abbreviation is supplied, for example
**5 Nov 2026: NCTS Seminar in Algebraic Geometry (NTU, Taipei)**.
If `institution_abbreviated` is omitted, empty, or only whitespace, the
card uses **(institution, location)** instead. Always supply the full
hosting name in `institution`; `institution_abbreviated` is an optional
display name, such as `AS` for Academia Sinica or `NCTS` for National
Center for Theoretical Sciences.

Use `location` for a city or geographical region, usually just the city:
write `Taipei`, not `NTU, Taipei`. Omit `location` to show only the
abbreviation or full institution name in parentheses, without a comma.

The second line shows **speaker — talk title**. Omit `seminar` for a
standalone talk; the heading defaults to **Seminar talk**.

The seminar name links to `seminar_url`, and the talk title links to
`url`, independently. Omit either URL when unavailable; supply a seminar
name whenever you supply `seminar_url`. Seminar details are stored
directly in each talk entry, so repeat them for each talk in a series.
Add one entry per dated talk; omit meeting-only fields `end` and
`organized_by`.

The examples above are illustrative, not actual event listings. Omit
unknown optional fields rather than guessing their values.

### Dates, ordering, and categories

Dates are `YYYY-MM-DD`. Entries can appear in any order in either file.
The homepage combines meetings and talks, and `_includes/events-list.html`
automatically groups and sorts them by their **start date**:

- **Upcoming Events:** ascending order, with the earliest start date at
  the top and later dates below, so visitors see the next events first.
- **Past Events:** descending order, with the latest start date at the
  top and older dates below, so visitors see the most recent events first.

The different sort directions are intentional and apply to both meetings
and talks within each section, regardless of their order in the data files.

Grouping is separate from sorting: at each site build, an event belongs
to Upcoming if its `end` (or `start`, if there is no `end`) is today or
later in Taiwan (`Asia/Taipei`); otherwise it belongs to Past. This keeps
an ongoing multi-day meeting in Upcoming through its final day, while its
position within the section still depends on its start date.

Every entry must explicitly include `category: meeting` in the meetings
file or `category: talk` in the talks file. The category controls card
layout, the light blue background for meetings, and the Events
page's event-type filter.

Classify what the entry represents, independently of duration. A one-day
workshop is a `meeting`; an individual talk listed separately within a
workshop is a `talk`.

### Searching events

The **Search** button on Events opens filters for the text displayed
in each card (including the title, speaker, seminar, institution, and
location), event type, and a range for the event's starting date.
Institution searches match both the displayed abbreviation and the full
institution name. Both date endpoints are inclusive, and either can be
left blank. Selecting no event types shows both categories; selecting
both does the same. Text, type, and date
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


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

## Adding an event

Use the [Add Event](https://github.com/taiwan-ag/taiwan-ag.github.io/issues/new?template=add-event.yml)
issue template rather than editing `_data/events.yml` directly. Once an
issue is submitted, a maintainer adds the corresponding entry to
`_data/events.yml` by hand and closes the issue — there's no automation
behind this step.

## Adding or editing people, working groups, and jobs

These aren't backed by an issue template — open a pull request editing
`_data/people.yml` (algebraic geometers and working groups) or
`_data/jobs.yml` (open positions and institutions that regularly accept
applications) directly.

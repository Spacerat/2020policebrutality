# 2020 policy brutality front-end

## This is a work in progress!

This is another front-end for the data on policy brutality at 2020 George Floyd anti policy brutality protests, being collected at https://github.com/2020PB/police-brutality

It allows users to filter by **tag** and state and displays incidents in a relatively easy-to-consume format. The search filters update the URL, so you can send people a filtered set of results (e.g. )

## Improvement ideas

- Nicer visual design
    - Show filters in bar on left of screen if there's enough space?
- More tags (e.g. tags for medics, bystanders)
- Search by date
- Sort by most recent first? Custom sorting?
- Show embeds on card click?
- Show images somehow?
- Optimize (why is unclicking search so slow? can it be made quicker? also I'm binding callbacks the Bad Way (https://preactjs.com/guide/v8/linked-state/))

## Development

Set up - install dependencies

```
yarn
```

Run locally

```
yarn start
```

Building & deploying

```
yarn build
git commit -m "Build" .
git push
```
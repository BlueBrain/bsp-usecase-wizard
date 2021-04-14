
## Get started

Install the dependencies...

```bash
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5005](http://localhost:5005).

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

## Deploying to the web

For each push to the repo, a Github Action will be launched:

`https://github.com/antonelepfl/ebrains-wizard/blob/main/.github/workflows/gh-pages.yml`

#### It will deploy the app in gh-pages
- If the commit is from Main branch (production page) https://antonelepfl.github.io/ebrains-wizard/
- If the commit is from any other branch (devevelopment page) https://antonelepfl.github.io/ebrains-wizard/dev/

This wizard will be embeded into https://github.com/antonelepfl/ebrains-sim-cl-dev
And then when we are fine with the changes, we should PR to https://github.com/lbologna/ebrains-sim-cl-dev

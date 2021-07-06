
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

`.github/workflows/gh-pages.yml`

#### It will deploy the app in gh-pages
- If the commit is from Main branch (production page) [link](https://bluebrain.github.io/bsp-usecase-wizard/index.html)
- If the commit is from any other branch (devevelopment page) [link](https://bluebrain.github.io/bsp-usecase-wizard/dev/index.html)

This wizard will be embeded into [Cellular Level Simulation](https://github.com/ebrains-cls-interactive/ebrains-cls-interactive.github.io) page


## Funding & Acknowledgment
- This project/research has received funding from the European Union’s Horizon 2020 Framework Programme for Research and Innovation under the Specific Grant Agreement No. 945539 (Human Brain Project SGA3).

Copyright (c) 2021 Blue Brain Project/EPFL

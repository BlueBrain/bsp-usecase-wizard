# Blue Brain Project - Usecase Wizard

This repo contains the logic to build the web application that displays the scientific use cases to be run in [Ebrains](https://ebrains.hbp.eu/). It fetches the information from [usecases-info](https://github.com/ebrains-cls-interactive/usecases-info) repo.

<p align="center">
  <img src="https://user-images.githubusercontent.com/4954312/173317350-e85cc01a-0bcc-4ec8-a192-7d956a059374.gif">
</p>

## Documentation

A full guide can be found at:

### [workflows-and-use-case-organization](https://ebrains-cls-interactive.github.io/docs/getting_started/getting_started.html#workflows-and-use-case-organization)

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

## Deploying to the web

For each push to the repo, a Github Action will be launched:

`.github/workflows/gh-pages.yml`

#### It will deploy the app in gh-pages
- If the commit is from Main branch (production page) [link](https://bluebrain.github.io/bsp-usecase-wizard/index.html). The usecase info is fetched from `main` branch [link](https://github.com/ebrains-cls-interactive/usecases-info/blob/main/usecases-info.json)

- If the commit is from any other branch (devevelopment page) [link](https://bluebrain.github.io/bsp-usecase-wizard/dev/index.html) The usecase info is fetched from `develop` branch [link](https://github.com/ebrains-cls-interactive/usecases-info/blob/develop/usecases-info.json)

This wizard will be embeded into [Cellular Level Simulation](https://github.com/ebrains-cls-interactive/ebrains-cls-interactive.github.io) page


## Funding & Acknowledgment
- This project/research was supported by funding to the Blue Brain Project, a research center of the École polytechnique fédérale de Lausanne (EPFL), from the Swiss government’s ETH Board of the Swiss Federal Institutes of Technology.
- This project/research has received funding from the European Union’s Horizon 2020 Framework Programme for Research and Innovation under the Specific Grant Agreement No. 945539 (Human Brain Project SGA3).

Copyright (c) 2021-2022 Blue Brain Project/EPFL

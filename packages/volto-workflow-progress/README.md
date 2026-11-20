# @eeacms/volto-workflow-progress

[![Releases](https://img.shields.io/github/v/release/eea/volto-workflow-progress)](https://github.com/eea/volto-workflow-progress/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-workflow-progress%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-workflow-progress/job/master/display/redirect)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-workflow-progress&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-workflow-progress)

[Volto](https://github.com/plone/volto) add-on to give Plone Content Editors an overview of Document's publication workflow progress.

## Features

### Demo - Customize Workflow state's percentage via ZMI

[![Workflow Progress](https://raw.githubusercontent.com/eea/volto-workflow-progress/master/docs/volto-workflow-progress.gif)](https://youtu.be/MV2_23_dBkc?si=8nHRxqQmnj8yy1Cb)

## Upgrade

### Upgrading to 7.x

> This version requires `Volto 18` or `Volto 19` and Node.js 22.

No API or behaviour change: the control panel id and route, the exported components, the request
paths and the CSS classes are the same as 6.x. The release adds Volto 19 support and moves the
repository to the Volto 19 layout, where the published package lives in
`packages/volto-workflow-progress`.

#### Breaking changes

- **Node.js 22 or newer is required** (`engines.node >= 22`), 6.x declared no engine.
- **React 18 is required.** The package declares `react` and `react-dom` as `^18.2.0` peers, 6.x
  declared no peers.
- **The package no longer ships the repository tooling.** The Cypress specs and the Jest setup are
  gone and the unit tests moved to Vitest next to the add-on, so nothing a site imports was removed.

## Dependencies

### Backend

- [Plone](https://plone.org/download)
- [plone.restapi](https://pypi.org/project/plone.restapi/)
- [eea.progress.workflow](https://pypi.org/project/eea.progress.workflow)

## Requirements

### Backend

- [Plone](https://plone.org/download)
- [plone.restapi](https://pypi.org/project/plone.restapi/)

### Frontend

- Node.js: `>=22.0.0`

## Installation

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "dependencies": {
       "@eeacms/volto-workflow-progress": "*"
   }
   ```

   and `volto.config.js`:

   ```JavaScript
   const addons = ['@eeacms/volto-workflow-progress'];
   ```

* If not, create one with Cookieplone, as recommended by the official Plone documentation for Volto 18+:

   ```
   uvx cookieplone project
   cd project-title
   ```

1. Install or update dependencies, then start the project:

   ```
   make install
   ```

   For a Cookieplone project, start the backend and frontend in separate terminals:

   ```
   make backend-start
   make frontend-start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## License

See [LICENSE.md](LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)

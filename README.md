# volto-workflow-progress

[![Releases](https://img.shields.io/github/v/release/eea/volto-workflow-progress)](https://github.com/eea/volto-workflow-progress/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-workflow-progress%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-workflow-progress/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-workflow-progress&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-workflow-progress)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-workflow-progress&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-workflow-progress)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-workflow-progress&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-workflow-progress)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-workflow-progress&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-workflow-progress)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-workflow-progress%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-workflow-progress/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-workflow-progress&branch=develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-workflow-progress&branch=develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-workflow-progress&branch=develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-workflow-progress&branch=develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-workflow-progress&branch=develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-workflow-progress&branch=develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-workflow-progress&branch=develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-workflow-progress&branch=develop)

[Volto](https://github.com/plone/volto) add-on to give Plone Content Editors an overview of Document's publication workflow progress.

## Features

### Demo - Customize Workflow state's percentage via ZMI

[![Workflow Progress](https://raw.githubusercontent.com/eea/volto-workflow-progress/master/docs/volto-workflow-progress.gif)](https://youtu.be/MV2_23_dBkc?si=8nHRxqQmnj8yy1Cb)

## Dependencies

### Backend

- [Plone](https://plone.org/download)
- [plone.restapi](https://pypi.org/project/plone.restapi/)
- [eea.progress.workflow](https://pypi.org/project/eea.progress.workflow)

## Getting started

### Try volto-workflow-progress with Docker

      git clone https://github.com/eea/volto-workflow-progress.git
      cd volto-workflow-progress
      make
      make start

Go to http://localhost:3000

`make start` now defaults to Volto 18. To run the same setup against Volto 17, use:

      VOLTO_VERSION=17 make
      VOLTO_VERSION=17 make start

### Add volto-workflow-progress to your Volto project

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

   For a legacy Volto 17 project, install the package with `yarn` and restart the frontend as usual.

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-workflow-progress/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-workflow-progress/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-workflow-progress/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)

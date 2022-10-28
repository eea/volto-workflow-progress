# volto-workflow-progress

[![Releases](https://img.shields.io/github/v/release/eea/volto-workflow-progress)](https://github.com/eea/volto-workflow-progress/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-workflow-progress%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-workflow-progress/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-workflow-progress-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-workflow-progress-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-workflow-progress-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-workflow-progress-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-workflow-progress-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-workflow-progress-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-workflow-progress-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-workflow-progress-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-workflow-progress%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-workflow-progress/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-workflow-progress-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-workflow-progress-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-workflow-progress-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-workflow-progress-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-workflow-progress-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-workflow-progress-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-workflow-progress-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-workflow-progress-develop)


Toolbar enhanced workflow [Volto](https://github.com/plone/volto) add-on

## Features

- Toolbar enhanced workflow slot

## Getting started

1. Create new volto project if you don't already have one:

   ```
   $ npm install -g yo @plone/generator-volto
   $ yo @plone/volto my-volto-project --addon @eeacms/volto-workflow-progress

   $ cd my-volto-project
   $ yarn add -W @eeacms/volto-workflow-progress
   ```

1. If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-workflow-progress"
   ],

   "dependencies": {
       "@eeacms/volto-workflow-progress": "*"
   }
   ```

1. Install new add-ons and restart Volto:

   ```
   $ yarn
   $ yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## Dependencies

### Backend

- [Plone](https://plone.org/download)
- [plone.restapi](https://pypi.org/project/plone.restapi/)
- [eea.progress.workflow](https://pypi.org/project/eea.progress.workflow)

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

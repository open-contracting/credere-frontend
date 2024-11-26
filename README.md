# Credere Frontend

A tool that facilitates the participation of Micro, Small, and Medium businesses (MSMEs) in the Colombian public procurement market.

## Installation

To download the repo dependencies run

```
npm install
```

## ENV Variables

As the build system is Vite, the variables name should start with **VITE\_**

For VS Code Intellisense to recognize the new variables declare them in the file `src/vite-env.d.ts`

## Package scripts

These are the commands available in _package.json_

| Commnad                   | Description                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `npm run dev`             | Runs dev server with the HMR locally on port `3000`                                                           |
| `npm run lint`            | Runs eslint to find errors                                                                                    |
| `npm run lint-fix`        | Runs eslint to find errors and auto-fix the ones it can                                                       |
| `npm run build`           | Builds optimized app package in the dist directory                                                            |
| `npm run preview`         | Runs server using the dist folder from a build                                                                |
| `npm run test`            | Runs tests                                                                                                    |
| `npm run storybook`       | Runs a Storybook locally on port `6006`                                                                       |
| `npm run build-storybook` | Builds static app with [a Storybook's content](https://storybook.js.org/docs/react/sharing/publish-storybook) |

## Transifex

For translations, the project is using the [Transifex](https://developers.transifex.com/docs/javascript-sdk-setup) service.

### React Implementation

The specific implementation being used is: **Transifex Native SDK**

For specific instructions on how to use the available components, please refer to:

[https://www.npmjs.com/package/@transifex/react](https://www.npmjs.com/package/@transifex/react)

### Pushing Content to Transifex Service

It's necessary to use the Transifex CLI in order to push content to the service server.

For detailed instructions on installing the CLI, please refer to:

[https://www.npmjs.com/package/@transifex/cli](https://www.npmjs.com/package/@transifex/cli)

#### Push keys to Transifex

To upload the current strings to the Transifex server for translation, execute the following command, we must be positioned within the **/src** directory of the project

```bash
npx txjs-cli push --token=[transifex-token] --secret=[transifex-secret]
```

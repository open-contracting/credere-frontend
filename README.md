# Credere Frontend

A tool that facilitates the participation of Micro, Small, and Medium businesses (MSMEs) in the Colombian public procurement market.

## Installation

To download the repo dependencies run

```
npm install
```

## ENV Variables

Copy the _.env.example_ into _.env_ and set the the backend URL with your dev server.
As the build system is Vite, the variables name should start with **VITE\_**

For VS Code Intellisense to recognize the new variables declare them in the file _vite-env.d.ts_

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

## Integrating with VSCode

You should configure VSCode to use ESLint and Prettier to find problems and format our code, respectively. If you don't have the extensions installed yet, install them: [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

There is a _.vscode/settings.json_ file with the following settings:

```
{
...
"editor.formatOnSave": true,
"editor.defaultFormatter": "esbenp.prettier-vscode"
...
}
```

to configure VSCode to use Prettier to format our file on save.
The ESLint extension should work automatically if there's a valid configuration file in (.eslintrc) the current workspace.

For Tailwind, the official [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension enhances the Tailwind development experience by providing users with advanced features such as autocomplete, syntax highlighting, and linting.

## Husky

Husky and Lint-staged are set up to run pre-commit hook and now allow to commit if there is an Eslint error.
Also commit-lint is used to check [commit messages conventions](https://www.conventionalcommits.org/en/v1.0.0/)

### Types for commit-lint

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

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

# Credere Frontend

A tool that facilitates the participation of Micro, Small, and Medium businesses (MSMEs) in the Colombian public procurement market.

## Environment variables

As the build system is Vite, the variables name should start with **VITE\_**

For VS Code Intellisense to recognize the new variables, declare them in the file `src/vite-env.d.ts`

## Commands

Run development server:

```bash
npx vite
```

Build production files into `dist` directory:

```bash
npx tsc && npx vite build
```

Run server from the `dist` directory:

```bash
npx vite preview
```

Run a Storybook locally:

```bash
npx storybook dev
```

Build static app with a [Storybook's content](https://storybook.js.org/docs/react/sharing/publish-storybook):

```bash
npx storybook build
```

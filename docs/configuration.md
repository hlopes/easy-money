# 🔧 Configuration

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

#### NextJS Config file

 File in a Next.js project is used to customize and configure various aspects of your Next.js application. It allows you to modify the default behavior of Next.js and add custom configurations, plugins, and other settings

[NextJS Config Example](../next.config.js)

#### ESLint

ESLint is a linting tool for JavaScript. Enforces consistency in the codebase and prevent some mistakes along the way.

[ESLint Example](../.eslintrc.json)

#### TypeScript

ESLint is great for catching some of the bugs related to the language, but since JavaScript is a dynamic language ESLint cannot check data that run through the applications, which can lead to bugs, especially on larger projects. That is why TypeScript should be used.

[TSConfig Example](../tsconfig.json)

#### Tailwind CSS

Tailwind CSS is a highly customizable, utility-first CSS framework for building responsive and modern web applications. It's designed to make it easier and more efficient to create user interfaces by providing a set of pre-defined utility classes that can be applied directly to HTML elements.

Here are some key features and concepts of Tailwind CSS: Utility-First Approach, Modular and Composable, Responsive Design, Customization, Plugins, Developer Experience, Documentation.

[Tailwind CSS Example](../.tailwind.config.js)

#### Husky

Husky is a tool for executing git hooks. Use Husky to run your code validations before every commit, thus making sure the code is in the best shape possible at any point of time and no faulty commits get into the repo. It can run linting, code formatting and type checking, etc. before it allows pushing the code. You can check how to configure it [here](https://typicode.github.io/husky/#/?id=usage).

#### Lint Staged

Linting makes more sense when run before committing your code. By doing so you can ensure no errors go into the repository and enforce code style. But running a lint process on a whole project is slow, and linting results can be irrelevant. Ultimately you only want to lint files that will be committed.

This project contains a script that will run arbitrary shell tasks with a list of staged files as an argument, filtered by a specified glob pattern.

[Lint-Staged Example](../.lintstagedrc.js)

#### Commit Lint

Commit linting, often referred to as "conventional commit messages" or "semantic commit messages," is a practice and toolset used in software development to enforce a consistent and standardized format for commit messages. The primary goal of commit linting is to make it easier to understand the history of a codebase and automate certain processes like versioning and changelog generation.

[Commit lint Example](../commitlint.config.js)

#### Environment Variables

```bash
# The postgres database url 
DATABASE_URL=

# Needed for Clerk authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```
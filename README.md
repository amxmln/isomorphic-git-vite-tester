# Minimal Example to test cloning in different contexts and bundlers

This is a minimal example using `isomorphic-git` to clone its own repository in
the browser and node.

Without applying the fix mentioned in [#2309](https://github.com/isomorphic-git/isomorphic-git/pull/2309/)
this will fail with an error for Vite bundles in the browser.

As soon as the fix is applied, the clone will work without an issue both during
development and after build in any environment.

## Setup

Each sub-folder of this repository contains **self-contained** examples of cloning
using different bundlers and environments.

Switch to the directory of the example you’d like to test and run `npm i` to
install the dependencies. For bundled environments targeting the browser, use
`npm run dev` or `npm run build` to generate the bundles and run the examples.

For Node environments, run `npm start` to execute the scripts.

For environments without a build step (unpkg and jsdelivr), you need to serve
the files of the folder using a local server, e.g. `python3 -m http.server`.

## How to test the Vite builds


After running `npm run dev` open the displayed page in the browser.
Then click "Start clone" and observe the output in the `<pre>` below.
There should be an error.

Apply the fix mentioned in [#2309](https://github.com/isomorphic-git/isomorphic-git/pull/2309/)
and if necessary clean the Vite cache by running `rm -r node_modules/.vite`.
Then run `npm run dev` again and test once more.
This time the clone should succeed and list the contents of the repo.

The script cleans up the file system on each run, so the button can be clicked
multiple times.

To test the built files, run:

```sh
$ npm run build
$ npm run preview
```

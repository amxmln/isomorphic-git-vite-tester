# Minimal Example to test cloning in the browser with Vite

This is a minimal example using `isomorphic-git` to clone its own repository in
the browser. It uses `vite` to bundle the code.

Without applying the fix mentioned in [#2309](https://github.com/isomorphic-git/isomorphic-git/pull/2309/)
this will fail with an error.

As soon as the fix is applied, the clone will work without an issue both during
development and after build.

## How to test

After cloning and switching into the directory, run these commands:

```sh
$ npm i
$ npm run dev
```

Then open the displayed page in the browser. Then click "Start clone" and observe
the output in the `<pre>` below. There should be an error.

Apply the fix and if necessary clean the Vite cache by running
`rm -r node_modules/.vite`. Then run `npm run dev` again and test once more.
This time the clone should succeed and list the contents of the repo.

The script cleans up the file system on each run, so the button can be clicked
multiple times.

To test the built files, run:

```sh
$ npm run build
$ npm run preview
```

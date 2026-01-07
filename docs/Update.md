# Update

If the instructions for installation have been followed, there will be a local instance of the website project on the user's PC, connected to the Github respository. There will also be a 'deployed' version on Google Cloud Run. That is assumed as the starting point for this guide.

## Routine Maintenance

The Sveltekit framework is built using code from a large number of open source projects. From time to time, the maintainers of these projects will release a new version. These updates can be incorporated into the website by first updating the node modules cache and then re-building and re-deploying.

The node module cache is linked to a 'lock' file (`package-lock.json` for NPM), and this is updated by running the appropriate command for the chosen package manager - e.g.: `npm update`

Once the node module cache and lock file have been updated on the local machine, the service should be 'built' locally, to check that this stage works, locally, and to create an updated 'app.yaml' file. [Some local testing with the Vite dev server is also advisable.]

The new, local build can then be deployed to a new version in GCR, e.g.: `gcloud builds submit`

Finally, the updated lock file should be committed and 'pushed' to the Github repository.

If a Continuous Deployment workflow has been put in place, the re-build and re-deploy actions can be triggered merely by pushing an updated lock file.

## Minor Update / Bug Fix

Minor updates can be executed and committed directly on the 'main' branch of the Github repository. If there is more than one maintainer, the usual care must be taken by each of them, not to let their local copy of the repository get 'ahead' of the Github origin.

As above, the local instance should be used to test the website changes, and then a new 'build' must be performed (e.g. `npm run build`) to generate a new app.yaml.

## Major Update

In line with best practice for git-based projects, any major change should (normally) be done on a new 'branch'. If desired, a 'pull' request can be created, to track the reason for the new branch, but that is optional. The developer(s) working on the update will use their local installations to develop and test new code.

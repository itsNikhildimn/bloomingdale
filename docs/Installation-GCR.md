# Installation: Google Cloud Run

## Overview

The Bloomingdale School website is designed to run as two, separate services within Google Cloud Run [[1]](https://cloud.google.com/run). Each service is deployed as a Docker-built container image, which then runs within the GCR Kubernetes environment.

This document describes installation for the SvelteKit website service, the basic procedure for which is as follows:

- Set up development environment
- Clone and initialise copy of source code
- Configure the application
- Perform and check initial Cloud Build
- Set up Cloud Build triggers

## Initial Setup

These first, five tasks are common to both services and only need to be done once.

### Create Project

It is best if the resources for the website (services, database, storage and so on) are all in the same Google Cloud project. This reduces the number of 'permissions' that need to be granted to different service accounts. (They can share or inherit from the same, project-wide service account.)

### Get GCloud CLI Tools

Some of the installation steps can be done through the Cloud Console (web interface) but others [particularly deploying the application] will require use of the CLI tools [[2]](https://cloud.google.com/sdk/gcloud).

It is highly recommended that you use `gcloud init` after installing, to select the above GAE application and either its owning cloud account or your own [authorised] account. If you are not the owner of the billing account, you will need the owner to create a new GCloud 'user' and authorise that user to 'Edit' the application (i.e. deploy new services).

### Install NodeJS

The development tool chain for Sveltekit uses NodeJS, which is also the runtime platform required for the GAE service. At the time of writing this document, the project has been configured for NodeJS v18.x (the latest LTS version) and this version should also be used in the development environment.

### Select IDE

The project has been developed using the Visual Studio Code IDE, to which the following plugins have been added:

- SvelteKit
- Docker
- Google Cloud

### Assign Permissions

The following API's must be enabled:

- Artifact Registry API
- Cloud Run API
- Cloud SQL API
- Cloud Scheduler API
- Secret Manager API
- Enterprise reCAPTCHA API

The following permissions (roles) should be assigned:

- To the project's default service account:
  - Cloud Scheduler Job Runner [for Strapi]
  - Cloud SQL Client [for Strapi]
- To the project's Google Cloud Builder account:
  - Cloud Run Admin
  - Cloud SQL Viewer [for Strapi]

## Assign Permissions

It is best if the resources for the website (services, database, storage and so on) are all in the same Google Cloud project. This reduces the number of 'permissions' that need to be granted to different service accounts. (They can share or inherit from the same, project-wide service account.)

The following API's must be enabled:

- Artifact Registry API
- Cloud Run API
- Cloud SQL API
- Cloud Scheduler API
- Secret Manager API

The following permissions (roles) should be assigned:

- To the project's default service account:
  - Cloud Scheduler Job Runner
  - Cloud SQL Client
- To the project's Google Cloud Builder account:
  - Cloud Run Admin
  - Cloud SQL Viewer

## Clone Code

The source code for the Bloomingdale School website is contained in a Private repository within Github. That repository should be 'cloned' into a local folder. If using Visual Studio Code, that can be done by selecting the option to create a new project from an existing repository, and then entering the repository name into a search field.

The project was built using NPM as the NodeJS package manager, so after cloning it can be brought to a state that is ready to use by entering the CLI command `npm install`.

It is also possible to use yarn or pnpm, but you'll have to delete the `package-lock.json` file, first.

## Configure API Keys

The following application 'keys' are required for the website component of the solution:

- Google Enterprise reCAPTCHA
- Facebook Login (for sharing)

[Additional keys are required for the Strapi CMS: please refer to the documentation in that project for details.]

## Configure The Application

The website application requires a number of application variables, to configure various features. The best way to do this is via a `.env` file. However, the values required will differ between the production environment and your development environment, so it is generally necessary to have two files: `.env.production` and `.env.development`. (The leading dot in these file names is important.) The production settings must then be uploaded into Google Secret Manager as a secret called `bloom-env-cloudrun`.

Please refer to the file `docs/Configuration.md` [[3]](Configuration.md) in this project, for details.

If you install this service before the Strapi service, you will need to update the production settings (and the associated cloud secret) when you know the Strapi instance URL and have obtained an API token. You will then need to re-deploy the website service.

## Deploy The Service

This is done with the GCloud CLI, from the root folder of the Strapi NodeJS project, with the command `gcloud builds submit`.

The configuration file describing the build process is contained in the file `cloudbuild.yaml`.

The build process extracts the configuration settings from the secret `strapi-env-cloudrun`, creates a Docker image, pushes that image to the Artifact Repository and then deploys it to a Cloud Run service for immediate activation (replacing any previous version).

## Add Cloud Build Triggers

Setting up CI/CD automated builds is an optional step, but it means that someone maintaining the software does not need a user id within the Google Cloud project. Instead, a build will be performed upon every 'push' to the GitHub repository. For details of the procedure to set up a trigger, see the Cloud Build documentation [[4]](https://cloud.google.com/build/docs/automating-builds/github/build-repos-from-github?generation=1st-gen).

The `event` used to trigger a new build is typically a 'push' to the main branch. This can then include pushing after merging. (See `docs/Update.md` in this project.) The `region` for the trigger should (ideally) be the same as for other elements of the project. The `source` repository for the build should then be set to a GitHub repository you own, or over which you have 'admin' control. [The repository can be private.]

If you have not previously connected the source repository to Google Cloud Build, you will need to authorise the addition of Cloud Build as a GitHub 'application'. This sets up the webhook triggers on the GitHub side.

The assumption behind CI/CD automation is that you will perform sufficient testing in a local, development environment _before_ the changes are 'pushed' to the GitHub repository. Whatever changes are pushed to the main branch should be authorised to go live immediately.

# Installation: Google App Engine

## Overview

The Bloomingdale School website is designed to run in Google App Engine (GAE) standard environment [[1]](https://cloud.google.com/appengine/docs/standard), as two NodeJS services. The default service is installed from this project and comprises a web site built using SvelteKit with server-side rendering. The other service comprises a content management application, built on the Strapi 'headless' CMS.

This document describes how to install and configure the default service.

## Create Application

Select or create a new Google Cloud project and then, within that, create a new GAE application [[2]](https://cloud.google.com/appengine/docs/flexible/managing-projects-apps-billing). Note that the cloud account that us used to create the project is the one that will be billed for the running costs.

It is essential that a new App Engine application be created. Both the design and the Sveltkit 'build' adapter assume that the web site NodeJS service will be the default service in the GAE application. It cannot therefore be deployed within an existing application, without replacing the existing default service.

Usually, when a GAE application is created, an associated Service Account will be created automatically. If this has not happened, or you require a new service account, create it at this point. The service account enables permissions to be granted to access other cloud services.

The Sveltekit service does not require any additional roles, but for a Continuous Deployment (CD) workflow, you may elect to enable the AppEngine Admin API. [The Strapi CMS service requires further roles - see that project's installation document for details.]

## Get GCloud CLI Tools

Some of the installation steps can be done through the Cloud Console (web interface) but others [particularly deploying the application] will require use of the CLI tools.

It is highly recommended that you use `gcloud init` after installing, to select the above GAE application and either its owning cloud account or your own [authorised] account. If you are not the owner of the billing account, you will need the owner to create a new GCloud 'user' and authorise that user to 'Edit' the application (i.e. deploy new services).

## Install NodeJS

The development tool chain for Sveltekit uses NodeJS, which is also the runtime platform required for the GAE service. At the time of writing this document, the project has been configured for NodeJS v18.x (the latest LTS version) and this version should also be used in the development environment.

## Select IDE

The project has been developed using the Visual Studio Code IDE, to which the SvelteKit plugin has been added.

## Clone Code

The source code for the Bloomingdale School website is contained in a Private repository within Github. That repository should be 'cloned' into a local folder. If using Visual Studio Code, that can be done by selecting the option to create a new project from an existing repository, and then entering the repository name into a search field.

## Update Node Modules

The project was built using NPM as the NodeJS package manager, so it can be brought to a state that is ready to use by entering the CLI command `npm install`.

It is also possible to use yarn or pnpm, but you'll have to delete the `package-lock.json` file, first.

## Create A Facebook 'App'

The website requires a Facebook data access 'app' in order to allow visitors to 'share' news posts. This app must be set up to include use of the 'Facebook Login' API from the Javascript API. It is also highly recommended to restrict use of this app to an 'allowed' list of web site domains, one of which should be the App Engine default service address, without any qualifiers (i.e. no 'version' element and no 'service' element, and therefore no '-dot-' elements).

## Configure The Application

The website application requires a number of application variables, to configure various features. The best way to do this is via a `.env` file. However, the values required will differ between the production environment and your development environment, so it is generally necessary to have two files: `.env.production` and `.env.development`. (The leading dot in these file names is important.)

Please refer to the file `Configuration.md` [[3]](Configuration.md) for details.

Two of the configuration parameters (STRAPI_TOKEN and STRAPI_SERVER_URL) cannot be set correctly until after the Strapi CMS service has been configured and deployed. For the initial deployment of the default service, dummy values must be used. These must then be updated later (see below).

## Build The Application

After making any changes (including the above setup stages), and before deploying to Google App Engine, it is necessary to 'build' the deployment package. This is done by entering the CLI command `npm run build`.

Although the build will be run again, by the Google Cloud Build service, it is necessary to run it locally in order to generate the correct `app.yaml` file for the default service. This stage also builds the configuration variables into the code in a secure manner.

## Deploy The Application

The default service **must** be deployed before any other parts of the solution can be deployed. This is done with the GCloud CLI, e.g. (from the root folder of the website NodeJS project): `gcloud app deploy build/app.yaml`

The above assumes that the GCloud CLI has been initialised to provide default values for the selected GAE project. If not, you must provide them with the appropriate 'switch' parameters.

## Deploy Routing Rules

The GAE platform routes incoming requests to only the default service, unless instructed otherwise. In the Bloomingdale School solution, the Strapi service also needs to receive incoming requests. The routing configutation is defined by a file named `dispatch.yaml` that must also be deployed - after the default service - e.g.: `gcloud app deploy dispatch.yaml`

[The dispatch file is in the website NodeJS project, rather than the Strapi project, because it only needs to be deployed once.]

## Assign External Domain Name

The domain name assigned to a new App Engine application isn't exactly business-friendly, so it is likely that a custom domain name will have to be 'mapped' to the external App Engine service point. If so, follow the instructions in the GCloud documents [[4]](https://cloud.google.com/appengine/docs/legacy/standard/python/mapping-custom-domains).

Note that for all access that should stay inside the Google cloud - such as the 'STRAPI_SERVER_URL' configuration setting, to allow the web site to request data from Strapi - it is important to use Google Cloud domain names.

## Next Steps

The web site service will mostly work, even without the Strapi service, but needs the latter - with content - for full function. The next step is therefore to configure and install the Strapi service. Please refer to the `Installation.md` document in the Strapi project folder.

After the Strapi service is active, the Admin UI must be used to generate a new API key, which should then be added to the `.env.production` configuration file, along with the full URL for the Strapi service. This latter should be the GAE URL, so that traffic between the website and the Strapi service does not leave the Google Cloud platform. After this update, the website service must be re-deployed, so it will use the updated values.

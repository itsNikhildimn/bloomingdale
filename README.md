# Bloomingdale School Website

## Overview

This project is a new website for the [Bloomingdale International School](https://bloomingdale.edu.in) (BIS), located in Penamaluru, Vijayawada, Andhra Pradesh, India.

The site itself is built using [SvelteKit](https://kit.svelte.dev) with server-side rendering (SSR). Each URL results in the server sending a base 'application' bundle, along with the page that has been requested. Following links within the site results in the 'router' within that base bundle fetching just the new data for the requested page, so that navigation is fast.

Server-side rendering has been chosen because most pages also contain content that is fetched dynamically, from a Content Management System (CMS) based on the open source, [Strapi project](https://strapi.io). (For any page that doesn't have such content, and doesn't have any server-side form actions, consider adding `export const prerender = true;` to further optimise page load time.)

## Folder Structure

The bulk of the application is defined by files in the `src` folder, which further divides into `lib` for shared modules and `routes` for 'pages'. The sub-folder structure in the latter identifies the URL 'path' to each page. Parameters are included in some routes (e.g. `events/event/[id]`) so that the same page code can be used to generate an array of related pages.

Any content in the `static` folder is copied into the build area, during the site build process. Such content should be restricted to files that are referenced from `src/app.html`. All other content should be 'imported' from somewhere in the `lib` folder, so that Webpack can optimise it for delivery.

## Documentation

Please refer to the `docs` folder for information about installing, configuring, deploying and maintaining the application code.

## Getting Started

If you have just cloned this project and want to get started as quickly as possible, you will need to create a minimal `.env` file (see [docs/Configuration.md](docs/Configuration.md)). You can then run the Vite development server with the command `npm run dev`.
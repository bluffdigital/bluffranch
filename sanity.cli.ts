/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yhzkta6y'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineCliConfig({
    api: {
        projectId,
        dataset,
    },
    studioHost: process.env.SANITY_STUDIO_STUDIO_HOST || 'bluffranch', // Visit https://www.sanity.io/docs/environment-variables to learn more about using environment variables for local & production.
    autoUpdates: true,
})
# &hacks XI/2025 website

This is the source code for the Astro website used to publicize &hacks XI, W&M's 2025 hackathon. Some notes about the codebase are below:

### To install/run locally

1. Install Node.JS and PNPM
2. Install project dependencies with `pnpm i`
3. Run `pnpm run dev` to serve the development site

- See the Notion section for information on how to set up that integration.
- See the Firebase section for particulars on that.

### Deployment

This is all deployed to Netlify via a GitHub integration. To publish a new version of the site, just push updated code to Git. Everything else should happen automatically.

## To add content

### Sponsors

Just add a Markdown file to `src/content/sponsors/<sponsor>.md` with these lines, and add a picture of their logo to `src/assets/sponsors`

```
--
name: <Name of Sponsor>
tier: 'Bronze'
logo: 'src/assets/sponsors/<sponsor logo>.svg'
logoAlt: '<Sponsor's Logo>'
website: '<sponsor's website>'
---

```

The 'tier' attribute would hypothetically control the size and prominence of a sponsor's logo based on how much they donated. What that hierarchy looks like is more up to the sponsor's team than to me, and so I haven't implemented that. As of 6/12/25, it doesn't do anything. Don't worry about it.

Adding FAQs is exactly the same process as above. Create a file in the `src/content/blog` directory, which uses the same Markdown format as for sponsors. Possible properties include:

- `title`: The question.
- `description`: The answer to said question.
- As far as I can tell, `icon`, `pubDate`, `updatedDate`, `heroImage`, and `tags` are leftovers from the Astro template and don't change anything on the displayed website.

### Schedule Events: Setting up the Notion integration

This site features a Notion integration, and all itinerary events are filled in from an online Notion database. For this to work, you have to tell Astro what Notion DB that is, and provide authentication. To do that:

1. In Notion, go into settings > Connections > "Develop or Manage Integrations" > "New Integration"
Create a file in the project's root folder (named "andhacks25") called `.env` with two variables in it: 
        - a. Add a name; this isn't publicly visible and can be whatever

        - b. You can set type as "Internal." I think creating a public integration involves red tape and hoops to jump through with the Notion bureaucracy. You don't need to bother with that.

2. Click "Configure Integration Settings," then "show" next the internal integration secret.
3. Copy that into `.env` for the value of `NOTION_TOKEN`.
4. Navigate to the Notion database you want to integrate, click the menu in the top-right corner > "Connections" > "Add connection," and add the connection you just created
5. Copy the hexadecimal number before the question mark and paste it into `.env` for `NOTION_DATABASE_ID`. This should leave the following:

- `NOTION_TOKEN`: the API token for the Notion integration. This will look like "ntn-" followed by an insanely long hexadecimal number.
- `NOTION_DATABASE_ID`: The ID of the Notion DB from which to fetch events. This will just be an insanely long hexadecimal number.

#### Notes on the Notion integration: 

- Blank fields in a Notion database will display as "TBA"

- If you change the spreadsheet's column names/types in Notion, you will need to update the schema in notion.ts. See that file for details of how to do that.

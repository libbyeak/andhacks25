# &hacks XI/2025 website

This is the source code for the Astro website used to publicize &hacks XI, W&M's 2025 hackathon. Some notes about the codebase are below:

###To install/run

1. Install Node.JS and PNPM
2. Install project dependencies with `pnpm i`
3. Run `pnpm run dev` to serve the development site

##To add content

### Schedule Events

This site features a Notion integration, and all itinerary events are filled in from a Notion database. For this to work, you must create a file
in the project's root folder (named "andhacks25") called .env with two variables in it: 
	
- `NOTION_TOKEN`: the API token for the Notion integration. This will look like "ntn-" followed by an insanely long hexadecimal number.

- `NOTION_DATABASE_ID`: The ID of the Notion DB from which to fetch events. This will just be an insanely long hexadecimal number.

I haven't committed this info to Git, but I probably should

### Sponsors

Just add a Markdown file to `src/content/sponsors/` with these lines, and add a picture of their logo to `src/assets/sponsors`


```
--
name: 'William & Mary Entrepreneurship Hub'
tier: 'Bronze'
logo: 'src/assets/sponsors/ehub.svg'
logoAlt: the E-hub logo'
---
```

Everything else should happen automatically, but let me know of any issues.

import { Client } from "@notionhq/client";
import { onPageLoad } from "astro/virtual-modules/transitions-events.js";

export type ItineraryEvent = {
  date: Date;
  name: string;
  location: string;
  website: string;
};

export async function getEvents(): Promise<ItineraryEvent[]> {
  const notion = new Client({ auth: import.meta.env.NOTION_TOKEN });
  const pages = await notion.databases.query({
    database_id: import.meta.env.NOTION_DATABASE_ID,
    /*
    For now, at least, there are few enough events in the DB that we don't need a filter
    filter: {
      and: [
        {
          property: "website",
          status: {
            equals: "youtube.com",
          },
        },
      ],
    },*/
  });

  const events = pages.results
    .map((page) => {
      return {
        id: page,
        date: page.properties.Date.date.start,
        name: page.properties.Name.title[0].text.content, /* VSCode complains that page.properties doesn't exist, but empirically it seems to work right*/
        location: page.properties.Location.rich_text[0].plain_text,
        website: page.properties.Website.url,
      };
    })
    //.sort((a, b) => a.date.getTime() - b.date.getTime())
    //.splice(0, 5);

  return events;
}

getEvents()
.then(result =>
    console.log(result)
)
.catch(err => {
    console.error(err)
});
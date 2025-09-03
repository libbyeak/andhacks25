import { Client } from "@notionhq/client";

export type ItineraryEvent = {
  date: Date;
  name: string;
  location: string;
  website: string;
};

export async function getEvents(filterHomepage: boolean): Promise<ItineraryEvent[]> {
  let somethingIsFuckedUp = false; /* flag variable to judge whether we abort the mission and return early */

  const notion = new Client({ auth: import.meta.env.NOTION_TOKEN });
  let pages = null;
  /* I hate this so very much */
  if (filterHomepage) {
     pages = await notion.databases.query({
      database_id: import.meta.env.NOTION_DATABASE_ID,
      //For now, at least, there are few enough events in the DB that we don't need a filter
      //On the full itinerary, we want to show events that already happened during the hackathon, so date filtering
      //can't be done at this step. We've got to do that when we display the events.
      filter: {
        and: [
          {
            property: "Show on Homepage",
            checkbox: {
              equals: true,
            }
          },
        ],
      },
    })
    .catch(err => {
      /* Catch errors here so that the entire site doesn't lock up with a "fetch failed" error page */
      somethingIsFuckedUp = true; /* 'return' won't help us here (promises) -- set a flag */ 
    });
  }
  else {
      pages = await notion.databases.query({
      database_id: import.meta.env.NOTION_DATABASE_ID,
      //For now, at least, there are few enough events in the DB that we don't need a filter
      //On the full itinerary, we want to show events that already happened during the hackathon, so date filtering
      //can't be done at this step. We've got to do that when we display the events.
      /*filter: {
        and: [
          {
            property: "Show on Homepage",
            checkbox: {
              equals: true,
            }
          },
        ],
      },*/
    })
    .catch(err => {
      /* Catch errors here so that the entire site doesn't lock up with a "fetch failed" error page */
      somethingIsFuckedUp = true; /* 'return' won't help us here (promises) -- set a flag */ 
    });
  }

  if (somethingIsFuckedUp) return false;

  const events = pages.results
  .map((page) => {
    let dateObj = new Date(page.properties.Date.date.start);
    return {
      id: page,
      show: page.properties['Show on Homepage'],
      date: new Date(page.properties.Date.date.start),
      //date: page.properties.Date.date ? dateObj.toDateString() + ' at ' + dateObj.getHours() + ':00' : "Date and time TBA",
      name: page.properties.Name.title[0] ? page.properties.Name.title[0].text.content : "TBA", /* VSCode complains that page.properties doesn't exist, but empirically it seems to work right */
      /* this is a URL, not a page on our server; make sure links handle that correctly */
      location: page.properties.Location.rich_text[0] ? page.properties.Location.rich_text[0].plain_text : "Location TBA",
      website: page.properties.Website.url ? ((page.properties.Website.url.slice(0,3) == 'http') ? page.properties.Website.url : ('http://' + page.properties.Website.url)) : "", 
    };
  })
  .sort((a, b) => {
    try {
    if (a != undefined && b!= undefined) a.date.getTime() - b.date.getTime()
    }
    catch {
      return -1; /* Events with date/time TBA will always be placed at the END of the list. Return +1 to put them at the start */ 
    }
  });
  //.splice(0, 5);
  
  return events;
}
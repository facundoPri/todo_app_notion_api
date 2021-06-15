const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req, res) => {
  const databaseId = process.env.NOTION_DATABASE_ID;
  // const response = await notion.databases.query({
  //   database_id: databaseId,
  // });
  // const response = await notion.databases.list();
  // const pageId = "94bd1119-5a8d-42c1-8c3f-1263add83399";
  // const response = await notion.pages.retrieve({ page_id: pageId });
  const response = await notion.search({
    query: "Facundo",
    sort: {
      direction: "ascending",
      timestamp: "last_edited_time",
    },
  });
  // const response = await notion.pages.create({
  //   parent: {
  //     database_id: databaseId,
  //   },
  //   properties: {
  //     Name: {
  //       title: [
  //         {
  //           text: {
  //             content: "Tuscan Kale",
  //           },
  //         },
  //       ],
  //     },
  //     Description: {
  //       text: [
  //         {
  //           text: {
  //             content: "A dark green leafy vegetable",
  //           },
  //         },
  //       ],
  //     },
  //     "Food group": {
  //       select: {
  //         name: "🥦 Vegetable",
  //       },
  //     },
  //     Price: {
  //       number: 2.5,
  //     },
  //   },
  //   children: [
  //     {
  //       object: "block",
  //       type: "heading_2",
  //       heading_2: {
  //         text: [
  //           {
  //             type: "text",
  //             text: {
  //               content: "Lacinato kale",
  //             },
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       object: "block",
  //       type: "paragraph",
  //       paragraph: {
  //         text: [
  //           {
  //             type: "text",
  //             text: {
  //               content:
  //                 "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
  //               link: {
  //                 url: "https://en.wikipedia.org/wiki/Lacinato_kale",
  //               },
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   ],
  // });
  res.status(200).json({ response });
};

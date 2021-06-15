const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export default async function handler(req, res) {
  if (req.method === "PUT") {
    res.status(201).json({});
  }

  if (req.method === "GET") {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    res.status(200).json({ response });
  }

  if (req.method === "POST") {
    res.status(200).json({});
  }

  if (req.method === "DELETE") {
    res.status(204).json({});
  }
}

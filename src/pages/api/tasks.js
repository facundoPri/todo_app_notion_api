const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const pageId = req.query.id;
      const { name, project, state } = req.body;
      const Project = {
        multi_select: [
          {
            name: project,
          },
        ],
      };
      const Task = {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      };
      const State = {
        select: {
          name: state,
        },
      };
      const properties = {};
      project && (properties.Project = Project);
      name && (properties.Task = Task);
      state && (properties.State = State);
      const response = await notion.pages.update({
        page_id: pageId,
        properties,
      });
      res.status(201).json({ response });
    } catch (err) {
      res.status(500).json({ error: 'Sorry unable to update the page' });
    }
  }

  if (req.method === 'GET') {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    const tasks = [];
    response.results.map((task) => {
      tasks.push({
        id: task.id,
        name: task.properties.Task.title[0].text.content,
        state: task.properties.State.select.name,
        project: task.properties.Project.multi_select,
      });
    });
    res.status(200).json(tasks);
  }

  if (req.method === 'POST') {
    try {
      const { name, project, state } = req.body;
      const data = {
        parent: {
          database_id: databaseId,
        },
        properties: {
          Project: {
            multi_select: [
              {
                name: project,
              },
            ],
          },
          State: {
            select: {
              name: state,
            },
          },
          Task: {
            title: [
              {
                text: {
                  content: name,
                },
              },
            ],
          },
        },
      };
      const response = await notion.pages.create(data);
      res.status(201).json({ response });
    } catch (e) {
      res.status(500).json({ error: 'Sorry unable to save the page' });
    }
  }

  if (req.method === 'DELETE') {
    res.status(204).json({});
  }
}

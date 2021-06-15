import { Box } from '@chakra-ui/layout';

const { Client } = require('@notionhq/client');

export default function Home({ tasks }) {
  console.log(tasks);
  return (
    <div>
      <main>
        <h1>Next.js + Notion = Task App</h1>

        <div>
          {tasks.map((task) => {
            console.log(
              task.properties.Task.title[0].text.content,
              task.properties.State.select.name,
            );
            return (
              <div
                key={task.id}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Box
                  mx={2}
                  h={4}
                  w={4}
                  border="1px solid gray"
                  borderRadius={4}
                  bg={
                    task.properties.State.select.name == 'Done'
                      ? '#000'
                      : '#fff'
                  }
                ></Box>
                <h2>{task.properties.Task.title[0].text.content}</h2>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const databaseId = process.env.NOTION_DATABASE_ID;

  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return {
    props: {
      tasks: response.results,
    },
    revalidate: 1,
  };
}

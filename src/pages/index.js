import { Checkbox } from '@chakra-ui/checkbox';
import { Divider } from '@chakra-ui/layout';
import { Box, Flex, Text } from '@chakra-ui/layout';
import TaskItem from '../components/TaskItem';
import TaskList from '../components/TaskList';

const { Client } = require('@notionhq/client');

export default function Home({ tasks }) {
  console.log(tasks);
  return (
    <Flex flexDir="column" alignItems="center" flex="1">
      <Flex my={15}>
        <Text fontSize="5xl">Next.js + Notion = Task App</Text>
      </Flex>

      <Flex flexDir="column" w={800}>
        <TaskList title="To-Do" add>
          {tasks
            .filter((task) => task.properties.State.select.name == 'Backlog')
            .map((task) => {
              return (
                <TaskItem
                  key={task.id}
                  taskName={task.properties.Task.title[0].text.content}
                />
              );
            })}
        </TaskList>
        <TaskList mt={4} title="On Progress" collapsible add>
          {tasks
            .filter(
              (task) => task.properties.State.select.name == 'On Progress',
            )
            .map((task) => {
              return (
                <TaskItem
                  key={task.id}
                  taskName={task.properties.Task.title[0].text.content}
                  defaultChecked={task.properties.State.select.name == 'Done'}
                />
              );
            })}
        </TaskList>
        <TaskList mt={4} title="Done" collapsible>
          {tasks
            .filter((task) => task.properties.State.select.name == 'Done')
            .map((task) => {
              return (
                <TaskItem
                  key={task.id}
                  taskName={task.properties.Task.title[0].text.content}
                  defaultChecked={task.properties.State.select.name == 'Done'}
                />
              );
            })}
        </TaskList>
      </Flex>
    </Flex>
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

import { Checkbox } from '@chakra-ui/checkbox';
import { Divider } from '@chakra-ui/layout';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import TaskItem from '../components/TaskItem';
import TaskList from '../components/TaskList';
import { useFetch } from '../hooks/useFetch';
import { useTasks } from '../hooks/useTasks';

const { Client } = require('@notionhq/client');

export default function Home() {
  const { data, isLoading, error } = useTasks();
  if (error) {
    return <Text>Error</Text>;
  }
  if (isLoading) {
    return <Spinner alignSelf="center" />;
  }
  console.log(data);
  return (
    <Flex flexDir="column" alignItems="center" flex="1">
      <Flex my={15}>
        <Text fontSize="5xl">Next.js + Notion = Task App</Text>
      </Flex>

      <Flex flexDir="column" w={800}>
        <TaskList title="To-Do" state="Backlog" add>
          {data
            .filter((task) => task.state == 'Backlog')
            .map((task) => {
              return <TaskItem key={task.id} task={task} />;
            })}
        </TaskList>
        <TaskList
          mt={4}
          title="On Progress"
          state="On Progress"
          collapsible
          add
        >
          {data
            .filter((task) => task.state == 'On Progress')
            .map((task) => {
              return <TaskItem key={task.id} task={task} />;
            })}
        </TaskList>
        <TaskList mt={4} title="Done" state="Done" collapsible>
          {data
            .filter((task) => task.state == 'Done')
            .map((task) => {
              return (
                <TaskItem
                  key={task.id}
                  task={task}
                  defaultChecked={task.state == 'Done'}
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

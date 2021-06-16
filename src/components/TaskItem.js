import { Checkbox } from '@chakra-ui/checkbox';
import { Divider } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/layout';
import axios from 'axios';
import { useCallback } from 'react';
import { useTasks } from '../hooks/useTasks';

export default function TaskItem({ id, task, defaultChecked }) {
  const { data, mutate } = useTasks();
  async function handleCheckboxChange() {
    const updatedTask = task;
    if (task.state == 'Done') {
      updatedTask.state = 'On Progress';
    } else if (task.state == 'On Progress') {
      updatedTask.state = 'Done';
    } else if (task.state == 'Backlog') {
      updatedTask.state = 'On Progress';
    }
    const newData = data.filter((tasks) => tasks.id != task.id);
    mutate([updatedTask, ...newData], false);
    await axios.put(`/api/tasks?id=${task.id}`, updatedTask);
    mutate();
  }

  return (
    <>
      <Flex py={2} minH={50} _hover={{ bg: '#f7f7f7' }} alignItems="center">
        <Checkbox
          size="lg"
          isChecked={defaultChecked}
          onChange={handleCheckboxChange}
        />
        <Flex ml={2} flexDir="column">
          <Text>{task.name}</Text>
        </Flex>
      </Flex>

      <Divider />
    </>
  );
}

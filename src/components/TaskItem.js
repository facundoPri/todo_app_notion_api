import { Checkbox } from '@chakra-ui/checkbox';
import { Divider } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/layout';
import { useCallback } from 'react';

export default function TaskItem({ taskName, defaultChecked }) {
  function handleCheckboxChange() {
    alert('Checked');
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
          <Text>{taskName}</Text>
        </Flex>
      </Flex>

      <Divider />
    </>
  );
}

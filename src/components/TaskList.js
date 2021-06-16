import { AccordionIcon } from '@chakra-ui/accordion';
import { IconButton } from '@chakra-ui/button';
import { Button } from '@chakra-ui/button';
import { FormControl } from '@chakra-ui/form-control';
import { useOutsideClick } from '@chakra-ui/hooks';
import { useDisclosure } from '@chakra-ui/hooks';
import { AddIcon, ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { InputGroup } from '@chakra-ui/input';
import { InputRightElement } from '@chakra-ui/input';
import { Input } from '@chakra-ui/input';
import { Text } from '@chakra-ui/layout';
import { Divider } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';
import { StatHelpText } from '@chakra-ui/stat';
import { Collapse } from '@chakra-ui/transition';
import axios from 'axios';
import { useRef, useState } from 'react';
import { mutate } from 'swr';
import { useTasks } from '../hooks/useTasks';
import TaskItem from './TaskItem';

function AddTodo({ isInputOpen, setInputOpen, showAdd, state }) {
  const { data, mutate } = useTasks();
  const ref = useRef(null);
  const [value, setValue] = useState('');
  useOutsideClick({
    ref: ref,
    handler: () => setInputOpen(false),
  });

  async function handleAddTodo(e) {
    e.preventDefault();
    const project = 'Notion api';
    const newTask = {
      name: value,
      state,
      project,
    };
    setValue('');
    setInputOpen(false);
    mutate([{ ...newTask, id: Date.now() }, ...data], false);
    await axios.post('/api/tasks', newTask);
    mutate();
  }

  return (
    <>
      {isInputOpen ? (
        <form onSubmit={handleAddTodo}>
          <InputGroup ref={ref} size="md">
            <Input
              pl={2}
              minH={50}
              autoFocus
              variant="flushed"
              placeholder="+ Add Todo"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {value && (
              <InputRightElement>
                <Button
                  type="submit"
                  variant="unstyled"
                  size="md"
                  onClick={handleAddTodo}
                >
                  <Text color="blue.600" as="sub">
                    ADD
                  </Text>
                </Button>
              </InputRightElement>
            )}
          </InputGroup>
        </form>
      ) : (
        showAdd && (
          <>
            <Flex
              onClick={() => {
                setInputOpen(true);
              }}
              py={2}
              minH={50}
              _hover={{ bg: '#f7f7f7' }}
              alignItems="center"
            >
              <Flex ml={2} flexDir="column">
                <Text>+ Add Todo</Text>
              </Flex>
            </Flex>

            <Divider />
          </>
        )
      )}
    </>
  );
}

export default function TaskList({
  title,
  add,
  collapsible,
  children,
  state,
  showAdd,
  ...props
}) {
  const { isOpen, onOpen, onToggle } = useDisclosure();
  const [isInputOpen, setInputOpen] = useState(false);
  return (
    <Flex flexDir="column" {...props}>
      <Flex alignItems="center">
        {collapsible && (
          <IconButton
            onClick={onToggle}
            variant="unstyled"
            fontSize="20px"
            mr={2}
            icon={isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
          />
        )}
        <Flex flex="1" alignItems="center">
          <Text fontSize="xl" mr={4}>
            {title}
          </Text>
          <Text fontSize="sm" color="gray">
            {children.length}
          </Text>
        </Flex>
        {add && (
          <IconButton
            onClick={() => {
              setInputOpen(true);
              onOpen();
            }}
            variant="unstyled"
            fontSize="15px"
            icon={<AddIcon />}
          />
        )}
      </Flex>
      <AddTodo
        isInputOpen={isInputOpen}
        setInputOpen={setInputOpen}
        state={state}
        showAdd={showAdd}
      />
      {collapsible ? (
        <Collapse in={isOpen}>{children}</Collapse>
      ) : (
        <>{children}</>
      )}
    </Flex>
  );
}

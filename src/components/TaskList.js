import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, Tag, Button, Empty } from 'antd';
import { deleteTask } from '../features/tasks/taskSlice';

const categoryColors = {
  Completed: 'green',
  InProgress: 'orange',
  Urgent: 'red',
  NotStarted: 'blue',
};

function TaskList({ selectedDate, onEdit }) {
  const tasks = useSelector(state => state.tasks.tasks.filter(task => task.date === selectedDate));
  const dispatch = useDispatch();

  if (!selectedDate) return null;

  return (
    <>
      <h3 style={{ marginTop: 20 }}>Tasks on {selectedDate}</h3>
      {tasks.length === 0 ? (
        <Empty description="No tasks" />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={tasks}
          renderItem={(task) => (
            <List.Item
              actions={[
                <Button size="small" onClick={() => onEdit(task)}>Edit</Button>,
                <Button danger size="small" onClick={() => dispatch(deleteTask(task.id))}>Delete</Button>,
              ]}
            >
              <List.Item.Meta
                title={task.title}
                description={task.description}
              />
              <Tag color={categoryColors[task.category]}>{task.category}</Tag>
            </List.Item>
          )}
        />
      )}
    </>
  );
}

export default TaskList;

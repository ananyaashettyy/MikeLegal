import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import CalendarView from './components/CalendarView';
import TaskFormModal from './components/TaskFormModal';
import TaskList from './components/TaskList';
import TaskChart from './charts/TaskChart';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setSelectedDate(task.date);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <Header style={{ color: 'white' }}>
        <Title style={{ color: 'white', marginBottom: 0 }} level={3}>MikeLegal – Task Manager</Title>
      </Header>
      <Content style={{ padding: 24 }}>
        <CalendarView onDateSelect={handleDateSelect} />
        <TaskList selectedDate={selectedDate} onEdit={handleEditTask} />
        <TaskChart />
        <TaskFormModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedDate={selectedDate}
          editingTask={editingTask}
        />
      </Content>
    </Layout>
  );
}

export default App;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Select, Button } from 'antd';

const COLORS = {
  Completed: '#52c41a',
  InProgress: '#faad14',
  Blocked: '#ff4d4f',
  NotStarted: '#1890ff',
};

function TaskChart() {
  const allTasks = useSelector(state => state.tasks.tasks);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredTasks = selectedCategory
    ? allTasks.filter(task => task.category === selectedCategory)
    : allTasks;

  const data = Object.entries(
    filteredTasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div style={{ marginTop: 40 }}>
      <h3>Task Category Chart</h3>
      <Select
        style={{ width: 200, marginRight: 8 }}
        placeholder="Filter by category"
        value={selectedCategory}
        onChange={(val) => setSelectedCategory(val)}
        allowClear
      >
        <Select.Option value="Completed">Completed</Select.Option>
        <Select.Option value="InProgress">InProgress</Select.Option>
        <Select.Option value="Blocked">Blocked</Select.Option>
        <Select.Option value="NotStarted">NotStarted</Select.Option>
      </Select>
      <Button onClick={() => setSelectedCategory(null)}>Reset</Button>

      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[entry.name]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default TaskChart;

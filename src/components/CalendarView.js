import React from 'react';
import { Calendar } from 'antd';
import dayjs from 'dayjs';

function CalendarView({ onDateSelect }) {
  const handleSelect = (date) => {
    onDateSelect(dayjs(date).format('YYYY-MM-DD'));
  };

  return <Calendar fullscreen={false} onSelect={handleSelect} />;
}

export default CalendarView;

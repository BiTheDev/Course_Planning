'use client'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendar = () => {
  const events = [
    { title: 'Event 1', date: '2024-01-01' },
    { title: 'Event 2', date: '2024-01-05' }
    // Add more events here
  ];

  return (
    <div className="container mx-auto p-4">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        // You can add more props for additional functionality
      />
    </div>
  );
};

export default Calendar;

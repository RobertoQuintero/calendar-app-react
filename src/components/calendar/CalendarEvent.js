import React, { memo } from "react";

const CalendarEvent = ({ event }) => {
  const { title, user } = event;
  return (
    <div>
      <strong>{title}</strong>
      <span>- {user.name}</span>
    </div>
  );
};

export default memo(CalendarEvent);

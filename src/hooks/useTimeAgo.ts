import { useState, useEffect } from 'react';

const timeAgo = (dateValue: string | number) => {
  const date = new Date(dateValue);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);

  if (seconds < 5) return "hace un momento";
  if (seconds < 60) return `hace ${seconds} segundos`;

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
  
  const days = Math.round(hours / 24);
  return `hace ${days} día${days > 1 ? 's' : ''}`;
};

export const useTimeAgo = (date: string | number) => {
  const [value, setValue] = useState(() => timeAgo(date));

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(timeAgo(date));
    }, 60000); // Actualiza cada 60 segundos

    return () => {
      clearInterval(interval);
    };
  }, [date]);

  return value;
}; 
export const DateToRelativeTime = (dateString: Date): string => {
  const currentDate = new Date();
  const targetDate = new Date(dateString);

  const secondsAgo = Math.floor((currentDate.getTime() - targetDate.getTime()) / 1000);

  const intervals = [
    { label: 'y', seconds: 31536000 },
    { label: 'mo', seconds: 2592000 },
    
    { label: 'd', seconds: 86400 },
    { label: 'h', seconds: 3600 },
    { label: 'm', seconds: 60 },
    { label: 's', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(secondsAgo / interval.seconds);
    if (count >= 1) {
      return `${count}${interval.label} ago`;
    }
  }

  return 'just now'; // If the date is less than a second ago
};
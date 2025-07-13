import localforage from 'localforage';

export interface AvailabilityEntry {
  date: string;
  day: string;
  status: string;
  fromTime: string;
  toTime: string;
}

export const defaultAvailability: AvailabilityEntry[] = [
  { date: '13-Jul-25', day: 'Sunday', status: 'Available', fromTime: '05:30 PM', toTime: '06:30 PM' },
  { date: '14-Jul-25', day: 'Monday', status: 'Available', fromTime: '05:00 PM', toTime: '08:30 PM' },
  { date: '15-Jul-25', day: 'Tuesday', status: 'Busy', fromTime: '09:00 AM', toTime: '05:00 PM' },
  { date: '16-Jul-25', day: 'Wednesday', status: 'Available', fromTime: '06:00 PM', toTime: '09:00 PM' },
  { date: '17-Jul-25', day: 'Thursday', status: 'Available', fromTime: '10:00 AM', toTime: '12:00 PM' },
  { date: '18-Jul-25', day: 'Friday', status: 'Busy', fromTime: 'All Day', toTime: 'All Day' },
  { date: '19-Jul-25', day: 'Saturday', status: 'Available', fromTime: '02:00 PM', toTime: '04:00 PM' },
];

const AVAILABILITY_STORAGE_KEY = 'availabilitySchedule';

export const getAvailability = async (): Promise<AvailabilityEntry[]> => {
  try {
    const storedAvailability = await localforage.getItem<AvailabilityEntry[]>(AVAILABILITY_STORAGE_KEY);
    return storedAvailability || defaultAvailability;
  } catch (error) {
    console.error('Error fetching availability from local storage:', error);
    return defaultAvailability;
  }
};

export const setAvailability = async (availability: AvailabilityEntry[]): Promise<void> => {
  try {
    await localforage.setItem(AVAILABILITY_STORAGE_KEY, availability);
  } catch (error) {
    console.error('Error saving availability to local storage:', error);
  }
};
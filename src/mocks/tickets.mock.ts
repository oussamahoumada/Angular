import { Ticket } from '../models/ticket';

const dateToday: Date = new Date();

export const TICKETS_MOCKED: Ticket[] = [
  {
    title: 'SI4 in Paris',
    description: '',
    date: dateToday,
    student: 'Oussama',
    major:'coding'
  },
  {
    title: 'SI5 in London',
    description: 'Description du voyage',
    date: dateToday,
    student: 'Anakin',
    major:'health'
  },
];

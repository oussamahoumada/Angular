import { Ticket } from '../models/ticket';

const dateToday: Date = new Date();

export const TICKETS_MOCKED: Ticket[] = [
  {
    title: 'SI4 in Paris',
    description: 'Master 1 système information',
    date: dateToday,
    student: 'Oussama',
    major: ['Reseau', 'POO', 'Web'],
    archived:false
  },
  {
    title: 'BI5 in London',
    description: 'Master 2 business intelligence',
    date: dateToday,
    student: 'Anakin',
    major: ['Apprentissage', 'Resau', 'Data'],
    archived:false
  },
  {
    title: 'BI5 in Moroco',
    description: 'Master 2 business intelligence',
    date: dateToday,
    student: 'Anakin',
    major: ['Apprentissage', 'Resau', 'Data'],
    archived:true
  },
];

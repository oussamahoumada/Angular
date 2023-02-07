import { Ticket } from '../models/ticket';

const dateToday: Date = new Date();

export const TICKETS_MOCKED: Ticket[] = [
  {
    title: 'SI4 in Paris',
    description: 'Master 1 système information',
    date: dateToday,
    student: {
      id: 1,
      nom: 'houmada',
      prenom:'oussama'
    },
    major: ['Reseau', 'POO', 'Web'],
    archived:false
  },
  {
    title: 'BI5 in London',
    description: 'Master 2 business intelligence',
    date: dateToday,
    student:{
      id: 3,
      nom: 'nom3',
      prenom:'prenom3'
    },
    major: ['Apprentissage', 'Resau', 'Data'],
    archived:false
  },
  {
    title: 'BI5 in Moroco',
    description: 'Master 2 business intelligence',
    date: dateToday,
    student: {
      id: 2,
      nom: 'nom2',
      prenom:'prenom2'
    },
    major: ['Apprentissage', 'Resau', 'Data'],
    archived:true
  },
];

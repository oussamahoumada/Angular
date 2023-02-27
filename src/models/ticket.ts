import { Student } from "./student";

export interface Ticket {
  id?: string;
  title?: string;
  description?: string;
  date?: Date;
  studentId?: string;
  major?: string[];
  archived?: boolean;
}

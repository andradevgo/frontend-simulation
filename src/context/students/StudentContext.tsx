import { createContext } from "react";
import { Student } from "../../interfaces/students";
import { SortBy } from "../../pages/Students";
import { enrolledSubjects } from "../../interfaces/subjects";

interface ContextProps {
  loaded: boolean;
  students: Student[];
  count: number;
  enrolledSubject: enrolledSubjects[];

  getEnrolledSubjects: (id: number) => void;
  closeSubjectsModal:() => void;
  //methods
  getStudentsForPage: (
    page: number,
    sort?: "asc" | "desc",
    orderBy?: SortBy,
    searchBy?: string
  ) => void;

  getStudentsBySearch: (
    sort?: "asc" | "desc",
    orderBy?: SortBy,
    searchBy?: string
  ) => void;
}

export const StudentContext = createContext({} as ContextProps);

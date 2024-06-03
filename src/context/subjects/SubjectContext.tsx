import { createContext } from "react";
import { Subject } from "../../interfaces/subjects";
import { StudentInSubject } from "../../interfaces/students";

interface ContextProps {
  loaded: boolean;
  subjects: Subject[];
  studentsPerSubject: StudentInSubject[];

  loadStudentsPerSubjects: (id: number, division: number) => void;
  closeStudentsModal:() => void;
}

export const SubjectContext = createContext({} as ContextProps);

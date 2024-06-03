import { createContext } from "react";
import { Enrollment } from "../../interfaces/enrollments";

interface ContextProps {
  loaded: boolean;
  enrollments: Enrollment[];

  
}

export const EnrollmentContext = createContext({} as ContextProps);

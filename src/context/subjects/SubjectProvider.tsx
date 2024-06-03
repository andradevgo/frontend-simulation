import { FC, PropsWithChildren, useReducer, useEffect } from "react";
import { SubjectContext, subjectReducer } from "./";
import api from "../../api";
import { Subject } from "../../interfaces/subjects";
import { StudentInSubject } from "../../interfaces/students";

export interface SubjectState {
  loaded: boolean;
  subjects: Subject[];
  studentsPerSubject: StudentInSubject[];
}

const Subject_INITIAL_STATE: SubjectState = {
  loaded: false,
  subjects: [],
  studentsPerSubject: [],
};

export const SubjectProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(subjectReducer, Subject_INITIAL_STATE);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await api.get("/subjects");
      const subjects: Subject[] = await resp.data;
      dispatch({ type: "Subject - load", payload: subjects });
    };
    fetchData();
  }, []);

  const loadStudentsPerSubjects = async (id: number, division: number) => {
    const resp = await api.get(`/subjects/${id}/${division}/students`);
    const subjects: StudentInSubject[] = await resp.data;
    dispatch({ type: "Subject - loadStudents", payload: subjects });
  };

  const closeStudentsModal = () => {
    dispatch({ type: "Subject - removeStudents"});
  }

  return (
    <SubjectContext.Provider
      value={{
        ...state,
        loadStudentsPerSubjects,
        closeStudentsModal
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

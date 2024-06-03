import { FC, PropsWithChildren, useReducer, useEffect } from "react";
import { StudentContext, studentReducer } from "./";
import { Student } from "../../interfaces/students";
import api from "../../api";
import { SortBy } from "../../pages/Students";
import { enrolledSubjects } from "../../interfaces/subjects";

interface StudentResponse {
  students: Student[];
  count: number;
  enrolledSubject: enrolledSubjects[];
}

export interface StudentState {
  loaded: boolean;
  students: Student[];
  count: number;
  enrolledSubject: enrolledSubjects[];
}

const Student_INITIAL_STATE: StudentState = {
  loaded: false,
  students: [],
  count: 0,
  enrolledSubject: []
};

export const StudentProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, Student_INITIAL_STATE);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await api.get("/students");
      const studentResponse: StudentResponse = await resp.data;
      dispatch({ type: "Student - load", payload: studentResponse });
    };
    fetchData();
  }, []);
  //   http://localhost:3000/students?pageNumber=1&pageSize=10&sortDirection=desc'
  //   'http://localhost:3000/students?pageNumber=1&pageSize=10&sortBy=name&sortDirection=desc' \

  const getStudentsBySearch = async (
    sort: "asc" | "desc" = "desc",
    orderBy: SortBy = "name",
    searchBy: string = ""
  ) => {
    dispatch({ type: "Student - loading" });
    const resp = await api.get(
      `/students?sortBy=${orderBy}&sortDirection=${sort}&search=${searchBy}`
    );
    console.log(resp);
    const studentResponse: StudentResponse = await resp.data;
    dispatch({ type: "Student - load", payload: studentResponse });
  };

  const getStudentsForPage = async (
    page: number,
    sort: "asc" | "desc" = "desc",
    orderBy: SortBy = "name",
    searchBy: string = ""
  ) => {
    dispatch({ type: "Student - loading" });
    const resp = await api.get(
      `/students?pageNumber=${page}&sortBy=${orderBy}&sortDirection=${sort}&search=${searchBy}`
    );
    const studentResponse: StudentResponse = await resp.data;
    dispatch({ type: "Student - loadPage", payload: studentResponse.students });
  };

  
  const getEnrolledSubjects = async (id: number) => {
    const resp = await api.get(`/students/${id}/subjects`);
    const students: enrolledSubjects[] = await resp.data;
    dispatch({ type: "Student - loadModal", payload: students });
  };

  const closeSubjectsModal = () => {
    dispatch({ type: "Student - removeSubjects"});
  }
  return (
    <StudentContext.Provider
      value={{
        ...state,
        getStudentsForPage,
        getStudentsBySearch,
        getEnrolledSubjects,
        closeSubjectsModal
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

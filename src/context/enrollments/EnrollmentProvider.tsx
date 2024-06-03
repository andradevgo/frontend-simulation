import { FC, PropsWithChildren, useReducer, useEffect } from "react";
import api from "../../api";
import { Enrollment } from "../../interfaces/enrollments";
import { enrollmentReducer } from "./enrollmentReducer";
import { EnrollmentContext } from "./EnrollmentContext";


export interface EnrollmentState {
  loaded: boolean;
  enrollments: Enrollment[];
}

const Enrollment_INITIAL_STATE: EnrollmentState = {
  loaded: false,
  enrollments: []
};

export const EnrollmentProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(enrollmentReducer, Enrollment_INITIAL_STATE);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await api.get("/enrollments");
      const enrollments: Enrollment[] = await resp.data;
      dispatch({ type: "Enrollment - load", payload:enrollments  });
    };
    fetchData();
  }, []);

  return (
    <EnrollmentContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
};

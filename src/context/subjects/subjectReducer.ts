
import { StudentInSubject } from '../../interfaces/students';
import { Subject } from '../../interfaces/subjects';
import { SubjectState } from './';

type SubjectActionType =
  | { type: 'Subject - load', payload: Subject[]}
  | { type: 'Subject - loadStudents', payload: StudentInSubject[]}
  | { type: 'Subject - removeStudents'}

export const subjectReducer = (state: SubjectState, action: SubjectActionType): SubjectState => {
  switch (action.type) {
    case 'Subject - load':
      return {
        ...state,
        subjects:action.payload,
        loaded:true
      };
    case 'Subject - loadStudents':
      return {
        ...state,
        studentsPerSubject:action.payload,
      };
    case 'Subject - removeStudents':
      return {
        ...state,
        studentsPerSubject:[],
      };
    default:
      return state;
  }
};

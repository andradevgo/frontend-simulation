import { Student } from '../../interfaces/students';
import { enrolledSubjects } from '../../interfaces/subjects';
import { StudentState } from './';

type StudentActionType =
  | { type: 'Student - load', payload: {students:Student[],count:number}}
  | { type: 'Student - loadPage', payload: Student[]}
  | { type: 'Student - loading'}
  | { type: 'Student - loadModal', payload: enrolledSubjects[]}
  | { type: 'Student - removeSubjects'}

export const studentReducer = (state: StudentState, action: StudentActionType): StudentState => {
  switch (action.type) {
    case 'Student - load':
      return {
        ...state,
        students:action.payload.students,
        count:action.payload.count,
        loaded:true
      };
    case 'Student - loading':
      return {
        ...state,
        students:[],
        loaded:false
      };
    case 'Student - loadPage':
      return {
        ...state,
        students:action.payload,
        loaded:true
      };
    case 'Student - loadModal':
      return {
        ...state,
        enrolledSubject:action.payload,
      };
    case 'Student - removeSubjects':
      return {
        ...state,
        enrolledSubject:[],
      };
    default:
      return state;
  }
};

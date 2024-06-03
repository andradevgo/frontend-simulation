
import { Enrollment } from '../../interfaces/enrollments';
import { EnrollmentState } from './EnrollmentProvider';

type EnrollmentActionType =
  | { type: 'Enrollment - load', payload: Enrollment[]}

export const enrollmentReducer = (state: EnrollmentState, action: EnrollmentActionType): EnrollmentState => {
  switch (action.type) {
    case 'Enrollment - load':
      return {
        ...state,
        enrollments:action.payload,
        loaded:true
      };
    default:
      return state;
  }
};

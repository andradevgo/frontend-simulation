import { FC } from "react";
import { Subject } from "../interfaces/subjects";

type Props = {
  subject: Subject;
  handleViewStudents: (subjectId: number, subjectDivision: number) => void;
};

export const TableSubjets: FC<Props> = ({ subject, handleViewStudents }) => {
  return (
    <tr key={subject.id}>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {subject.name}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {subject.division}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {subject.classroom}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {subject.credits}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {new Date(subject.registration_date).toLocaleDateString()}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {subject.slots}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          className="text-indigo-600 hover:text-indigo-900"
          onClick={() => handleViewStudents(subject.id!, subject.division)}
        >
          Ver Estudiantes
        </button>
      </td>
    </tr>
  );
};

import { FC, useContext } from "react";
import Modal, { Styles } from "react-modal";
import { SubjectContext } from "../context/subjects";

Modal.setAppElement("#root");

const customStyles: Styles = {
  content: {
    position: "fixed",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "500px",
  },
};

type Props = {
  showModal: boolean;
  closeModal: () => void;
};

export const StudentsModal: FC<Props> = ({ showModal, closeModal }) => {
  const { studentsPerSubject } = useContext(SubjectContext);

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      contentLabel="Detalles de Estudiantes"
      style={customStyles}
      overlayClassName="overlay"
    >
      <>
        <h2 className="text-2xl font-semibold mb-4">Detalles del Estudiante</h2>
        <div className="max-h-80 overflow-y-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Edad
                </th>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Número de documento
                </th>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha de registro
                </th>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha de matrícula
                </th>
              </tr>
            </thead>
            <tbody>
              {studentsPerSubject.map((student, index) => (
                <tr key={index}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
                    {student.student_name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {student.age}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {student.document_number}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {new Date(
                      student.student_registration_date
                    ).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {new Date(student.enrollment_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Cerrar
        </button>
      </>
    </Modal>
  );
};

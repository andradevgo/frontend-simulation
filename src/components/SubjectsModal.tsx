import { FC, useContext } from "react";
import Modal, { Styles } from "react-modal";
import { StudentContext } from "../context/students";

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

export const SubjectsModal: FC<Props> = ({ showModal, closeModal }) => {
  const { enrolledSubject } = useContext(StudentContext);

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      contentLabel="Detalles de Materias"
      style={customStyles}
      overlayClassName="overlay"
    >
      <>
        <h2 className="text-2xl font-semibold mb-4">Detalles de Materias</h2>
        <div className="max-h-80 overflow-y-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nombre Materia
                </th>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Salón
                </th>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Créditos
                </th>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Grupo
                </th>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha de Inscripción
                </th>
              </tr>
            </thead>
            <tbody>
              {enrolledSubject.map((subject, index) => (
                <tr key={index}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
                    {subject.subject_name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {subject.classroom}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {subject.credits}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {subject.subject_group}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {new Date(subject.enrollment_date).toLocaleDateString()}
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

import { ChangeEvent, useState, useContext, useEffect } from "react";
import { StudentContext } from "../context/students";
import { SubjectsModal } from "../components/SubjectsModal";

export type SortBy =
  | "name"
  | "age"
  | "document_number"
  | "registration_date"
  | "status";
type SortOrder = "asc" | "desc";

export const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const {
    loaded,
    getStudentsForPage,
    students: data,
    getEnrolledSubjects,
    count,
    closeSubjectsModal,
    getStudentsBySearch,
  } = useContext(StudentContext);

  console.log(count);

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    getStudentsBySearch(sortOrder, sortBy, e.target.value);
  };

  const handleSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSortBy = e.target.value as SortBy;
    getStudentsForPage(currentPage, sortOrder, selectedSortBy, searchTerm);
    setSortBy(selectedSortBy);
  };

  const handleSortOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSortOrder = e.target.value as SortOrder;
    getStudentsForPage(currentPage, selectedSortOrder, sortBy, searchTerm);
    setSortOrder(selectedSortOrder);
  };

  const handleViewMaterias = async(
    studentId: number,
  ) => {
    getEnrolledSubjects(studentId);
    setShowModal(true);
  };
  const closeModal = () => {
    closeSubjectsModal();
    setShowModal(false);
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const paginate = (pageNumber: number) => {
    if (pageNumber > Math.ceil(count / studentsPerPage)) {
      getStudentsForPage(
        Math.ceil(count / studentsPerPage),
        sortOrder,
        sortBy,
        searchTerm
      );
      setCurrentPage(Math.ceil(count / studentsPerPage));
      return;
    }
    if (pageNumber < 1) {
      getStudentsForPage(1, sortOrder, sortBy, searchTerm);
      setCurrentPage(1);
      return;
    }
    getStudentsForPage(pageNumber, sortOrder, sortBy, searchTerm);
    setCurrentPage(Math.ceil(pageNumber));
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(count / studentsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Lógica para generar los números de página a mostrar en la paginación
  let pageNumbersToDisplay = [];
  const currentPageIndex = pageNumbers.indexOf(currentPage);
  const startPageIndex = Math.max(0, currentPageIndex - 3);
  const endPageIndex = Math.min(pageNumbers.length, startPageIndex + 7);

  for (let i = startPageIndex; i < endPageIndex; i++) {
    pageNumbersToDisplay.push(pageNumbers[i]);
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="py-4">
        <h1 className="text-2xl font-semibold leading-tight">Estudiantes</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Buscar..."
            className="absolute px-4 py-2 border border-gray-300 rounded-md w-full bottom-0 w-full"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
        <div className="flex space-x-4">
          <div>
            <label htmlFor="sortBy" className="block text-gray-600">
              Ordenar por:
            </label>
            <select
              id="sortBy"
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={sortBy}
              onChange={handleSortByChange}
            >
              <option value="name">Nombre</option>
              <option value="age">Edad</option>
              <option value="document_number">Número de Documento</option>
            </select>
          </div>
          <div>
            <label htmlFor="sortOrder" className="block text-gray-600">
              Orden:
            </label>
            <select
              id="sortOrder"
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={sortOrder}
              onChange={handleSortOrderChange}
            >
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>
        </div>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Edad
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Documento
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Número de Documento
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha de Registro
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Materias
                </th>
              </tr>
            </thead>
            <tbody>
              {!loaded
                ? Array.from({ length: 10 }).map((_, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="rounded-lg bg-gray-200 h-4 w-48"></div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="rounded-lg bg-gray-200 h-4 w-20"></div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="rounded-lg bg-gray-200 h-4 w-20"></div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="rounded-lg bg-gray-200 h-4 w-32"></div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="rounded-lg bg-gray-200 h-4 w-32"></div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="rounded-lg bg-gray-200 h-4 w-20"></div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="rounded-lg bg-gray-200 h-4 w-20"></div>
                      </td>
                    </tr>
                  ))
                : data.map((student, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {student.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {student.age}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {student.document_type}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {student.document_number}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Date(
                            student.registration_date
                          ).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                          className={`relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight ${
                            student.status === "a"
                              ? "bg-green-200"
                              : "bg-red-200"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">
                            {student.status === "a" ? "Activo" : "Inactivo"}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => handleViewMaterias(student.id!)}
                        >
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
            <span className="text-xs xs:text-sm text-gray-900">
              Mostrando {indexOfFirstStudent + 1} a{" "}
              {Math.min(indexOfLastStudent, count)} de {count} resultados
            </span>
            <div className="flex items-center gap-2">
              {/* Botón para ir a la primera página */}
              <button
                className="relative h-8 w-8 select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </span>
              </button>
              {/* Botones para retroceder y avanzar de página */}
              <button
                className="relative h-8 w-8 select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => paginate(currentPage - 100)}
                disabled={currentPage === 1}
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </span>
              </button>
              {pageNumbersToDisplay.map((pageNumber) => (
                <button
                  key={pageNumber}
                  className={`relative h-8 w-8 select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
                    pageNumber === currentPage ? "bg-gray-300" : ""
                  }`}
                  type="button"
                  onClick={() => paginate(pageNumber)}
                >
                  <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    {pageNumber}
                  </span>
                </button>
              ))}
              {/* Botones para avanzar y retroceder de página */}
              <button
                className="relative h-8 w-8 select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => paginate(currentPage + 100)}
                disabled={currentPage === pageNumbers.length}
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </button>
              {/* Botón para ir a la última página */}
              <button
                className="relative h-8 w-8 select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => paginate(pageNumbers.length)}
                disabled={currentPage === pageNumbers.length}
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7-7-7 7"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <SubjectsModal showModal={showModal} closeModal={closeModal} />
    </div>
  );
};

import { ChangeEvent, useContext, useState } from "react";
import { SubjectContext } from "../context/subjects";
import { Subject } from "../interfaces/subjects";
import { TableSubjets } from "../components/TableSubjets";
import { StudentsModal } from "../components/StudentsModal";

export type SortBy =
  | "name"
  | "classroom"
  | "credits"
  | "registration_date"
  | "slots";

type SortOrder = "asc" | "desc";

export const Subjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [subjectsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const {
    loaded,
    subjects: data,
    loadStudentsPerSubjects,
    closeStudentsModal,
  } = useContext(SubjectContext);

  if (!loaded) return <>Cargando...</>;

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSortBy = e.target.value as SortBy;
    setSortBy(selectedSortBy);
  };

  const handleSortOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSortOrder = e.target.value as SortOrder;
    setSortOrder(selectedSortOrder);
  };

  const handleViewStudents = async (
    subjectId: number,
    subjectDivision: number
  ) => {
    loadStudentsPerSubjects(subjectId, subjectDivision);
    setShowModal(true);
    // const studentData = await fetchStudentDetails(subjectId, subjectDivision);
  };

  const closeModal = () => {
    closeStudentsModal();
    setShowModal(false);
  };

  // Filtrar materias basado en el término de búsqueda
  const filteredData = data.filter((subject: Subject) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ordenar materias
  const sortedData = filteredData.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  console.log({ sortedData });
  // Lógica para la paginación
  const indexOfLastSubject = currentPage * subjectsPerPage;
  const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
  const currentSubjects = sortedData.slice(
    indexOfFirstSubject,
    indexOfLastSubject
  );

  console.log({ currentSubjects });

  const paginate = (pageNumber: number) => {
    if (pageNumber > data.length / subjectsPerPage) {
      setCurrentPage(data.length / subjectsPerPage);
      return;
    }
    if (pageNumber < 1) {
      setCurrentPage(1);
      return;
    }
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / subjectsPerPage); i++) {
    pageNumbers.push(i);
  }

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
        <h1 className="text-2xl font-semibold leading-tight">Materias</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="">
          <input
            type="text"
            placeholder="Buscar..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
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
              <option value="classroom">Salón</option>
              <option value="credits">Créditos</option>
              <option value="registration_date">Fecha de Registro</option>
              <option value="slots">Cupos</option>
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
                  Division
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Salón
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Créditos
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha de Registro
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cupos
                </th>
                <th className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Estudiantes
                </th>
              </tr>
            </thead>
            <tbody>
              {currentSubjects.map((subject: Subject, index: number) => (
                <TableSubjets
                  key={index}
                  subject={subject}
                  handleViewStudents={() =>
                    handleViewStudents(subject.id!, subject.division)
                  }
                />
              ))}
            </tbody>
          </table>
          <div className="py-5 flex justify-center">
            <nav className="block">
              <ul className="flex pl-0 rounded list-none flex-wrap">
                <li>
                  <button
                    className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 items-center justify-center leading-tight relative border rounded-full ${
                      currentPage === 1
                        ? "bg-gray-300"
                        : "bg-white border-gray-400"
                    }`}
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </button>
                </li>
                {pageNumbersToDisplay.map((number) => (
                  <li key={number}>
                    <button
                      className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 items-center justify-center leading-tight relative border rounded-full ${
                        currentPage === number
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white border-gray-400"
                      }`}
                      onClick={() => paginate(number)}
                    >
                      {number}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 items-center justify-center leading-tight relative border rounded-full ${
                      currentPage === data.length / subjectsPerPage
                        ? "bg-gray-300"
                        : "bg-white border-gray-400"
                    }`}
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === data.length / subjectsPerPage}
                  >
                    &gt;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <StudentsModal showModal={showModal} closeModal={closeModal} />
    </div>
  );
};

import { ChangeEvent, useContext, useState } from "react";
import { EnrollmentContext } from "../context/enrollments";
import { Enrollment } from "../interfaces/enrollments";

type SortBy = "subject_name" | "student_name" | "division" | "enrollment_date";

type SortOrder = "asc" | "desc";

export const Enrollments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("subject_name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [enrollmentsPerPage] = useState(10);
  const { loaded, enrollments: data } = useContext(EnrollmentContext);

  if (!loaded) return <>Cargando...</>;
  console.log("Hola", data);

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

  const filteredData = data.filter((enrollment: Enrollment) =>
    enrollment.subject_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enrollment.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enrollment.division.toString().includes(searchTerm.toLowerCase()) 
  );

  const sortedData = filteredData.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  const indexOfLastEnrollment = currentPage * enrollmentsPerPage;
  const indexOfFirstEnrollment = indexOfLastEnrollment - enrollmentsPerPage;
  const currentEnrollments = sortedData.slice(
    indexOfFirstEnrollment,
    indexOfLastEnrollment
  );

  const paginate = (pageNumber: number) => {
    if (pageNumber > data.length / enrollmentsPerPage) {
      setCurrentPage(data.length / enrollmentsPerPage);
      return;
    }
    if (pageNumber < 1) {
      setCurrentPage(1);
      return;
    }
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / enrollmentsPerPage); i++) {
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
        <h1 className="text-2xl font-semibold leading-tight">Inscripciones</h1>
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
              <option value="subject_name">Nombre de la Materia</option>
              <option value="student_name">Nombre del Estudiante</option>
              <option value="division">Grupo</option>
              <option value="enrollment_date">Fecha de Registro</option>
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
                  Nombre de la Materia
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nombre del Estudiante
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Grupo
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha de Registro
                </th>
              </tr>
            </thead>
            <tbody>
              {currentEnrollments.map((enrollment, index) => (
                <tr key={index}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {enrollment.subject_name}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {enrollment.student_name}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {enrollment.division}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {new Date(
                        enrollment.enrollment_date
                      ).toLocaleDateString()}
                    </p>
                  </td>
                </tr>
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
                      currentPage === data.length / enrollmentsPerPage
                        ? "bg-gray-300"
                        : "bg-white border-gray-400"
                    }`}
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === data.length / enrollmentsPerPage}
                  >
                    &gt;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

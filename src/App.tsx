import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import { StudentProvider } from "./context/students";
import { SubjectProvider } from "./context/subjects";
import { EnrollmentProvider } from "./context/enrollments";

const App = () => {
  return (
    <EnrollmentProvider>
      <SubjectProvider>
        <StudentProvider>
          <Router>
            <AppRouter />
          </Router>
        </StudentProvider>
      </SubjectProvider>
    </EnrollmentProvider>
  );
};

export default App;

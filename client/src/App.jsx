import './App.css';
import { AuthProvider } from './context/AuthProvider';
import { ProjectsProvider } from './context/ProjectsProvider';
import { AppRouter } from './routes/AppRouter';

function App() {
  return (
    <AuthProvider>
      <ProjectsProvider>
        <AppRouter />
      </ProjectsProvider>
    </AuthProvider>
  );
}

export default App;

import './App.css';
import { AuthProvider } from './context/AuthProvider';
import { ProjectsProvider } from './context/ProjectsProvider';
import { UsersProvider } from './context/UsersProvider';
import { AppRouter } from './routes/AppRouter';

function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <ProjectsProvider>
          <AppRouter />
        </ProjectsProvider>
      </UsersProvider>
    </AuthProvider>
  );
}

export default App;

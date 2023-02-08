import './App.css';
import { AuthProvider } from './context/AuthProvider';
import { ProjectsProvider } from './context/ProjectsProvider';
import { TasksProvider } from './context/TasksProvider';
import { UsersProvider } from './context/UsersProvider';
import { AppRouter } from './routes/AppRouter';

function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <ProjectsProvider>
          <TasksProvider>
            <AppRouter />
          </TasksProvider>
        </ProjectsProvider>
      </UsersProvider>
    </AuthProvider>
  );
}

export default App;

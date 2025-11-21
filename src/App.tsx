import './styles/App.scss';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/index.route';



function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

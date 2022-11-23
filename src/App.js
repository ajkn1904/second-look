import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './components/Routes/Router/Router';

function App() {
  return (
    <div className='App max-w-[1400px] mx-auto'>
     <RouterProvider router={router}></RouterProvider> 
    </div>
  );
}

export default App;

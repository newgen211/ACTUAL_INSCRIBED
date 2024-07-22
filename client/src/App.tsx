import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';


export default function App() {

  return (

    <BrowserRouter>
    
      <Routes>

        <Route path='/' element={<Homepage />} />

      </Routes>

    </BrowserRouter>

  );

}
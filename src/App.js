import './App.css';
import Editpage from './components/Editpage';
import Mainpage from './components/Mainpage';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Ytcomp from './components/Ytcomp';

function App() {
  return (
      <div className='flex' style={{flexDirection:'row-reverse'}}>
          <BrowserRouter>
        <Routes>
          <Route path='/' element={<Mainpage/>}/>
          <Route path='/edit' element={<Editpage/>}></Route>
        </Routes>
        <Ytcomp/>
      </BrowserRouter>
      </div>
      
  );
}

export default App;

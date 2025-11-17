import Login from './page/LoginPage/login';
import Test2 from './page/test/test2';
import MainPage from './page/MainPage/main';
import PostPage from './page/PostPage/main';
import { Routes, Route } from 'react-router-dom';

import './App.css';
function App() {
  return (
    <>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/test' element={<Test2 />} />
          <Route path='/' element={<MainPage />} />
          <Route path='/Our Posts' element={<PostPage />} />
        </Routes>
    </>
  );
}
export default App;
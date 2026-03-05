
import { Suspense } from 'react';
import Footer from './components/Footer';
import Home from './components/Home'
import Tickets from './components/Tickets';

function App() {
  

  return (
    <div className=" ">
      <Home/>
      <Suspense fallback={<div>Ticket Loading...</div>}>
        <Tickets/>
      </Suspense>
      <Footer/>
    </div>
  );
}

export default App

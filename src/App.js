import './App.css';
import { BrowserRouter } from "react-router-dom";
import AllRoutes from './AllRoutes';

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <AllRoutes/>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

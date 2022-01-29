import logo from './logo.svg';
import './App.css';
import { 
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import Astronaut from './components/Astronaut';
import Spacecraft from './components/Spacecraft';
import Home from './pages/Home'
import PageContainer from './components/PageContainer';

function App() {
  return (
    <Router>
				<PageContainer >
					<Routes>
						<Route 
							path="/" 
							element={<Home />} 
						/>
						<Route 
							path="/astronaut/:astrId" 
							element={<Astronaut />} 
						/>
						<Route 
							path="/spacecraft/:spaceId" 
							element={<Spacecraft />} 
						/>
					</Routes>
				</PageContainer>
		</Router>
  );
}

export default App;

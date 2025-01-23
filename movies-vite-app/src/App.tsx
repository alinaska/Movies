import './App.css'
import Body from './components/Body/Body';
import Header from './components/Header/Header'
import MovieDetailsPage from './components/MovieDetailsPage';
import { RootState } from './store/reducer';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
    const { token } = useSelector((state: RootState) => state.user);
    const isRegistered = Boolean(token);

    return (
        <BrowserRouter basename="/">
            <Header />
            {isRegistered ? (
                <Routes>
                    <Route path="/" element={<Body />} />
                    <Route path="/movies/:id" element={<MovieDetailsPage />} />
                </Routes>
            ) : (
                <></>
            )}
        </BrowserRouter>
    );
};


export default App

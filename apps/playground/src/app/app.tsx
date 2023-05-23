import { Route, Routes } from 'react-router-dom';
import Playground from '../pages/playground';

export const App = () => (
    <Routes>
        <Route path="/" element={<Playground />} />
    </Routes>
);

export default App;

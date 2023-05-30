import { Route, Routes } from 'react-router-dom';
import Playground from '../pages/playground';
import Checker from '../pages/сhecker';
import { Layout } from '../shared/components';

export const App = () => (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Checker />} />

            <Route path="/playground" element={<Playground />} />
        </Route>
    </Routes>
);

export default App;

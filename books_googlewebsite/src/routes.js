import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailsBook from './pages/DetailBook';

import Logon from './pages/Logon';
import SeachBook from './pages/SeachBook';

export default function Routs() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" caseSensitive={false} exact element={<Logon />} />
                <Route path="/home" caseSensitive={false} element={<SeachBook />} />
                <Route path="/info/:idbook" caseSensitive={false} element={<DetailsBook />} />


            </Routes>
        </BrowserRouter>
    );
}
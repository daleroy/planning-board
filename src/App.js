import './App.css';
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import TopToolBar from './Components/TopToolBar';
import useGridData from './Hooks/useGridData';
import DataImporter from './Components/DataImporter';
import Home from './Components/Home';
import GridView from './Components/GridView';
import CapacityRow from './Components/CapacityRow';

export default function App() {
    const {gridData, setGridData} = useGridData();

    return (
        <BrowserRouter>
            <TopToolBar />
                <Switch>
                    <Route path="/loadData">
                        <DataImporter />
                    </Route>
                    <Route path="/gridView">
                        <GridView
                            gridData={gridData}
                            setGridData={setGridData}
                            />
                    </Route>
                    <Route path="/capacity">
                        <CapacityRow
                            gridData={gridData}
                            setGridData={setGridData}
                            />
                    </Route>
                    <Route path="/">
                        <Home
                            gridData={gridData}
                            setGridData={setGridData}
                        />
                    </Route>
                </Switch>
        </BrowserRouter>
    );
}

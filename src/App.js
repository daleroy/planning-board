import './App.css';
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import TopToolBar from './Components/TopToolBar';
import useGridData from './Hooks/useGridData';
import DataImporter from './Components/DataImporter';
import Home from './Components/Home';
import GridView from './Components/GridView';

export default function App() {
    const {planState, setPlanState} = useGridData();

    return (
        <BrowserRouter>
            <TopToolBar />
                <Switch>
                    <Route path="/loadData">
                        <DataImporter />
                    </Route>
                    <Route path="/gridView">
                        <GridView
                            planState={planState}
                            setPlanState={setPlanState}
                            />
                    </Route>
                    <Route path="/">
                        <Home
                            planState={planState}
                            setPlanState={setPlanState}
                        />
                    </Route>
                </Switch>
        </BrowserRouter>
    );
}

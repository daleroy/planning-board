import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import TopToolBar from './Components/TopToolBar';
import routes from './routes.js';

export default function App() {

  return (
	  <BrowserRouter>
	  	<TopToolBar />
		<Switch>
		{routes.map((route, index) => (
  			<Route
				key={index}
				path={route.path}
				component={route.component}
				render={route.render}
  			/>
		))}
		</Switch>
	  </BrowserRouter>
  );
}

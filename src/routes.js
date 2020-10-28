import DataImporter from './Components/DataImporter';
import Home from './Components/Home';

const routes = [
  {
    path: "/loadData",
    component: DataImporter
  },
  {
    path: "/",
    component: Home
  }
];

export default routes;

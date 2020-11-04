import DataImporter from './Components/DataImporter';
import Home from './Components/Home';
import GridView from './Components/GridView';

const routes = [
  {
    path: "/loadData",
    component: DataImporter
  },
  {
      path: "/gridView",
      component: GridView
  },
  {
    path: "/",
    component: Home
  }
];

export default routes;

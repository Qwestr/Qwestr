import * as React from "react";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import PostIcon from '@material-ui/icons/Book';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import authProvider from './authProvider';
import Dashboard from './Dashboard';
import { QwestCreate, QwestEdit, QwestList } from "./Qwests";
import { UserCreate, UserEdit, UserList } from "./Users";

// Setup data provider
const dataProvider = jsonServerProvider("http://localhost:3001");

// Create app
const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard}>
    <Resource name="qwests" create={QwestCreate} edit={QwestEdit} list={QwestList} icon={PriorityHighIcon} />
    <Resource name="users" create={UserCreate} edit={UserEdit} list={UserList} icon={UserIcon} />
  </Admin>
);

export default App;

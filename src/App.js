import * as React from "react";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import UserIcon from '@material-ui/icons/Group';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import authProvider from './authProvider';
import Dashboard from './Dashboard';
import { QwestCreate, QwestEdit, QwestList } from "./Qwests";
import { UserCreate, UserEdit, UserList } from "./Users";

// Setup data provider
const dataProvider = jsonServerProvider(process.env.REACT_APP_API_URL);

// Create app
const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard}>
    <Resource name="qwests" create={QwestCreate} edit={QwestEdit} list={QwestList} icon={PriorityHighIcon} />
    <Resource name="users" create={UserCreate} edit={UserEdit} list={UserList} icon={UserIcon} />
  </Admin>
);

export default App;

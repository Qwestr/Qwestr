import * as React from "react";
import {
  Create,
  Datagrid,
  Edit,
  EmailField,
  List,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";

const UserTitle = ({ record }) => {
  return <span>User {record.name}</span>;
};

export const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="email" />
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);

export const UserEdit = (props) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput disabled source="email" />
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);

export const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <EmailField source="email" />
    </Datagrid>
  </List>
);

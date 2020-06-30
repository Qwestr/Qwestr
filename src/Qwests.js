import * as React from "react";
import {
  Create,
  Datagrid,
  DateField,
  DateTimeInput,
  Edit,
  Filter,
  List,
  ReferenceInput,
  ReferenceField,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";

const QwestTitle = ({ record }) => {
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

const QwestFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

export const QwestCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput label="User" source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="title" />
      <DateTimeInput source="completeBy" />
    </SimpleForm>
  </Create>
);

export const QwestEdit = (props) => (
  <Edit title={<QwestTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput label="User" source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="title" />
      <DateTimeInput source="completeBy" />
    </SimpleForm>
  </Edit>
);

export const QwestList = (props) => (
  <List filters={<QwestFilter />} {...props}>
    <Datagrid rowClick="edit">
      <ReferenceField source="userId" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="title" />
      <DateField source="completeBy" showTime />
    </Datagrid>
  </List>
);

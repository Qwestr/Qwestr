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
import { makeStyles, Chip } from "@material-ui/core";

// Setup QuickFilter styles
const useQuickFilterStyles = makeStyles((theme) => ({
  chip: {
    marginBottom: theme.spacing(1),
  },
}));

// Define QuickFilter component
const QuickFilter = ({ label }) => {
  const classes = useQuickFilterStyles();
  return <Chip className={classes.chip} label={label} />;
};

const QwestTitle = ({ record }) => {
  return <span>Qwest {record.title}</span>;
};

const QwestFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
    <QuickFilter source="completeByYes" label="Has Complete By Date" defaultValue={true} />
    <QuickFilter source="completeByNo" label="No Complete By Date" defaultValue={true} />
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

import {
  Show,
  SimpleShowLayout,
  BooleanField,
  BooleanInput,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  List,
  ReferenceField,
  SimpleForm,
  TextField,
  TextInput,
  EditButton,
  useRecordContext,
  DeleteButton,
  Create,
} from "react-admin";

export const TaskList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="title" />
      <BooleanField source="completed" />
      <DateField source="created" />
      <DateField source="updated" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

const PostTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

export const TaskEdit = () => (
  <Edit title={<PostTitle />}>
    <SimpleForm>
      <TextInput source="title" />
      <BooleanInput source="completed" />
    </SimpleForm>
  </Edit>
);

export const TaskCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="title" />
    </SimpleForm>
  </Create>
);

export const TaskShow = () => (
  <Show title={<PostTitle />}>
    <SimpleShowLayout>
      <TextField source="title" />
      <BooleanField source="completed" />
      <TextField source="id" />
      <DateField source="created" />
      <DateField source="updated" />
    </SimpleShowLayout>
  </Show>
);

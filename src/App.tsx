import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  combineDataProviders,
} from "react-admin";
import { authProvider } from "./authProvider";
import PHDataProvider from "./PHDataProvider";
import { TaskCreate, TaskEdit, TaskList, TaskShow } from "./resources/tasks";
import { DevtoolsLayout } from "./components/DevtoolsLayout";

const dataProvider = combineDataProviders((resource) => {
  switch (resource) {
    case "tasks":
      return PHDataProvider;
    case "users":
      return PHDataProvider;
    default:
      throw new Error(`Unknown resource: ${resource}`);
  }
});

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    layout={DevtoolsLayout}
  >
    <Resource
      name="tasks"
      list={TaskList}
      create={TaskCreate}
      edit={TaskEdit}
      show={TaskShow}
    />
  </Admin>
);

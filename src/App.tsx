import { Provider } from "react-redux";
import "./App.css";
import store from "./store";
import { useGetUsersQuery } from "./api";
import UserCard from "./components/UserCard";
import { useState } from "react";

interface UserInterface {
  _id: number;
  available: boolean;
  avatar: string;
  domain: string;
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
}

function Users() {
  const [params, setParams] = useState({ page: 1 });
  const { data, error, isLoading } = useGetUsersQuery(params);

  console.log(data, error, isLoading);

  const handleNext = () => {
    setParams({ page: params.page + 1 });
  };

  const handlePrev = () => {
    if (params.page === 1) return;
    setParams({ page: params.page - 1 });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container">
        {data?.map((user: UserInterface) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
      <div>
        <button onClick={handlePrev}>Prev</button>
        <h2>{params.page}</h2>
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Users />
    </Provider>
  );
}

export default App;

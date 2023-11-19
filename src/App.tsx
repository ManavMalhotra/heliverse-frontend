import { Provider } from "react-redux";
import "./App.css";
import store from "./store";
import { useGetUsersQuery } from "./api";
import UserCard from "./components/UserCard";
import { useState } from "react";
import { Box, CircularProgress, Container, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

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

function SearchBox({ setSearchQuery }: { setSearchQuery: Function }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      <Search sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField
        id="input-with-sx"
        label="With sx"
        variant="standard"
        onInput={(e) => {
          setSearchQuery((e.target as HTMLInputElement).value);
        }}
      />
    </Box>
  );
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
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />;
      </Container>
    );
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

  const [searchQuery, setSearchQuery] = useState("");

  const filterData = (query: string, data: UserInterface[]) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.first_name.toLowerCase().includes(query));
    }
  };


  return (
    <Provider store={store}>
      <Users />
    </Provider>
  );
}

export default App;

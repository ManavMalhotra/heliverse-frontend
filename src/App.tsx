import { Provider } from "react-redux";
import "./App.css";
import store from "./store";
import { useGetUsersQuery, useSearchUsersQuery } from "./api";
import UserCard from "./components/UserCard";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Container, IconButton } from "@mui/material";
import SearchBox from "./components/SearchBox";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

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
  const [searchQuery, setSearchQuery] = useState("");

  const { data, error, isLoading } = useGetUsersQuery(params);
  const {
    data: searchData,
    error: searchError,
    isLoading: searchIsLoading,
  } = useSearchUsersQuery({
    query: searchQuery,
  });

  const [userData, setUserData] = useState<UserInterface[]>([]);

  useEffect(() => {
    if (!searchQuery) {
      setUserData(data);
    }
    if (searchQuery) {
      setUserData(searchData);
    }
  }, [data, searchData]);

  const handleNext = () => {
    setParams({ page: params.page + 1 });
  };

  const handlePrev = () => {
    if (params.page === 1) return;
    setParams({ page: params.page - 1 });
  };

  if (isLoading || searchIsLoading) {
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

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <SearchBox serachQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="container">
        {userData?.map((user: UserInterface) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
      <Box>
        <IconButton aria-label="delete" size="large" onClick={handlePrev}>
          <ArrowBackIos fontSize="inherit" />
        </IconButton>
        {params.page}
        <IconButton aria-label="delete" size="large" onClick={handleNext}>
          <ArrowForwardIos fontSize="inherit" />
        </IconButton>
      </Box>
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

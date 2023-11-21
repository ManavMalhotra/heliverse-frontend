import { Provider } from "react-redux";
import "./App.css";
import store from "./store";
import { useGetUsersQuery, useSearchUsersQuery } from "./api";
import UserCard from "./components/UserCard";
import { useEffect, useState } from "react";
import { Button, CircularProgress, Container, IconButton } from "@mui/material";
import SearchBox from "./components/SearchBox";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Filter } from "./components/Filter";

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
  const [domain, setDomain] = useState("");
  const [gender, setGender] = useState("");

  const { data, error, isLoading } = useGetUsersQuery(params);
  // @ts-ignore
  const {data: searchData,error: searchError,isLoading: searchIsLoading,} = useSearchUsersQuery({
    query: searchQuery,
  });

  console.log(data);

  const [userData, setUserData] = useState<UserInterface[]>([]);
  // @ts-ignore
  const [filteredData, setFilteredData] = useState<UserInterface[]>([]);

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

  const handleFilter = () => {
    const filteredData = userData?.filter((user: UserInterface) => {
      // on the bases of DOMAIN, Gender
      if (!domain) {
        return user.gender === gender;
      }
      if (!gender) {
        return user.domain === domain;
      } else {
        return user.gender === gender && user.domain === domain;
      }
    });
    setFilteredData(filteredData);
    console.log(filteredData);
  };

  return (
    <>
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/*  Domain Filter */}
      <Filter
        name={"Domain"}
        option={domain}
        selectOption={setDomain}
        optionList={
          userData
            ?.map((user: UserInterface) => user.domain)
            .filter((value, index, self) => self.indexOf(value) === index) || []
        }
      />

      {/* Gender Filter  */}
      <Filter
        name="Gender"
        option={gender}
        selectOption={setGender}
        optionList={
          userData
            ?.map((user: UserInterface) => user.gender)
            .filter((value, index, self) => self.indexOf(value) === index) || []
        }
      />

      {/* // filter button  */}
      <Button variant="contained" onClick={handleFilter}>
        Filter
      </Button>

      <div className="container">
        {userData?.map((user: UserInterface) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton aria-label="delete" size="large" onClick={handlePrev}>
          <ArrowBackIos fontSize="inherit" />
        </IconButton>
        <h1>{params.page}</h1>
        <IconButton aria-label="delete" size="large" onClick={handleNext}>
          <ArrowForwardIos fontSize="inherit" />
        </IconButton>
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

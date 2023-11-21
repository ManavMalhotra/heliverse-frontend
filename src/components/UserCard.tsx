import "./UserCard.css";
import MaleRoundedIcon from "@mui/icons-material/MaleRounded";
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded";
import { TransgenderRounded } from "@mui/icons-material";

interface UserInterface {
  available: boolean;
  avatar: string;
  domain: string;
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
}

const UserCard = ({ user }: { user: UserInterface }) => {
  return (
    <div className="card">
      <div className="card-border-top"></div>
      <div className="img">
        {user.gender === "Male" ? (
          <MaleRoundedIcon sx={{ color: "blue" }} className="gender male" />
        ) : user.gender === "Female" ? (
          <FemaleRoundedIcon sx={{ color: "pink" }} className="gender female" />
        ) : (
          <TransgenderRounded
            sx={{ color: "purple" }}
            className="gender transgender"
          />
        )}{" "}
        <img src={user.avatar} alt="avatar" />
      </div>
      <span> {user.first_name + " " + user.last_name}</span>
      <p className="email"> {user.domain}</p>
      <button> Click</button>
    </div>
  );
};

export default UserCard;

import "./UserCard.css";
import MaleRoundedIcon from "@mui/icons-material/MaleRounded";
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded";

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
        {user.gender === "male" ? (
          <MaleRoundedIcon sx={{ color: "blue" }} />
        ) : (
          <FemaleRoundedIcon sx={{ color: "pink" }} className="gender female" />
        )}
        <img src={user.avatar} alt="avatar" />
      </div>
      <span> {user.first_name + " " + user.last_name}</span>
      <p className="email"> {user.email}</p>
      <button> Click</button>
    </div>
  );
};

export default UserCard;

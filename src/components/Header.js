import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { auth } from "../firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openSignIn, setOpenSignIn] = React.useState(false);
  const handleOpenSignIn = () => setOpenSignIn(true);
  const handleCloseSignIn = () => setOpenSignIn(false);

  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  function signUp(event) {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        });
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  }

  function signIn(event) {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <header className="header">
      <div className="header__logo">
        <img src="../images/instagram.png" alt="" />
      </div>

      <div className="header__search">
        <input type="search" placeholder="Search" name="search" />
        <span className="header__search__icon"></span>
      </div>
      <div className="header__buttons">
        {!user ? (
          <>
            <button
              onClick={handleOpenSignIn}
              className="header__buttons--signIn"
            >
              Log In
            </button>
            <button onClick={handleOpen} className="header__buttons--signUp">
              Sign Up
            </button>
          </>
        ) : (
          <button
            onClick={() => auth.signOut()}
            className="header__buttons--signUp"
          >
            Logout
          </button>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="header__form">
            <TextField
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              type="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              onClick={signUp}
              className="header__buttons--signIn"
            >
              Sign Up
            </button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={handleCloseSignIn}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="header__form">
            <TextField
              type="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              onClick={signIn}
              className="header__buttons--signIn"
            >
              Sign In
            </button>
          </form>
        </Box>
      </Modal>
    </header>
  );
}

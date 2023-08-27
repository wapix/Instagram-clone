import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/joy/Button";
import React from "react";
import { db } from "../firebase";
import * as firebase from "firebase/compat/app";

export default function Post(props) {
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState([]);

  function uploadComment(event) {
    event.preventDefault();

    db.collection("comments")
      .add({
        postId: props.postId,
        comment: comment,
        username: props.user,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        console.log("Comment added!");
        setComment("");
        db.collection("comments").onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              comment: doc.data()
            }))
          );
        });
      })
      .catch((error) => console.log(error.message));
  }

  React.useEffect(() => {
    db.collection("comments").onSnapshot((snapshot) => {
      setComments(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          comment: doc.data()
        }))
      );
    });
  }, []);

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          alt="Remy Sharp"
          src="https://mui.com/static/images/avatar/1.jpg"
        />
        <span>@{props.username}</span>
      </div>
      <img className="post__image" src={props.imageUrl} alt="" />
      {comments
        .filter((comment) => comment.comment.postId === props.postId)
        .map(({ id, comment }) => (
          <p className="post__desc" key={id}>
            <strong>{comment.username}: </strong>
            {comment.comment}
          </p>
        ))}

      {props.user && (
        <form>
          <TextField
            id="outlined-static"
            label="Leave a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button onClick={uploadComment} type="submit">
            Post
          </Button>
        </form>
      )}
    </div>
  );
}

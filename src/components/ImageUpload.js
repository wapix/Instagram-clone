import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/joy/Button";
import { db } from "../firebase";
import * as firebase from "firebase/compat/app";

export default function ImageUpload(props) {
  const [caption, setCaption] = React.useState("");
  const [image, setImage] = React.useState("");

  function upload(event) {
    event.preventDefault();

    db.collection("posts")
      .add({
        username: props.username,
        caption: caption,
        imageUrl: image,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        console.log("Post added!");
        setCaption("");
        setImage("");
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <div className="image-upload">
      <form>
        <TextField
          id="outlined-multiline-static"
          label="Caption"
          value={caption}
          multiline
          rows={3}
          onChange={(e) => setCaption(e.target.value)}
        />
        <TextField
          id="outlined-static"
          label="Image Url"
          rows={3}
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Button onClick={upload} type="submit">
          Post
        </Button>
      </form>
    </div>
  );
}

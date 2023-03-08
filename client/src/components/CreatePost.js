import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_BIKE } from "../gqloperations/mutations";
import { useNavigate } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import { v4 } from "uuid";
import { useEffect } from "react";
import M from "materialize-css";
import { storage } from "../Firebase";
import { CustomButton1 } from "./Class";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default function CreatePost() {
  const [bike, setBike] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setUrl] = useState("");

  const navigate = useNavigate();
  const [createNewBike, { loading, error, data }] = useMutation(
    CREATE_NEW_BIKE,
    {
      refetchQueries: ["getAllBikes", "getMyProfile"],
    }
  );
  useEffect(() => {
    // Initialize dropdown menu
    const dropdowns = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(dropdowns);
  }, []);
  if (loading) return <h1>Loading</h1>;
  if (error) {
    console.log("error", error);
  }
  if (!localStorage.getItem("token")) {
    navigate("/login");
    return <h1>Loading...</h1>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    const metadata = {
      contentType: "image/jpeg",
    };

    //method to upload an image to the bucket
    uploadBytes(imageRef, image, metadata)
      .then(() => {
        getDownloadURL(imageRef)
          .then((imageURL) => {
            setUrl(imageURL);
            createNewBike({
              variables: {
                name: bike,
                imageurl: imageUrl,
              },
            });
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
      })
      .catch((error) => {
        console.log(error.message);
      });

    setBike("");
    setImage(null);
    setUrl("");
  };

  return (
    <div className="container my-container">
      {data && console.log(data)}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={bike}
          onChange={(e) => setBike(e.target.value)}
          placeholder="Write description of your vehicle"
        />
        <input
          type="file"
          variant="contained"
          name="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <CustomButton1 variant="contained" onClick={handleSubmit}>
          Create
        </CustomButton1>
      </form>
    </div>
  );
}

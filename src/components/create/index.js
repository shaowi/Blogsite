import { useState } from "react";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Swal from "sweetalert2";
import FormCreate from "./FormCreate";

const Create = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const history = useHistory();

  const keyPressEvent = (e) => {
    // Submit the form when ctrl-enter key is pressed
    if ((e.keyCode === 10 || e.keyCode === 13) && e.ctrlKey) {
      addCreateBlog(e);
    }
  };

  const addCreateBlog = (e) => {
    e.preventDefault();
    const datetime = new Date();
    const dateWritten = `${datetime.getDate()}/${
      datetime.getMonth() + 1
    }/${datetime.getFullYear()}, ${datetime.toLocaleTimeString()} `;
    const dateEdited = dateWritten;
    const blog = {
      title,
      content,
      dateWritten,
      dateEdited,
      bookmarked: false,
      id: blogs.length + 2,
    };
    const updatedBlogs = [...blogs, blog];
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    Swal.fire({
      title: "Blog Added!",
      text: "Do you want to add one more blog?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setTitle("");
        setContent("");
        return;
      }
      history.push("/");
    });
  };

  return (
    <CSSTransition
      in={true}
      timeout={350}
      classNames="blog-create"
      unmountOnExit
      appear
    >
      <FormCreate
        props={{
          addCreateBlog,
          title,
          setTitle,
          content,
          setContent,
          keyPressEvent,
        }}
      />
    </CSSTransition>
  );
};

export default Create;

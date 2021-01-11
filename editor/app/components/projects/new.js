import React, {useState} from "react";
import Header from "../header";
import Errors from "../errors";
import { v4 as uuidv4 } from 'uuid';

export default function NewProject () {

  let project = {};
  const [errors, setErrors] = useState({});

  async function createProject(event) {
    event.preventDefault();
    project.id = uuidv4();
    const response = await fetch(`/api/projects/${project.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: project.title, description: project.description })
    });

    console.log(response);
  }

  return (
    <>
    <Header/>
    <h1>Create a New Project</h1>
    <form onSubmit={createProject}>
    <label htmlFor="projectTitle">Project Title</label>
        <input
          type="text"
          name="projectTitle"
          placeholder="Title for new project"
          onChange={(e) => project.title = e.target.value}
        />
        <Errors errors={errors.title} />

        <label htmlFor="projectDescription">Description</label>
        <textarea
          name="projectDescription"
          placeholder="Description for new project"
          onChange={(e) => project.description = e.target.value}
        />
        <Errors errors={errors.description} />

        <button type="submit">Create Project</button>
        {/* <button type="submit" disabled={cannotSubmit}>
          Save
        </button> */}
    </form>
    </>
  )
}
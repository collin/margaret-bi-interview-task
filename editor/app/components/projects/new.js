import React from "react";
import Header from "../header";

export default function NewProject () {

  let project = {};

  async function createProject(event) {
    event.preventDefault();
    console.log(project);
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
        {/* <Errors errors={errors.title} /> */}

        <label htmlFor="projectDescription">Description</label>
        <textarea
          name="projectDescription"
          placeholder="Description for new project"
          onChange={(e) => project.description = e.target.value}
        />
        {/* <Errors errors={errors.description} /> */}

        <button type="submit">Create Project</button>
        {/* <button type="submit" disabled={cannotSubmit}>
          Save
        </button> */}
    </form>
    </>
  )
}
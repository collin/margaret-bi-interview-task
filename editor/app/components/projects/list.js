import React, { useState } from "react";
import Header from "../header";
import Link from "../link";
import Errors from "../errors";
import Success from "../success";
import { navigateTo } from "../../util/routing";


export default function ListProjects({ projects }) {

  const [isSuccess, setSuccess] = useState(false);

  async function deleteButtonWasPressed(event) {
    const id = event.currentTarget.id;
    if (confirm(`Are you sure you want to delete project with id ${id}?`)) {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: "DELETE"
        });
        if (response.status == 204) {
          const row = document.getElementById(`project-${id}`);
          row.remove();
          showSuccess();
        } else {
          throw new Error(`Unexpected HTTP response: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
        navigateTo("/application-error");
      } 
    }
  }

  function showSuccess() {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }

  return (
    <>
      <Header />
      <h2>Projects</h2>
      <Success success={isSuccess} message={"Deleted Successfully"}/>

      <Link className="button" to="/projects/new">
        Add a Project
      </Link>
      <ul className="project-list">
        {projects.map((project) => {
          return (
            <li className="project-list-item" key={project.id} id={`project-${project.id}`}>
              <p>{project.title}</p>
              <span className="project-actions">
                <Link to={`/projects/${project.id}/edit`}>edit</Link>
                <button id={project.id} onClick={deleteButtonWasPressed}>
                  <span role="img" aria-label="Delete">
                    🚫
                  </span>
                </button>
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

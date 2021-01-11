import React, {useState} from "react";
import Header from "../header";
import Errors from "../errors";
import Success from "../success";
import Link from "../link";
import { v4 as uuidv4 } from 'uuid';

export default function NewProject () {

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSuccess, setSuccess] = useState(false);

  let project = {};

  async function createProject(event) {
    event.preventDefault();
    project.id = uuidv4();
    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: project.title, description: project.description })
      });

      console.log(response.status);
      switch (response.status) {
        case 200:
          setErrors({});
          showSuccess();
          break;
        case 422:
          const errors = await response.json();
          setErrors(errors);
          break;
        default:
          throw new Error(`Unexpected HTTP response: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      navigateTo("/application-error");
    } finally {
      setSaving(false);
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
    <Header/>
    <h1>Create a New Project</h1>
    <Success success={isSuccess}/>
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

        <button type="submit" disabled={saving}>
          Create Project
        </button>
    </form>

    <nav>
        <Link to="/projects">Back to list</Link>
    </nav>
    </>
  )
}
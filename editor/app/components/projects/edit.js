import React, { useState } from "react";
import Header from "../header";
import Errors from "../errors";
import Success from "../success";
import Link from "../link";
import { navigateTo } from "../../util/routing";
import { v4 as uuidv4 } from 'uuid';

export default function EditProject({ project, request }) {
  let headingText;
  if(!project) {
    project = {
      title: '',
      description: '',
      id: ''
    };
    headingText = "Create New Project"
  } else {
    headingText = `Edit project "${project.title}"`
  }

  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSuccess, setSuccess] = useState(false);
  const hasErrors = Object.keys(errors).length > 0;
  const cannotSubmit = saving;

  async function saveChanges(event) {
    event.preventDefault();
    setSaving(true);
    if (!project.id) {
      project.id = uuidv4();
    }
    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: request,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
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
      <Header />
      <h2>{headingText}</h2>
      <Success success={isSuccess} message={"Saved Successfully"}/>
      <form onSubmit={saveChanges}>
        <label htmlFor="projectTitle">Project Title</label>
        <input
          type="text"
          name="projectTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Errors errors={errors.title} />

        <label htmlFor="projectDescription">Description</label>
        <textarea
          name="projectDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Errors errors={errors.description} />

        <button type="submit" disabled={cannotSubmit}>
          Save
        </button>
      </form>
      <nav>
        <Link to="/projects">Back to list</Link>
      </nav>
    </>
  );
}

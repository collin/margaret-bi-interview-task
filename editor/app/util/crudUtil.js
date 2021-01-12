import { v4 as uuidv4 } from 'uuid';


export async function saveProject(requestType) {
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
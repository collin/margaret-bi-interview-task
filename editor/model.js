const { readFile, writeFile, readdir, unlink } = require("fs").promises;
const path = require("path");

const getProjectsDir = () => path.join(process.env.DATA_PATH, "projects");

const buildProjectPath = (key) => path.resolve(getProjectsDir(), `${key}.json`);

const getSitePath = () => path.join(process.env.DATA_PATH, "site.json");

exports.buildProjectValidationErrors = function buildProjectValidationErrors(
  data
) {
  const errors = { valid: true, errors: {} };
  if (!data.title) {
    errors.valid = false;
    errors.errors.title = ["A title MUST be provided."];
  }
  if (!data.description) {
    errors.valid = false;
    errors.errors.description = ["A description MUST be provided."];
  }
  if (!data.id) {
    errors.valid = false;
    errors.errors.id = ["An id MUST be provided."];
  }
  if (data.id && !data.id.match(/^[a-z\-]+$/)) {
    errors.valid = false;
    errors.errors.id = [
      "The id MUST contain only lower-case letters and dashes.",
    ];
  }
  return errors;
};

exports.buildSiteValidationErrors = function buildSiteValidationErrors(data) {
  const errors = { valid: true, errors: {} };
  if (!data.headline) {
    errors.valid = false;
    errors.errors.headline = ["A headline MUST be provided."];
  }
  if (!data.welcomeMessage) {
    errors.valid = false;
    errors.errors.welcomeMessage = ["A welcome message MUST be provided."];
  }
  return errors;
};

exports.listProjects = async function listProjects() {
  const files = await readdir(getProjectsDir());
  const projectFiles = files.filter((path) => path.match(/\.json$/));
  const projectReaders = projectFiles.map(async (pathName) => {
    const projectFilePath = path.join(getProjectsDir(), pathName);
    const projectRaw = await readFile(projectFilePath, "utf-8");
    return JSON.parse(projectRaw);
  });
  return Promise.all(projectReaders);
};

exports.readProject = async function readProject(key) {
  const projectFilePath = buildProjectPath(key);
  try {
    const projectRaw = await readFile(projectFilePath, "utf-8");
    return JSON.parse(projectRaw);
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
};

exports.writeProject = function writeProject(key, data) {
  const projectPath = buildProjectPath(key);
  return writeFile(projectPath, JSON.stringify(data));
};

exports.deleteProject = function deleteProject(key) {
  const projectPath = buildProjectPath(key);
  return unlink(projectPath);
};

exports.readSite = async function readSite() {
  const sitePath = getSitePath();
  const rawSite = await readFile(sitePath, "utf-8");
  return JSON.parse(rawSite);
};

exports.writeSite = function writeSite(data) {
  const sitePath = getSitePath();
  return writeFile(sitePath, JSON.stringify(data));
};

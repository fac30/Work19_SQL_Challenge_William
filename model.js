const db = require("./database/db.js");

const select_cohorts_in_finsbo = db.prepare(/*sql*/ `
  -- [1]
  SELECT name FROM cohorts WHERE location = 'Finsbury Park';
`);

function listCohortsInFinsbo() {
  return select_cohorts_in_finsbo.all();
}

const select_students_in_finsbo = db.prepare(/*sql*/ `
  -- [2]
  SELECT students.username
  FROM students
  INNER JOIN cohorts ON students.cohort_name = cohorts.name
  WHERE cohorts.location = 'Finsbury Park'
`);

function listStudentsInFinsbo() {
  return select_students_in_finsbo.all();
}

const select_students_with_location = db.prepare(/*sql*/ `
  -- [3]
  SELECT students.username, cohorts.location 
  FROM students INNER JOIN cohorts ON students.cohort_name = cohorts.name
`);

function listStudentsWithLocation() {
  return select_students_with_location.all();
}

const select_students_with_projects = db.prepare(/*sql*/ `
  -- [4]
  SELECT students.username, projects.name
  FROM students_projects
  INNER JOIN students ON students_projects.student_username = students.username
  INNER JOIN projects ON students_projects.project_id = projects.id
`);

function listStudentsWithProjects() {
  return select_students_with_projects.all();
}

const select_students_with_projects_in_finsbo = db.prepare(/*sql*/ `
  -- [5]
  SELECT students.username, projects.name
  FROM students
  INNER JOIN students_projects ON students.username = students_projects.student_username
  INNER JOIN projects ON students_projects.project_id = projects.id
  INNER JOIN cohorts ON students.cohort_name = cohorts.name
  WHERE cohorts.location = 'Finsbury Park'
  ORDER BY students.username
`);

function listStudentsWithProjectsInFinsbo() {
  return select_students_with_projects_in_finsbo.all();
}

module.exports = {
  listCohortsInFinsbo,
  listStudentsInFinsbo,
  listStudentsWithLocation,
  listStudentsWithProjects,
  listStudentsWithProjectsInFinsbo,
};

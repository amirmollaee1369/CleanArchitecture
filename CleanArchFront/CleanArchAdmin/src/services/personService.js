import http from "./httpService";

const apiEndpoint = "/Person";

function personUrl(path,id) {
  return `${apiEndpoint}/${path}/${id}`;
}

export function getPeople() {
  return http.get(`${apiEndpoint}/Get`);
}

export function getPerson(personId) {
  return http.get(personUrl('GetById',personId));
}

export function savePerson(person) {
  if (person.Id) {
    return http.put(`${apiEndpoint}/Update`, person);
  }

  return http.post(`${apiEndpoint}/Create`, person);
}

export function deletePerson(personId) {
  return http.delete(personUrl('DeleteById',personId));
}
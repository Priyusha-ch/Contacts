// import axios from 'axios';


// export default axios.create({
//     baseURL:"http://localhost:3000/",
// })


import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3006', 
});

export const fetchContacts = () => api.get('/api/contacts');
export const addContact = (contact) => api.post('/api/contacts', contact);
export const updateContact = (id, contact) => api.put(`/api/contacts/${id}`, contact);
export const deleteContact = (id) => api.delete(`/api/contacts/${id}`);


// export const fetchContacts = () => api.get('/contacts');
// export const addContact = (contact) => api.post('/contacts', contact);
// export const updateContact = (id, contact) => api.put(`/contacts/${id}`, contact);
// export const deleteContact = (id) => api.delete(`/contacts/${id}`);
import api from './api';

export const fetchJournals = async (token) => {
  const { data } = await api.get('/journal', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const createJournal = async (journalData, token) => {
  const { data } = await api.post('/journal', journalData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateJournal = async (id, journalData, token) => {
  const { data } = await api.put(`/journal/${id}`, journalData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteJournal = async (id, token) => {
  const { data } = await api.delete(`/journal/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
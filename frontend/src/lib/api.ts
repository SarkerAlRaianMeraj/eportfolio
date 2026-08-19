import { Project, Skill, Research, Achievement, ContactFormData, User } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers,
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

// Auth
export async function login(email: string, password: string): Promise<{ access_token: string }> {
  const result = await fetchApi<{ access_token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', result.access_token);
  }
  return result;
}

export async function getProfile(): Promise<User> {
  return fetchApi<User>('/auth/profile');
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
}

// Projects
export async function getProjects(): Promise<Project[]> {
  try {
    return await fetchApi<Project[]>('/projects');
  } catch {
    const fallback = await import('@/data/projects.json');
    return fallback.default as Project[];
  }
}

export async function getProject(id: string): Promise<Project> {
  return fetchApi<Project>(`/projects/${id}`);
}

export async function createProject(data: Partial<Project>): Promise<Project> {
  return fetchApi<Project>('/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateProject(id: string, data: Partial<Project>): Promise<Project> {
  return fetchApi<Project>(`/projects/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteProject(id: string): Promise<void> {
  await fetchApi(`/projects/${id}`, { method: 'DELETE' });
}

// Skills
export async function getSkills(): Promise<Skill[]> {
  try {
    return await fetchApi<Skill[]>('/skills');
  } catch {
    const fallback = await import('@/data/skills.json');
    return fallback.default as Skill[];
  }
}

export async function createSkill(data: Partial<Skill>): Promise<Skill> {
  return fetchApi<Skill>('/skills', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateSkill(id: string, data: Partial<Skill>): Promise<Skill> {
  return fetchApi<Skill>(`/skills/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteSkill(id: string): Promise<void> {
  await fetchApi(`/skills/${id}`, { method: 'DELETE' });
}

// Research
export async function getResearch(): Promise<Research[]> {
  try {
    return await fetchApi<Research[]>('/research');
  } catch {
    const fallback = await import('@/data/research.json');
    return fallback.default as Research[];
  }
}

export async function createResearch(data: Partial<Research>): Promise<Research> {
  return fetchApi<Research>('/research', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateResearch(id: string, data: Partial<Research>): Promise<Research> {
  return fetchApi<Research>(`/research/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteResearch(id: string): Promise<void> {
  await fetchApi(`/research/${id}`, { method: 'DELETE' });
}

// Achievements
export async function getAchievements(): Promise<Achievement[]> {
  try {
    return await fetchApi<Achievement[]>('/achievements');
  } catch {
    const fallback = await import('@/data/achievements.json');
    return fallback.default as Achievement[];
  }
}

export async function createAchievement(data: Partial<Achievement>): Promise<Achievement> {
  return fetchApi<Achievement>('/achievements', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateAchievement(id: string, data: Partial<Achievement>): Promise<Achievement> {
  return fetchApi<Achievement>(`/achievements/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteAchievement(id: string): Promise<void> {
  await fetchApi(`/achievements/${id}`, { method: 'DELETE' });
}

// Contact
export async function submitContact(data: ContactFormData): Promise<void> {
  await fetchApi('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

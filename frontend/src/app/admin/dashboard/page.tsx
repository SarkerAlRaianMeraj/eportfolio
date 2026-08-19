'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  getProfile, logout,
  getProjects, createProject, updateProject, deleteProject,
  getSkills, createSkill, updateSkill, deleteSkill,
  getResearch, createResearch, updateResearch, deleteResearch,
  getAchievements, createAchievement, updateAchievement, deleteAchievement,
  getContactMessages,
} from '@/lib/api';
import { Project, Skill, Research as ResearchType, Achievement, ContactMessage } from '@/lib/types';

type Tab = 'projects' | 'skills' | 'research' | 'achievements' | 'messages';

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [research, setResearch] = useState<ResearchType[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then(() => Promise.all([
        getProjects().then(setProjects),
        getSkills().then(setSkills),
        getResearch().then(setResearch),
        getAchievements().then(setAchievements),
        getContactMessages().then(setMessages).catch(() => {}),
      ]))
      .catch(() => router.push('/admin'))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'projects', label: 'Projects' },
    { key: 'skills', label: 'Skills' },
    { key: 'research', label: 'Research' },
    { key: 'achievements', label: 'Achievements' },
    { key: 'messages', label: 'Messages' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <div className="flex gap-4">
            <a href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-sm">
              View Site
            </a>
            <button onClick={handleLogout} className="text-red-600 hover:text-red-700 text-sm">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-1 mb-8 border-b border-gray-200 dark:border-gray-700">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                tab === t.key
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'projects' && (
          <ProjectsTab projects={projects} setProjects={setProjects} />
        )}
        {tab === 'skills' && (
          <SkillsTab skills={skills} setSkills={setSkills} />
        )}
        {tab === 'research' && (
          <ResearchTab research={research} setResearch={setResearch} />
        )}
        {tab === 'achievements' && (
          <AchievementsTab achievements={achievements} setAchievements={setAchievements} />
        )}
        {tab === 'messages' && (
          <MessagesTab messages={messages} />
        )}
      </div>
    </div>
  );
}

function ProjectsTab({ projects, setProjects }: { projects: Project[]; setProjects: (p: Project[]) => void }) {
  const [form, setForm] = useState({ title: '', description: '', tech_stack: '', repo_url: '', live_url: '', category: 'web' });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = { ...form, tech_stack: form.tech_stack.split(',').map(s => s.trim()).filter(Boolean), category: form.category as Project['category'] };
    if (editingId) {
      const updated = await updateProject(editingId, data);
      setProjects(projects.map(p => p.id === editingId ? updated : p));
    } else {
      const created = await createProject(data);
      setProjects([created, ...projects]);
    }
    setForm({ title: '', description: '', tech_stack: '', repo_url: '', live_url: '', category: 'web' });
    setEditingId(null);
  };

  const handleEdit = (p: Project) => {
    setForm({ title: p.title, description: p.description, tech_stack: p.tech_stack.join(', '), repo_url: p.repo_url || '', live_url: p.live_url || '', category: p.category });
    setEditingId(p.id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this project?')) {
      await deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">{editingId ? 'Edit Project' : 'Add Project'}</h3>
        <input placeholder="Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
        <textarea placeholder="Description" required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white h-24" />
        <input placeholder="Tech stack (comma separated)" value={form.tech_stack} onChange={e => setForm({ ...form, tech_stack: e.target.value })} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Repo URL" value={form.repo_url} onChange={e => setForm({ ...form, repo_url: e.target.value })} className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
          <input placeholder="Live URL" value={form.live_url} onChange={e => setForm({ ...form, live_url: e.target.value })} className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
        </div>
        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <option value="web">Web</option>
          <option value="ml">ML</option>
          <option value="research">Research</option>
          <option value="iot">IoT</option>
          <option value="desktop">Desktop</option>
          <option value="other">Other</option>
        </select>
        <div className="flex gap-3">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{editingId ? 'Update' : 'Create'}</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', description: '', tech_stack: '', repo_url: '', live_url: '', category: 'web' }); }} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300">Cancel</button>}
        </div>
      </form>
      <div className="space-y-3">
        {projects.map(p => (
          <div key={p.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">{p.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{p.category}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700">Edit</button>
              <button onClick={() => handleDelete(p.id)} className="px-3 py-1 text-sm text-red-600 hover:text-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsTab({ skills, setSkills }: { skills: Skill[]; setSkills: (s: Skill[]) => void }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>('frontend');

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    const created = await createSkill({ name, category: category as Skill['category'] });
    setSkills([...skills, created]);
    setName('');
  };

  const handleDelete = async (id: string) => {
    await deleteSkill(id);
    setSkills(skills.filter(s => s.id !== id));
  };

  return (
    <div>
      <form onSubmit={handleAdd} className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 flex gap-4">
        <input placeholder="Skill name" required value={name} onChange={e => setName(e.target.value)} className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
        <select value={category} onChange={e => setCategory(e.target.value)} className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="ml">ML</option>
          <option value="languages">Languages</option>
          <option value="tools">Tools</option>
        </select>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add</button>
      </form>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {skills.map(s => (
          <div key={s.id} className="bg-white dark:bg-gray-800 rounded-lg p-3 flex items-center justify-between">
            <div>
              <span className="text-gray-900 dark:text-white text-sm">{s.name}</span>
              <span className="ml-2 text-xs text-gray-400">{s.category}</span>
            </div>
            <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-600 text-xs">x</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResearchTab({ research, setResearch }: { research: ResearchType[]; setResearch: (r: ResearchType[]) => void }) {
  const [form, setForm] = useState({ title: '', authors: '', publication_venue: '', date: '', doi_url: '', abstract: '' });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = { ...form, authors: form.authors.split(',').map(s => s.trim()).filter(Boolean) };
    if (editingId) {
      const updated = await updateResearch(editingId, data);
      setResearch(research.map(r => r.id === editingId ? updated : r));
    } else {
      const created = await createResearch(data);
      setResearch([created, ...research]);
    }
    setForm({ title: '', authors: '', publication_venue: '', date: '', doi_url: '', abstract: '' });
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this research entry?')) {
      await deleteResearch(id);
      setResearch(research.filter(r => r.id !== id));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">{editingId ? 'Edit Research' : 'Add Research'}</h3>
        <input placeholder="Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
        <input placeholder="Authors (comma separated)" value={form.authors} onChange={e => setForm({ ...form, authors: e.target.value })} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Publication venue" value={form.publication_venue} onChange={e => setForm({ ...form, publication_venue: e.target.value })} className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
          <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
        </div>
        <input placeholder="DOI URL" value={form.doi_url} onChange={e => setForm({ ...form, doi_url: e.target.value })} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
        <textarea placeholder="Abstract" value={form.abstract} onChange={e => setForm({ ...form, abstract: e.target.value })} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white h-24" />
        <div className="flex gap-3">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{editingId ? 'Update' : 'Create'}</button>
        </div>
      </form>
      <div className="space-y-3">
        {research.map(r => (
          <div key={r.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">{r.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{r.publication_venue || 'No venue'}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditingId(r.id); setForm({ title: r.title, authors: (r.authors || []).join(', '), publication_venue: r.publication_venue || '', date: r.date || '', doi_url: r.doi_url || '', abstract: r.abstract || '' }); }} className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700">Edit</button>
              <button onClick={() => handleDelete(r.id)} className="px-3 py-1 text-sm text-red-600 hover:text-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AchievementsTab({ achievements, setAchievements }: { achievements: Achievement[]; setAchievements: (a: Achievement[]) => void }) {
  const [form, setForm] = useState({ title: '', description: '', date: '', type: 'award' });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = { ...form, type: form.type as Achievement['type'] };
    if (editingId) {
      const updated = await updateAchievement(editingId, data);
      setAchievements(achievements.map(a => a.id === editingId ? updated : a));
    } else {
      const created = await createAchievement(data);
      setAchievements([created, ...achievements]);
    }
    setForm({ title: '', description: '', date: '', type: 'award' });
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this achievement?')) {
      await deleteAchievement(id);
      setAchievements(achievements.filter(a => a.id !== id));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">{editingId ? 'Edit Achievement' : 'Add Achievement'}</h3>
        <input placeholder="Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white h-20" />
        <div className="grid grid-cols-2 gap-4">
          <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <option value="award">Award</option>
            <option value="certification">Certification</option>
            <option value="deans_list">Dean&apos;s List</option>
            <option value="competitive">Competitive Programming</option>
            <option value="competition">Competition</option>
            <option value="project">Project</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{editingId ? 'Update' : 'Create'}</button>
        </div>
      </form>
      <div className="space-y-3">
        {achievements.map(a => (
          <div key={a.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">{a.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{a.type} {a.date ? `- ${a.date}` : ''}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditingId(a.id); setForm({ title: a.title, description: a.description || '', date: a.date || '', type: a.type }); }} className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700">Edit</button>
              <button onClick={() => handleDelete(a.id)} className="px-3 py-1 text-sm text-red-600 hover:text-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesTab({ messages }: { messages: ContactMessage[] }) {
  if (messages.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map(m => (
        <div key={m.id} className="bg-white dark:bg-gray-800 rounded-lg p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">{m.name}</h4>
              <a href={`mailto:${m.email}`} className="text-sm text-blue-600 dark:text-blue-400">{m.email}</a>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {new Date(m.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm whitespace-pre-wrap">{m.message}</p>
        </div>
      ))}
    </div>
  );
}

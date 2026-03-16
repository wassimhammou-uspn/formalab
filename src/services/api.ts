// src/services/api.ts
// Centralise tous les appels vers le backend FormaLabs

import { Activity, Equipment, LabData } from '../types/formalabs';

const API_URL = (import.meta as any).env?.VITE_API_URL ?? 'http://localhost:3001';

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API ${path} → ${res.status}: ${body}`);
  }
  return res.json() as Promise<T>;
}

// ── Activités (type_projet) ──────────────────────────────────
export function fetchActivities(): Promise<Activity[]> {
  return apiFetch<Activity[]>('/api/activities');
}

// ── Équipements (types_machine + labs) ───────────────────────
export function fetchEquipments(): Promise<Equipment[]> {
  return apiFetch<Equipment[]>('/api/equipments');
}

// ── Liste des labs ────────────────────────────────────────────
export interface LabSummary {
  id: number;
  name: string;
  room: string;
  category: string;
  mission: string;
}

export function fetchLabs(): Promise<LabSummary[]> {
  return apiFetch<LabSummary[]>('/api/labs');
}

// ── Détail d'un lab ───────────────────────────────────────────
export function fetchLab(id: number): Promise<LabData> {
  return apiFetch<LabData>(`/api/labs/${id}`);
}
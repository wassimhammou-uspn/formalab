export interface LabLocation {
  name: string;
  room: string;
}
export interface Equipment {
  id: string;
  name: string;
  description: string;
  labs: LabLocation[];
}
export interface Activity {
  id: string;
  title: string;
  description: string;
}
export interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
}
export interface LabData {
  name: string;
  room: string;
  category: string;
  mission: string;
  objectives: string[];
  projects: Project[];
}
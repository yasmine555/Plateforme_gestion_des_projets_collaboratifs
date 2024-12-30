export interface Project {
  id?: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
  objectives: ProjectObjective[];
  deliverables: Deliverable[];
}

export interface ProjectObjective {
  id?: number;
  description: string;
  dueDate: Date;
  status: string;
}

export interface Deliverable {
  id?: number;
  name: string;
  description: string;
  dueDate: Date;
  status: string;
}

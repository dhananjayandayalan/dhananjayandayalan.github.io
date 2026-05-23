export interface Experience {
  id: number;
  company: string;
  position: string;
  period: string;
  location: {
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  techStack: string[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  mobile?: string;
  message: string;
}

export interface Skill {
  category: string;
  items: string[];
}

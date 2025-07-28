export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "fullstack",
    name: "Fullstack",
    description: "Frontend and backend development technologies",
    skills: [
      "React", "Next.js", "Remix", "Tanstack", "SvelteKit", 
      "Redux", "Zustand", "Zod", "tRPC", "TailwindCSS", 
      "Chakra UI", "Bootstrap", "Material UI", "Node.js", 
      "Express", "FastAPI", "Django", "Flask", "Flutter"
    ]
  },
  {
    id: "data",
    name: "Data Engineering & Science",
    description: "Data processing, analysis, and engineering tools",
    skills: [
      "Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", 
      "PyTorch", "Jupyter", "Apache Spark", "Kafka", "Airflow", 
      "PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Docker", 
      "Kubernetes", "AWS", "GCP", "Azure", "Snowflake"
    ]
  },
  {
    id: "ml",
    name: "Machine Learning",
    description: "AI and machine learning frameworks and tools",
    skills: [
      "TensorFlow", "PyTorch", "Scikit-learn", "Keras", "OpenAI", 
      "Hugging Face", "LangChain", "Pandas", "NumPy", "Matplotlib", 
      "Seaborn", "Plotly", "Jupyter", "MLflow", "Weights & Biases", 
      "DVC", "FastAI", "XGBoost", "LightGBM", "CatBoost"
    ]
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    description: "DevOps, cloud, and infrastructure technologies",
    skills: [
      "Docker", "Kubernetes", "AWS", "GCP", "Azure", 
      "Terraform", "Ansible", "Jenkins", "GitLab CI", "GitHub Actions", 
      "Prometheus", "Grafana", "ELK Stack", "Istio", "Helm", 
      "Vault", "Consul", "Nginx", "Apache", "Linux"
    ]
  }
]; 
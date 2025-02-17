import React from 'react';
import ProjectCard from '@/components/molecules/cards/projectCard';
import { PROJECTS } from '@/constants/projects';

export default function ControlledAccordions() {
  return (
    <div>
      {PROJECTS.map((project, index) => (
        <ProjectCard
          key={index}
          img={project.img}
          title={project.title}
          description={project.description}
          frameworks={project.frameworks}
        />
      ))}
    </div>
  );
}
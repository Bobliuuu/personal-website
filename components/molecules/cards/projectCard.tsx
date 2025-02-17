import React from 'react';
import Image from 'next/image';

// Add a specific type to return props
interface ProjectCardProps {
  img: string;
  title: string;
  description: string;
  frameworks: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  img,
  title,
  description,
  frameworks,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-md">
      <div className="ml-5 relative w-80 h-40 object-cover rounded">
        <Image src={img} fill alt={title} />
      </div>
      <div className="flex flex-col ml-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="mb-2">
          {description}
        </p>
        <div className="flex space-x-2">
          {frameworks.map((framework, index) => (
            <span key={index} className="px-2 py-1 bg-gray-200 text-gray-800 rounded">
              {framework}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-end space-y-2 mr-5">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Source code
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded">
          Demo
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
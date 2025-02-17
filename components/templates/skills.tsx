import SkillsCard from '@/components/molecules/cards/skillsCard';
import { SKILLS } from '@/constants/skills';

const Skills = () => {
  return (
    <div className="flex flex-wrap justify-start items-start p-4">
      {SKILLS.map((skill) => (
        <div key={skill.id} className="w-1/5 p-2">
          <SkillsCard title={skill.title} imageSrc={skill.imageSrc} />
        </div>
      ))}
    </div>
  );
};

export default Skills;
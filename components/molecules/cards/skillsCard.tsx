import Image from 'next/image';

interface SkillsCardProps {
    imageSrc: string;
    title: string;
}  

const SkillsCard = ({ imageSrc, title }: SkillsCardProps) => {
  return (
    <div className="flex flex-col items-center p-4 m-2 bg-white rounded-lg shadow-md">
      <div className="w-32 h-32 relative">
        <div className="absolute inset-0">
        <Image src={imageSrc} alt={title} layout="fill" objectFit="cover" />
        </div>
      </div>
      <p className="mt-2 text-center">{title}</p>
    </div>
  );
};

export default SkillsCard;
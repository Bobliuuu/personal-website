import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { EXPERIENCES } from "@/constants/experiences";
import { BsPersonWorkspace } from "react-icons/bs";

const workIconStyles = { background: "#06D6A0" };
const schoolIconStyles = { background: "#f9c74f" };

const Experiences: React.FC = () => {
  return (
    <div>
      <h1 className="text-left pl-4 text-4xl font-normal">Timeline</h1>
      <VerticalTimeline layout='2-columns'>
        {EXPERIENCES.map((experience: any) => {
          return (
            <VerticalTimelineElement
              key={experience.key}
              date={experience.date}
              dateClassName="date"
              icon={<BsPersonWorkspace />}
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              contentStyle={{ background: 'rgb(156, 205, 245)', color: '#000' }} 
              contentArrowStyle={{ borderRight: '7px solid  rgb(156, 205, 245)' }}
            >
              <h3 className="">
                {experience.title}
              </h3>
              <h5 className="">
                {experience.location}
              </h5>
              <p id="description">{experience.description}</p>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
};

export default Experiences;
// Faster render speeds + app routing
import Intro from '@/components/templates/intro';
import Experiences from '@/components/templates/experience';
import Projects from '@/components/templates/projects';
import Skills from '@/components/templates/skills'

export default function App() {
    return (
        <>
            <Intro />
            <Experiences />
            <Projects />
            <Skills />
        </>
    );
}
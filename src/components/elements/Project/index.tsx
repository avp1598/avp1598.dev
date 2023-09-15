import { projects } from "./constants";
import ProjectCard from "./ProjectCard";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const Project = () => {
  return (
    <SimpleBar
      style={{
        height: "90%",
        maxHeight: "calc(100vh - 100px)",
      }}
    >
      <div className="flex flex-col p-4 overflow-auto">
        {projects.map((project) => (
          <ProjectCard key={project.url} {...project} />
        ))}
      </div>
    </SimpleBar>
  );
};

export default Project;

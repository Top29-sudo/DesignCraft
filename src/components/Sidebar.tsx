import { PlusCircle, Video, Settings, LogOut, Sun } from 'lucide-react';
import { useState } from 'react';
import { ProjectType } from '../types';

interface SidebarProps {
  activeProject: ProjectType | null;
  setActiveProject: (project: ProjectType | null) => void;
}

const Sidebar = ({ activeProject, setActiveProject }: SidebarProps) => {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const createNewProject = () => {
    const newProject: ProjectType = {
      id: `project-${Date.now()}`,
      name: `Project ${projects.length + 1}`,
      createdAt: new Date(),
      lastModified: new Date(),
      messages: [],
    };
    
    setProjects([newProject, ...projects]);
    setActiveProject(newProject);
  };

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-full">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <Video className="h-6 w-6 text-indigo-400" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Emend AI
          </h1>
        </div>
      </div>
      
      <div className="p-4">
        <button 
          onClick={createNewProject}
          className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 
            text-white p-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-indigo-700/20"
        >
          <PlusCircle className="h-5 w-5" />
          <span className="font-medium">New Project</span>
        </button>
      </div>
      
      <div className="overflow-y-auto flex-1">
        {projects.length > 0 ? (
          <>
            <div className="px-4 py-2">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Your Projects</h2>
            </div>
            
            <div className="space-y-1 px-2">
              {projects.map(project => (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className={`w-full text-left p-2 rounded-lg transition-all duration-200 hover:bg-gray-800 flex items-start
                    ${activeProject?.id === project.id ? 'bg-gray-800 text-indigo-400' : 'text-gray-300'}`}
                >
                  <div className="flex-1 truncate">
                    <div className="font-medium">{project.name}</div>
                    <div className="text-xs text-gray-500">
                      {project.lastModified.toLocaleDateString()}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-32 text-gray-500 text-sm">
            No projects yet
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-800">
        <div className="space-y-2">
          <button className="w-full flex items-center p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200">
            <Settings className="h-5 w-5 mr-3" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200">
            <Sun className="h-5 w-5 mr-3" />
            <span>Theme</span>
          </button>
          <button className="w-full flex items-center p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200">
            <LogOut className="h-5 w-5 mr-3" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
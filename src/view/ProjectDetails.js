import React, { useEffect, useState } from 'react';
import { fetchProjectDetails, fetchProjectTasks } from '../utils/apiService';

const ProjectDetails = ({ projectId, onBack }) => {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjectDetails = async () => {
      try {
        const projectData = await fetchProjectDetails(projectId);
        setProject(projectData.data);
        const taskData = await fetchProjectTasks(projectId);
        setTasks(taskData.data.tasks || []);
      } catch (error) {
        console.error('Error loading project details:', error);
      } finally {
        setLoading(false);
      }
    };

    getProjectDetails();
  }, [projectId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isDeadlineNear = (deadline) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diff = deadlineDate - now;
    return diff < 7 * 24 * 60 * 60 * 1000; // less than one week
  };

  if (loading) {
    return <div>Loading</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <div className="pb-8">
        <button onClick={onBack}>
          <span className="material-icons sidebar-icons text-md text-gray-500">arrow_back</span>
        </button>
      </div>
      <div className="pb-4">
        <h1 className="text-2xl font-bold">
          {project.project_name}
        </h1>
      </div>
      <div>
        <p className="pb-4 text-gray-500">{project.description}</p>
        <div className="info text-gray-500 pb-8">
          <div className="info-item">
            <span className="material-icons">person_outline</span>
            <span>{project.members_count}</span>
          </div>
          <div className="info-item">
            <span className="material-icons">sort</span>
            <span>{project.tasks_count}</span>
          </div>
          <div className="info-item">
            <span className="material-icons">edit</span>
            <span>{formatDate(project.created_at)}</span>
          </div>
          <div className="info-item">
            <span className="material-icons">update</span>
            <span>{formatDate(project.updated_at)}</span>
          </div>
        </div>
        <div key={project.projectid} className="mb-6">
          <h2 className="text-md font-bold mb-3">Tasks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.isArray(tasks) && tasks.map((task) => (
              <div
                key={task.taskid}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
              >
                <h3 className="text-lg font-semibold mb-1">{task.title}</h3>
                <p className="text-gray-700 mb-2">{task.description}</p>
                <p className="text-xs text-gray-500 mb-2">
                  Created At {formatDate(task.created_at)}
                </p>
                <p
                  className={`text-xs ${
                    isDeadlineNear(task.deadline) ? 'text-red-500' : 'text-gray-500'
                  }`}
                >
                  Deadline {formatDate(task.deadline)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
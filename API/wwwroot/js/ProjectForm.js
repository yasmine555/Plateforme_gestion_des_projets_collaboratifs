import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

const ProjectForm = ({ onSubmit }) => {
    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'En cours'
    });

    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ajouter automatiquement le chef de projet
        const projectWithManager = {
            ...projectData,
            projectManager: currentUser.name,
            projectManagerId: currentUser.id,
            teamMembers: [],
            createdAt: new Date().toISOString()
        };
        onSubmit(projectWithManager);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">
                    Nom du projet
                </label>
                <input
                    type="text"
                    value={projectData.name}
                    onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                />
            </div>

            <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    value={projectData.description}
                    onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    rows="3"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">
                        Date de début
                    </label>
                    <input
                        type="date"
                        value={projectData.startDate}
                        onChange={(e) => setProjectData({ ...projectData, startDate: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">
                        Date de fin
                    </label>
                    <input
                        type="date"
                        value={projectData.endDate}
                        onChange={(e) => setProjectData({ ...projectData, endDate: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>
            </div>

            <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">
                    Chef de projet
                </label>
                <input
                    type="text"
                    value={currentUser.name}
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
                    disabled
                />
            </div>

            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Créer le projet
            </button>
        </form>
    );
};

export default ProjectForm;
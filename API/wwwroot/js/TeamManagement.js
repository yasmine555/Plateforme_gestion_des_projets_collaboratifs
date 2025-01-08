import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

const TeamManagement = () => {
    const [members, setMembers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [memberData, setMemberData] = useState({
        name: '',
        email: '',
        role: '',
        projectId: ''
    });

    useEffect(() => {
        // Charger les projets et membres existants
        const loadedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        const loadedMembers = JSON.parse(localStorage.getItem('members')) || [];
        setProjects(loadedProjects);
        setMembers(loadedMembers);
    }, []);

    const handleAddMember = (e) => {
        e.preventDefault();
        if (!memberData.projectId) {
            alert('Veuillez sélectionner un projet');
            return;
        }

        const newMember = {
            id: Date.now(),
            ...memberData,
            projectIds: [memberData.projectId],
            createdAt: new Date().toISOString()
        };

        // Mettre à jour le stockage local
        const updatedMembers = [...members, newMember];
        const updatedProjects = projects.map(project => {
            if (project.id === parseInt(memberData.projectId)) {
                return {
                    ...project,
                    teamMembers: [...project.teamMembers || [], newMember.id]
                };
            }
            return project;
        });

        setMembers(updatedMembers);
        setProjects(updatedProjects);
        localStorage.setItem('members', JSON.stringify(updatedMembers));
        localStorage.setItem('projects', JSON.stringify(updatedProjects));

        // Réinitialiser le formulaire
        setMemberData({
            name: '',
            email: '',
            role: '',
            projectId: ''
        });
    };

    return (
        <div className="p-4">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Ajouter un membre</h2>
                <form onSubmit={handleAddMember} className="space-y-4">
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">
                            Projet *
                        </label>
                        <select
                            value={memberData.projectId}
                            onChange={(e) => setMemberData({ ...memberData, projectId: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        >
                            <option value="">Sélectionner un projet</option>
                            {projects.map(project => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">
                            Nom complet
                        </label>
                        <input
                            type="text"
                            value={memberData.name}
                            onChange={(e) => setMemberData({ ...memberData, name: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={memberData.email}
                            onChange={(e) => setMemberData({ ...memberData, email: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">
                            Rôle
                        </label>
                        <select
                            value={memberData.role}
                            onChange={(e) => setMemberData({ ...memberData, role: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        >
                            <option value="">Sélectionner un rôle</option>
                            <option value="Développeur">Développeur</option>
                            <option value="Designer">Designer</option>
                            <option value="Chef de projet">Chef de projet</option>
                            <option value="Testeur">Testeur</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Ajouter le membre
                    </button>
                </form>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Membres par projet</h2>
                <div className="space-y-4">
                    {projects.map(project => (
                        <div key={project.id} className="border rounded-lg p-4">
                            <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                            <div className="space-y-2">
                                {members
                                    .filter(member => member.projectIds.includes(project.id.toString()))
                                    .map(member => (
                                        <div key={member.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                            <div>
                                                <p className="font-medium">{member.name}</p>
                                                <p className="text-sm text-gray-600">{member.role}</p>
                                            </div>
                                            <div className="text-sm text-gray-500">{member.email}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamManagement;
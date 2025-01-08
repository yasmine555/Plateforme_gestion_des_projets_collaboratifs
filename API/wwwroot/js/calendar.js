import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [projects, setProjects] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        // Charger les projets depuis le gestionnaire
        const loadedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        setProjects(loadedProjects);
    }, []);

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const getProjectsForDate = (date) => {
        return projects.filter(project => {
            const projectStart = new Date(project.startDate);
            const projectEnd = new Date(project.endDate);
            return date >= projectStart && date <= projectEnd;
        });
    };

    const getCellColor = (date) => {
        const dayProjects = getProjectsForDate(date);
        if (dayProjects.length === 0) return 'bg-white';

        // Couleur basée sur le nombre de projets
        if (dayProjects.length === 1) return 'bg-blue-100';
        if (dayProjects.length === 2) return 'bg-blue-200';
        return 'bg-blue-300';
    };

    const handlePrevMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        // Jours du mois précédent
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="p-2 bg-gray-50" />);
        }

        // Jours du mois en cours
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dayProjects = getProjectsForDate(date);

            days.push(
                <div
                    key={day}
                    onClick={() => handleDateClick(date)}
                    className={`p-2 cursor-pointer transition-colors hover:bg-gray-100 relative ${getCellColor(date)}`}
                >
                    <span className="absolute top-1 right-1">{day}</span>
                    {dayProjects.length > 0 && (
                        <div className="mt-4 text-xs">
                            {dayProjects.length} projet(s)
                        </div>
                    )}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-gray-100 rounded"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <h2 className="text-lg font-semibold">
                    {currentDate.toLocaleDateString('fr-FR', {
                        month: 'long',
                        year: 'numeric'
                    })}
                </h2>

                <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-100 rounded"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
                {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
                    <div key={day} className="text-center font-medium text-gray-600 p-2">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
            </div>

            {selectedDate && (
                <div className="mt-4 p-4 border-t">
                    <h3 className="font-semibold">
                        Projets du {selectedDate.toLocaleDateString('fr-FR')}
                    </h3>
                    <div className="mt-2">
                        {getProjectsForDate(selectedDate).map(project => (
                            <div key={project.id} className="p-2 bg-blue-50 rounded mb-2">
                                <div className="font-medium">{project.name}</div>
                                <div className="text-sm text-gray-600">
                                    Chef: {project.projectManager}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
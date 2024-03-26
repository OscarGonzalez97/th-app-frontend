import React, { useState, useEffect, createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';

const initialTasks = [
    {
        id: 0,
        title: "Preseleccionados",
        tasks: [
            {
                id: uuidv4(),
                name: "Descripción",
                timestamp: new Date().toDateString()
            }
        ]
    },
    {
        id: 1,
        title: "Entrevista 1",
        tasks: [
            {
                id: uuidv4(),
                name: "Descripción",
                timestamp: new Date().toDateString()
            }
        ]
    },
    {
        id: 2,
        title: "Entrevista 2",
        tasks: [
            {
                id: uuidv4(),
                name: "Descripción",
                timestamp: new Date().toDateString()
            }
        ]
    }
];

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        const tasksFromStorage = localStorage.getItem("tasks");
        return tasksFromStorage ? JSON.parse(tasksFromStorage) : initialTasks;
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    );
};

const LaneSection = () => {
    const { tasks } = useContext(TaskContext);

    const getTaskTitle = (id) => {
        switch (id) {
            case 0:
                return "Preseleccionados";
            case 1:
                return "Entrevista 1";
            case 2:
                return "Entrevista 2";
            default:
                return "";
        }
    };

    return (
        <div className="lane-container">
            {tasks.map((lane) => (
                <div key={lane.id} className="lane">
                    <h2 className="lane__title">{getTaskTitle(lane.id)}</h2>
                    <FormComponent laneId={lane.id}></FormComponent>
                    <div className="lane__info">
                        <span className="lane__number">({lane.tasks.length})</span>
                    </div>
                    <div className="lane__tasks">
                        <TasksComponent tasks={lane.tasks} type={lane.id} title={getTaskTitle(lane.id)}></TasksComponent>
                    </div>
                </div>
            ))}
        </div>
    );
};

const FormComponent = ({ laneId }) => {
    const [selectedState, setSelectedState] = useState(""); //agregue
    const [estados, setEstados] = useState([]); //agregue

    useEffect(() => {
        axios.get('http://localhost:8080/thbackend/v1/estados')
            .then(response => {
                console.log(response.data);
                setEstados(response.data);
            })
            .catch(error => {
                console.error('Error fetching estados:', error);
            });
    }, []);

    return (
        <form className="form">
            <select
                className="form__select"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
            >
                <option value="">Seleccionar estado</option>
                {estados.map((estado) => (
                    <option key={estado.id_estado} value={estado.estado}>{estado.estado}</option>
                ))}
            </select>
        </form>
    );
};

const TasksComponent = ({ tasks, type, title }) => {
    const { tasks: allTasks, setTasks } = useContext(TaskContext);

    const changeTask = (taskId, op) => {
        const newTasks = allTasks.map((lane) => {
            if (lane.id === type) {
                const otherTasks = lane.tasks.filter((task) => task.id !== taskId);
                const currentTask = lane.tasks.find((task) => task.id === taskId);
                const targetLane = op === '-' ? type - 1 : type + 1;
                const targetLaneTasks = allTasks.find((lane) => lane.id === targetLane).tasks;
                return { ...lane, tasks: otherTasks };
            } else if (lane.id === targetLane) {
                return { ...lane, tasks: [currentTask, ...lane.tasks] };
            }
            return lane;
        });

        setTasks(newTasks);
    };

    const deleteTask = (taskId) => {
        const newTasks = allTasks.map((lane) => {
            if (lane.id === type) {
                const otherTasks = lane.tasks.filter((task) => task.id !== taskId);
                return { ...lane, tasks: otherTasks };
            }
            return lane;
        });

        setTasks(newTasks);
    };

    return (
        <>
            {tasks.length === 0 ? (
                <p className="task__empty">No hay nada aún...</p>
            ) : (
                tasks.map((task) => (
                    <article className={`task task--${title}`} key={task.id}>
                        <p className="task__name">{task.name}</p>
                        <div className="task__info">
                            <span className="task__timestamp">{task.timestamp}</span>
                            <div className="task__buttons">
                                {type > 0 && (
                                    <button
                                        className="task__button"
                                        type="button"
                                        title="Previous Stage"
                                        onClick={() => changeTask(task.id, '-')}
                                    >
                                        &#129040;
                                    </button>
                                )}
                                {type < 2 && (
                                    <button
                                        className="task__button"
                                        type="button"
                                        title="Next Stage"
                                        onClick={() => changeTask(task.id, '+')}
                                    >
                                        &#129042;
                                    </button>
                                )}
                                <button
                                    className="task__button"
                                    type="button"
                                    title="Delete Task"
                                    onClick={() => deleteTask(task.id)}
                                >
                                    &#215;
                                </button>
                            </div>
                        </div>
                    </article>
                ))
            )}
        </>
    );
};

export { TaskProvider, LaneSection };

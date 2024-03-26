import React, { useState, useEffect, createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const initialTasks = [
    {
        id: 0,
        title: "TO DO",
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
        title: "DOING",
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
        title: "DONE",
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
    const [lane, setLanes] = useState(() => {
        const tasks = localStorage.getItem("tasks");
        return tasks ? JSON.parse(tasks) : initialTasks;
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(lane));
    }, [lane]);

    return (
        <TaskContext.Provider value={{ lane, setLanes }}>
            {children}
        </TaskContext.Provider>
    );
};

const LaneSection = () => {
    const { lane } = useContext(TaskContext);




    useEffect(() => {
        axios.get('http://localhost:8082/thbackend/v1/estados')
            .then(response => {
                // Aquí deberías manejar los estados obtenidos de la API
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching estados:', error);
            });
    }, []);






    const getTaskTitle = (id) => {
        switch (id) {
            case 0:
                return "TO DO";
            case 1:
                return "DOING";
            case 2:
                return "DONE";
            default:
                return "";
        }
    };

    return (
        <div className="lane-container">
            {lane.map((t) => (
                <div key={t.id} className="lane">
                    <h2 className="lane__title">{getTaskTitle(t.id)}</h2>
                    <FormComponent id={t.id}></FormComponent>
                    <div className="lane__info">
                        <span className="lane__number">({t.tasks.length})</span>
                    </div>
                    <div className="lane__tasks">
                        <TasksComponent tasks={t.tasks} type={t.id} title={getTaskTitle(t.id)}></TasksComponent>
                    </div>
                </div>
            ))}
        </div>
    );
};


const FormComponent = ({ id }) => {
    const { lane, setLanes } = useContext(TaskContext);
    const [name, setName] = useState("");

    const createTask = (e) => {
        e.preventDefault();
        let currentID = parseInt(e.target.id);

        if (name.trim().length > 0) {
            setLanes(
                lane.map((t) => {
                    if (t.id === currentID)
                        return {
                            ...t,
                            tasks: [
                                { id: uuidv4(), name: name, timestamp: new Date().toDateString() },
                                ...t.tasks
                            ]
                        };
                    return t;
                })
            );
            setName("");
        }
    };

    return (
        <form className="form">
            <input
                className="form__input"
                type="text"
                name="task"
                placeholder="Agregar"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button className="form__submit" type="submit" id={id} onClick={createTask}>
                <FontAwesomeIcon icon={faPlus} />
            </button>

        </form>
    );
};

const TasksComponent = ({ tasks, type, title }) => {
    const { lane, setLanes } = useContext(TaskContext);

    const changeTask = (e, op) => {
        const currentLane = type;
        const currentID = e.currentTarget.value;
        const currentTask = lane
            .find((t) => t.id === currentLane)
            .tasks.find((t) => t.id === currentID);
        const otherTask = lane
            .find((t) => t.id === currentLane)
            .tasks.filter((t) => t.id !== currentID);

        setLanes(
            lane.map((t) => {
                if (t.id === currentLane) return { ...t, tasks: otherTask };
                else if (t.id === currentLane + (op === "-" ? -1 : 1))
                    return { ...t, tasks: [currentTask, ...t.tasks] };
                return t;
            })
        );
    };

    const deleteTask = (e) => {
        const currentLane = type;
        const currentID = e.currentTarget.value;
        const otherTask = lane
            .find((t) => t.id === currentLane)
            .tasks.filter((t) => t.id !== currentID);

        setLanes(
            lane.map((t) => {
                if (t.id === currentLane) return { ...t, tasks: otherTask };
                return t;
            })
        );
    };

    return (
        <>
            {tasks.length === 0 ? (
                <p className="task__empty">Nada por hacer...</p>
            ) : (
                tasks.map((t) => (
                    <article className={`task task--${title}`} key={t.id}>
                        <p className="task__name">{t.name}</p>
                        <div className="task__info">
                            <span className="task__timestamp">{t.timestamp}</span>
                            <div className="task__buttons">
                                {type > 0 && (
                                    <button
                                        className="task__button"
                                        type="button"
                                        title="Previous Stage"
                                        value={t.id}
                                        id={type}
                                        onClick={(e) => changeTask(e, "-")}
                                    >
                                        &#129040;
                                    </button>
                                )}
                                {type < 2 && (
                                    <button
                                        className="task__button"
                                        type="button"
                                        title="Next Stage"
                                        value={t.id}
                                        id={type}
                                        onClick={(e) => changeTask(e, "+")}
                                    >
                                        &#129042;
                                    </button>
                                )}
                                <button
                                    className="task__button"
                                    type="button"
                                    title="Delete Task"
                                    value={t.id}
                                    id={type}
                                    onClick={deleteTask}
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

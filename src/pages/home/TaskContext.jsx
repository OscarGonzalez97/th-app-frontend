import React, { useState, useEffect, createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const initialTasks = [
    {
        id: 0,
        title: "PRESELECCIONADOS",
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
        title: "ENTREVISTA 1",
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
        title: "ENTREVISTA 2",
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

    const getTaskTitle = (id) => {
        switch (id) {
            case 0:
                return "PRESELECCIONADOS";
            case 1:
                return "ENTREVISTA 1";
            case 2:
                return "ENTREVISTA 2";
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
                <p className="task__empty">No hay nada aún...</p>
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
                                        title="Anterior"
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
                                        title="Siguiente"
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
                                    title="Eliminar"
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

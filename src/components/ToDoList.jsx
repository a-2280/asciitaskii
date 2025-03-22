import { useState, useEffect } from "react";

function ToDoList() {
  const asciiArt = `
████████╗ ██████╗       ██████╗  ██████╗ 
╚══██╔══╝██╔═══██╗      ██╔══██╗██╔═══██╗
   ██║   ██║   ██║█████╗██║  ██║██║   ██║
   ██║   ██║   ██║╚════╝██║  ██║██║   ██║
   ██║   ╚██████╔╝      ██████╔╝╚██████╔╝
   ╚═╝    ╚═════╝       ╚═════╝  ╚═════╝
    `;

  const defaultData = {
    "My list": {
      active: [],
      completed: [],
    },
  };

  const loadInitialData = () => {
    try {
      const savedData = localStorage.getItem("todoListsData");
      return savedData ? JSON.parse(savedData) : defaultData;
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      return defaultData;
    }
  };

  const loadActiveList = () => {
    try {
      const savedActiveList = localStorage.getItem("todoActiveList");
      const listsData = loadInitialData();

      if (savedActiveList && listsData[savedActiveList]) {
        return savedActiveList;
      }

      return Object.keys(listsData)[0] || "My list";
    } catch (error) {
      console.error("Error loading active list from localStorage:", error);
      return "My list";
    }
  };

  const [activeList, setActiveList] = useState(loadActiveList);
  const [newListName, setNewListName] = useState("");
  const [newTask, setNewTask] = useState("");
  const [listsWithTasks, setListsWithTasks] = useState(loadInitialData);

  useEffect(() => {
    try {
      localStorage.setItem("todoListsData", JSON.stringify(listsWithTasks));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [listsWithTasks]);

  useEffect(() => {
    try {
      localStorage.setItem("todoActiveList", activeList);
    } catch (error) {
      console.error("Error saving active list to localStorage:", error);
    }
  }, [activeList]);

  const handleListClick = (listName) => {
    setActiveList(listName);
  };

  const handleListSubmit = (e) => {
    e.preventDefault();

    if (newListName.trim()) {
      setListsWithTasks({
        ...listsWithTasks,
        [newListName]: {
          active: [],
          completed: [],
        },
      });

      setActiveList(newListName);
      setNewListName("");
    }
  };

  const handleDeleteList = () => {
    if (Object.keys(listsWithTasks).length <= 1) {
      return;
    }

    const updatedLists = { ...listsWithTasks };
    delete updatedLists[activeList];

    const remainingLists = Object.keys(updatedLists);
    setActiveList(remainingLists[remainingLists.length - 1]);

    setListsWithTasks(updatedLists);
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (newTask.trim()) {
      setListsWithTasks({
        ...listsWithTasks,
        [activeList]: {
          ...listsWithTasks[activeList],
          active: [...listsWithTasks[activeList].active, newTask],
        },
      });

      setNewTask("");
    }
  };

  const handleToggleTaskStatus = (taskIndex, isCompleted) => {
    if (isCompleted) {
      const taskToToggle = listsWithTasks[activeList].completed[taskIndex];

      setListsWithTasks({
        ...listsWithTasks,
        [activeList]: {
          active: [...listsWithTasks[activeList].active, taskToToggle],
          completed: listsWithTasks[activeList].completed.filter(
            (_, i) => i !== taskIndex
          ),
        },
      });
    } else {
      const taskToToggle = listsWithTasks[activeList].active[taskIndex];

      setListsWithTasks({
        ...listsWithTasks,
        [activeList]: {
          active: listsWithTasks[activeList].active.filter(
            (_, i) => i !== taskIndex
          ),
          completed: [...listsWithTasks[activeList].completed, taskToToggle],
        },
      });
    }
  };

  const handleClearCompleted = () => {
    setListsWithTasks({
      ...listsWithTasks,
      [activeList]: {
        ...listsWithTasks[activeList],
        completed: [],
      },
    });
  };

  return (
    <div className="flex items-center flex-col">
      <pre className="text-[0.80rem] md:text-[1.15rem] text-blue">
        {asciiArt}
      </pre>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div>
          <p>Lists</p>
          <div className="border-[1.5px] p-4 w-fit">
            <div className="flex flex-col items-start">
              {Object.keys(listsWithTasks).map((list) => (
                <button
                  key={list}
                  className={activeList === list ? "font-black" : ""}
                  onClick={() => handleListClick(list)}
                >
                  {activeList === list ? "[#]" : "[-]"} {list}
                </button>
              ))}
            </div>
            <form onSubmit={handleListSubmit} className="flex gap-2 mt-4">
              <button>[+]</button>
              <input
                type="text"
                name="new-list"
                id="new-list"
                placeholder="New list"
                className="border-b-[1.5px] w-28 outline-none"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <p className="font-black text-dark-grey">{activeList}</p>
            <p>{listsWithTasks[activeList].active.length} Tasks</p>
          </div>
          <div className="border-[1.5px] p-4 w-fit">
            <ul>
              {listsWithTasks[activeList].active.map((task, index) => (
                <li
                  key={`active-${index}`}
                  onClick={() => handleToggleTaskStatus(index, false)}
                >
                  <button>[-]</button> {task}
                </li>
              ))}
            </ul>
            <form onSubmit={handleAddTask} className="flex gap-2">
              <button>[+]</button>
              <input
                type="text"
                name="new-task"
                id="new-task"
                placeholder="New task"
                className="border-b-[1.5px] outline-none"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </form>
            {listsWithTasks[activeList].completed.length > 0 && (
              <>
                <div className="border-b-[1.5px] border-dotted my-6"></div>
                <ul className="line-through opacity-50">
                  {listsWithTasks[activeList].completed.map((task, index) => (
                    <li
                      key={`completed-${index}`}
                      className="cursor-pointer"
                      onClick={() => handleToggleTaskStatus(index, true)}
                    >
                      <button className="text-red">[x]</button> {task}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="flex justify-between">
            <button onClick={handleClearCompleted}>Clear</button>
            <button onClick={handleDeleteList}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;

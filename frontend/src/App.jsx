import { useState, useEffect } from "react";
import categories from "./assets/categories";
import CategoryDropdown from "./components/CategoryDropdown";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    } else {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark;
    }
  });

  const [tasks, setTasks] = useState([
    {
      id: 1,
      content:
        "Będę regularnie uczył się muzyki aby osiągnąć wynik 12% na egzaminie maturalnym",
      categories: [],
      endDate: "marzec 2026",
    },
    {
      id: 2,
      content:
        "Nie będę nic robić regularnie przez najbliższe 2 miesiące żeby ćwiczyć technikę “nionierobienia”",
      categories: [2, 6, 7, 8, 10, 12, 11],
      endDate: "październik 2025",
    },
  ]);

  const [editTaskId, setEditTaskId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editEndDate, setEditEndDate] = useState("");
  const [editCategories, setEditCategories] = useState([]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const textareas = document.querySelectorAll(".auto-resize-textarea");
    textareas.forEach((textarea) => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    });
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleEditClick = (task) => {
    setEditTaskId(task.id);
    setEditContent(task.content);
    setEditEndDate(task.endDate);
    setEditCategories(task.categories);
  };

  const handleApproveClick = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editTaskId
          ? {
              ...task,
              content: editContent,
              endDate: editEndDate,
              categories: editCategories,
            }
          : task
      )
    );
    setEditTaskId(null);
  };

  const handleCancelClick = () => {
    setEditTaskId(null);
  };

  const handleSelectCategory = (category) => {
    setEditCategories([...new Set([...editCategories, category.id])]);
  };

  const handleRemoveCategory = (categoryId) => {
    setEditCategories(editCategories.filter((id) => id !== categoryId));
  };

  const getCategoriesByIds = (ids) => {
    return categories.filter((category) => ids.includes(category.id));
  };

  function handleAddTaskClick() {
    const newTask = {
      id: tasks.length + 1,
      content: "",
      categories: [],
      endDate: "",
    };
    setTasks([...tasks, newTask]);
    setEditTaskId(newTask.id);
    setEditContent(newTask.content);
    setEditEndDate(newTask.endDate);
    setEditCategories(newTask.categories);
  }

  const handleDeleteClick = (taskId) => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć to zadanie?");
    if (confirmed) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-black min-h-screen dark:text-gray-100 text-gray-800">
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="text-xl font-semibold dark:text-gray-100">
              eKapituła HKK
            </button>
          </div>
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center space-x-6">
            <button className="text-sm font-medium hover:text-blue-800 dark:hover:text-blue-300">
              Użytkownicy
            </button>
            <button className="text-sm font-medium hover:text-blue-800 dark:hover:text-blue-300">
              Wszystkie próby
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="material-symbols-outlined bg-gray-900 dark:bg-gray-100 dark:text-gray-800 text-gray-100 p-2 rounded-lg"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? "light_mode" : "dark_mode"}
            </button>
            <button className="material-symbols-outlined bg-green-500 p-2 rounded-lg">
              person
            </button>
            <button className="material-symbols-outlined bg-red-500 p-2 rounded-lg">
              logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-semibold">
              wyw. Jakub Prażuch próba na stopień HO
            </h2>
            <div className="flex space-x-2">
              <button className="flex items-center bg-gray-200 p-2 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800">
                <span className="material-symbols-outlined">
                  list_alt_check
                </span>
                <span className="ml-2">Zgłoś próbę do opiekuna</span>
              </button>
              <button>
                <span className="material-symbols-outlined bg-gray-200 p-2 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800">
                  edit_square
                </span>
              </button>
              <button>
                <span className="material-symbols-outlined bg-red-300 p-2 rounded-lg hover:bg-red-400 dark:bg-red-700 dark:hover:bg-red-800">
                  delete
                </span>
              </button>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm w-fit flex items-center space-x-1">
              <p className="font-semibold">Stan:</p>
              <span>do akceptacji przez opiekuna</span>
            </div>
            <div className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm w-fit flex items-center space-x-1">
              <p className="font-semibold">Data zakończenia:</p>
              <span>marzec 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <p className="text-sm text-gray-400">Email do kontaktu</p>
              <p className="font-medium">jakub.prazuch@malopolska.zhr.pl</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Email opiekuna</p>
              <p className="font-medium">andrzej.zarnowski@malopolska.zhr.pl</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Data urodzenia</p>
              <p className="font-medium">25 lipca 2005</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Imię i nazwisko opiekuna</p>
              <p className="font-medium">Andrzej Żarnowski</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Drużyna</p>
              <p className="font-medium">40 KDH Barykada</p>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-medium mb-4">Zadania</h3>
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 text-left text-sm">
                <tr>
                  <th className="p-3" style={{ width: "1%" }}>
                    Lp
                  </th>
                  <th className="p-3" style={{ width: "48%" }}>
                    Treść zadania
                  </th>
                  <th className="p-3" style={{ width: "27%" }}>
                    Kategoria zadania
                  </th>
                  <th className="p-3" style={{ width: "17%" }}>
                    Data zakończenia
                  </th>
                  <th className="p-3" style={{ width: "7%" }}>
                    Edycja
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {tasks.map((task, index) => {
                  const taskCategories = getCategoriesByIds(
                    editTaskId === task.id ? editCategories : task.categories
                  );
                  return (
                    <tr key={task.id}>
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">
                        {editTaskId === task.id ? (
                          <textarea
                            className="auto-resize-textarea resize-none w-full overflow-hidden break-words rounded-lg border border-gray-200 dark:border-gray-700 p-2 focus:outline-none"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            placeholder="Treść zadania"
                            rows={1}
                          ></textarea>
                        ) : (
                          <textarea
                            className="auto-resize-textarea resize-none w-full overflow-hidden break-words rounded-lg border border-white dark:border-gray-900 p-2 focus:outline-none"
                            value={task.content}
                            rows={1}
                            readOnly
                          ></textarea>
                        )}
                      </td>
                      <td className="pt-1 pb-3 flex flex-wrap space-x-2">
                        {taskCategories.map((category) =>
                          editTaskId === task.id ? (
                            <button
                              key={category.id}
                              className={`category-button ${category.bgColor} ${category.fontColor} ${category.darkBgColor} ${category.darkFontColor} px-3 py-1 mt-2 rounded-full text-sm w-fit flex items-center space-x-1`}
                              onClick={() => handleRemoveCategory(category.id)}
                            >
                              <span className="category-icon material-symbols-outlined">
                                {category.icon}
                              </span>
                              <span className="category-name">
                                {category.name}
                              </span>
                            </button>
                          ) : (
                            <div
                              key={category.id}
                              className={`${category.bgColor} ${category.fontColor} ${category.darkBgColor} ${category.darkFontColor} px-3 py-1 mt-2 rounded-full text-sm w-fit flex items-center space-x-1`}
                            >
                              <span className="material-symbols-outlined">
                                {category.icon}
                              </span>
                              <span>{category.name}</span>
                            </div>
                          )
                        )}
                        {editTaskId === task.id && (
                          <CategoryDropdown
                            selectedCategories={editCategories}
                            onSelectCategory={handleSelectCategory}
                          />
                        )}
                      </td>
                      <td className="p-3">
                        {editTaskId === task.id ? (
                          <button
                            onChange={(e) => setEditEndDate(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 p-2 flex items-center justify-between"
                          >
                            <p>{editEndDate}</p>
                            <span className="material-symbols-outlined">
                              calendar_month
                            </span>
                          </button>
                        ) : (
                          <div className="w-full rounded-lg border border-white dark:border-gray-900 p-2 flex items-center justify-between">
                            <p>{task.endDate}</p>
                            <span className="material-symbols-outlined text-white dark:text-gray-900">
                              calendar_month
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="p-3">
                        {editTaskId === task.id ? (
                          <>
                            <button
                              className="material-symbols-outlined text-green-600 hover:text-green-800"
                              onClick={handleApproveClick}
                            >
                              check
                            </button>
                            <button
                              className="material-symbols-outlined text-red-600 hover:text-red-800"
                              onClick={handleCancelClick}
                            >
                              close
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="material-symbols-outlined text-gray-400 hover:text-gray-600"
                              onClick={() => handleEditClick(task)}
                            >
                              edit
                            </button>
                            <button
                              className="material-symbols-outlined text-gray-400 hover:text-red-600"
                              onClick={() => handleDeleteClick(task.id)}
                            >
                              delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
              onClick={handleAddTaskClick}
            >
              <span className="material-symbols-outlined mr-1">add</span>
              Nowe zadanie
            </button>
          </div>

          <div className="space-y-6 mt-12">
            <h3 className="text-xl font-medium">Komentarze</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  23 lipca 2024
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="font-medium">Andrzej Żarnowski:</p>
                  <p>Jak dla mnie jest w porządku! :)</p>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Twój komentarz"
                    className="flex-1 p-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-600"
                  />
                  <button className="material-symbols-outlined text-blue-600 hover:text-blue-800">
                    send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

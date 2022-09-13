export default class WorkoutTracker {
    static LOCAL_STORAGE_DATA_KEY = "workout-tracker-entries";

    constructor(root) {
        this.root = root;
        this.root.insertAdjacentHTML("afterbegin", WorkoutTracker.html());
        this.entries = [];
        
        this.loadEntries();
        this.updateView();

        this.root.querySelector(".tracker-add").addEventListener("click", () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = (date.getDay() + 1).toString().padStart(2, "0");

            this.addEntry({
                date:`${ year }-${ month }-${ day }`,
                workout: "walking",
                duration: 30
            });
        });
    }

    static html() {
        return `
            <table class="tracker">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Workout</th>
                            <th>Duration</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="tracker-entries">
                    </tbody>
                    <tbody>
                        <tr class="tracker-row tracker-row-add">
                            <td colspan="4">
                                <span class="tracker-add">Add Entry &plus;</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
        `;
    }

    static rowHtml() {
        return `
            <tr class="tracker-row">
                <td>
                    <input type="date" class="tracker-date">
                </td>
                <td>
                    <select class="tracker-workout">
                        <option value="walking">Walking</option>
                        <option value="running">running</option>
                        <option value="cycling">Cycling</option>
                    </select>
                </td>
                <td>
                    <input type="number" class="tracker-duration">
                    <span class="tracker-text">minutes</span>
                </td>
                <td>
                    <button type="button" class="tracker-button tracker-delete">&times;</button>
                </td>
            </tr>
        `;
    }

    loadEntries() {
        this.entries = JSON.parse(localStorage.getItem(WorkoutTracker.LOCAL_STORAGE_DATA_KEY) || "[]");
    }

    saveEntries() {
        localStorage.setItem(WorkoutTracker.LOCAL_STORAGE_DATA_KEY, JSON.stringify(this.entries));
    }

    updateView() {
        const tableBody = this.root.querySelector(".tracker-entries");
        const addRow = data => {
            const template = document.createElement("template");
            let row = null;

            template.innerHTML = WorkoutTracker.rowHtml().trim();
            row = template.content.firstElementChild;

            row.querySelector(".tracker-date").value = data.date;
            row.querySelector(".tracker-workout").value = data.workout;
            row.querySelector(".tracker-duration").value = data.duration;

            row.querySelector(".tracker-date").addEventListener("change", ({ target }) => {
                data.date = target.value;
            });

            row.querySelector(".tracker-workout").addEventListener("change", ({ target }) => {
                data.workout = target.value;
            });

            row.querySelector(".tracker-duration").addEventListener("change", ({ target }) => {
                data.duration = target.value;
            });

            row.querySelector(".tracker-delete").addEventListener("click", () => {
                this.deleteEntry(data);
            })

            tableBody.appendChild(row);
        };

        tableBody.querySelectorAll(".tracker-row").forEach(row => {
            row.remove();
        });

        this.entries.forEach(data => addRow(data));
    }

    addEntry(data) {
        this.entries.push(data);
        this.saveEntries();
        this.updateView();
    }

    deleteEntry(dataToDelete) {
        this.entries = this.entries.filter(data => data !== dataToDelete);
        this.saveEntries();
        this.updateView();
    }
}

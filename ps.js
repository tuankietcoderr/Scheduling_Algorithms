class Process {
  constructor(
    pid,
    priority,
    arrival_time,
    burst_time,
    waiting_time,
    turnaround_time,
    completion_time
  ) {
    this.pid = pid;
    this.priority = priority;
    this.arrival_time = arrival_time;
    this.burst_time = burst_time;
    this.waiting_time = waiting_time;
    this.turnaround_time = turnaround_time;
    this.completion_time = completion_time;
  }
}

class Processes {
  constructor() {
    this.processes = [];
  }

  addProcess(process) {
    this.processes.push(process);
  }

  getProcesses() {
    return this.processes;
  }

  getProcess(pid) {
    return this.processes[pid];
  }
}

let i, j, NOP;
let sum_waiting_time = 0,
  sum_turnaround_time = 0;
const p = new Processes();

// cout<<endl<<"GANTT CHART"<<endl<<at[0];

function sort_process_by_priority_asc() {
  for (i = 1; i < NOP; i++) {
    for (j = i + 1; j < NOP; j++) {
      if (p.getProcess(i).priority > p.getProcess(j).priority) {
        const temp = p.getProcess(i);
        p.processes[i] = p.getProcess(j);
        p.processes[j] = temp;
      }
    }
  }
}

function sort_process_by_priority_desc() {
  for (i = 1; i < NOP; i++) {
    for (j = i + 1; j < NOP; j++) {
      if (p.getProcess(i).priority < p.getProcess(j).priority) {
        const temp = p.getProcess(i);
        p.processes[i] = p.getProcess(j);
        p.processes[j] = temp;
      }
    }
  }
}
function sort_process_by_pid() {
  for (i = 0; i < NOP; i++) {
    for (j = i + 1; j < NOP; j++) {
      if (p.getProcess(i).pid > p.getProcess(j).pid) {
        const temp = p.getProcess(i);
        p.processes[i] = p.getProcess(j);
        p.processes[j] = temp;
      }
    }
  }
}

let mode = $("select_mode").value;
$("select_mode").onchange = (e) => {
  mode = e.target.value;
};
function _Processes() {
  NOP = parseInt($("num_process").value);
  $("processes").innerHTML = "";
  for (i = 0; i < NOP; i++) {
    const arr_input = $c("input");
    arr_input.type = "number";
    arr_input.className = "arr_input";
    const arr_label = $c("label");
    arr_label.innerHTML =
      "Enter the arrival time of process " + (i + 1) + " : ";
    arr_label.appendChild(arr_input);
    const burst_label = $c("label");
    burst_label.innerHTML =
      "Enter the burst time of process " + (i + 1) + " : ";
    const burst_input = $c("input");
    burst_input.type = "number";
    burst_input.className = "burst_input";
    burst_label.appendChild(burst_input);
    const priority_label = $c("label");
    priority_label.innerHTML =
      "Enter the priority of process " + (i + 1) + " : ";
    const priority_input = $c("input");
    priority_input.type = "number";
    priority_input.className = "priority_input";
    priority_label.appendChild(priority_input);

    $("processes").appendChild(arr_label);
    $("processes").appendChild(burst_label);
    $("processes").appendChild(priority_label);
  }
}

$("btn_submit_num_process").onclick = () => {
  _Processes();
  if ($("num_process").value != 0) {
    $("submit").style.display = "block";
  } else {
    $("submit").style.display = "none";
  }
};

function checkAnyEmpty(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]?.value) {
      return true;
    }
  }
  return false;
}

$("submit").onclick = () => {
  const all_arrival = $qa(".arr_input");
  const all_burst = $qa(".burst_input");
  const all_priority = $qa(".priority_input");
  if (
    !$("num_process").value ||
    checkAnyEmpty(all_arrival) ||
    checkAnyEmpty(all_burst) ||
    checkAnyEmpty(all_priority)
  ) {
    alert(
      "Please enter the number of processes and their arrival, burst times and priority"
    );
    return;
  }
  $("process_table").style.display = "block";
  $("calculate").style.display = "block";
  $("process_table_body").innerHTML = "";

  for (i = 0; i < NOP; i++) {
    const row = $c("tr");
    const index_cell = $c("td");
    index_cell.innerHTML = i + 1;
    const arrival_cell = $c("td");
    arrival_cell.innerHTML = all_arrival[i].value;
    const burst_cell = $c("td");
    burst_cell.innerHTML = all_burst[i].value;
    const priority_cell = $c("td");
    priority_cell.innerHTML = all_priority[i].value;

    row.appendChild(index_cell);
    row.appendChild(arrival_cell);
    row.appendChild(burst_cell);
    row.appendChild(priority_cell);
    $("process_table_body").appendChild(row);
    p.addProcess(
      new Process(
        i + 1,
        parseInt(all_priority[i].value),
        parseInt(all_arrival[i].value),
        parseInt(all_burst[i].value),
        0,
        0,
        0
      )
    );
    p.getProcess(i).waiting_time =
      p.getProcess(i).turnaround_time =
      p.getProcess(i).completion_time =
        0;
  }
  $("mode").style.display = "block";
  if (mode === "asc") {
    sort_process_by_priority_asc();
  } else {
    sort_process_by_priority_desc();
  }
  p.getProcess(0).turnaround_time = p.getProcess(0).burst_time;
  p.getProcess(0).completion_time = p.getProcess(0).turnaround_time;
  console.log(p);
};

$("calculate").onclick = () => {
  $("calculate").style.display = "none";
  for (i = 1; i < p.processes.length; i++) {
    p.getProcess(i).completion_time =
      p.getProcess(i).waiting_time +
      p.getProcess(i).burst_time +
      p.getProcess(i - 1).completion_time;
    p.getProcess(i).turnaround_time =
      p.getProcess(i).completion_time - p.getProcess(i).arrival_time;
    p.getProcess(i).waiting_time =
      p.getProcess(i - 1).completion_time - p.getProcess(i).arrival_time;
  }
  for (i = 0; i < p.processes.length; i++) {
    sum_waiting_time += +p.getProcess(i).waiting_time;
    sum_turnaround_time += +p.getProcess(i).turnaround_time;
  }
  console.log(p);
  $("final_result").style.display = "block";
  const cell0 = $c("td");
  cell0.innerHTML = 0;
  $("result_process_burst").appendChild(cell0);
  //! print fcfs gant chart
  for (i = 0; i < p.processes.length; i++) {
    const pid = $c("td");
    pid.innerHTML = "P" + p.getProcess(i).pid;
    pid.style.textAlign = "center";
    pid.style.fontWeight = "bold";
    $("result_process_id").appendChild(pid);
    const burst = $c("td");
    burst.innerHTML = p.getProcess(i).completion_time;
    $("result_process_burst").appendChild(burst);
  }
  //! print fcfs table
  sort_process_by_pid();
  for (i = 0; i < p.processes.length; i++) {
    const row = $c("tr");
    const index_cell = $c("td");
    index_cell.innerHTML = p.getProcess(i).pid;
    const arrival_cell = $c("td");
    arrival_cell.innerHTML = p.getProcess(i).arrival_time;
    const burst_cell = $c("td");
    burst_cell.innerHTML = p.getProcess(i).burst_time;
    const waiting_cell = $c("td");
    waiting_cell.innerHTML = p.getProcess(i).waiting_time;
    const turnaround_cell = $c("td");
    turnaround_cell.innerHTML = p.getProcess(i).turnaround_time;
    const completion_cell = $c("td");
    completion_cell.innerHTML = p.getProcess(i).completion_time;

    row.appendChild(index_cell);
    row.appendChild(arrival_cell);
    row.appendChild(burst_cell);
    row.appendChild(completion_cell); // completion time
    row.appendChild(turnaround_cell);
    row.appendChild(waiting_cell);

    $("final_body").appendChild(row);
  }

  sum_waiting_time = parseInt(sum_waiting_time) / p.processes.length;
  sum_turnaround_time = parseInt(sum_turnaround_time) / p.processes.length;
  //! print
  $("awt").textContent = sum_waiting_time;
  $("atat").textContent = sum_turnaround_time;
};

$("reset").onclick = () => {
  location.reload();
};

let at = [],
  bt = [],
  ct = [],
  qt,
  rqi = [],
  c = 0,
  st,
  flg = 0,
  tm = 0,
  noe = 0,
  pnt = 0,
  btm = [],
  tt,
  wt;
let att = 0,
  awt = 0;
let NOP;

const $ = (id) => {
  return document.getElementById(id);
};

const $q = (query) => {
  return document.querySelector(query);
};

const $qa = (query) => {
  return document.querySelectorAll(query);
};

const $c = (el) => {
  return document.createElement(el);
};

// cout<<endl<<"GANTT CHART"<<endl<<at[0];

function Processes() {
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
    $("processes").appendChild(arr_label);
    $("processes").appendChild(burst_label);
  }
}

$("btn_submit_num_process").onclick = () => {
  Processes();
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
  if (
    !$("num_process").value ||
    !$("quantum_time") ||
    checkAnyEmpty(all_arrival) ||
    checkAnyEmpty(all_burst)
  ) {
    alert(
      "Please enter the number of processes and their arrival and burst times"
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
    row.appendChild(index_cell);
    row.appendChild(arrival_cell);
    row.appendChild(burst_cell);
    $("process_table_body").appendChild(row);
    at[i] = parseInt(all_arrival[i].value);
    bt[i] = parseInt(all_burst[i].value);
    btm[i] = bt[i];
  }
};

$("calculate").onclick = () => {
  qt = parseInt($("quantum_time").value);
  $("calculate").style.display = "none";
  const td = $c("td");
  td.innerHTML = "0";
  $("result_process_burst").appendChild(td);
  $("result_process_stack").innerHTML = "";
  do {
    const curr_p_stack = rqi.filter((i) => i !== undefined);
    console.log(curr_p_stack);
    const curr_p_stack_td = $c("td");
    curr_p_stack_td.innerHTML = curr_p_stack.join("<br/>");
    $("result_process_stack").appendChild(curr_p_stack_td);
    if (flg == 0) {
      st = at[0];
      //---ReduceBT
      if (btm[0] <= qt) {
        tm = st + btm[0];
        btm[0] = 0;
        SearchStack01(pnt, tm);
      } else {
        btm[0] = btm[0] - qt;
        tm = st + qt;
        SearchStack01(pnt, tm);
        AddQue(pnt);
      }
    } //if
    else {
      pnt = rqi[0] - 1;
      st = tm;
      //---DeleteQue
      for (let x = 0; x < noe && noe != 1; x++) {
        rqi[x] = rqi[x + 1];
      }
      noe--;
      //---ReduceBT
      if (btm[pnt] <= qt) {
        tm = st + btm[pnt];
        btm[pnt] = 0;
        SearchStack02(pnt, tm);
      } else {
        btm[pnt] = btm[pnt] - qt;
        tm = st + qt;
        SearchStack02(pnt, tm);
        AddQue(pnt);
      }
    } //else

    //AssignCTvalue
    if (btm[pnt] == 0) {
      ct[pnt] = tm;
    } //if

    flg++;
    //! print gantt chart
    //    cout<<"]-P"<<pnt+1<<"-["<<tm;
    const td_id = $c("td");
    td_id.innerHTML = `<b>P${pnt + 1}</b>`;
    td_id.style.textAlign = "center";
    $("result_process_id").appendChild(td_id);
    const td_burst = $c("td");
    td_burst.innerHTML = tm;
    $("result_process_burst").appendChild(td_burst);
  } while (noe != 0);

  $("gantt_title").style.display = "block";
  $("final_result").style.display = "block";

  for (let x = 0; x < NOP; x++) {
    tt = ct[x] - at[x];
    wt = tt - bt[x];
    //! print
    // cout<<"P"<<x+1<<" \t "<<at[x]<<" \t "<<bt[x]<<" \t "<<ct[x]<<" \t "<<tt<<" \t "<<wt<<"\n";
    const row = $c("tr");
    const index_cell = $c("td");
    index_cell.innerHTML = x + 1;
    const arrival_cell = $c("td");
    arrival_cell.innerHTML = at[x];
    const burst_cell = $c("td");
    burst_cell.innerHTML = bt[x];
    const completion_cell = $c("td");
    completion_cell.innerHTML = ct[x];
    const turnaround_cell = $c("td");
    turnaround_cell.innerHTML = tt;
    const waiting_cell = $c("td");
    waiting_cell.innerHTML = wt;
    row.appendChild(index_cell);
    row.appendChild(arrival_cell);
    row.appendChild(burst_cell);
    row.appendChild(completion_cell);
    row.appendChild(turnaround_cell);
    row.appendChild(waiting_cell);
    $("final_body").appendChild(row);
    awt = parseInt(awt) + parseInt(wt);
    att = parseInt(att) + parseInt(tt);
  } //for
  console.log(awt, att);
  awt = parseInt(awt) / NOP;
  att = parseInt(att) / NOP;
  //! print
  $("awt").textContent = awt;
  $("atat").textContent = att;
  function SearchStack01(pnt, tm) {
    for (let x = pnt + 1; x < NOP; x++) {
      if (at[x] <= tm) {
        rqi[noe] = x + 1;
        noe++;
      }
    } //for
  } //void

  function SearchStack02(pnt, tm) {
    for (let x = pnt + 1; x < NOP; x++) {
      //---CheckQue
      let fl = 0;
      for (let y = 0; y < noe; y++) {
        if (rqi[y] == x + 1) {
          fl++;
        }
      }
      if (at[x] <= tm && fl == 0 && btm[x] != 0) {
        rqi[noe] = x + 1;
        noe++;
      }
    } //for
  } //void

  function AddQue(pnt) {
    rqi[noe] = pnt + 1;
    noe++;
  }
};

$("reset").onclick = () => {
  location.reload();
};

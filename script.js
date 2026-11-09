const tabs = document.querySelectorAll(".tab");
tabs.forEach(function (t) {
  t.addEventListener("click", function () {
    tabs.forEach(function (x, i) {
      let on = x === t;
      x.setAttribute("aria-selected", on);
      document.getElementById("p" + i).hidden = !on;
    });
  });
});

document.getElementById("go").addEventListener("click", function () {
  let r = document.querySelector("input[name=deliv]:checked").value;
  let c = Array.prototype.map.call(
    document.querySelectorAll(".opt:checked"),
    function (x) {
      return x.value;
    },
  );
  let n = document.getElementById("name").value || "не вказано";
  let city = document.getElementById("city").value;
  document.getElementById("out").textContent =
    "Доставка: " +
    r +
    "; опції: " +
    (c.length ? c.join(", ") : "немає") +
    "; ім’я: " +
    n +
    "; місто: " +
    city +
    ".";
});

let dir = {};
document.querySelectorAll("#grid th").forEach(function (th) {
  th.addEventListener("click", function () {
    let c = +th.dataset.c,
      tb = document.querySelector("#grid tbody");
    let rows = Array.prototype.slice.call(tb.rows);
    dir[c] = !dir[c];
    rows.sort(function (a, b) {
      let x = a.cells[c].textContent,
        y = b.cells[c].textContent,
        nx = parseFloat(x),
        ny = parseFloat(y);
      let r = !isNaN(nx) && !isNaN(ny) ? nx - ny : x.localeCompare(y, "uk");
      return dir[c] ? r : -r;
    });
    rows.forEach(function (r) {
      tb.appendChild(r);
    });
  });
});

const qs = (sel) => document.querySelector(sel);
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const load = (k) => JSON.parse(localStorage.getItem(k) || "null");
const clearAll = () => {
  localStorage.removeItem("search");
  localStorage.removeItem("chosenFlight");
  localStorage.removeItem("passengers");
};

// BOOKING PAGE
if (document.body.classList.contains("page-booking")) {
  const form = qs("#searchForm");
  const typeSel = qs("#type");
  const returnWrap = qs("#returnWrapper");

  typeSel.addEventListener("change", () => {
    returnWrap.classList.toggle("hidden", typeSel.value !== "roundtrip");
  });

  // Prefill if query param
  const urlParams = new URLSearchParams(location.search);
  const toParam = urlParams.get("to");
  if (toParam) qs("#to").value = toParam;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const search = {
      from: qs("#from").value.trim(),
      to: qs("#to").value.trim(),
      type: qs("#type").value,
      depart: qs("#depart").value,
      return: qs("#type").value === "roundtrip" ? qs("#return").value : null,
      passengers: Number(qs("#passengers").value),
    };
    if (!search.from || !search.to || !search.depart || !search.type)
      return alert("Please fill in all fields");
    save("search", search);
    location.href = "flights.html";
  });
}

// FLIGHTS PAGE
if (document.body.classList.contains("page-flights")) {
  const search = load("search");
  const grid = qs("#flightsGrid");
  const summary = qs("#searchSummary");

  if (!search) {
    alert("Please search for a flight first.");
    location.href = "booking.html";
  }

  summary.textContent = `${search.from} → ${search.to} • ${
    search.type === "roundtrip" ? "Round Trip" : "One Way"
  }`;

  const matches = flightSchedules.filter((f) => {
    const fromMatch =
      f.from.toLowerCase() === search.from.toLowerCase() ||
      search.from.toLowerCase().includes(f.from.toLowerCase());
    const toMatch =
      f.to.toLowerCase() === search.to.toLowerCase() ||
      search.to.toLowerCase().includes(f.to.toLowerCase());
    const typeMatch = search.type ? f.tripOptions[search.type].type === search.type : true;
    return fromMatch && toMatch && typeMatch;
  });

  if (!matches.length) {
    grid.innerHTML = "<p class='muted'>No flights found.</p>";
  } else {
    grid.innerHTML = matches
      .map(
        (f) => `
        <div class="flight-card">
          <div><strong>${f.airline}</strong> • ${f.flightNo}</div>
          <div>${f.from} → ${f.to}</div>
          <div>Depart: ${f.departTime}</div>
          ${
            search.type === "roundtrip" && f.tripOptions.roundtrip.returnTime
              ? `<div>Return: ${f.tripOptions.roundtrip.returnTime}</div>`
              : ""
          }
          <div>Price: $${f.tripOptions[search.type].price}</div>
          <button onclick="selectFlight(${f.id})" class="btn btn-primary">Select</button>
        </div>`
      )
      .join("");
  }

  window.selectFlight = (id) => {
    save("chosenFlight", id);
    location.href = "passenger.html";
  };
}

// PASSENGERS PAGE
if (document.body.classList.contains("page-passengers")) {
  const form = qs("#passengerForm");
  const list = document.createElement("div");
  list.id = "passengerList";
  form.insertAdjacentElement("afterend", list);

  const search = load("search");
  let passengers = load("passengers") || [];
  const requiredCount = search?.passengers || 1;

  const renderPassengers = () => {
    if (!passengers.length) {
      list.innerHTML = `<p class="muted">No passengers added yet.</p>`;
      return;
    }

    list.innerHTML = `
      <h3>Passengers Added (${passengers.length}/${requiredCount})</h3>
      ${passengers
        .map(
          (p, i) => `
        <div class="passenger-card">
          <p><strong>${p.fname} ${p.lname}</strong></p>
          <p>Email: ${p.email}</p>
          <p>Passport: ${p.passport}</p>
          <p>Nationality: ${p.nationality}</p>
          <button class="btn btn-small btn-danger" data-index="${i}">Delete</button>
        </div>`
        )
        .join("")}
    `;

    list.querySelectorAll(".btn-danger").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = btn.dataset.index;
        passengers.splice(idx, 1);
        save("passengers", passengers);
        renderPassengers();
      });
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const passenger = {
      fname: qs("#fname").value.trim(),
      lname: qs("#lname").value.trim(),
      email: qs("#email").value.trim(),
      passport: qs("#passport").value.trim(),
      nationality: qs("#nationality").value.trim(),
    };

    if (Object.values(passenger).some((v) => !v)) {
      alert("Please fill in all fields.");
      return;
    }

    passengers.push(passenger);
    save("passengers", passengers);
    form.reset();
    renderPassengers();

    if (passengers.length >= requiredCount) {
      alert("All passengers added. Proceeding to summary...");
      location.href = "summary.html";
    } else {
      const remaining = requiredCount - passengers.length;
      alert(`Passenger saved! Please add ${remaining} more.`);
    }
  });

  renderPassengers();
}

// SUMMARY PAGE
if (document.body.classList.contains("page-summary")) {
  const search = load("search");
  const chosenId = load("chosenFlight");
  const passengers = load("passengers") || [];
  const box = qs("#summaryBox");

  if (!search || !chosenId) {
    alert("Missing booking details.");
    location.href = "booking.html";
  }

  const flight = flightSchedules.find((f) => f.id === chosenId);
  box.innerHTML = `
    <p><strong>${flight.airline}</strong> — ${flight.from} → ${flight.to}</p>
    <p>Date: ${search.depart}</p>
    <p>Type: ${search.type}</p>
    <p>Price: $${flight.tripOptions[search.type].price}</p>
    <hr>
    <h3>Passengers (${passengers.length})</h3>
    <table class="passenger-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Passport</th>
          <th>Nationality</th>
        </tr>
      </thead>
      <tbody>
        ${passengers
          .map(
            (p, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${p.fname} ${p.lname}</td>
            <td>${p.email}</td>
            <td>${p.passport}</td>
            <td>${p.nationality}</td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;

  qs("#bookNow").addEventListener("click", () => {
    const ref = "AL" + Date.now();
    save("lastBooking", { ref, flight, passengers });
    clearAll();
    location.href = "success.html";
  });
}

// SUCCESS PAGE
if (document.body.classList.contains("page-success")) {
  const last = load("lastBooking");
  if (last) {
    qs("#confText").textContent = `Booking confirmed! Reference: ${last.ref} • ${last.flight.airline} ${last.flight.flightNo}`;
    localStorage.removeItem("lastBooking");
  }
}
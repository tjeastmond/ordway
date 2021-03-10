function charNumericPosition(str) {
  return str.charCodeAt(0) - 96;
}

function weight(row, col, rows, columns) {
  const c = Math.abs(Math.round(((col + 0.5) / columns - 0.5) * 50));
  const r = Math.round(((row + 1) / rows) * 50);
  return c + r;
}

// sort seats by weight
function sortAvailable(a, b) {
  if (a[1] > b[1]) return 1;
  if (a[1] < b[1]) return -1;

  // sort by seat position if weight is the same
  if (a[0] > b[0]) return -1;
}

// sort available seats by id
function sortAvailablePairs(a, b) {
  if (a[2] > b[2]) return 1;
  if (a[2] < b[2]) return -1;
  return 0;
}

// takes in sorted/weighted seats and finds best match if one exists
function pickSeats(seats, need = 1) {
  // console.log('seats:', seats);
  if (need === 1) return [seats[0][0]];

  const groupedSeats = [];

  // still has a bug in here for if row a is taken but row b is not
  for (let i = 0; i < seats.length - 1; i++) {
    if (!groupedSeats.length) {
      groupedSeats.push(seats[i]);
      continue;
    }

    let found = true;
    let skip = false;

    for (let j = 0; j < groupedSeats.length; j++) {
      skip = seats[i][0] === groupedSeats[j][0];
      if (!skip) {
        const diff = Math.abs(seats[i][2] - groupedSeats[j][2]);
        found = diff === 1;
        if (diff === 1) groupedSeats.push(seats[i]);
      }
    }

    if (!found && !skip) {
      groupedSeats.length = 0;
      groupedSeats.push(seats[i]);
    }

    if (groupedSeats.length === need) break;
  }

  return groupedSeats.length === need
    ? groupedSeats.sort(sortAvailablePairs).map(seat => seat[0])
    : [];
}

module.exports = function selectBestSeats(seatsData = {}, seatsNeeded = 1) {
  const { rows, columns } = seatsData.venue.layout;
  const available = seatsData.seats;
  const seats = [];

  for (id in available) {
    const seat = available[id];
    const rowNum = charNumericPosition(seat.row);
    seats.push([
      seat.id,
      weight(rowNum, seat.column, rows, columns),
      columns * (rowNum - 1) + seat.column,
    ]);
  }

  seats.sort(sortAvailable);

  return pickSeats(seats, seatsNeeded);
};

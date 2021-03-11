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

// takes in sorted/weighted seats and finds best match if one exists
function pickSeats(seats, need = 1) {
  if (need === 1) return [seats[0][0]];

  const findNearest = (currentGroup, remainingSeats) => {
    for (let i = 0; i < currentGroup.length; ++i) {
      const seatLoc = currentGroup[i][2];
      for (let j = 0; j < remainingSeats.length; ++j) {
        if (
          Math.abs(seatLoc - remainingSeats[j][2]) === 1 &&
          !currentGroup.includes(remainingSeats[j])
        ) {
          currentGroup.push(remainingSeats[j]);
          return currentGroup;
        }
      }
    }

    return currentGroup;
  };

  let group = [seats[0]];
  const seatsCopy = seats.slice(1);

  while (seatsCopy.length > 0) {
    let len = group.length;
    group = findNearest(group, seatsCopy);

    if (len === group.length) {
      const next = seatsCopy.shift();
      group.length = 0;
      group.push(next);
      continue;
    }

    seatsCopy.shift();

    if (group.length === need) {
      return group.map(seat => seat[0]).sort();
    }
  }

  return [];
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

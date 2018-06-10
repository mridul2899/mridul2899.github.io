let dice = 0, no_players = 4, player = 0, six_count = 0;

let position = ["bs1", "bs2", "bs3", "bs4", "gs1", "gs2", "gs3", "gs4", "ys1", "ys2", "ys3", "ys4", "rs1", "rs2", "rs3", "rs4"];
let b = [-1, -1, -1, -1], g = [-1, -1, -1, -1], y = [-1, -1, -1, -1], r = [-1, -1, -1, -1];
let b_active = 0, b_over = 0, y_active = 0, y_over = 0, r_active = 0, r_over = 0, g_active = 0, g_over = 0;
let players_f = ["b", "g", "y", "r"];

function roll() {
  if (player == 0) {
    document.getElementById("roll").style.backgroundColor = "blue";
  }
  else if (player == 1) {
    document.getElementById("roll").style.backgroundColor = "green";
  }
  else if (player == 2) {
    document.getElementById("roll").style.backgroundColor = "yellow";
  }
  else {
    document.getElementById("roll").style.backgroundColor = "red";
  }

  dice = Math.random() * 1000000;
  dice = Math.round(dice);
  dice = dice % 6 + 1;
  text = document.getElementById("input").value;
  if (Number(text) <= 6 && Number(text) >= 1) {
    dice = Number(text);
  }

  document.getElementById("roll").removeAttribute("onclick");
  document.getElementById("roll").style.cursor = "default";
  document.getElementById("dice").style.display = "block";
  let count = 0;
  if (dice == 1) {
    document.getElementById("dice").style.backgroundPosition = "-27px -67px";
  }
  else if (dice == 2) {
    document.getElementById("dice").style.backgroundPosition = "-122px -67px";
  }
  else if (dice == 3) {
    document.getElementById("dice").style.backgroundPosition = "-222px -67px";
  }
  else if (dice == 4) {
    document.getElementById("dice").style.backgroundPosition = "-27px -182px";
  }
  else if (dice == 5) {
    document.getElementById("dice").style.backgroundPosition = "-126px -182px";
  }
  else {
    document.getElementById("dice").style.backgroundPosition = "-222px -182px";
    for (let i = 1; i < 5; i++) {
      count++;
      let abc = document.getElementById(players_f[player] + "p" + i);
      let att = document.createAttribute("onclick");
      if ((player == 0 && b[i - 1] == 0) || (player == 1 && g[i - 1] == 0) || (player == 2 && y[i - 1] == 0) || (player == 3 && r[i - 1] == 0)) {
        att.value = 'play("' + abc.parentNode.id  + '", "' + abc.id + '")';
      }
      else {
        att.value = 'play("' + players_f[player] + '2", "' + abc.id + '")';
      }
      abc.setAttributeNode(att);
      abc.style.cursor = "pointer";
      abc.parentNode.style.backgroundColor = "gray";
      if ((Number(position[player * 4 + i - 1].slice(1)) < 0 && 6 + Number(position[player * 4 + i - 1].slice(1)) < dice) || position[player * 4 + i - 1].slice(1, 2) == "o") {
        count--;
        abc.removeAttribute("onclick");
        abc.style.cursor = "default";
        abc.parentNode.style.removeProperty("background-color");
      }
    }
  }
  if (dice != 6) {
    for (let i = 1; i < 5; i++) {
      if ((player == 0 && b[i - 1] == 0) || (player == 1 && g[i - 1] == 0) || (player == 2 && y[i - 1] == 0) || (player == 3 && r[i - 1] == 0)) {
        count++;
        let abc = document.getElementById(players_f[player] + "p" + i);
        let att = document.createAttribute("onclick");
        att.value = 'play("' + abc.parentNode.id  + '", "' + abc.id + '")';
        abc.setAttributeNode(att);
        abc.style.cursor = "pointer";
        abc.parentNode.style.backgroundColor = "gray";
        if (Number(position[player * 4 + i - 1].slice(1)) < 0 && 6 + Number(position[player * 4 + i - 1].slice(1)) < dice) {
          abc.removeAttribute("onclick");
          count--;
          abc.style.cursor = "default";
          abc.parentNode.style.removeProperty("background-color");
        }
      }
    }
  }
  if (count == 0) {
    let abc = document.getElementById("roll");
    let att = document.createAttribute("onclick");
    att.value = "roll()";
    abc.setAttributeNode(att);
    document.getElementById("roll").style.cursor = "pointer";
    player = (player + 1) % no_players;
  }
}

function play(piece, id) {
  let abc = document.getElementById("roll");
  let att = document.createAttribute("onclick");
  att.value = "roll()";
  abc.setAttributeNode(att);
  document.getElementById("roll").style.cursor = "pointer";
  for (let i = 1; i < 5; i++) {
    document.getElementById(id.slice(0, 2) + i).removeAttribute("onclick");
    document.getElementById(id.slice(0, 2) + i).style.cursor = "default";
    document.getElementById(id.slice(0, 2) + i).parentNode.style.removeProperty("background-color");
  }

  if (player == 0) {
    if (b[Number(id.slice(2)) - 1] != 0) {
      b[Number(id.slice(2)) - 1] = 0;
      b_active++;
    }
    else {
      if (piece.slice(1, 2) != "s") {
        for (let i = 0; i < dice; i++) {
          piece = change(piece, id);
        }
      }
    }
  }
  else if (player == 1) {
    if (g[Number(id.slice(2)) - 1] != 0) {
      g[Number(id.slice(2)) - 1] = 0;
      g_active++;
    }
    else {
      if (piece.slice(1, 2) != "s") {
        for (let i = 0; i < dice; i++) {
          piece = change(piece, id);
        }
      }
    }
  }
  else if (player == 2) {
    if (y[Number(id.slice(2)) - 1] != 0) {
      y[Number(id.slice(2)) - 1] = 0;
      y_active++;
    }
    else {
      if (piece.slice(1, 2) != "s") {
        for (let i = 0; i < dice; i++) {
          piece = change(piece, id);
        }
      }
    }
  }
  if (player == 3) {
    if (r[Number(id.slice(2)) - 1] != 0) {
      r[Number(id.slice(2)) - 1] = 0;
      r_active++;
    }
    else {
      if (piece.slice(1, 2) != "s") {
        for (let i = 0; i < dice; i++) {
          piece = change(piece, id);
        }
      }
    }
  }
  move(piece, id, 1);
  return piece;
}

function move(piece, id, check) {
  let num1 = 0;
  let num2 = Number(id.slice(2)) - 1;
  let alpha = id.slice(0, 1);
  if (alpha == "b") {
    num1 = 0;
  }
  else if (alpha == "g") {
    num1 = 1;
  }
  if (alpha == "y") {
    num1 = 2;
  }
  if (alpha == "r") {
    num1 = 3;
  }
  let num5 = 4 * num1 + num2;
  let itm = document.getElementById(id);
  let cln = itm.cloneNode(true);
  itm.parentNode.removeChild(itm);
  document.getElementById(piece).appendChild(cln);
  if (dice != 6 && check == 1) {
    player = (player + 1) % no_players;
  }
  let count = 0, cuts = 0;
  for (let i = 0; i < 16; i++) {
    if (i >= num1 * 4 && i < num1 * 4 + 4) {
      if (position[i] == piece) {
        count++;
      }
      continue;
    }
    if (position[i] == piece) {
      cuts++;
      let num3 = Math.floor(i / 4);
      let num4 = i % 4 + 1;
      let alpha = "a";
      if (num3 == 0) {
        alpha = "b";
        b_active--;
        b[num4 - 1] = -1;
      }
      else if (num3 == 1) {
        alpha = "g";
        g_active--;
        g[num4 - 1] = -1;
      }
      else if (num3 == 2) {
        alpha = "y";
        y_active--;
        y[num4 - 1] = -1;
      }
      else {
        alpha = "r";
        r_active--;
        r[num4 - 1] = -1;
      }
      move(alpha + "s" + num4, alpha + "p" + num4, 0);
    }
  }
  if (check == 1 && document.getElementById(position[num5]).childNodes[0]) {
    document.getElementById(position[num5]).removeChild(document.getElementById(position[num5]).lastChild);
  }
  if (cuts > 0 && dice != 6) {
    player = (player - 1) % 4;
    if (player == -1) {
      player = 3;
    }
  }
  position[num5] = piece;
  while (cuts > 1) {
    document.getElementById(position[num5]).removeChild(document.getElementById(position[num5]).firstChild);
    cuts--;
  }
  if (count > 0 && check == 1) {
    var multiple = document.createElement("P");
    var textnode = document.createTextNode("x" + (count + 1));
    multiple.appendChild(textnode);
    var parent = document.getElementById(id).parentNode;
    multiple.style.cssText = "position: absolute; margin: 8px;";
    parent.appendChild(multiple);
  }
  if (piece.slice(1, 2) == "o" && dice != 6) {
    player = (player - 1) % 4;
    if (player == -1) {
      player = 3;
    }
  }
  let win = document.getElementById("win");
  if (b_over == 4 || g_over == 4 || y_over == 4 || r_over == 4) {
    document.getElementById("roll").style.display = "none";
    document.getElementById("dice").style.display = "none";
    document.getElementsByClassName("input")[0].style.display = "none";
    document.getElementById("input").style.display = "none";
    document.getElementById("again").style.display = "block";
    win.style.display = "block";
  }
  if (b_over == 4) {
    win.innerHTML = "Blue Wins!";
    win.style.color = "blue";
  }
  else if (g_over == 4) {
    win.innerHTML = "Green Wins!";
    win.style.color = "green";
  }
  else if (y_over == 4) {
    win.innerHTML = "Yellow Wins!";
    win.style.color = "darkorange";
  }
  else if (r_over == 4) {
    win.innerHTML = "Red Wins!";
    win.style.color = "red";
  }
}

function change(piece, id) {
  if (piece.slice(1, 2) != "s") {
    if (Number(piece.slice(1)) == -5) {
      if (player == 0) {
        b_over++;
        b_active--;
        b[Number(id.slice(2)) - 1] = 1;
        piece = "bo" + b_over;
      }
      else if (player == 1) {
        g_over++;
        g_active--;
        g[Number(id.slice(2)) - 1] = 1;
        piece = "go" + g_over;
      }
      else if (player == 2) {
        y_over++;
        y_active--;
        y[Number(id.slice(2)) - 1] = 1;
        piece = "yo" + y_over;
      }
      else {
        r_over++;
        r_active--;
        r[Number(id.slice(2)) - 1] = 1;
        piece = "ro" + r_over;
      }
    }
    else if (piece == "b0" && id.slice(0, 1) == "b") {
      piece = "b-1";
    }
    else if (piece == "r0" && id.slice(0, 1) == "r") {
      piece = "r-1";
    }
    else if (piece == "g0" && id.slice(0, 1) == "g") {
      piece = "g-1";
    }
    else if (piece == "y0" && id.slice(0, 1) == "y") {
      piece = "y-1";
    }
    else if (piece == "b12") {
      piece = "g0";
    }
    else if (piece == "g12") {
      piece = "y0";
    }
    else if (piece == "y12") {
      piece = "r0";
    }
    else if (piece == "r12") {
      piece = "b0";
    }
    else if (Number(piece.slice(1)) < 0) {
      piece = piece.slice(0, 1) + (Number(piece.slice(1)) - 1);
    }
    else {
      piece = piece.slice(0, 1) + (Number(piece.slice(1)) + 1);
    }
  }
  return piece;
}

function reset() {
  b_active = 0, b_over = 0, y_active = 0, y_over = 0, r_active = 0, r_over = 0, g_active = 0, g_over = 0;
  for (var i = 1; i < 5; i++) {
    move("bs" + i, "bp" + i, 0);
    move("gs" + i, "gp" + i, 0);
    move("ys" + i, "yp" + i, 0);
    move("rs" + i, "rp" + i, 0);
  }
  dice = 0, player = 0, six_count = 0;
  position = ["bs1", "bs2", "bs3", "bs4", "gs1", "gs2", "gs3", "gs4", "ys1", "ys2", "ys3", "ys4", "rs1", "rs2", "rs3", "rs4"];
  b = [-1, -1, -1, -1], g = [-1, -1, -1, -1], y = [-1, -1, -1, -1], r = [-1, -1, -1, -1];
  document.getElementById("roll").style.display = "block";
  document.getElementsByClassName("input")[0].style.removeProperty("display");
  document.getElementById("input").style.removeProperty("display");
  document.getElementById("again").style.display = "none";
  document.getElementById("win").style.display = "none";
  document.getElementById("input").value = "";
}

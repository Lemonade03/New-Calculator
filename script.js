let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";

function processPercent(expr) {
  // cari setiap pola angka%
  return expr.replace(/(\d+(?:\.\d+)?)%/g, (match, p1, offset) => {
    let number = parseFloat(p1);

    // cari operator sebelum %
    let before = expr.slice(0, offset);
    let lastOp = before.match(/[-+*/](?=[^-\+*/]*$)/);

    if (lastOp) {
      let op = lastOp[0];
      let base = parseFloat(before.split(/[-+*/](?=[^-\+*/]*$)/)[0]);

      if (op === '+' || op === '-') {
        // contoh: 200 + 10% → 200 + (200*10/100)
        return (base * number / 100).toString();
      } else if (op === '*') {
        // contoh: 200 * 10% → 200 * (10/100)
        return (number / 100).toString();
      } else if (op === '/') {
        // contoh: 200 / 10% → 200 / (10/100)
        return (number / 100).toString();
      }
    }

    // fallback: anggap % jadi /100
    return (number / 100).toString();
  });
}

buttons.forEach(btn => {
  btn.addEventListener('click', e => {
    const display = e.target.innerHTML;
    const value = e.target.dataset.value ?? display;

    if (display === '=') {
      try {
        let expr = string;
        // proses semua persen jadi ekspresi angka valid
        expr = processPercent(expr);
        string = eval(expr).toString();
        input.value = string;
      } catch {
        input.value = 'Error';
        string = "";
      }
    } else if (display === 'AC') {
      string = "";
      input.value = "";
    } else if (display === 'DEL') {
      string = string.slice(0, -1);
      input.value = input.value.slice(0, -1);
    } else {
      string += value;
      input.value += display;
    }
  });
});

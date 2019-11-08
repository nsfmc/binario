import React from "react";
import range from "lodash.range";
import "./App.css";

function App() {
  const [rows, setRows] = React.useState(5);
  const [values, setValues] = React.useState(Array(rows).map(x => 0));
  React.useEffect(() => {
    setValues(vals => {
      vals.length = rows;
      vals.map(x => (x ? x : 0));
      return vals;
    });
  }, [rows]);
  return (
    <div className="App">
      <header className="App-header">
        <div className="row-row">
          <button onClick={() => setRows(rows => rows - 1)}>-</button> rows{" "}
          <button onClick={() => setRows(rows => rows + 1)}>+</button>
        </div>

        {range(rows).map((_val, idx) => {
          const val = values[idx] || 0;

          return (
            <div className="bitrow" key={idx}>
              <span>{val > 0 ? String.fromCharCode(64 + val) : "_"}</span>

              <BinBlock
                bits={5}
                value={val}
                onChange={newVal =>
                  setValues(prev => {
                    let next = [...prev];
                    next.splice(idx, 1, newVal);
                    return next;
                  })
                }
              />
            </div>
          );
        })}
      </header>
    </div>
  );
}

function BinBlock(props) {
  const { bits = 1, onChange, value } = props;
  const bitmaskFromValue = val =>
    val
      .toString(2)
      .padStart(bits, "0")
      .split("")
      .reverse()
      .map(b => b === "1");

  const flipNthBit = (value, bit) => {
    const mask = bitmaskFromValue(value);
    const nextBit = !mask[bit];
    mask.splice(bit, 1, nextBit);
    const newValue = mask.reduce((prev, curr, idx) => {
      return prev + (curr ? Math.pow(2, idx) : 0);
    }, 0);

    return newValue;
  };
  const data = bitmaskFromValue(value);

  return (
    <div className="binblock">
      {range(bits).map((_, index) => {
        return (
          <div
            key={index}
            className={["block", data[index] ? "active" : null]
              .filter(Boolean)
              .join(" ")}
            onClick={() => {
              onChange(flipNthBit(value, index));
            }}
          ></div>
        );
      })}
    </div>
  );
}

export default App;

import "./table.scss";
import "./test.scss";

type dataInterface = {
  id: number;
  name: string;
};

// eslint-skip-next-line
const Table = ({ data }: { data: dataInterface[] }) => (
  <table className="table">
    <thead>
      <tr className="header">
        {Object.keys(data[0]).map((key) => (
          <th key={key}>{key}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {Object.values(row).map((value, colIndex) => (
            <td key={colIndex} className="cell">
              {value as string}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;

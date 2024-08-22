import "./App.css";
import AssetTable from "./jsx/assetTable";
import DataTable from "./jsx/data";

function App() {
  return (
    <>
      <div>
        <DataTable />
      </div>
      <div className="App">
        <h1>Asset Management</h1>
        <AssetTable />
      </div>
    </>
  );
}

export default App;

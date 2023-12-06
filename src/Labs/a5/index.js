import EncodingParametersInURLs from "./EncodingParametersInURLs";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithArrays from "./WorkingWithArrays";

function Assignment5() {
  const API_BASE = process.env.REACT_APP_API_BASE.slice(0, -4);
  return (
    <div style={{ margin: "16px" }}>
      <h1>Assignment 5</h1>
      <div className="list-group">
        <a href={`${API_BASE}/a5/welcome`}
          className="list-group-item">
          Welcome
        </a>
      </div>
      <hr />
      <WorkingWithArrays />
      <hr />
      <WorkingWithObjects />
      <hr />
      <EncodingParametersInURLs />
      <hr />
      {/* <SimpleAPIExamples /> */}
    </div>
  );
}
export default Assignment5;
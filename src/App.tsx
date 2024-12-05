import Form from "./components/Form";

function App() {
  return (
    <>
      <div className="container">
        <div className="cards">
          <div className="card first-card">
            <h2 className="card-title">clima</h2>
            <Form />
          </div>
          <div className="card second-card">
            <section></section>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

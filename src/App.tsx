import Form from "./components/Form";

function App() {
  return (
    <>
      <div className="container">
        <div className="cards">
          <div className="card first-card">
            <section>
              <h2 className="card-title">clima</h2>
              <Form />
            </section>
            <section className="card-info">
              <p className="first-p-footer">
                &copy; {new Date().getFullYear()} Gadiel Monteabaro
              </p>
              <a
                href="https://github.com/Gadiel-Monteabaro/clima-app"
                className="link-git"
                target="_blank"
              >
                <i className="ri-github-fill">GitHub</i>
              </a>
            </section>
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

import "@sakun/system.css/style.css";
import "./App.css";
import { useStore, B2FCatalog, B2FTitle } from "./Store";
import { useRef } from "react";

function App() {
  const { movies, updateMovies, checkout, removeMovieByName, submitForm } =
    useStore((state) => state);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const uniqMovies = [...new Set(movies)];

  const {
    b2FMoviesPrice,
    currentReduction,
    otherMoviesPrice,
    totalWithReduction,
  } = checkout();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value.length) {
      submitForm(inputRef.current.value);
      inputRef.current.value = "";
    } else {
      alert("Nom de film(s) invalide(s) !");
    }
  };

  return (
    <>
      <div className="container" style={{ padding: "1rem", paddingTop: 0 }}>
        <h2 className="subheading">Forward to the Past 🚀</h2>
        <div
          style={{ display: "flex", gap: "1rem" }}
          className="flexDirectionColumnOnMd"
        >
          {/**
           * DvdTheque
           */}
          <div className="window scale-down" style={{ margin: 0, flexGrow: 1 }}>
            <div className="title-bar">
              <h1 className="title">Catalogue 📔</h1>
            </div>
            <div className="separator"></div>

            <div
              className="flexDirectionColumnOnMd gap2onMd"
              style={{
                padding: "1rem",
                flexDirection: "row",
                display: "flex",
                gap: "2rem",
                justifyContent: "space-between",
              }}
            >
              {B2FCatalog.map((e, i) => (
                <div
                  key={`product_${i}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    flexGrow: "1",
                  }}
                >
                  <div
                    style={{
                      flexGrow: 1,
                      padding: "1rem",
                      border: "1px solid var(--sys-color-black)",
                      borderRadius: "0",
                      maxHeight: "15rem",
                    }}
                  >
                    <img
                      src={e.cover}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "inherit",
                        objectFit: "contain",
                        borderRadius: "0",
                      }}
                      width="100%"
                    />
                  </div>
                  <div>{e.name}</div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem",
                      borderRadius: "0",
                      border: "1px solid var(--sys-color-black)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <button
                        className="btn"
                        disabled={
                          movies.filter((e) => e === `${B2FTitle} ${i + 1}`)
                            .length === 0
                        }
                        onClick={() => {
                          removeMovieByName(e.name);
                        }}
                      >
                        -
                      </button>
                      <button
                        className="btn"
                        onClick={() => {
                          updateMovies([...movies, `${B2FTitle} ${i + 1}`]);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div>
                      <small>
                        <span style={{ fontStyle: "italic" }}>
                          {movies.filter((c) => c === `${e.name}`).length}
                        </span>
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form
              className="field-row flexDirectionColumnOnMd"
              style={{
                padding: "1rem",
                justifyContent: "center",
                gap: "0.5rem",
                display: "flex",
              }}
              {...{ onSubmit }}
            >
              <textarea
                placeholder="Autres titres (séparés par des sauts de ligne)"
                ref={inputRef}
                style={{
                  width: "100%",
                  minHeight: "5rem",
                  borderColor: "color: var(--sys-color-black)",
                }}
              />
              <button className="btn" type="submit">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span>Ajouter</span> <span>➕</span>
                </div>
              </button>
            </form>
          </div>
          {/**
           * Panier
           */}
          {uniqMovies.length ? (
            <div className="window scale-down" style={{ margin: 0 }}>
              <div className="title-bar">
                <h1 className="title">Panier 🛒</h1>
              </div>
              <div className="separator"></div>

              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {uniqMovies.map((e, i) => (
                  <li key={`movies_${i}`}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                      }}
                    >
                      <div>
                        {e}{" "}
                        <small>
                          <span style={{ fontStyle: "italic" }}>
                            x {movies.filter((g) => g === e).length}
                          </span>
                        </small>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                        }}
                      >
                        <button
                          className="btn"
                          onClick={() => {
                            removeMovieByName(e);
                          }}
                        >
                          -
                        </button>
                        <button
                          className="btn"
                          onClick={() => {
                            updateMovies([...movies, `${e}`]);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {movies.length ? (
                <>
                  <div className="separator"></div>
                  <div>
                    <ul
                      style={{
                        listStyle: "none",
                        margin: 0,
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      {b2FMoviesPrice > 0 ? (
                        <li>{`DVD B2F: ${b2FMoviesPrice} euros ${
                          currentReduction > 0 ? `- ${currentReduction} ％` : ``
                        }`}</li>
                      ) : null}

                      {otherMoviesPrice > 0 ? (
                        <li>{`Autres DVD: ${otherMoviesPrice} euros`}</li>
                      ) : null}
                      <li>{`Total: ${totalWithReduction} euros`}</li>
                    </ul>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                        padding: "1rem",
                      }}
                    >
                      <button
                        className="btn"
                        onClick={() => {
                          updateMovies([]);
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <span>Vider le panier</span> <span>🗑️</span>
                        </div>
                      </button>
                      <button
                        className="btn"
                        onClick={() => {
                          console.log({
                            checkout: checkout(),
                          });
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <span>Commander</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    let response = await api.post("/repositories", 
    { 
      title: `New Repo ${new Date()}`,
      url: "http://example.com",
      techs: ['ReactJS']
    })
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    let response = await api.delete(`/repositories/${id}`);
    if (response.status === 204) {
      let newRepositories = repositories.filter(repo => repo.id !== id);
      setRepositories([...newRepositories]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

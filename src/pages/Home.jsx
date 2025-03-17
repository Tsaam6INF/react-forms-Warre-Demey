import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const apiEndPoint = "https://api-o0p6.onrender.com/api/user";

function Home() {
  const [posts, setPosts] = useState([]); // Array om de gebruikers op te slaan
  const [formData, setFormData] = useState({
    first_name: "",  // Voornaam van de nieuwe gebruiker
    last_name: "",   // Achternaam van de nieuwe gebruiker
    login: "",       // Login van de nieuwe gebruiker
    password: "",    // Wachtwoord van de nieuwe gebruiker
  });

  // Haal de gebruikerslijst op wanneer de component geladen wordt
  useEffect(() => {
    axios.get(apiEndPoint)
      .then(({ data }) => {
        // Controleer of 'data.data' een array is en zet deze in de state
        if (Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          console.error("Fout: Onverwachte API-respons", data);
        }
      })
      .catch((error) => {
        console.error("Er is een fout opgetreden bij het ophalen van de gegevens:", error);
      });
  }, []);

  // Functie om formuliergegevens bij te werken
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Functie om een nieuwe gebruiker toe te voegen
  const handleAdd = () => {
    // Controleren of alle velden zijn ingevuld
    if (!formData.first_name || !formData.last_name || !formData.login || !formData.password) {
      alert("Vul alle velden in!");
      return;
    }

    // Voeg nieuwe gebruiker toe via een POST-aanroep
    axios.post(apiEndPoint, formData)
      .then(({ data }) => {
        // Voeg de nieuwe gebruiker toe aan de lijst van bestaande gebruikers
        setPosts([...posts, data.data]); 
        // Reset formulier na toevoegen van gebruiker
        setFormData({ first_name: "", last_name: "", login: "", password: "" });
      })
      .catch((error) => {
        console.error("Er is een fout opgetreden bij het toevoegen van de gebruiker:", error);
      });
  };

  return (
    <div>
      <h2>Gebruikerslijst:</h2>
      {/* Controleer of de 'posts' array leeg is voordat we proberen te itereren */}
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.user_id}>
            <span>{post.first_name} {post.last_name} ({post.login})</span>
            {/* Link naar de EditUser pagina om de gebruiker te bewerken */}
            <Link to={`/edit/${post.user_id}`}>Bewerken</Link>
          </div>
        ))
      ) : (
        <p>Geen gebruikers gevonden.</p>
      )}

      <h3>Voeg nieuwe gebruiker toe:</h3>
      {/* Formulier voor het toevoegen van een nieuwe gebruiker */}
      <input
        type="text"
        name="first_name"
        placeholder="Voornaam"
        value={formData.first_name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="last_name"
        placeholder="Achternaam"
        value={formData.last_name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="login"
        placeholder="Login"
        value={formData.login}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Wachtwoord"
        value={formData.password}
        onChange={handleChange}
      />
      <button onClick={handleAdd}>Voeg toe</button>
    </div>
  );
}

export default Home;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const apiEndPoint = "https://api-o0p6.onrender.com/api/user";

function EditUser() {
  const { id } = useParams(); // Haal de user_id op uit de URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  useEffect(() => {
    console.log("ID uit useParams:", id);  // Log de id om te controleren of het goed wordt opgehaald

    // Haal de gegevens van de gebruiker op op basis van user_id
    if (id) {
      axios.get(`${apiEndPoint}/${id}`).then(({ data }) => {
        console.log("API respons:", data);  // Log de data die van de API komt

        // Controleer of de juiste gegevens worden ontvangen
        if (data && data.data && data.data.length > 0) {
          const user = data.data[0]; // Gebruiker is een array
          setFormData({
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            password: user.password,
          });
        } else {
          console.error("Fout: Geen geldige gegevens ontvangen van de server.");
        }
      }).catch(error => {
        console.error("Fout bij ophalen van gegevens:", error);
      });
    }
  }, [id]); // We kijken naar de 'id' als dependency

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Controleer of alle velden zijn ingevuld
    if (!formData.first_name || !formData.last_name || !formData.password) {
      alert("Vul alle velden in!");
      return;
    }

    console.log("Form data voor update:", formData); // Log de formData voor debugging

    // PUT-aanroep om de gebruiker bij te werken
    axios
      .put(`${apiEndPoint}`, formData) // We sturen formData naar de API
      .then(() => {
        console.log("Gebruiker succesvol bijgewerkt:", formData);
        // Navigeren terug naar de homepagina na succesvolle bewerking
        navigate("/");
      })
      .catch((error) => {
        console.error("Fout bij het bijwerken van gebruiker:", error);
      });
  };

  return (
    <div>
      <h2>Bewerk Gebruiker</h2>
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
        type="password"
        name="password"
        placeholder="Wachtwoord"
        value={formData.password}
        onChange={handleChange}
      />
      <button onClick={handleSave}>Opslaan</button>
    </div>
  );
}

export default EditUser;

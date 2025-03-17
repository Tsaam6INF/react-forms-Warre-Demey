import { useState, useEffect } from "react";
import GetData from "./components/GetData";
import axios from "axios";

const apiEndPoint = "https://api-o0p6.onrender.com/api/user";

function App() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    user_id: null, // Nodig voor updates
    first_name: "",
    last_name: "",
    login: "",
    password: "",
  });
  const [editingUser, setEditingUser] = useState(false);

  useEffect(() => {
    axios
      .get(apiEndPoint)
      .then(({ data }) => {
        console.log("✅ Data geladen:", data);
        setPosts(data.data);
      })
      .catch((error) => console.error("❌ GET Error:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.first_name || !formData.last_name || !formData.login || !formData.password) {
      alert("Vul alle velden in!");
      return;
    }

    if (editingUser) {
      // **UPDATE - ID in de body meegeven**
      console.log("🔄 Updaten:", apiEndPoint, formData);
      axios
        .put(apiEndPoint, formData) // ID in de body, niet in de URL!
        .then(({ data }) => {
          console.log("✅ Update succesvol:", data);
          setPosts(posts.map((post) => (post.user_id === formData.user_id ? data : post)));
          setEditingUser(false);
          setFormData({ user_id: null, first_name: "", last_name: "", login: "", password: "" });
        })
        .catch((error) => console.error("❌ PUT Error:", error.response?.data || error));
    } else {
      // **TOEVOEGEN**
      axios
        .post(apiEndPoint, formData)
        .then(({ data }) => {
          console.log("✅ Toegevoegd:", data);
          setPosts([...posts, data]);
          setFormData({ user_id: null, first_name: "", last_name: "", login: "", password: "" });
        })
        .catch((error) => console.error("❌ POST Error:", error.response?.data || error));
    }
  };

  const handleEdit = (post) => {
    console.log("✏️ Bewerken gebruiker:", post);
    setFormData({
      user_id: post.user_id,
      first_name: post.first_name || "",
      last_name: post.last_name || "",
      login: post.login || "",
      password: post.password || "", // Wachtwoord wordt nu ook ingevuld
    });
    setEditingUser(true);
  };

  return (
    <>
      <h1>{editingUser ? "Gebruiker Bewerken" : "Gebruiker Toevoegen"}</h1>
      <input type="text" name="first_name" placeholder="Voornaam" value={formData.first_name} onChange={handleChange} />
      <input type="text" name="last_name" placeholder="Achternaam" value={formData.last_name} onChange={handleChange} />
      <input type="text" name="login" placeholder="Loginnaam" value={formData.login} onChange={handleChange} />
      <input type="password" name="password" placeholder="Wachtwoord" value={formData.password} onChange={handleChange} />
      <button type="button" onClick={handleSave}>{editingUser ? "Opslaan" : "Voeg Toe"}</button>

      <GetData posts={posts} onEdit={handleEdit} />
    </>
  );
}

export default App;

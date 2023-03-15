import React from "react";

export const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/login", formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <label>
      Username:
      <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
    </label>
    <label>
      Password:
      <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
    </label>
    <label>
      Repeat Password:
      <input type="password" name="repeat-password" value={formData.password} onChange={handleInputChange} />
    </label>
    <button type="submit">Sign Up</button>
  </form>
);
}

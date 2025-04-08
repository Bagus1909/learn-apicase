import React, { useState, useEffect } from "react";
import ApiServiceCRUD from "./api/apiServices";

const UserForm = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ id: null, title: "", body: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    ApiServiceCRUD.getAllPosts
      .request()
      .then((response) => {
        setUsers(response.body);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addUser = () => {
    if (!formData.title || !formData.body) return alert("Judul & Isi harus diisi!");

    ApiServiceCRUD.createPost
      .request({
        body: { title: formData.title, body: formData.body, userId: 1 },
      })
      .then((response) => {
        setUsers([...users, response.body]);
        resetForm();
      });
  };

  const editUser = (user) => {
    setIsEditing(true);
    setFormData(user);
  };

  const saveUser = () => {
    ApiServiceCRUD.updatePost
      .request({
        params: { id: formData.id },
        body: { title: formData.title, body: formData.body, userId: 1 },
      })
      .then((response) => {
        setUsers(users.map((user) => (user.id === formData.id ? response.body : user)));
        setIsEditing(false);
        resetForm();
      });
  };

  const deleteUser = (id) => {
    ApiServiceCRUD.deletePost.request({ params: { id } }).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  const resetForm = () => {
    setFormData({ id: null, title: "", body: "" });
    setIsEditing(false);
  };

  return (
    <div>
      <h2>{isEditing ? "Edit User" : "Tambah User"}</h2>
      <input
        type='text'
        name='title'
        placeholder='Judul'
        value={formData.title}
        onChange={handleChange}
      />
      <input
        type='text'
        name='body'
        placeholder='Isi'
        value={formData.body}
        onChange={handleChange}
      />
      {isEditing ? <button onClick={saveUser}>Simpan</button> : <button onClick={addUser}>Tambah</button>}

      <h2>Daftar User</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id}. {user.title} - {user.body}
            <button onClick={() => editUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserForm;

import { apicase } from "@apicase/core";
import fetch from "@apicase/adapter-fetch";
import { useState, useEffect } from "react";

function App() {
  // const [pokemon, setPokemon] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const doRequest = apicase(fetch);

  // const fetchPokemons = async () => {
  //   try {
  //     const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  //     const data = await response.json();
  //     setPokemon(data.results);
  //     console.log(data.results);
  //   } catch (error) {
  //     console.log("Error fetch api: ", error);
  //   }
  // };

  const apicaseGetPosts = async () => {
    try {
      const response = await doRequest({
        url: "https://jsonplaceholder.typicode.com/posts",
        mode: "cors",
      });

      if (response.error) {
        throw new Error(`HTTP error! ${response.error.message}`);
      }

      const data = await response.result.body;
      // setPokemon(data);
      setPosts(data);
    } catch (error) {
      console.log("error fetch api", error);
    }
  };

  useEffect(() => {
    // fetch("https://pokeapi.co/api/v2/pokemon")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data.results);
    //   });

    // fetchPokemons();
    apicaseGetPosts();
  }, []);

  const handleAddPosts = async () => {
    setLoading(true);
    try {
      const response = await doRequest({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "POST",
        mode: "cors",
        body: {
          title: "Baru",
          body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur, ipsum porro blanditiis commodi tempore alias reiciendis aspernatur maiores doloribus sapiente omnis debitis reprehenderit iure animi rerum eveniet laboriosam neque esse molestiae at sunt quas. Error eos modi sed quaerat sunt beatae, quae eum nobis animi! Quae sint omnis beatae doloribus eius facere odio, optio, debitis praesentium fugiat, voluptatibus esse magni. Molestiae doloribus praesentium sit optio laborum blanditiis consequatur exercitationem nesciunt amet cupiditate incidunt inventore impedit id a reiciendis at nihil, voluptates error voluptas reprehenderit eaque. Qui fuga placeat adipisci impedit veritatis! Hic placeat, dolorem debitis atque dicta quo. Exercitationem, voluptatem?",
          userId: 1,
        },
      });

      if (response.error) {
        throw new Error(`HTTP error! ${response.error.message}`);
      }
      console.log("Full Response:", response);

      const data = await response.result.body;
      setPosts((prev) => [...prev, data]);
      console.log("Data:", data);
    } catch (error) {
      console.log("error fetch api", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePost = async (id) => {
    setLoading(true);

    try {
      const response = await doRequest({
        url: `https://jsonplaceholder.typicode.com/posts/${id}`,
        method: "PUT",
        mode: "cors",
        body: {
          title: "Baru",
          body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur, ipsum porro blanditiis commodi tempore alias reiciendis aspernatur maiores doloribus sapiente omnis debitis reprehenderit iure animi rerum eveniet laboriosam neque esse molestiae at sunt quas. Error eos modi sed quaerat sunt beatae, quae eum nobis animi! Quae sint omnis beatae doloribus eius facere odio, optio, debitis praesentium fugiat, voluptatibus esse magni. Molestiae doloribus praesentium sit optio laborum blanditiis consequatur exercitationem nesciunt amet cupiditate incidunt inventore impedit id a reiciendis at nihil, voluptates error voluptas reprehenderit eaque. Qui fuga placeat adipisci impedit veritatis! Hic placeat, dolorem debitis atque dicta quo. Exercitationem, voluptatem?",
          userId: 1,
        },
      });

      if (response.error) {
        throw new Error(`HTTP error! ${response.error.message}`);
      }

      const data = await response.result.body;
      setPosts((prev) => prev.map((post) => (post.id === id ? data : post)));
    } catch (error) {
      console.log("error fetch api", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    setLoading(true);
    try {
      const response = await doRequest({
        url: `https://jsonplaceholder.typicode.com/posts/${id}`,
        method: "DELETE",
        mode: "cors",
      });

      if (response.error) {
        throw new Error(`HTTP error! ${response.error.message}`);
      }

      setPosts((prev) => prev.filter((post) => post.id !== id));

      console.log("Deleted post ID:", id);
    } catch (error) {
      console.log("error fetch api", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='app'>
      <h1>Posts</h1>
      {/* <p>Sementara cek di console.</p> */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>
              {post.id} {post.title} {post.body}
              <button onClick={() => handleUpdatePost(post.id)}>edit</button>
              <button onClick={() => handleDeletePost(post.id)}>delete</button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleAddPosts}>Add Posts</button>
    </div>
  );
}

export default App;

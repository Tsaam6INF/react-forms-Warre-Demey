export default function GetData({ posts, onEdit }) {
    return (
      <>
        <h1>Gebruikers</h1>
        {posts.map((post) => (
          <div key={post.user_id} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <h2>{post.first_name} {post.last_name} - {post.login}</h2>
            <button onClick={() => onEdit(post)}>Bewerk</button>
          </div>
        ))}
      </>
    );
  }
  
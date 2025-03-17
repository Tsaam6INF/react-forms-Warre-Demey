export default function Post({ post }) {
    return (
      <>
        <div className="post-layout">
          <span className="post">{post.title}</span>
        </div>
      </>
    );
  }
  
import type { FunctionComponent } from "react";

const CommentSection: FunctionComponent = () => {
  return (
    <div>
      <p>Comments</p>
      <input type="text" />
      <button>Send</button>
      <div>
        <p>Anonymous says...</p>
        <p>lorem ipsum</p>
      </div>
      <script src="comment.js"></script>
    </div>
  );
};

export default CommentSection;
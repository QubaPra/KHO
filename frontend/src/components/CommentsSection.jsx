import { useState, useEffect } from "react";
import axios from "../api/axios";

function CommentsSection({ comments, user, trialId }) {
  const [formattedComments, setFormattedComments] = useState([]);

  useEffect(() => {
    const formatComments = comments.map((comment) => {
      const formattedDate = new Intl.DateTimeFormat("pl-PL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(comment.created_date));
      return {
        ...comment,
        created_date: formattedDate,
        user: comment.user === user.full_name ? "Ty" : comment.full_name,
      };
    });
    setFormattedComments(formatComments);
  }, [comments]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const payload = {
          content: newComment,
          trial: trialId,
        };
        console.log("Wysyłany JSON (handleAddComment):", payload);
        const response = await axios.post("/comments/", payload);
        console.log("Odpowiedź z API (handleAddComment):", response.data);

        const newCommentData = {
          ...response.data,
          created_date: new Intl.DateTimeFormat("pl-PL", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(new Date(response.data.created_date)),
          user:
            user && response.data.user === user.full_name
              ? "Ty"
              : response.data.user,
        };

        setFormattedComments([...formattedComments, newCommentData]);
        setNewComment("");
      } catch (error) {
        console.error("Błąd podczas dodawania komentarza:", error);
      }
    }
  };

  useEffect(() => {
    const textareas = document.querySelectorAll(".auto-resize-textarea");
    textareas.forEach((textarea) => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    });
  });

  return (
    <div className="space-y-6 mt-12">
      <div className="flex items-center space-x-1.5 text-xl mb-4">
        <span className="material-symbols-outlined ">chat</span>
        <span className="text-xl font-medium">Komentarze</span>
      </div>
  
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {formattedComments.map((comment, index) => (
          <div key={index} className="space-y-1 w-fit">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {comment.created_date}
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p className="font-medium">{comment.user}:</p>
              <p className="whitespace-pre-wrap">{comment.content}</p>
            </div>
          </div>
        ))}
        
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center space-x-2">
            <textarea
              className="auto-resize-textarea border-gray-200 dark:border-gray-700"
              placeholder="Twój komentarz"
              rows={1}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button
              className="material-symbols-outlined text-blue-600 hover:text-blue-800"
              onClick={handleAddComment}
            >
              send
            </button>
          </div>
        </div>
    </div>
  );
}

export default CommentsSection;

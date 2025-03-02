// Şərhləri localStorage-da saxlayırıq
const saveCommentsToLocalStorage = (comments) => {
    localStorage.setItem("comments", JSON.stringify(comments));
  };
  
  // Şərhləri oxumaq
  const getCommentsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("comments")) || [];
  };
  
  // Şərhi silmək
  const deleteCommentFromLocalStorage = (commentId) => {
    const comments = getCommentsFromLocalStorage();
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    saveCommentsToLocalStorage(updatedComments);
  };
  
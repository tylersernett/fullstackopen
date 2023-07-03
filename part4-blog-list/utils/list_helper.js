const dummy = (blogs) => {
  // ...
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total += blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((maxLikedBlog, currentBlog) => {
    if (currentBlog.likes > maxLikedBlog.likes) {
      return currentBlog
    }
    return maxLikedBlog
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
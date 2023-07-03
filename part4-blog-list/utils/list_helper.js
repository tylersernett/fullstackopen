const _ = require('lodash');

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null; // Return null if the input array is empty
  }

  const blogCounts = _.countBy(blogs, 'author');
  const topAuthor = _.maxBy(_.toPairs(blogCounts), _.last);
  return { author: topAuthor[0], blogs: topAuthor[1] };
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
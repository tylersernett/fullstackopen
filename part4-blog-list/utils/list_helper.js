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

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null; // Return null if the input array is empty
  }

  const likesByAuthor = _.groupBy(blogs, 'author');

  const authorLikes = _.map(likesByAuthor, (blogs, author) => {
    const totalLikes = _.sumBy(blogs, 'likes');
    return { author, likes: totalLikes };
  });

  const topAuthor = _.maxBy(authorLikes, 'likes');
  return topAuthor;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
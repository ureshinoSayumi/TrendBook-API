const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'comment can not be empty!']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      require: ['true', 'user must belong to a post.']
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      require: ['true', 'comment must belong to a post.']
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    image: String
  }
)
commentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name id createdAt image'
  })
  this.populate({
    path: 'likes',
    select: 'name id createdAt image'
  })
  next()
})
const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
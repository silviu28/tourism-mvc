const commentRouter = require('./comments');
const feedbackRouter = require('./feedback');
const priceRouter = require('./prices');
const userRouter = require('./users');
const imageRouter = require("./images");
const adminRouter = require("./admins");
const notificationCategoryRouter = require("./notificationCategories");
const notificationRouter = require("./notifications");
const blogPostsRouter = require("./blogPosts");
const wikiPostsRouter = require("./wikiPosts");
const testRouter = require("./tests");
const cookieRouter = require("./cookies");

export default function wholeRouting() {
  return [
    commentRouter,
    feedbackRouter,
    priceRouter,
    userRouter,
    imageRouter,
    adminRouter,
    notificationCategoryRouter,
    notificationRouter,
    blogPostsRouter,
    wikiPostsRouter,
    testRouter,
    cookieRouter
  ];
};
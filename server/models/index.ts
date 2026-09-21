import { Admin } from "./Admin";
import BlogLike from "./BlogLike";
import { BlogPost } from "./BlogPost";
import { BlogPostComment } from "./BlogPostComment";
import BlogPostCommentLike from "./BlogPostCommentLike";
import BrowserIdentifier from "./BrowserIdentifier";
import { Comment } from "./Comment";
import { Feedback } from "./Feedback";
import { Image } from "./Image";
import { Notification } from "./Notification";
import { NotificationCategory } from "./NotificationCategory";
import { Price } from "./Price";
import RefreshToken from "./RefreshToken";
import { User } from "./User";
import WikiPost from "./WikiPost";
import WikiPostCoauthor from "./WikiPostCoauthor";
import WikiPostContribution from "./WikiPostContribution";
import WikiPostLike from "./WikiPostLike";

export default function wholeSchema() {
  return [
    User,
    Comment,
    Price,
    Feedback,
    Admin,
    Image,
    NotificationCategory,
    Notification,
    BlogPost,
    BlogLike,
    BlogPostComment,
    BlogPostCommentLike,
    RefreshToken,
    WikiPost,
    WikiPostLike,
    WikiPostContribution,
    WikiPostCoauthor,
    BrowserIdentifier
  ];
};
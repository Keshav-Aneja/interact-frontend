import {
  Achievement,
  Application,
  Chat,
  Comment,
  Education,
  Event,
  EventBookmark,
  GroupChat,
  GroupChatMembership,
  GroupChatMessage,
  Invitation,
  Membership,
  Message,
  Opening,
  OpeningBookmark,
  Organization,
  OrganizationMembership,
  Post,
  PostBookmark,
  Profile,
  Project,
  ProjectBookmark,
  SubTask,
  Task,
  User,
} from '.';

export const initialEducation: Education = {
  university: '',
  degree: '',
  description: '',
};

export const initialAchievement: Achievement = {
  id: '',
  title: '',
  skills: [],
};

export const initialProfile: Profile = {
  id: '',
  userID: '',
  achievements: [],
  areasOfCollaboration: [],
  degree: '',
  description: '',
  hobbies: [],
  yearOfGraduation: 0,
  school: '',
  email: '',
  location: '',
  phoneNo: '',
};

export const initialUser: User = {
  id: '',
  tags: [],
  links: [],
  email: '',
  name: '',
  resume: '',
  profilePic: '',
  coverPic: '',
  username: '',
  phoneNo: '',
  bio: '',
  title: '',
  tagline: '',
  profile: initialProfile,
  followers: [],
  following: [],
  memberships: [],
  posts: [],
  projects: [],
  noFollowers: 0,
  noFollowing: 0,
  noImpressions: 0,
  noProjects: 0,
  noCollaborativeProjects: 0,
  active: true,
  isFollowing: false,
  isOnboardingComplete: false,
  passwordChangedAt: new Date(),
  lastViewed: [],
  isVerified: false,
  isOrganization: false,
  organization: null,
};

export const initialProject: Project = {
  id: '',
  slug: '',
  userID: '',
  title: '',
  tagline: '',
  coverPic: '',
  blurHash: '',
  description: '',
  page: '',
  user: initialUser,
  likedBy: [],
  comments: [],
  noLikes: 0,
  noShares: 0,
  noComments: 0,
  noImpressions: 0,
  createdAt: new Date(),
  tags: [],
  category: '',
  memberships: [],
  invitations: [],
  openings: [],
  chats: [],
  hashes: [],
  isPrivate: false,
  views: 0,
  totalNoViews: 0,
  privateLinks: [],
  links: [],
  noMembers: 1,
};

export const initialOpening: Opening = {
  id: '',
  projectID: '',
  project: initialProject,
  userID: '',
  user: initialUser,
  title: '',
  description: '',
  applications: [],
  noApplications: 0,
  noImpressions: 0,
  tags: [],
  active: false,
  createdAt: new Date(),
};

export const initialMembership: Membership = {
  id: '',
  projectID: '',
  project: initialProject,
  userID: '',
  user: initialUser,
  role: '',
  title: '',
  active: false,
  createdAt: new Date(),
};

export const initialPost: Post = {
  id: '',
  rePostID: '',
  rePost: null,
  userID: '',
  images: [],
  content: '',
  user: initialUser,
  likedBy: [],
  noLikes: 0,
  noShares: 0,
  noComments: 0,
  noImpressions: 0,
  noReposts: 0,
  comments: [],
  postedAt: new Date(),
  tags: [],
  hashes: [],
  edited: false,
  taggedUsers: [],
};

export const initialOrganization: Organization = {
  id: '',
  userID: '',
  user: initialUser,
  title: '',
  memberships: [],
  invitations: [],
  noEvents: 0,
  noMembers: 0,
  noProjects: 0,
  createdAt: new Date(),
};

export const initialOrganizationMembership: OrganizationMembership = {
  id: '',
  organizationID: '',
  organization: initialOrganization,
  userID: '',
  user: initialUser,
  role: '',
  title: '',
  createdAt: new Date(),
};

export const initialComment: Comment = {
  id: '',
  userID: '',
  user: initialUser,
  content: '',
  noLikes: 0,
  createdAt: new Date(),
  likedBy: [],
  postID: '',
  post: initialPost,
  projectID: '',
  project: initialProject,
};

export const initialApplication: Application = {
  id: '',
  openingID: '',
  opening: initialOpening,
  userID: '',
  user: initialUser,
  email: '',
  projectID: '',
  project: initialProject,
  status: 0,
  content: '',
  resume: '',
  links: [],
  createdAt: new Date(),
};

export const initialMessage: Message = {
  id: '',
  content: '',
  chatID: '',
  chat: null,
  userID: '',
  user: initialUser,
  createdAt: new Date(),
  read: false,
  postID: '',
  post: initialPost,
  projectID: '',
  project: initialProject,
  openingID: '',
  opening: initialOpening,
  profileID: '',
  profile: initialUser,
  messageID: '',
  message: null,
};

export const initialGroupChatMessage: GroupChatMessage = {
  id: '',
  content: '',
  chatID: '',
  chat: null,
  userID: '',
  user: initialUser,
  createdAt: new Date(),
  read: false,
  postID: '',
  post: initialPost,
  projectID: '',
  project: initialProject,
  openingID: '',
  opening: initialOpening,
  profileID: '',
  profile: initialUser,
  messageID: '',
  message: null,
};

export const initialChat: Chat = {
  id: '',
  title: '',
  description: '',
  createdByID: '',
  createdBy: initialUser,
  acceptedByID: '',
  acceptedBy: initialUser,
  createdAt: new Date(),
  messages: [],
  latestMessageID: '',
  latestMessage: initialMessage,
  lastReadMessageByAcceptingUserID: '',
  lastReadMessageByCreatingUserID: '',
  lastReadMessageByCreatingUser: initialMessage,
  lastReadMessageByAcceptingUser: initialMessage,
  accepted: false,
  blockedByCreatingUser: false,
  blockedByAcceptingUser: false,
};

export const initialGroupChat: GroupChat = {
  id: '',
  title: '',
  description: '',
  coverPic: '',
  adminOnly: false,
  userID: '',
  user: initialUser,
  projectID: '',
  project: initialProject,
  organizationID: '',
  organization: initialOrganization,
  memberships: [],
  createdAt: new Date(),
  messages: [],
  invitations: [],
  latestMessageID: '',
  latestMessage: initialGroupChatMessage,
};

export const initialInvitation: Invitation = {
  id: '',
  userID: '',
  user: initialUser,
  projectID: '',
  project: initialProject,
  organizationID: '',
  organization: initialOrganization,
  chatID: '',
  chat: initialGroupChat,
  title: '',
  status: 0,
  isRead: false,
  createdAt: new Date(),
};

export const initialGroupChatMembership: GroupChatMembership = {
  id: '',
  userID: '',
  user: initialUser,
  chatID: '',
  chat: initialGroupChat,
  role: '',
  createdAt: new Date(),
};

export const initialPostBookmark: PostBookmark = {
  id: '',
  title: '',
  userID: '',
  postItems: [],
  createdAt: new Date(),
};

export const initialProjectBookmark: ProjectBookmark = {
  id: '',
  title: '',
  userID: '',
  projectItems: [],
  createdAt: new Date(),
};

export const initialOpeningBookmark: OpeningBookmark = {
  id: '',
  title: '',
  userID: '',
  openingItems: [],
  createdAt: new Date(),
};

export const initialEventBookmark: EventBookmark = {
  id: '',
  title: '',
  userID: '',
  eventItems: [],
  createdAt: new Date(),
};

export const initialTask: Task = {
  id: '',
  title: '',
  description: '',
  tags: [],
  users: [],
  subTasks: [],
  deadline: new Date(),
  isCompleted: false,
  projectID: '',
  project: initialProject,
  priority: 'low',
};

export const initialSubTask: SubTask = {
  id: '',
  title: '',
  description: '',
  tags: [],
  users: [],
  deadline: new Date(),
  isCompleted: false,
  taskID: '',
  priority: 'low',
};

export const initialEvent: Event = {
  id: '',
  title: '',
  tagline: '',
  coverPic: '',
  blurHash: '',
  description: '',
  noLikes: 0,
  noShares: 0,
  noComments: 0,
  noViews: 0,
  noImpressions: 0,
  coordinators: [],
  tags: [],
  category: '',
  links: [],
  organizationID: '',
  organization: initialOrganization,
  startTime: new Date(),
  endTime: new Date(),
  location: '',
  createdAt: new Date(),
  userID: '',
};

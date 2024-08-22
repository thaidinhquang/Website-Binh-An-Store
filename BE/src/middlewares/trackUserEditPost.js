let userEditing = {};

const handleJoinEditPost = (client) => (data) => {
  console.log(`User ${data.fullname} is editing post ${data.post_id}`);
  userEditing[data.post_id] = data.fullname;
  client.broadcast.emit("userEditing", userEditing);
};

const handleLeaveEditPost = (client) => (data) => {
  console.log(`User ${data.fullname} is done editing post ${data.post_id}`);
  delete userEditing[data.post_id];
  client.broadcast.emit("userEditing", userEditing);
};

const handleGetUsersEditing = (client) => () => {
  client.emit("userEditing", userEditing);
};

export const initializeSocketIO = (io) => {
  io.on("connection", (client) => {
    client.on("joinEditPost", handleJoinEditPost(client));
    client.on("leaveEditPost", handleLeaveEditPost(client));
    client.on("getUsersEditing", handleGetUsersEditing(client));
  });
};

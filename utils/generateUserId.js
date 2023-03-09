const nextUserId = (users) => {
  const maxId = users.reduce(
    (maxId, user) => Math.max(parseInt(user._id), maxId),
    0
  );
  return maxId + 1;
};

module.exports = nextUserId;

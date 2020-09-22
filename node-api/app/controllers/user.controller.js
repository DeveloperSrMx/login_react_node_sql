exports.public = (req, res) => {
  res.status(200).send("Public Home Page");
};

exports.dashboard = (req, res) => {
  res.status(200).send("⭐️ Dashboard Content \n (if user is logged). Now you can log out and try to enter the route: /dashboard 🤓");
};
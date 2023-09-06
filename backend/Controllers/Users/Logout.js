const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("jwt", '', {
        maxAge: 0,
        httpOnly: true,
        sameSite: 'none',
        secure: true
      }).send();
  } catch (err) {
    console.log("error: ", err);
  }
};

module.exports = logout;
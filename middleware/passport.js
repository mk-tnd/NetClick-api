const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { User } = require("../models");
const { SECRET_KEY } = process.env;

const options = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const JwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await User.findOne({ where: { id: payload.id } });

    if (!user) return done(null, false); //จะส่ง UnAuth ออกไปเลย

    done(null, user);
  } catch (err) {
    done(err, false);
  }
});


passport.use("jwt-user", JwtStrategy);

const protect = passport.authenticate("jwt-user", { session: false });

module.exports = protect;

import passport from 'passport';
import passportLocal from 'passport-local';
import _ from 'lodash';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
    done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
    done(undefined, {});
});

passport.use(new LocalStrategy({usernameField: "email"}, (email, password, done) => {
    // 
}));

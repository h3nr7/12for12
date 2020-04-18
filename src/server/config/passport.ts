import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import * as _ from 'lodash';

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

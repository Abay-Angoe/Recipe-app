import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { notFoundHandler } from '../middlewares/errorHander';
import authRouter from '../routes/auth.routes';
import recipeRouter from '../routes/recipe.routes';
import userRouter from '../routes/user.routes';
import passport from 'passport';
import passportConfig from '../config/passport.config';
import session from 'express-session';
import path from 'path';
import viewRouter from '../routes/views.routes';



const app: Application = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../public")));

app.use(helmet());

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(session({
    secret: 'SESSION_SECRET',
    resave: false,
    saveUninitialized: true,
}));


app.use(passport.initialize());
app.use(passport.session());



passportConfig(passport);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/recipes', recipeRouter);
app.use('/api/v1/users', userRouter);
app.use('/' , viewRouter)

app.use(notFoundHandler);


export default app;
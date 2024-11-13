import { Home, LogIn, SignUp, JournalWrite, AllJournals, JournalView, Page404 } from '../pages'


export const emotions = {
    happy: {
        name: 'Happy',
        color: 'yellow'
    },
    sad: {
        name: 'Sad',
        color: 'blue'
    },
    angry: {
        name: 'Angry',
        color: 'red'
    }
}


export const pages = {
    Home: {
        name: 'Home',
        path: '/',
        component: <Home />,
        sidebar: false,
    },
    LogIn: {
        name: 'Log In',
        path: '/login',
        component: <LogIn />,
        sidebar: true,
    },
    SignUp: {
        name: 'Sign Up',
        path: '/signup',
        component: <SignUp />,
        sidebar: true,
    },
    JournalWrite: {
        name: 'Write Journal',
        path: '/journal',
        component: <JournalWrite />,
        sidebar: true,
    },
    AllJournals: {
        name: 'View Journals',
        path: '/view-journals',
        component: <AllJournals />,
        sidebar: true,
    },
    JournalView: {
        name: 'View Journal',
        path: '/view-journals/:id',
        component: <JournalView />,
        sidebar: false,
    },
    Page404: {
        name: '404 Page',
        path: '*',
        component: <Page404 />,
        sidebar: false,
    },
}

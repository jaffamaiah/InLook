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
    },
    LogIn: {
        name: 'Log In',
        path: '/login',
        component: <LogIn />,
    },
    SignUp: {
        name: 'Sign Up',
        path: '/signup',
        component: <SignUp />,
    },
    JournalWrite: {
        name: 'Write Journal',
        path: '/journal',
        component: <JournalWrite />,
    },
    AllJournals: {
        name: 'Read Journals',
        path: '/view-journals',
        component: <AllJournals />,
    },
    JournalView: {
        name: 'View Journal',
        path: '/view-journals/:id',
        component: <JournalView />,
    },
    AccountSettings: {
        name: 'Account Settings',
        path: '/settings',
        component: <div/>,
    },
    Profile: {
        name: 'My Profile',
        path: '/profile',
        component: <div/>,
    },
    Emotions: {
        name: 'Emotions',
        path: '/emotions',
        component: <div/>,
    },
    Page404: {
        name: '404 Page',
        path: '*',
        component: <Page404 />,
    },
}

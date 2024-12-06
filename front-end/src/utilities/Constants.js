import { Home, LogIn, Write, Read, MyJournal, Page404, Account, Profile, Emotions } from '../pages'


export const emotions = {
    happy: {
        name: 'Happy',
        color: '#FFFF53',
    },
    sad: {
        name: 'Sad',
        color: '#4A47FF'
    },
    angry: {
        name: 'Angry',
        color: '#FF2D2D'
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
    Write: {
        name: 'Write Journal',
        path: '/write',
        component: <Write />,
    },
    Read: {
        name: 'Read Journal',
        path: '/my-journal/:id',
        component: <Read />,
    },
    MyJournal: {
        name: 'My Journal',
        path: '/my-journal',
        component: <MyJournal />,
    },
    Account: {
        name: 'Account',
        path: '/account',
        component: <Account />,
    },
    Profile: {
        name: 'My Profile',
        path: '/profile',
        component: <Profile />,
    },
    Emotions: {
        name: 'Emotions',
        path: '/emotions',
        component: <Emotions />,
    },
    Page404: {
        name: '404: Page not found...',
        path: '*',
        component: <Page404 />,
    },
}

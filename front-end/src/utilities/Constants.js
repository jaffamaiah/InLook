import { Home, LogIn, Write, MyJournal, Read, Page404 } from '../pages'


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
    Write: {
        name: 'Write Journal',
        path: '/write',
        component: <Write />,
    },
    MyJournal: {
        name: 'My Journal',
        path: '/my-journal',
        component: <MyJournal />,
    },
    Read: {
        name: 'Read Journal',
        path: '/my-journal/:id',
        component: <Read />,
    },
    Account: {
        name: 'Account',
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
        name: '404: Page not found...',
        path: '*',
        component: <Page404 />,
    },
}

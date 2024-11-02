/* eslint-disable no-unused-vars */

export const emotions = {
    happy: {
        color: 'yellow'
    },
    sad: {
        color: 'blue'
    },
    angry: {
        color: 'red'
    }
}



export const pages = {
    LogIn: {
        path: '/login',
        sidebar: true,
        name: 'Log In',
    },
    SignUp: {
        path: '/signup',
        sidebar: true,
        name: 'Sign Up',
    },

    JournalWrite: {
        path: '/journal',
        sidebar: true,
        name: 'Write Journal',
    },
    AllJournals: {
        path: '/view-journals',
        sidebar: true,
        name: 'View Journals',
    },
    JournalView: {
        path: '/view-journals/:id',
        sidebar: false,
        name: 'View Journal',
    },

    Page404: {
        path: '*',
        sidebar: false,
        name: '404 Page',
    },
}

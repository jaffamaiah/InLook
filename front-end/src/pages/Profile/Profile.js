import { pages, ProtectedPage } from '../../utilities'

export default function Profile() {

    return <div className='gradient-background'>

        <h1>{pages.Profile.name}</h1>

        <ProtectedPage />
    </div>
}

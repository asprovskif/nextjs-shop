import {useQuery} from 'react-query';
import {User} from '../lib/user';
import {fetchJson} from '../lib/api';


export function useUser(): User {
    const query = useQuery<User>('user', async () => {
        try {
            return await fetchJson('/api/user');
        } catch (err) {
            return undefined;
        }
    }, {
        cacheTime: Infinity,
        staleTime: 30_000,
    });

    return query.data;
}
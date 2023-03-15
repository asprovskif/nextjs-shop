export const fetchJson = async (url: string):Promise<any> => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`request failed with status ${response.status}`);

    return await response.json();
};
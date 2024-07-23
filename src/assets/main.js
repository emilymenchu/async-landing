const urlVideo = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCq19-LqvG35A-30oyAiPiqA&part=snippet%2Cid&order=date&maxResults=12';

const urlAlbum = 'https://spotify23.p.rapidapi.com/artist_albums/?id=4Z8W4fKeB5YxbusRsdQVPb&offset=0&limit=100';



const content = null || document.getElementById('videos')
const albumsContent = null || document.getElementById('albums')

const optionsVideo = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '66a28f48d1msh7f81c07c64dd90dp1584a0jsn26181961ffa1',
		'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
	}
};

const optionsAlbum = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '66a28f48d1msh7f81c07c64dd90dp1584a0jsn26181961ffa1',
		'x-rapidapi-host': 'spotify23.p.rapidapi.com'
	}
};

async function fetchData(url, options) {
    const response = await fetch (url, options);
    const data = await response.json()
    return data;
}


(async () => {
    try {
        const videos = await fetchData(urlVideo, optionsVideo);
        let view = `
        ${videos.items.map(video => `
            <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                    </h3>
                </div>
            </div>

        `).join('')}
        `;
    content.innerHTML = view;
    } catch (error){
        console.error(error)
    }
})();

(async () => {
    try {
        const albums = await fetchData(urlAlbum, optionsAlbum);
        let view = `
        ${albums.data.artist.discography.albums.items.map(album => `
            <div class="bg-white-300 rounded-lg p-4">
        <a href="${album.releases.items[0].sharingInfo.shareUrl}" target="_blank">
            <img class="w-full mb-4 rounded-lg" src="${album.releases.items[0].coverArt.sources[0].url}"
                alt="Portada ${album.releases.items[0].name}">
            <div class="text-center">
                <h3 class="text-2xl font-bold text-gray-800 mb-2">${album.releases.items[0].name}</h3>
                <p class="text-base font-medium">
                    Year: ${album.releases.items[0].date.year} <br>
                    Songs: ${album.releases.items[0].tracks.totalCount}
                </p>
            </div>
        </a>
      </div>
        `).join('')}
        `;
    albumsContent.innerHTML = view;
    } catch (error){
        console.error(error)
    }
})();
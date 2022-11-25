class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=9d4521b2497bb12833879191b320a1be';

	getResource = async(url) => {
		let res = await fetch(url);

		if(!res.ok){
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	}

	getAllCharacters = async() => {
		const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
		return res.data.results.map(this._transfromCharacter);
	}

	getCharacter = async (id) => {
		const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
		console.log(res.data.results[0].description);
		return this._transformCharacter(res.data.results[0]);
	}

	_transformCharacter = (res) => {
		return {
				name: res.name,
				description: res.description ? res.description.slice(0,20) + '...' : 'I try to remember fronted',
				thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
				homepage: res.urls[0].url,
				wiki: res.urls[1].url,
		}
	}
}

export default MarvelService;
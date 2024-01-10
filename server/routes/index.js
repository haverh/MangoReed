const baseURL = 'https://api.mangadex.org';
const coverBaseURL = 'https://uploads.mangadex.org/covers'
const chapterBaseURL = 'https://api.mangadex.org/at-home/server'

module.exports = function (app, axios) {

	// landing route
	app.get('/', (req, res) => {
        res.send("Server is running.");
    })

	// Get all tags
	
	
	// Search for manga given title
	app.get('/search/title/:title', async (req, res) => {
		const title = req.params.title;
		const order = {
			rating: 'desc',
			followedCount: 'desc'
		};
		const finalOrderQuery = {};

		// { "order[rating]": "desc", "order[followedCount]": "desc" }
		for (const [key, value] of Object.entries(order)) {
			finalOrderQuery[`order[${key}]`] = value;
		};
	
		const resp = await axios({
			method: 'GET',
			url: `${baseURL}/manga`,
			params: {
				...finalOrderQuery,
				title: title,
			}
		});


		const mangaInfo = await Promise.all(resp.data.data.map(async obj => {
			// Get cover info
			coverid = obj.relationships.filter((data) => {return data.type === "cover_art"})[0].id;
			const coverResp = await axios({
				method: 'GET',
				url: `${baseURL}/cover/${coverid}`,
			});	

			// Get manga statistics
			const stats = await axios({
				method: 'GET',
				url: `${baseURL}/statistics/manga/${obj.id}`,
			});	


			return {
				id: obj.id,
				year: obj.attributes.year,
				title: obj.attributes.title.en,
				description: obj.attributes.description.en,
				coverImg: `${coverBaseURL}/${obj.id}/${coverResp.data.data.attributes.fileName}`,
				rating: stats.data.statistics[obj.id].rating.average,
				follows: stats.data.statistics[obj.id].follows,
				status: obj.attributes.status
			}
		}))

		res.json(mangaInfo);
	});


	// Get top 10 manga
	app.get('/top10', async (req, res) => {
		const order = {
			rating: 'desc',
			followedCount: 'desc'
		};
		const finalOrderQuery = {};

		// { "order[rating]": "desc", "order[followedCount]": "desc" }
		for (const [key, value] of Object.entries(order)) {
			finalOrderQuery[`order[${key}]`] = value;
		};
		
		const resp = await axios({
			method: 'GET',
			url: `${baseURL}/manga`,
			params: {
				...finalOrderQuery
			}
		});
		

		const top10Manga = await Promise.all(resp.data.data.map(async obj => {
			// Get cover info
			coverid = obj.relationships.filter((data) => {return data.type === "cover_art"})[0].id;
			const coverResp = await axios({
				method: 'GET',
				url: `${baseURL}/cover/${coverid}`,
			});	

			// Get manga statistics
			const stats = await axios({
				method: 'GET',
				url: `${baseURL}/statistics/manga/${obj.id}`,
			});	

			return {
				id: obj.id,
				year: obj.attributes.year,
				title: obj.attributes.title.en,
				description: obj.attributes.description.en,
				coverImg: `${coverBaseURL}/${obj.id}/${coverResp.data.data.attributes.fileName}`,
				rating: stats.data.statistics[obj.id].rating.average,
				follows: stats.data.statistics[obj.id].follows
			}
		}))

		res.json(top10Manga);
	});

	// Get manga info given id
	app.get('/manga/:id', async (req, res) => {
		const manga_id = req.params.id;
		
		const resp = await axios({
			method: 'GET',
			url: `${baseURL}/manga/${manga_id}`
		});

		// Get cover info
		coverid = resp.data.data.relationships.filter((data) => {return data.type === "cover_art"})[0].id;
		const coverResp = await axios({
			method: 'GET',
			url: `${baseURL}/cover/${coverid}`,
		});	

		// Get manga statistics
		const stats = await axios({
			method: 'GET',
			url: `${baseURL}/statistics/manga/${manga_id}`,
		});

		// Get all alternative titles
		const altTitles = resp.data.data.attributes.altTitles.map(obj => obj[Object.keys(obj)[0]])

		// Get tags
		const tags = [];
		resp.data.data.attributes.tags.forEach((tag) => {
			tags.push(tag.attributes.name.en);
		})

		// Get chapters
		const languages = ["en"];
		const volumesArray = await axios({
			method: 'GET',
			url: `${baseURL}/manga/${manga_id}/aggregate`,
			params: {
				"translatedLanguage[]": languages,
			}
		});

		const chapters = [];
		
		for (const vProperty in volumesArray.data.volumes) {
			const volume = volumesArray.data.volumes[vProperty]

			for (const cProperty in volume.chapters) {
				const chapter = volume.chapters[cProperty]
				const chapterObject = {
					volume: volume.volume,
					chapter: chapter.chapter,
					chapterId: chapter.id,
				};
				chapters.push(chapterObject);
			}
		}

		const mangaInfo = {
			id: resp.data.data.id,
			status: resp.data.data.attributes.status,
			year: resp.data.data.attributes.year,
			title: resp.data.data.attributes.title.en,
			altTitles: altTitles,
			description: resp.data.data.attributes.description.en,
			coverImg: `${coverBaseURL}/${resp.data.data.id}/${coverResp.data.data.attributes.fileName}`,	
			rating: stats.data.statistics[resp.data.data.id].rating.average,
			follows: stats.data.statistics[resp.data.data.id].follows,
			chapters: chapters,
			tags: tags
		}

		res.json(mangaInfo);
	});

	// Get all images for chapter given manga id and index
	app.get('/read/:mangaId/:index', async (req, res) => {
		const manga_id = req.params.mangaId;
		const index = parseInt(req.params.index);

		// Get chapters
		const languages = ["en"];
		const volumesArray = await axios({
			method: 'GET',
			url: `${baseURL}/manga/${manga_id}/aggregate`,
			params: {
				"translatedLanguage[]": languages,
			}
		});

		const chapters = [];
		
		for (const vProperty in volumesArray.data.volumes) {
			const volume = volumesArray.data.volumes[vProperty]

			for (const cProperty in volume.chapters) {
				const chapter = volume.chapters[cProperty]
				const chapterObject = {
					volume: volume.volume,
					chapter: chapter.chapter,
					chapterId: chapter.id,
				};
				chapters.push(chapterObject);
			}
		}

		const chapterId = chapters[index].chapterId;
		const volumeNumber = chapters[index].volume;
		const chapterNumber = chapters[index].chapter;

		const chapterInfo = await axios({
			method: 'GET',
			url: `${baseURL}/chapter/${chapterId}`
		});

		const chapterTitle = chapterInfo.data.data.attributes.title;

		const chapterDownloadInfo = await axios({
			method: 'GET',
			url: `${chapterBaseURL}/${chapterId}`
		});

		const chapterImgBaseURL = `${chapterDownloadInfo.data.baseUrl}/data-saver`;
		const hash = chapterDownloadInfo.data.chapter.hash;
		const dataSaver = chapterDownloadInfo.data.chapter.dataSaver;

		res.json({
			imgBaseURL: chapterImgBaseURL,
			hash: hash,
			fileNames: dataSaver,
			volume: volumeNumber,
			chapter: chapterNumber,
			chapterTitle: chapterTitle,
			maxChapters: chapters.length
			
		})

	})
}
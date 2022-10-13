import React, {useState, useEffect, useRef} from "react";

//create your first component
const Home = () => {
	const [spotify, setSpotify] = useState([])
	const [actual, setActual] = useState(0)
	const mandarUrl =  useRef(null)

	// Traer canciones de url
	function traerCanciones () {
		fetch ('https://assets.breatheco.de/apis/sound/songs')
		.then((response) => {
			console.log(response.status);
				return response.json()
		})
		.then((data) => setSpotify(data))
		.catch((err) => console.log(err))
	}

	useEffect(()=>{
		traerCanciones()
	},[])


	function tocaCancion (index, url) {
		setActual (index)
		mandarUrl.current.src = `https://assets.breatheco.de/apis/sound/${url}`
		mandarUrl.current.play()
	}

	const playSong = () => {
		if (mandarUrl.current.paused) {
			mandarUrl.current.play()
		}
	}

	const pauseSong = () => {
		if (!mandarUrl.current.paused) {
			mandarUrl.current.pause()
		}
	}

	const nextSong = () => {
		tocaCancion(0, spotify[actual+1].url)
	}

	const previousSong = () => {
		tocaCancion(0, spotify[actual-1].url)
	}

	return (
		<div className="container text-center">
				{spotify.map((item, index)=>
					<button type="button" className="btn btn-dark w-75 border-white" key={index}  
					onClick={()=>tocaCancion(index, item.url)}>
						{index+1}
						&nbsp;
						{item.name}
					</button>
				
				)}
			<div className="mt-3">
				<audio type="audio" ref={mandarUrl} />

				<button className="btn btn-secondary" onClick={() => previousSong()}><i className="fas fa-step-backward"></i></button>
				<button className="btn btn-secondary" onClick={() => pauseSong()}><i className="fas fa-pause"></i></button>
				<button className="btn btn-secondary" onClick={() => playSong()}><i className="fas fa-play"></i></button>
				<button className="btn btn-secondary" onClick={() => nextSong()}><i className="fas fa-step-forward"></i></button>
			</div>
		</div>
	);
};

export default Home;

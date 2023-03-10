function host(endpoint) {
    return `https://api.backendless.com/D9505EDE-5484-3374-FFBE-F2A53126B700/8C9168F1-D0E4-456E-94D0-C5F369B47242/${endpoint}`;
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    MOVIES: 'data/movies',
    MOVIE_BY_ID: 'data/movies/'

}

export async function register(username, password){
    return (await fetch(host(endpoints.REGISTER), {
        method: 'POST' ,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json();
}

export async function login(username, password){
    const result = await fetch(host(endpoints.LOGIN), {
        method: 'POST' ,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: username,
            password
        })
    }).json();

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.objectId);

    return result;
}

export async function logout() {
    const token = localStorage.getItem('userToken');

    localStorage.removeItem('userToken');

    return fetch(host(endpoints.LOGOUT), {
        headers: {
            'user-token': token
        }
    });

}

// get all movies

export async function getMovies() {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIES), {
        headers: {
            'user-token': token
        }
    })).json();
}


// get movie by ID
export async function getMovieById(id) {
    const token = localStorage.getItem('userToken');

    return (await (fetch(host(endpoints.MOVIE_BY_ID + id), {
        headers: {
            'user-token': token
        }
    }))).json();
}


// create movie
export async function createMovie(movie) {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIES), {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'user-token': token
        },
        body: JSON.stringify(movie)
    })).json();
}

// edit movie

export async function updateMovie(id, updatedProps) {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps)
    })).json();
}

// delete movie
export async function deleteMovie(id) {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
            'user-token': token
        }
    })).json();
}



// get movies by userId
export async function getMoviesByOwner(ownerId) {
    const token = localStorage.getItem('userToken');

   return (await fetch(host(endpoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`), {
    headers: {
        'Content-Type':'application/json',
        'user-token': token
    }
   })).json();
}



// buy ticket
export async function buyTicket(movie) {
    const newTickets = movie.tickets - 1;
    const movieId = movie.objectId;

   return updateMovie(movieId, {tickets: newTickets})

    // obtain userId
    // make request
    
}


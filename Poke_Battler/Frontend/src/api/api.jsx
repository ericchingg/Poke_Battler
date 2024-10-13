const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class PokeApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token = "";

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${PokeApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }

  // Individual API routes

  /** Get a specific pokemon. */

  static async getPokemon(id) {
    let res = await this.request(`pokemon/${id}`);
    return res.pokemon;
  }


  /** Get a list of pokemon */

  // static async getAllPokemons() {
  //   let res = await this.request(`pokemon/`);
  //   return res.pokemon;
  // }

  static async getAllPokemons() {
    let res = await this.request(`pokemon/`);
    return Promise.all(res.pokemon.map(async pokemon => {
      // Fetch moves for each Pokémon
      const moves = await this.getMovesForPokemon(pokemon.id);
      return { ...pokemon, moves }; // Include moves in the returned Pokémon object
    }));
  }

  static async getMovesForPokemon(id) {
    try {
      const res = await this.request(`pokemon/${id}/moves`); 
      console.log('Moves Response:', res);
      return res.moves;
    } catch (error) {
      console.log('Error fetching moves:', error);
      throw error;
    }
  }
  /** Get a list of teams */

  static async getTeams() {
    let res = await this.request(`teams/`);
    return res.teams;
  }

  static async getTeam(team_id) {
    let res = await this.request(`teams/${team_id}`);
    return res.teams;
  }


  /** Search for teams with search term query */

  // static async findTeam(searchParam) {
  //   const data = { teamName: searchParam };
  //   let res = await this.request(`teams/`, data);
  //   return res.team;
  // }

  /**  Register a user with data from sign up form. Returns a token on success. */

  static async registerUser({ username, password, email }) {
    let res = await this.request('auth/register', {
      username,
      email,
      password
    },
      "POST");

    return res.token;
  }

  /** Logs in a user with a valid username and password.
   *
   *  For authenticated username/password, returns a token.
   *
   *  For failed authentication, returns error object =>
   *      { error: message, status}
   */

  static async logInUser({ username, password }) {
    let res = await this.request('auth/token', {
      username,
      password
    },
      "POST");

    this.token = res.token;
    return this.token;
  }

  /** Gets a user's details by username */
  static async getUserDetails(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /**updateProfile method*/

  static async updateProfile(username, profileData) {
    let res = await this.request(`users/${username}`, profileData, "PATCH");
    return res.user;
  }

  /**Create a team for user */

  static async teamCreate(team_id, poke_id) {
    let res = await this.request(`teams/${team_id}/pokemon/${poke_id}`, {}, "POST");
    return res;
  }

}


export default PokeApi;

// for now, put token ("testuser" / "password" on class)
// PokeApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

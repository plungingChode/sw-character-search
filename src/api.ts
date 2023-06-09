export type Character = {
  /** The name of this person. */
  name: string;
  /** The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope. */
  birth_year: string;
  /** The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye. */
  eye_color: string;
  /** The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender. */
  gender: "male" | "female" | "unknown" | "n/a";
  /** The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair. */
  hair_color: string;
  /** The height of the person in centimeters. */
  height: string;
  /** The mass of the person in kilograms. */
  mass: string;
  /** The skin color of this person. */
  skin_color: string;
  /** The URL of a planet resource, a planet that this person was born on or inhabits. */
  homeworld: string;
  /** An array of film resource URLs that this person has been in. */
  films: string[];
  /** An array of species resource URLs that this person belongs to. */
  species: string[];
  /** An array of starship resource URLs that this person has piloted. */
  starships: string[];
  /** An array of vehicle resource URLs that this person has piloted. */
  vehicles: string[];
  /** the hypermedia URL of this resource. */
  url: string;
  /** the ISO 8601 date format of the time that this resource was created. */
  created: string;
  /** the ISO 8601 date format of the time that this resource was edited. */
  edited: string;
};

export type GetCharactersResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
};

export type GetCharactersParams = {
  page?: number | undefined;
  search?: string | undefined;
}

const BASE_URL = "https://swapi.dev/api";

export async function getCharacters(params: GetCharactersParams): Promise<GetCharactersResponse> {
  return fetchJson(`/people?${toSearchParams(params)}`);
}

type FetchInit = Parameters<typeof fetch>[1];

async function fetchJson<T>(endpoint: string, init?: FetchInit): Promise<T> {
  const tail = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  const res = await fetch(`${BASE_URL}/${tail}`, init);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText} - ${text}`);
  }
  return await res.json();
}

function toSearchParams<T extends Record<string, unknown>>(params: T): string {
  const query = new URLSearchParams();
  for (const k in params) {
    const v = params[k];
    if (typeof v === "undefined") {
      continue;
    }
    query.append(k, String(v)); 
  }
  return query.toString();
}

export interface IGithubUser {
  login: string; // username
  id: number;
  avatar_url: string;
  url: string;
  html_url: string;
  starred_url: string;
  type: "User";
  public_repos: number;
  followers: number;
}

export interface IGithubRepo {
  id: number;
  node_id: string;
  name: string;

  owner: IGithubUser;
}

export interface IUsersListResponse {
  total_count: number;
  incomplete_results: boolean;
  items: IGithubUser[];
}

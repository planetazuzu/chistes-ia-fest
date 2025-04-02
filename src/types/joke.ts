
export interface Joke {
  id: string;
  text: string;
  likes: number;
  dislikes: number;
}

export interface JokeVote {
  jokeId: string;
  type: 'like' | 'dislike';
  userName: string;
}

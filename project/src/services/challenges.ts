const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ChallengeInput {
  title: string;
  description: string;
  content: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  flag: string;
  server_credentials?: {
    host: string;
    port: number;
    username: string;
    password: string;
  };
}

export async function getChallenges() {
  const response = await fetch(`${API_URL}/challenges`);
  if (!response.ok) {
    throw new Error("Failed to fetch challenges");
  }
  return response.json();
}

export async function createChallenge(challenge: ChallengeInput) {
  const response = await fetch(`${API_URL}/challenges`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(challenge),
  });
  if (!response.ok) {
    throw new Error("Failed to create challenge");
  }
  return response.json();
}

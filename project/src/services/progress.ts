// services/progress.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface UserProgressInput {
  user_id: string;
  challenge_id: string;
  completed?: boolean;
  attempts?: number;
  completed_at?: string | null;
}

export async function getUserProgress(
  userId: string,
  challengeId?: string
): Promise<UserProgressInput[]> {
  const params = new URLSearchParams();
  params.append("user_id", userId);
  if (challengeId) {
    params.append("challenge_id", challengeId);
  }

  const response = await fetch(`${API_URL}/user-progress?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user progress");
  }
  return response.json();
}

export async function updateUserProgress(
  id: string,
  data: UserProgressInput
): Promise<UserProgressInput> {
  const response = await fetch(`${API_URL}/user-progress?id=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update user progress");
  }
  return response.json();
}

export async function createUserProgress(
  data: UserProgressInput
): Promise<UserProgressInput> {
  const response = await fetch(`${API_URL}/user-progress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create user progress");
  }
  return response.json();
}

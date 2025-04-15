const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getChallenges() {
  const response = await fetch(`${API_URL}/challenges`);
  if (!response.ok) {
    throw new Error('Failed to fetch challenges');
  }
  return response.json();
}

export async function createChallenge(challenge: any) {
  const response = await fetch(`${API_URL}/challenges`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(challenge),
  });
  if (!response.ok) {
    throw new Error('Failed to create challenge');
  }
  return response.json();
}

export async function getUserProgress(userId: string, challengeId?: string) {
  const params = new URLSearchParams();
  params.append('user_id', userId);
  if (challengeId) {
    params.append('challenge_id', challengeId);
  }
  
  const response = await fetch(`${API_URL}/user-progress?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user progress');
  }
  return response.json();
}

export async function updateUserProgress(id: string, data: any) {
  const response = await fetch(`${API_URL}/user-progress?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update user progress');
  }
  return response.json();
}

export async function createUserProgress(data: any) {
  const response = await fetch(`${API_URL}/user-progress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create user progress');
  }
  return response.json();
} 
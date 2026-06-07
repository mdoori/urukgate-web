const ZOOM_TOKEN_URL = "https://zoom.us/oauth/token";
const ZOOM_API_URL = "https://api.zoom.us/v2";

async function getZoomAccessToken(): Promise<string> {
  const credentials = Buffer.from(
    `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(
    `${ZOOM_TOKEN_URL}?grant_type=account_credentials&account_id=${process.env.ZOOM_ACCOUNT_ID}`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Zoom auth failed: ${res.statusText}`);
  }

  const data = await res.json();
  return data.access_token;
}

export async function createZoomMeeting({
  topic,
  startTime,
  durationMinutes,
  hostEmail,
}: {
  topic: string;
  startTime: string;
  durationMinutes: number;
  hostEmail?: string;
}): Promise<{ joinUrl: string; meetingId: string; password: string }> {
  const token = await getZoomAccessToken();

  const res = await fetch(`${ZOOM_API_URL}/users/me/meetings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic,
      type: 2,
      start_time: startTime,
      duration: durationMinutes,
      timezone: "Europe/London",
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        waiting_room: true,
        auto_recording: "none",
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Zoom meeting creation failed: ${err}`);
  }

  const data = await res.json();
  return {
    joinUrl: data.join_url,
    meetingId: String(data.id),
    password: data.password ?? "",
  };
}

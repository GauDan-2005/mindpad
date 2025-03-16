// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
declare global {
  interface Liveblocks {
    Presence: {
      cursor: { x: number; y: number } | null;
    };
    // eslint-disable-next-line
    Storage: {};
    UserMeta: {
      id: string;
      info: {
        name: string;
        email: string;
        avatar: string;
      };
    };
    // eslint-disable-next-line
    RoomEvent: {};
    // eslint-disable-next-line
    ThreadMetadata: {};
    // eslint-disable-next-line
    RoomInfo: {};
  }
}

export {};

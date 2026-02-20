export type GalleriaEvent = {
    id: string;
    title: string;
    description: string;
    date: string; // ISO string
    location: string;
    image: string;
};

// Determine dates relative to today for accurate countdown testing
const n = new Date();
const today = n.getTime();

export const events: GalleriaEvent[] = [
    {
        id: "e1",
        title: "Summer Fashion Show",
        description: "Discover the latest trends from top designers at the main atrium.",
        date: new Date(today + 3 * 24 * 60 * 60 * 1000).toISOString(),
        location: "Main Atrium",
        image: "https://images.unsplash.com/photo-1542452255191-c85a98f41ddf?q=80&w=1471&auto=format&fit=crop"
    },
    {
        id: "e2",
        title: "Live Jazz Weekend",
        description: "Enjoy relaxing live jazz performances at the dining level.",
        date: new Date(today + 5 * 24 * 60 * 60 * 1000).toISOString(),
        location: "Food Court Stage",
        image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1632&auto=format&fit=crop"
    },
    {
        id: "e3",
        title: "Tech Expo 2026",
        description: "Experience the newest gadgets, AR/VR demonstrations, and AI showrooms.",
        date: new Date(today + 12 * 24 * 60 * 60 * 1000).toISOString(),
        location: "Exhibition Hall, Level 3",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1420&auto=format&fit=crop"
    }
];

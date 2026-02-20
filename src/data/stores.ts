export type Store = {
    id: string;
    name: string;
    category: string;
    floor: string;
    description: string;
    image: string;
    phone: string;
    hours: string;
};

export const stores: Store[] = [
    {
        id: "s1",
        name: "Urban Outfitters",
        category: "Fashion",
        floor: "Level 1",
        description: "Trendy apparel and lifestyle products.",
        image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1470&auto=format&fit=crop",
        phone: "+1 212-555-0101",
        hours: "10:00 AM - 9:00 PM"
    },
    {
        id: "s2",
        name: "Apple Store",
        category: "Tech",
        floor: "Level 2",
        description: "Innovative electronics and tech support.",
        image: "https://images.unsplash.com/photo-1541845157-a6d2d100c931?q=80&w=1470&auto=format&fit=crop",
        phone: "+1 212-555-0102",
        hours: "10:00 AM - 9:00 PM"
    },
    {
        id: "s3",
        name: "Gourmet Kitchen",
        category: "Dining",
        floor: "Food Court",
        description: "Artisan meals and organic delicacies.",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1374&auto=format&fit=crop",
        phone: "+1 212-555-0103",
        hours: "11:00 AM - 10:00 PM"
    },
    {
        id: "s4",
        name: "Cinema 12",
        category: "Entertainment",
        floor: "Level 3",
        description: "State-of-the-art movie theater.",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1470&auto=format&fit=crop",
        phone: "+1 212-555-0104",
        hours: "11:00 AM - 12:00 AM"
    },
    {
        id: "s5",
        name: "Sephora",
        category: "Beauty",
        floor: "Level 1",
        description: "Premium cosmetics and fragrances.",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1480&auto=format&fit=crop",
        phone: "+1 212-555-0105",
        hours: "10:00 AM - 9:00 PM"
    },
    {
        id: "s6",
        name: "Nike House",
        category: "Fashion",
        floor: "Level 2",
        description: "Athletic wear and sports gear.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop",
        phone: "+1 212-555-0106",
        hours: "10:00 AM - 9:00 PM"
    }
];

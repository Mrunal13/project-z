const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    // Check if there are any existing categories
    const existingCategories = await prisma.category.findMany();

    if (existingCategories.length === 0) {
        // Insert sample data only if there are no existing categories

        // Insert default data into the Category table
        await prisma.category.createMany({
            data: defaultCategories.map(category => ({
                category: category.category,
                subCategory: category.subCategory,
                icon: category.icon || null,
                status: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                deleted: 0,
            })),
        });

        console.log('Seed data inserted successfully.');
    } else {
        console.log('Database already contains categories. Skipping seed.');
    }
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });


const defaultCategories = [
    {
        category: "Retail and E-commerce",
        subCategory: "Retail and E-commerce"
    },
    {
        category: "Retail and E-commerce",
        subCategory: "Online stores and marketplaces"
    },
    {
        category: "Healthcare",
        subCategory: "Healthcare"
    },
    {
        category: "Healthcare",
        subCategory: "Medical practices"
    },
    {
        category: "Healthcare",
        subCategory: "Clinics"
    },
    {
        category: "Healthcare",
        subCategory: "Healthcare providers"
    },
    {
        category: "Finance",
        subCategory: "Finance"
    },
    {
        category: "Finance",
        subCategory: "Banking"
    },
    {
        category: "Finance",
        subCategory: "Investment"
    },
    {
        category: "Finance",
        subCategory: "Financial management"
    },

    {
        category: "Education",
        subCategory: "Education"
    },
    {
        category: "Education",
        subCategory: "Schools"
    },
    {
        category: "Education",
        subCategory: "Colleges"
    },
    {
        category: "Education",
        subCategory: "Universities"
    },
    {
        category: "Education",
        subCategory: "E-learning platforms"
    },


    {
        category: "Technology",
        subCategory: "Technology"
    },
    {
        category: "Technology",
        subCategory: "Software companies"
    },
    {
        category: "Technology",
        subCategory: "IT services"
    },
    {
        category: "Technology",
        subCategory: "Tech startups"
    },


    {
        category: "Real Estate",
        subCategory: "Real Estate"
    },
    {
        category: "Real Estate",
        subCategory: "Property listings"
    },
    {
        category: "Real Estate",
        subCategory: "Real estate agencies"
    },
    {
        category: "Real Estate",
        subCategory: "Construction firms"
    },


    {
        category: "Hospitality and Tourism",
        subCategory: "Hospitality and Tourism"
    },
    {
        category: "Hospitality and Tourism",
        subCategory: "Hotels"
    },
    {
        category: "Hospitality and Tourism",
        subCategory: "Travel agencies"
    },
    {
        category: "Hospitality and Tourism",
        subCategory: "Tourism destinations"
    },


    {
        category: "Food and Beverage",
        subCategory: "Food and Beverage"
    },
    {
        category: "Food and Beverage",
        subCategory: "Restaurants"
    },
    {
        category: "Food and Beverage",
        subCategory: "Cafes"
    },
    {
        category: "Food and Beverage",
        subCategory: "Food delivery services"
    },


    {
        category: "Entertainment",
        subCategory: "Entertainment"
    },
    {
        category: "Entertainment",
        subCategory: "Movie theaters"
    },
    {
        category: "Entertainment",
        subCategory: "Event/Venues Management"
    },
    {
        category: "Entertainment",
        subCategory: "Streaming platforms"
    },


    {
        category: "Automotive",
        subCategory: "Automotive"
    },
    {
        category: "Automotive",
        subCategory: "Car dealerships"
    },
    {
        category: "Automotive",
        subCategory: "Auto repair shops"
    },
    {
        category: "Automotive",
        subCategory: "Automotive manufacturers"
    },

    {
        category: "Professional Services",
        subCategory: "Professional Services"
    },
    {
        category: "Professional Services",
        subCategory: "Law firms"
    },
    {
        category: "Professional Services",
        subCategory: "Consulting companies"
    },
    {
        category: "Professional Services",
        subCategory: "Accounting services"
    },

    {
        category: "Nonprofit and Social Services",
        subCategory: "Nonprofit and Social Services"
    },
    {
        category: "Nonprofit and Social Services",
        subCategory: "Charities"
    },
    {
        category: "Nonprofit and Social Services",
        subCategory: "NGOs"
    },
    {
        category: "Nonprofit and Social Services",
        subCategory: "Social organizations"
    },

    {
        category: "Government",
        subCategory: "Government"
    },
    {
        category: "Government",
        subCategory: "Government agencies"
    },

    {
        category: "Fashion",
        subCategory: "Fashion"
    },
    {
        category: "Fashion",
        subCategory: "Clothing brands"
    },
    {
        category: "Fashion",
        subCategory: "Fashion retailers"
    },
    {
        category: "Fashion",
        subCategory: "Fashion designers"
    },

    {
        category: "Sports and Fitness",
        subCategory: "Sports and Fitness"
    },
    {
        category: "Sports and Fitness",
        subCategory: "Sports teams"
    },
    {
        category: "Sports and Fitness",
        subCategory: "Fitness centers"
    },
    {
        category: "Sports and Fitness",
        subCategory: "Athletic clubs"
    },

    {
        category: "Art and Design",
        subCategory: "Art and Design"
    },
    {
        category: "Art and Design",
        subCategory: "Art galleries"
    },
    {
        category: "Art and Design",
        subCategory: "Design agencies"
    },
    {
        category: "Art and Design",
        subCategory: "Individual artists"
    },

    {
        category: "Media and Journalism",
        subCategory: "Media and Journalism"
    },
    {
        category: "Media and Journalism",
        subCategory: "News outlets"
    },
    {
        category: "Media and Journalism",
        subCategory: "Magazines"
    },
    {
        category: "Media and Journalism",
        subCategory: "Publishing companies"
    },

    {
        category: "Transportation and Logistics",
        subCategory: "Transportation and Logistics"
    },
    {
        category: "Transportation and Logistics",
        subCategory: "Shipping companies"
    },
    {
        category: "Transportation and Logistics",
        subCategory: "Logistics providers"
    },
    {
        category: "Transportation and Logistics",
        subCategory: "Transportation services"
    },

    {
        category: "Energy and Utilities",
        subCategory: "Energy and Utilities"
    },
    {
        category: "Energy and Utilities",
        subCategory: "Energy companies and utility providers",
    },

    {
        category: "Agriculture",
        subCategory: "Agriculture"
    },
    {
        category: "Agriculture",
        subCategory: "Farms"
    },
    {
        category: "Agriculture",
        subCategory: "Agricultural product suppliers"
    },
    {
        category: "Agriculture",
        subCategory: "Agribusinesses"
    },

    {
        category: "Telecommunications",
        subCategory: "Telecommunications"
    },
    {
        category: "Telecommunications",
        subCategory: "Internet Provider"
    },
    {
        category: "Telecommunications",
        subCategory: "Phone/TV"
    },
    {
        category: "Telecommunications",
        subCategory: "Phone/TV services"
    },

    {
        category: "Environmental Services",
        subCategory: "Environmental Services"
    },
    {
        category: "Environmental Services",
        subCategory: "Environmental organizations"
    },
    {
        category: "Environmental Services",
        subCategory: "Companies focused on sustainability"
    },

    {
        category: "Marketing and Advertising",
        subCategory: "Marketing and Advertising"
    },
    {
        category: "Marketing and Advertising",
        subCategory: "Marketing agencies"
    },
    {
        category: "Marketing and Advertising",
        subCategory: "Advertising firms"
    },
    {
        category: "Marketing and Advertising",
        subCategory: "PR companies"
    },


    {
        category: "Fitness and Wellness",
        subCategory: "Fitness and Wellness"
    },
    {
        category: "Fitness and Wellness",
        subCategory: "Gyms"
    },
    {
        category: "Fitness and Wellness",
        subCategory: "Wellness centers"
    },
    {
        category: "Fitness and Wellness",
        subCategory: "Health-focused businesses"
    },

    {
        category: "Other",
        subCategory: "Other"
    },
];
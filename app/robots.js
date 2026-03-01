export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/', '/profile/'],
            crawlDelay: 2,
        },
        sitemap: 'https://kfmmasale.com/sitemap.xml',
    };
}
